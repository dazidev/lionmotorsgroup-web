"use server";
import { ServerResponse } from "@/src/interfaces";
import prisma from "@/src/lib/prisma";

type Specification = "security" | "confort";

export async function addSpecification(
  name: string,
  type: Specification
): Promise<ServerResponse> {
  //! todo: makes validations!!!!!

  try {
    await prisma.specification.create({
      data: {
        type,
        name,
      },
    });

    return { success: true };
  } catch (error) {
    return { success: false };
  }
}

export async function getSpecifications(
  type: Specification
): Promise<ServerResponse> {
  try {
    const specifications = await prisma.specification.findMany({
      where: { type },
    });

    return {
      success: true,
      data: specifications,
    };
  } catch (error) {
    return {
      success: false,
    };
  }
}
