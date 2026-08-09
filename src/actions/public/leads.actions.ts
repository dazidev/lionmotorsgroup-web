"use server";
import { FormLead, ServerResponse } from "@/src/interfaces";
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
    await prisma.lead.create({
      data: {
        name,
        lastname,
        email,
        zipcode,
        phoneNumber,
        comments,
        vehicleId: type === "vehicle" ? result.data.vehicleId : null,
        type,
      },
    });

    return {
      success: true,
      message:
        "Your information has been sent successfully. We'll reach out to you as soon as possible. Thank you for your interest!",
    };
  } catch (error) {
    return {
      success: false,
      message:
        "An error occurred while processing your request. Please try again later.",
    };
  }
}
