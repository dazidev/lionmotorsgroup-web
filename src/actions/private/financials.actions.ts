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
    return {
      success: false,
      message: error instanceof Error ? error.message : "Unknown error.",
    };
  }
}

export async function getInvestmentByVehicle(id: string) {
  try {
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
    const data = investmentSchema.safeParse(investment);
    if (!data.success) throw new Error(data.error.issues[0]?.message);

    const { id, name, description, amount, date } = data.data;

    const response = await prisma.vehicleInvestment.update({
      where: { id },
      data: {
        name,
        description,
        amount,
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
