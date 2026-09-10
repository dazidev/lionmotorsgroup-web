"use server";

import prisma from "@/src/lib/prisma";
import { investmentSchema } from "./schema";
import { Investment } from "@/src/interfaces/investment";
import { ServerResponse } from "@/src/interfaces";
import { revalidatePath } from "next/cache";
import { requireAuth } from "@/src/lib";
import {
  deleteDirectory,
  moveDirectoryIfExists,
} from "@/src/lib/storage/local-storage";

const HARD_DELETE_WINDOW_MS = 24 * 60 * 60 * 1000;

export async function getInvestmentByVehicle(id: string) {
  try {
    await requireAuth("admin");

    const response = await prisma.vehicleInvestment.findMany({
      where: {
        vehicleId: id,
        deletedAt: null,
        vehicle: {
          is: {
            deletedAt: null,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return {
      success: true,
      data: response,
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "Unknown error.",
    };
  }
}

export async function getInvestments() {
  try {
    await requireAuth("admin");

    const response = await prisma.vehicleInvestment.findMany({
      where: {
        deletedAt: null,
        vehicle: {
          is: {
            deletedAt: null,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return {
      success: true,
      data: response,
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "Unknown error.",
    };
  }
}

export async function updateInvestmentById(investment: Investment) {
  try {
    await requireAuth("admin");

    const data = investmentSchema.safeParse(investment);

    if (!data.success) {
      throw new Error(data.error.issues[0]?.message);
    }

    const { id, name, description, amount, date } = data.data;

    const currentInvestment = await prisma.vehicleInvestment.findFirst({
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

    if (!currentInvestment) {
      throw new Error("Investment not found or has been deleted.");
    }

    await prisma.vehicleInvestment.update({
      where: {
        id,
      },
      data: {
        name,
        description,
        amount,
        date,
      },
    });

    revalidatePath("/dashboard/financials");

    return {
      success: true,
      message: "The investment has updated successfully.",
    };
  } catch (error) {
    console.error("[updateInvestmentById]", error);

    return {
      success: false,
      message: error instanceof Error ? error.message : "Unknown error.",
    };
  }
}

export async function deleteInvestment(
  id: string,
): Promise<ServerResponse<any>> {
  try {
    await requireAuth("admin");

    const investment = await prisma.vehicleInvestment.findFirst({
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
        vehicle: {
          select: {
            createdAt: true,
          },
        },
      },
    });

    if (!investment) {
      throw new Error("Investment not found.");
    }

    const canHardDelete =
      Date.now() - investment.vehicle.createdAt.getTime() <
      HARD_DELETE_WINDOW_MS;

    if (canHardDelete) {
      await prisma.vehicleInvestment.delete({
        where: { id },
      });

      const cleanupResults = await Promise.allSettled([
        deleteDirectory(`financials/invoices/images/${id}`),
        deleteDirectory(`financials/invoices/deleted/${id}`),
      ]);

      cleanupResults.forEach((result) => {
        if (result.status === "rejected") {
          console.error(
            `[deleteInvestment] Filesystem cleanup failed for investment ${id}:`,
            result.reason,
          );
        }
      });

      revalidatePath("/dashboard/financials");

      return {
        success: true,
        message: "Investment permanently deleted.",
      };
    }

    await prisma.vehicleInvestment.update({
      where: { id },
      data: {
        deletedAt: new Date(),
      },
    });

    try {
      await moveDirectoryIfExists(
        `financials/invoices/images/${id}`,
        `financials/invoices/deleted/${id}`,
      );
    } catch (error) {
      console.error(
        `[deleteInvestment] Filesystem move failed for investment ${id}:`,
        error,
      );
    }

    revalidatePath("/dashboard/financials");

    return {
      success: true,
      message: "Investment deleted successfully.",
    };
  } catch (error) {
    console.error("[deleteInvestment]", error);

    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "There was an error deleting the investment.",
    };
  }
}
