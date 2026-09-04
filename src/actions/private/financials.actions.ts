"use server";

import prisma from "@/src/lib/prisma";
import { investmentSchema } from "./schema";
import { Investment } from "@/src/interfaces/investment";
import { ServerResponse } from "@/src/interfaces";
import { revalidatePath } from "next/cache";
import { requireAuth } from "@/src/lib";
import { deleteDirectory } from "@/src/lib/storage/local-storage";

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

    const response = await prisma.vehicleInvestment.findMany();

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
      where: {
        id,
      },
      select: {
        id: true,
      },
    });

    if (!investment) {
      throw new Error("Investment not found.");
    }

    await prisma.vehicleInvestment.delete({
      where: {
        id,
      },
    });

    try {
      await deleteDirectory(`financials/invoices/images/${id}`);
    } catch (error) {
      /*
       * La inversión ya no existe en BD.
       * Un archivo huérfano es preferible a
       * reportar que la eliminación completa falló.
       */
      console.error("Could not delete investment invoice directory:", error);
    }

    revalidatePath("/dashboard/financials");

    return {
      success: true,
      message: "The investment has been delete successfully.",
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "There was an error deleting the investment.",
    };
  }
}
