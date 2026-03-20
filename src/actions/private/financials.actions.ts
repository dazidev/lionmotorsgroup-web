"use server";

import prisma from "@/src/lib/prisma";
import { investmentSchema } from "./schema";
import { Investment } from "@/src/interfaces/investment";

export async function addInvestment(investment: Investment) {
  try {
    const data = investmentSchema.safeParse(investment);
    if (!data.success) throw new Error(data.error.issues[0]?.message);

    const { id, name, description, amount, date } = data.data;

    const response = await prisma.vehicleInvestment.create({
      data: {
        vehicleId: id,
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
      message: "The investment has created successfully.",
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Unknown error.",
    };
  }
}
