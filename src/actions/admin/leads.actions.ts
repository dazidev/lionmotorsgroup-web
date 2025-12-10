"use server";
import { ServerResponse } from "@/src/interfaces";
import prisma from "@/src/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getLeads() {
  try {
    const leads = await prisma.lead.findMany();
    if (!leads) return { success: false };

    return {
      success: true,
      data: leads,
    };
  } catch (error) {
    return { success: false };
  }
}

export async function setAttend(id: string) {
  try {
    await prisma.lead.update({
      where: { id },
      data: { status: "attended" },
    });

    revalidatePath("/dashboard/leads");
    return {
      success: true,
      message: "The status has been updated.",
    };
  } catch (error) {
    return {
      success: false,
      message: "An error occurred while changing the status.",
    };
  }
}

export async function deleteLead(id: string): Promise<ServerResponse> {
  //! todo: makes validations!!!!!
  try {
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
