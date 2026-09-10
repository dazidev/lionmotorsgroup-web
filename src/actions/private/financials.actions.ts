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
import { lockVehicleRow } from "@/src/lib/database/vehicle-lock";

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

    const target = await prisma.vehicleInvestment.findUnique({
      where: { id },
      select: {
        vehicleId: true,
      },
    });

    if (!target) {
      throw new Error("Investment not found.");
    }

    await prisma.$transaction(async (tx) => {
      const locked = await lockVehicleRow(tx, target.vehicleId);

      if (!locked) {
        throw new Error("Vehicle not found.");
      }

      const currentInvestment = await tx.vehicleInvestment.findFirst({
        where: {
          id,
          vehicleId: target.vehicleId,
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

      await tx.vehicleInvestment.update({
        where: { id },
        data: {
          name,
          description,
          amount,
          date,
        },
      });
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

    const target = await prisma.vehicleInvestment.findUnique({
      where: { id },
      select: {
        vehicleId: true,
      },
    });

    if (!target) {
      throw new Error("Investment not found.");
    }

    const deletion = await prisma.$transaction(async (tx) => {
      const locked = await lockVehicleRow(tx, target.vehicleId);

      if (!locked) {
        throw new Error("Vehicle not found.");
      }

      const investment = await tx.vehicleInvestment.findFirst({
        where: {
          id,
          vehicleId: target.vehicleId,
          vehicle: {
            is: {
              deletedAt: null,
            },
          },
        },
        select: {
          id: true,
          deletedAt: true,
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

      if (investment.deletedAt) {
        return {
          type: "alreadyDeleted" as const,
        };
      }

      const canHardDelete =
        Date.now() - investment.vehicle.createdAt.getTime() <
        HARD_DELETE_WINDOW_MS;

      if (canHardDelete) {
        await tx.vehicleInvestment.delete({
          where: { id },
        });

        return {
          type: "hard" as const,
        };
      }

      await tx.vehicleInvestment.update({
        where: { id },
        data: {
          deletedAt: new Date(),
        },
      });

      return {
        type: "soft" as const,
      };
    });

    if (deletion.type === "alreadyDeleted") {
      return {
        success: true,
        message: "Investment already deleted.",
      };
    }

    if (deletion.type === "hard") {
      await Promise.allSettled([
        deleteDirectory(`financials/invoices/images/${id}`),
        deleteDirectory(`financials/invoices/deleted/${id}`),
      ]);
    }

    if (deletion.type === "soft") {
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
    }

    revalidatePath("/dashboard/financials");

    return {
      success: true,
      message:
        deletion.type === "hard"
          ? "Investment permanently deleted."
          : "Investment deleted successfully.",
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
