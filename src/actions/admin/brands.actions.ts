"use server";

import { ServerResponse } from "@/src/interfaces";
import prisma from "@/src/lib/prisma";

export async function getBrands() {
  try {
    const brands = await prisma.brand.findMany();
    if (!brands) return { success: false };

    return {
      success: true,
      data: brands,
    };
  } catch (error) {
    return { success: false };
  }
}

export async function addBrand(name: string): Promise<ServerResponse> {
  //! todo: makes validations!!!!!

  try {
    await prisma.brand.create({
      data: {
        name,
        imagePath: "",
      },
    });

    return {
      success: true,
      message: "The brand has been create successfully.",
    };
  } catch (error) {
    return {
      success: false,
      message: "There was an error creating the brand.",
    };
  }
}

export async function deleteBrand(id: string): Promise<ServerResponse> {
  //! todo: makes validations!!!!!
  try {
    await prisma.brand.delete({ where: { id } });

    return {
      success: true,
      message: "The brand has been delete successfully.",
    };
  } catch (error) {
    return {
      success: false,
      message: "There was an error deleting the brand.",
    };
  }
}
