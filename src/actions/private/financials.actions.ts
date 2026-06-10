"use server";

import prisma from "@/src/lib/prisma";
import { investmentSchema } from "./schema";
import { Investment } from "@/src/interfaces/investment";
import { DataImage, ServerResponse } from "@/src/interfaces";

import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { deleteByKey, r2 } from "@/src/lib/cloudflare-r2";
import { revalidatePath } from "next/cache";

const MAX_BYTES = Number(process.env.MAX_UPLOAD_BYTES ?? 5_000_000);
const BUCKET = process.env.R2_BUCKET!;

export async function addInvestment(
  investment: Investment,
  dataImage: DataImage,
): Promise<ServerResponse<any>> {
  try {
    const data = investmentSchema.safeParse(investment);

    if (!data.success) {
      throw new Error(
        data.error.issues[0]?.message ?? "Invalid investment data.",
      );
    }

    const { id, name, description, amount, date } = data.data;
    const { mime, ext, size } = dataImage;

    const allow = [
      "image/jpeg",
      "image/png",
      "image/webp",
      "image/jpg",
      "image/avif",
    ];

    if (!allow.includes(mime)) {
      throw new Error(
        "Invalid image format. Allowed formats: JPG, PNG, WEBP, AVIF.",
      );
    }

    if (!ext || ext.length > 8) {
      throw new Error("Invalid file extension.");
    }

    if (!size || size > MAX_BYTES) {
      throw new Error("The image is too large.");
    }

    const response = await prisma.vehicleInvestment.create({
      data: {
        vehicleId: id,
        name,
        description,
        amount,
        date,
        invoiceKey: "",
      },
    });

    if (!response) {
      throw new Error("There is an error, please try again later.");
    }

    const key = `financials/invoices/images/${
      response.id
    }/${Date.now()}-${crypto.randomUUID()}.${ext}`;

    const cmd = new PutObjectCommand({
      Bucket: BUCKET,
      Key: key,
      ContentType: mime,
    });

    const url = await getSignedUrl(r2, cmd, { expiresIn: 600 });

    revalidatePath("/dashboard/financials");

    return {
      success: true,
      message: "The investment has been created successfully.",
      data: {
        url,
        key,
        investmentId: response.id,
      },
    };
  } catch (error) {
    console.log("Error addInvestment:", error);

    return {
      success: false,
      message: error instanceof Error ? error.message : String(error),
    };
  }
}

export async function attachInvestmentInvoice(
  id: string,
  key: string,
): Promise<ServerResponse<any>> {
  try {
    await prisma.vehicleInvestment.update({
      where: { id },
      data: { invoiceKey: key },
    });
    return { success: true };
  } catch (error) {
    return { success: false };
  }
}

export async function getInvestmentByVehicle(id: string) {
  try {
    const response = await prisma.vehicleInvestment.findMany({
      where: { vehicleId: id },
    });

    if (!response)
      throw new Error("There is an error, please try again later.");

    return {
      success: true,
      data: response,
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "Unknown error.",
    };
  }
}

export async function getInvestments() {
  try {
    const response = await prisma.vehicleInvestment.findMany();

    if (!response)
      throw new Error("There is an error, please try again later.");

    return {
      success: true,
      data: response,
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "Unknown error.",
    };
  }
}

export async function updateInvestmentById(investment: Investment) {
  try {
    const data = investmentSchema.safeParse(investment);
    if (!data.success) throw new Error(data.error.issues[0]?.message);

    const { id, name, description, amount, date } = data.data;

    const response = await prisma.vehicleInvestment.update({
      where: { id },
      data: {
        name,
        description,
        amount,
        date,
      },
    });

    if (!response)
      throw new Error("There is an error, please try again later.");

    return {
      success: true,
      message: "The investment has updated successfully.",
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "Unknown error.",
    };
  }
}

export async function deleteInvestment(
  id: string,
): Promise<ServerResponse<any>> {
  //! todo: makes validations!!!!!
  try {
    const investment = await prisma.vehicleInvestment.delete({
      where: { id },
      select: { invoiceKey: true },
    });

    await deleteByKey(BUCKET, investment.invoiceKey);
    revalidatePath("/dashboard/financials");
    return {
      success: true,
      message: "The investment has been delete successfully.",
    };
  } catch (error) {
    return {
      success: false,
      message: "There was an error deleting the investment.",
    };
  }
}
