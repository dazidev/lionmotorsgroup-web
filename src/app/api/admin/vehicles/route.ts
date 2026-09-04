import { requireAuth } from "@/src/lib";
import prisma from "@/src/lib/prisma";
import {
  createDirectory,
  deleteDirectory,
  moveDirectory,
  saveFile,
} from "@/src/lib/storage/local-storage";
import { VehicleState } from "@/src/interfaces";
import { normalizeToSlug } from "@/src/utils/format";
import { StatusVehicle } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { randomUUID } from "node:crypto";

export const runtime = "nodejs";

const MIN_IMAGES = 5;
const MAX_IMAGES = 15;

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
  let finalDirectory: string | null = null;

  try {
    await requireAuth("admin");

    const formData = await request.formData();

    const vehicleRaw = formData.get("vehicle");

    if (typeof vehicleRaw !== "string") {
      throw new Error("Invalid vehicle data.");
    }

    const data = JSON.parse(vehicleRaw) as VehicleState;

    const specificationsRaw = formData.get("specifications");

    if (typeof specificationsRaw !== "string") {
      throw new Error("Invalid specifications data.");
    }

    const specificationsParsed: unknown = JSON.parse(specificationsRaw);

    if (
      !Array.isArray(specificationsParsed) ||
      !specificationsParsed.every(
        (specification) => typeof specification === "string",
      )
    ) {
      throw new Error("Invalid specifications.");
    }

    const specifications = specificationsParsed as string[];

    const imageEntries = formData.getAll("images");

    const images = imageEntries.filter(
      (entry): entry is File => entry instanceof File,
    );

    if (images.length < MIN_IMAGES) {
      throw new Error(`You need to upload at least ${MIN_IMAGES} images.`);
    }

    if (images.length > MAX_IMAGES) {
      throw new Error(`You can upload a maximum of ${MAX_IMAGES} images.`);
    }

    images.forEach((image, index) => {
      const mime = image.type.toLowerCase();

      if (!ALLOWED_IMAGE_TYPES[mime]) {
        throw new Error(`Incorrect image type, image ${index + 1}.`);
      }

      if (image.size <= 0 || image.size > MAX_BYTES) {
        throw new Error(`Incorrect image size, image ${index + 1}.`);
      }
    });

    const investment = Number(data.investment);

    if (!Number.isFinite(investment)) {
      throw new Error("The investment must be a number.");
    }

    const exists = await prisma.vehicleGeneral.findUnique({
      where: {
        vin: data.vin,
      },
      select: {
        id: true,
      },
    });

    if (exists) {
      throw new Error("The vehicle has already exists! Duplicate VIN.");
    }

    const brand = await prisma.brand.findUnique({
      where: {
        id: data.brand,
      },
    });

    if (!brand) {
      throw new Error("There was an error getting the brand name.");
    }

    const vehicleId = randomUUID();

    const slug = normalizeToSlug(`${brand.name}-${data.model}-${data.year}`);

    const shortId = vehicleId.replace(/-/g, "").slice(0, 10);

    const uploadId = randomUUID();

    tempDirectory = `.tmp/vehicles/${uploadId}`;

    finalDirectory = `catalog/vehicles/images/${vehicleId}`;

    const imageData = images.map((image, index) => {
      const extension = ALLOWED_IMAGE_TYPES[image.type.toLowerCase()];

      const filename = `${Date.now()}-${randomUUID()}.${extension}`;

      return {
        file: image,
        filename,
        key: `${finalDirectory}/${filename}`,
        position: index,
      };
    });

    await createDirectory(tempDirectory);

    for (const image of imageData) {
      const arrayBuffer = await image.file.arrayBuffer();

      await saveFile(
        `${tempDirectory}/${image.filename}`,
        new Uint8Array(arrayBuffer),
      );
    }

    await moveDirectory(tempDirectory, finalDirectory);

    tempDirectory = null;

    try {
      await prisma.$transaction(async (tx) => {
        await tx.vehicleGeneral.create({
          data: {
            id: vehicleId,
            vin: data.vin,
            slug,
            shortId,
            year: Number(data.year),

            brand: {
              connect: {
                id: data.brand,
              },
            },

            model: data.model,
            series: data.series,
            doors: Number(data.doors),
            colorExt: data.colorExt,
            colorInt: data.colorInt,
            mileage: Number(data.mileage),
            price: Number(data.price),

            status: data.status as StatusVehicle,

            type: data.type,
            investment,
          },
        });

        await tx.vehicleTechnical.create({
          data: {
            vehicle: {
              connect: {
                id: vehicleId,
              },
            },

            engineFuelType: data.engineFuelType,

            engineConfiguration: data.engineConfiguration,

            engineCylinders: Number(data.engineCylinders),

            enginePower: Number(data.enginePower),

            engineDisplacement: Number(data.engineDisplacement),

            engineTurbo: data.engineTurbo,

            drivetrain: data.drivetrain,

            transmission: data.transmission,
          },
        });

        if (specifications.length > 0) {
          await tx.vehicleSpecification.createMany({
            data: specifications.map((specificationId) => ({
              vehicleId,
              specificationId,
            })),
          });
        }

        await tx.vehicleImage.createMany({
          data: imageData.map((image) => ({
            vehicleId,
            key: image.key,
            position: image.position,
          })),
        });
      });
    } catch (error) {
      await deleteDirectory(finalDirectory);

      finalDirectory = null;

      throw error;
    }

    revalidatePath("/dashboard/catalog");
    revalidatePath("/catalog");
    revalidatePath("/");

    return NextResponse.json({
      success: true,
      message: "The vehicle has been created successfully!",
      data: {
        vehicleId,
      },
    });
  } catch (error) {
    if (tempDirectory) {
      await deleteDirectory(tempDirectory).catch(() => undefined);
    }

    const message = error instanceof Error ? error.message : "Unknown error.";

    console.error(error);

    if (message === "Unauthorized") {
      return NextResponse.json(
        {
          success: false,
          message,
        },
        {
          status: 401,
        },
      );
    }

    if (message === "Forbidden.") {
      return NextResponse.json(
        {
          success: false,
          message,
        },
        {
          status: 403,
        },
      );
    }

    return NextResponse.json(
      {
        success: false,
        message,
      },
      {
        status: 400,
      },
    );
  }
}
