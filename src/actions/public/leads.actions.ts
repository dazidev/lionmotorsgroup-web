"use server";
import { FormLead, ServerResponse } from "@/src/interfaces";
import prisma from "@/src/lib/prisma";

export async function saveLead(form: FormLead): Promise<ServerResponse<any>> {
  const { name, lastname, email, zipcode, phoneNumber, comments, vehicleId } =
    form;
  //! todo: makes validations!!!!!

  try {
    await prisma.lead.create({
      data: {
        name,
        lastname,
        email,
        zipcode,
        phoneNumber,
        comments,
        vehicleId,
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
