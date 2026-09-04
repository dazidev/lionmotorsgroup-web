import { requireAuth } from "@/src/lib";
import prisma from "@/src/lib/prisma";
import { deleteDirectory, saveFile } from "@/src/lib/storage/local-storage";
import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";

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
  let brandDirectory: string | null = null;

  try {
    await requireAuth("admin");

    const formData = await request.formData();

    const nameEntry = formData.get("name");
    const imageEntry = formData.get("image");

    if (typeof nameEntry !== "string") {
      throw new Error("Invalid brand name.");
    }

    const name = nameEntry.trim();

    if (!name) {
      throw new Error("The brand name is required.");
    }

    if (!(imageEntry instanceof File)) {
      throw new Error("The brand image is required.");
    }

    const mime = imageEntry.type.toLowerCase();

    const extension = ALLOWED_IMAGE_TYPES[mime];

    if (!extension) {
      throw new Error("Invalid image type.");
    }

    if (imageEntry.size <= 0 || imageEntry.size > MAX_BYTES) {
      throw new Error("Invalid image size.");
    }

    const brandId = randomUUID();

    brandDirectory = `catalog/brands/images/${brandId}`;

    const filename = `${Date.now()}-${randomUUID()}.${extension}`;

    const key = `${brandDirectory}/${filename}`;

    const arrayBuffer = await imageEntry.arrayBuffer();

    await saveFile(key, new Uint8Array(arrayBuffer));

    try {
      const brand = await prisma.brand.create({
        data: {
          id: brandId,
          name,
          imagePath: key,
        },
      });

      return NextResponse.json({
        success: true,
        message: "The brand has been created successfully.",
        data: brand,
      });
    } catch (error) {
      await deleteDirectory(brandDirectory);

      brandDirectory = null;

      throw error;
    }
  } catch (error) {
    if (brandDirectory) {
      await deleteDirectory(brandDirectory).catch(() => undefined);
    }

    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "There was an error creating the brand.",
      },
      {
        status: 400,
      },
    );
  }
}
