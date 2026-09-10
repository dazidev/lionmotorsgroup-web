"use server";

import { FormLead, ServerResponse } from "@/src/interfaces";
import prisma from "@/src/lib/prisma";

export async function saveLead(form: FormLead): Promise<ServerResponse<any>> {
  const {
    name,
    lastname,
    email,
    zipcode,
    phoneNumber,
    comments,
    vehicleId,
    type,
  } = form;

  try {
    if (type === "vehicle") {
      if (!vehicleId) {
        throw new Error("Vehicle is required.");
      }

      const vehicle = await prisma.vehicleGeneral.findFirst({
        where: {
          id: vehicleId,
          deletedAt: null,
        },
        select: {
          id: true,
        },
      });

      if (!vehicle) {
        throw new Error("Vehicle is no longer available.");
      }
    }

    await prisma.lead.create({
      data: {
        name,
        lastname,
        email,
        zipcode,
        phoneNumber,
        comments,
        vehicleId: type === "vehicle" ? vehicleId : null,
        type,
      },
    });

    return {
      success: true,
      message:
        "Your information has been sent successfully. We'll reach out to you as soon as possible. Thank you for your interest!",
    };
  } catch (error) {
    console.error("[saveLead]", error);

    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "An error occurred while processing your request. Please try again later.",
    };
  }
}
