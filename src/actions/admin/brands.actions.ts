"use server";

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
