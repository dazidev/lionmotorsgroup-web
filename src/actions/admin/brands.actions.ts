"use server";

import { ServerResponse } from "@/src/interfaces";
import { requireAuth } from "@/src/lib";
import prisma from "@/src/lib/prisma";
import { deleteDirectory } from "@/src/lib/storage/local-storage";

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

export async function deleteBrand(id: string): Promise<ServerResponse<any>> {
  try {
    await requireAuth("admin");

    await prisma.brand.delete({
      where: {
        id,
      },
    });

    await deleteDirectory(`catalog/brands/images/${id}`);

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
