"use server";

import prisma from "@/src/lib/prisma";
import { investmentSchema } from "./schema";
import { Investment } from "@/src/interfaces/investment";
import { DataImage, ServerResponse } from "@/src/interfaces";

import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { deleteByKey, r2 } from "@/src/lib/cloudflare-r2";

const MAX_BYTES = Number(process.env.MAX_UPLOAD_BYTES ?? 5_000_000);
const BUCKET = process.env.R2_BUCKET!;

export async function addInvestment(
  investment: Investment,
  dataImage: DataImage,
): Promise<ServerResponse<any>> {
  try {
    const data = investmentSchema.safeParse(investment);
    if (!data.success) throw new Error(data.error.issues[0]?.message);

    const { id, name, description, amount, date } = data.data;

    const { mime, ext, size } = dataImage;

    //* Image validation
    const allow = ["image/jpeg", "image/png", "image/webp", "image/jpg"];
    if (!allow.includes(mime)) throw "";
    if (!ext || ext.length > 8) throw "";
    if (!size || size > MAX_BYTES) throw "";

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

    if (!response)
      throw new Error("There is an error, please try again later.");

    const key = `financials/invoices/images/${
      response.id
    }/${Date.now()}-${crypto.randomUUID()}.${dataImage.ext}`;

    const cmd = new PutObjectCommand({
      Bucket: BUCKET,
      Key: key,
      ContentType: mime,
      // Opcional: limitar tamaño esperado
      // ContentLength: size,
    });

    const url = await getSignedUrl(r2, cmd, { expiresIn: 600 });

    return {
      success: true,
      message: "The investment has created successfully.",
      data: {
        url: url ?? "",
        key: key ?? "",
        investmentId: response.id,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Unknown error.",
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
