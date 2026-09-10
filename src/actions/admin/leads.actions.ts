"use server";
import { ServerResponse } from "@/src/interfaces";
import { requireAuth } from "@/src/lib";
import { lockVehicleRow } from "@/src/lib/database/vehicle-lock";
import prisma from "@/src/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getLeads() {
  try {
    await requireAuth("admin");

    const leads = await prisma.lead.findMany({
      where: {
        deletedAt: null,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return {
      success: true,
      data: leads,
    };
  } catch (error) {
    console.error("[getLeads]", error);

    return {
      success: false,
    };
  }
}

export async function setAttend(id: string) {
  try {
    await requireAuth("admin");

    const target = await prisma.lead.findUnique({
      where: { id },
      select: {
        vehicleId: true,
      },
    });

    if (!target) {
      throw new Error("Lead not found.");
    }

    if (target.vehicleId) {
      await prisma.$transaction(async (tx) => {
        const locked = await lockVehicleRow(tx, target.vehicleId!);

        if (!locked) {
          throw new Error("Vehicle not found.");
        }

        const lead = await tx.lead.findFirst({
          where: {
            id,
            deletedAt: null,
            vehicle: {
              is: {
                deletedAt: null,
              },
            },
          },
          select: {
            id: true,
          },
        });

        if (!lead) {
          throw new Error("Lead not found or has been deleted.");
        }

        await tx.lead.update({
          where: { id },
          data: {
            status: "attended",
          },
        });
      });
    } else {
      const result = await prisma.lead.updateMany({
        where: {
          id,
          deletedAt: null,
        },
        data: {
          status: "attended",
        },
      });

      if (result.count === 0) {
        throw new Error("Lead not found or has been deleted.");
      }
    }

    revalidatePath("/dashboard/leads");

    return {
      success: true,
      message: "The status has been updated.",
    };
  } catch (error) {
    console.error("[setAttend]", error);

    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "An error occurred while changing the status.",
    };
  }
}

export async function deleteLead(id: string): Promise<ServerResponse<any>> {
  try {
    await requireAuth("admin");

    await prisma.lead.delete({ where: { id } });

    revalidatePath("/dashboard/leads");
    return {
      success: true,
      message: "The lead has been delete successfully",
    };
  } catch (error) {
    console.error("[deleteLead]", error);

    return {
      success: false,
      message: "There was an error deleting the lead.",
    };
  }
}
