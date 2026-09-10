import { investmentSchema } from "@/src/actions/private/schema";
import { requireAuth } from "@/src/lib";
import prisma from "@/src/lib/prisma";
import {
  createDirectory,
  deleteDirectory,
  moveDirectory,
  saveFile,
} from "@/src/lib/storage/local-storage";
import { randomUUID } from "node:crypto";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { lockVehicleRow } from "@/src/lib/database/vehicle-lock";

export const runtime = "nodejs";

const MAX_BYTES = Number(process.env.MAX_UPLOAD_BYTES ?? 5_000_000);

const ALLOWED_IMAGE_TYPES: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/jpg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/avif": "avif",
};

export async function POST(request: Request) {
  let tempDirectory: string | null = null;
  let investmentDirectory: string | null = null;

  try {
    await requireAuth("admin");

    const formData = await request.formData();
    const investmentEntry = formData.get("investment");
    const imageEntry = formData.get("image");

    if (typeof investmentEntry !== "string") {
      throw new Error("Invalid investment data.");
    }

    const parsedInvestment = JSON.parse(investmentEntry);

    const data = investmentSchema.safeParse({
      ...parsedInvestment,
      date: new Date(parsedInvestment.date),
    });

    if (!data.success) {
      throw new Error(
        data.error.issues[0]?.message ?? "Invalid investment data.",
      );
    }

    if (!(imageEntry instanceof File)) {
      throw new Error("The invoice image is required.");
    }

    const mime = imageEntry.type.toLowerCase();
    const extension = ALLOWED_IMAGE_TYPES[mime];

    if (!extension) {
      throw new Error(
        "Invalid image format. Allowed formats: JPG, PNG, WEBP, AVIF.",
      );
    }

    if (imageEntry.size <= 0 || imageEntry.size > MAX_BYTES) {
      throw new Error("The image is too large.");
    }

    const { id: vehicleId, name, description, amount, date } = data.data;

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
      throw new Error("Vehicle not found or has been deleted.");
    }

    const investmentId = randomUUID();
    const uploadId = randomUUID();

    tempDirectory = `.tmp/investments/${uploadId}`;
    investmentDirectory = `financials/invoices/images/${investmentId}`;

    const filename = `${Date.now()}-${randomUUID()}.${extension}`;

    const tempKey = `${tempDirectory}/${filename}`;
    const finalKey = `${investmentDirectory}/${filename}`;

    const arrayBuffer = await imageEntry.arrayBuffer();

    await createDirectory(tempDirectory);

    await saveFile(tempKey, new Uint8Array(arrayBuffer));

    await moveDirectory(tempDirectory, investmentDirectory);

    tempDirectory = null;

    try {
      const investment = await prisma.$transaction(async (tx) => {
        const locked = await lockVehicleRow(tx, vehicleId);

        if (!locked) {
          throw new Error("Vehicle not found.");
        }

        const activeVehicle = await tx.vehicleGeneral.findFirst({
          where: {
            id: vehicleId,
            deletedAt: null,
          },
          select: {
            id: true,
          },
        });

        if (!activeVehicle) {
          throw new Error("Vehicle not found or has been deleted.");
        }

        return tx.vehicleInvestment.create({
          data: {
            id: investmentId,
            vehicleId,
            name,
            description,
            amount,
            date,
            invoiceKey: finalKey,
          },
        });
      });

      revalidatePath("/dashboard/financials");

      return NextResponse.json({
        success: true,
        message: "The investment has been created successfully.",
        data: investment,
      });
    } catch (error) {
      await deleteDirectory(investmentDirectory);
      investmentDirectory = null;

      throw error;
    }
  } catch (error) {
    if (tempDirectory) {
      await deleteDirectory(tempDirectory).catch(() => undefined);
    }

    if (investmentDirectory) {
      await deleteDirectory(investmentDirectory).catch(() => undefined);
    }

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "There was an error creating the investment.",
      },
      {
        status: 400,
      },
    );
  }
}
