"use server";

import { FormLead, ServerResponse } from "@/src/interfaces";
import { lockVehicleRow } from "@/src/lib/database/vehicle-lock";
import prisma from "@/src/lib/prisma";
import { getSchemaErrorMessage, leadSchema } from "@/src/schemas";

export async function saveLead(form: FormLead): Promise<ServerResponse<any>> {
  const result = leadSchema.safeParse(form);

  if (!result.success) {
    return {
      success: false,
      message: getSchemaErrorMessage(result.error, "lead", "backend"),
    };
  }

  const { name, lastname, email, zipcode, phoneNumber, comments, type } =
    result.data;

  try {
    if (type === "vehicle") {
      const vehicleId = result.data.vehicleId;

      if (!vehicleId) {
        throw new Error("Vehicle is required.");
      }

      await prisma.$transaction(async (tx) => {
        const locked = await lockVehicleRow(tx, vehicleId);

        if (!locked) {
          throw new Error("Vehicle is no longer available.");
        }

        const vehicle = await tx.vehicleGeneral.findFirst({
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

        await tx.lead.create({
          data: {
            name,
            lastname,
            email,
            zipcode,
            phoneNumber,
            comments,
            vehicleId,
            type,
          },
        });
      });
    } else {
      await prisma.lead.create({
        data: {
          name,
          lastname,
          email,
          zipcode,
          phoneNumber,
          comments,
          vehicleId: null,
          type,
        },
      });
    }

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
