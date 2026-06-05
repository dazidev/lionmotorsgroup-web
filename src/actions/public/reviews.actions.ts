import { ServerResponse } from "@/src/interfaces";
import prisma from "@/src/lib/prisma";
import { Reviews } from "@prisma/client";

export async function getReviews(): Promise<ServerResponse<Reviews[]>> {
  try {
    const reviews = await prisma.reviews.findMany();

    return {
      success: true,
      data: reviews,
    };
  } catch (error) {
    return {
      success: false,
      message:
        "An error occurred while processing your request. Please try again later.",
    };
  }
}
