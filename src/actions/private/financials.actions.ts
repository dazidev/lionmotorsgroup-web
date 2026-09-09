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
      where: { vehicleId: id },
    });

    if (!response)
      throw new Error("There is an error, please try again later.");

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
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    if (!response)
      throw new Error("There is an error, please try again later.");

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
    if (!data.success) throw new Error(data.error.issues[0]?.message);

    const { id, name, description, amount, date } = data.data;

    const response = await prisma.vehicleInvestment.update({
      where: { id },
      data: {
        name,
        description,
        amount,
        date,
      },
    });

    if (!response)
      throw new Error("There is an error, please try again later.");

    return {
      success: true,
      message: "The investment has updated successfully.",
    };
  } catch (error) {
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

    const investment = await prisma.vehicleInvestment.findUnique({
      where: { id },
      select: {
        id: true,
        createdAt: true,
        deletedAt: true,
      },
    });

    if (!investment) {
      throw new Error("Investment not found.");
    }

    if (investment.deletedAt) {
      return {
        success: true,
        message: "Investment already deleted.",
      };
    }

    const ageMs = Date.now() - investment.createdAt.getTime();

    const canHardDelete = ageMs < HARD_DELETE_WINDOW_MS;

    if (canHardDelete) {
      await prisma.vehicleInvestment.delete({
        where: { id },
      });

      try {
        await deleteDirectory(`financials/invoices/images/${id}`);
      } catch (error) {
        console.error(
          `[deleteInvestment] Investment ${id} was deleted from DB but invoice directory could not be deleted.`,
          error,
        );
      }

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
        `[deleteInvestment] Investment ${id} was soft-deleted but invoice directory could not be moved.`,
        error,
      );
    }

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
  } finally {
    revalidatePath("/dashboard/financials");
  }
}
