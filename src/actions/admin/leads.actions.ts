"use server";
import { ServerResponse } from "@/src/interfaces";
import { requireAuth } from "@/src/lib";
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

    const lead = await prisma.lead.findFirst({
      where: {
        id,
        deletedAt: null,
        OR: [
          {
            vehicleId: null,
          },
          {
            vehicle: {
              is: {
                deletedAt: null,
              },
            },
          },
        ],
      },
      select: {
        id: true,
      },
    });

    if (!lead) {
      throw new Error("Lead not found or has been deleted.");
    }

    await prisma.lead.update({
      where: {
        id,
      },
      data: {
        status: "attended",
      },
    });

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
  //! todo: makes validations!!!!!
  try {
    await requireAuth("admin");

    await prisma.lead.delete({ where: { id } });

    revalidatePath("/dashboard/leads");
    return {
      success: true,
      message: "The lead has been delete successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: "There was an error deleting the lead.",
    };
  }
}
