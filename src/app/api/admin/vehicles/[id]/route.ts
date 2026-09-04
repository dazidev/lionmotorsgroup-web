import { VehicleState } from "@/src/interfaces";
import { requireAuth } from "@/src/lib";
import prisma from "@/src/lib/prisma";
import { deleteFile, saveFile } from "@/src/lib/storage/local-storage";
import { normalizeToSlug } from "@/src/utils/format";
import { StatusVehicle } from "@prisma/client";
import { randomUUID } from "node:crypto";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

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

type ImageManifestItem = {
  id: string | null;
  position: number;
  fileField: string | null;
};

export async function PATCH(
  request: Request,
  context: {
    params: Promise<{
      id: string;
    }>;
  },
) {
  const newKeys: string[] = [];

  try {
    await requireAuth("admin");

    const { id } = await context.params;
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

    const manifestRaw = formData.get("imageManifest");

    if (typeof manifestRaw !== "string") {
      throw new Error("Invalid image manifest.");
    }

    const parsedManifest: unknown = JSON.parse(manifestRaw);

    if (!Array.isArray(parsedManifest)) {
      throw new Error("Invalid image manifest.");
    }

    const manifest = parsedManifest as ImageManifestItem[];

    if (manifest.length < MIN_IMAGES) {
      throw new Error(`The vehicle must have at least ${MIN_IMAGES} images.`);
    }

    if (manifest.length > MAX_IMAGES) {
      throw new Error(
        `The vehicle can have a maximum of ${MAX_IMAGES} images.`,
      );
    }

    const normalizedManifest = [...manifest]
      .sort((a, b) => Number(a.position) - Number(b.position))
      .map((image, index) => ({
        ...image,
        position: index,
      }));

    const currentVehicle = await prisma.vehicleGeneral.findUnique({
      where: {
        id,
      },
      include: {
        images: true,
      },
    });

    if (!currentVehicle) {
      throw new Error("Vehicle not found.");
    }

    const duplicatedVin = await prisma.vehicleGeneral.findFirst({
      where: {
        vin: data.vin,
        NOT: {
          id,
        },
      },
      select: {
        id: true,
      },
    });

    if (duplicatedVin) {
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

    const investment = Number(data.investment);

    if (!Number.isFinite(investment)) {
      throw new Error("The investment must be a number.");
    }

    const existingImages = new Map(
      currentVehicle.images.map((image) => [image.id, image]),
    );

    const receivedExistingIds = new Set<string>();

    for (const item of normalizedManifest) {
      if (item.id) {
        if (receivedExistingIds.has(item.id)) {
          throw new Error("Duplicated image in image manifest.");
        }

        receivedExistingIds.add(item.id);

        if (!existingImages.has(item.id)) {
          throw new Error("Invalid vehicle image.");
        }
      }

      if (!item.id && !item.fileField) {
        throw new Error("Invalid new image.");
      }
    }

    const uploadedFiles = new Map<string, File>();

    for (const item of normalizedManifest) {
      if (!item.fileField) continue;

      const entry = formData.get(item.fileField);

      if (!(entry instanceof File)) {
        throw new Error("Image file is missing.");
      }

      const mime = entry.type.toLowerCase();

      if (!ALLOWED_IMAGE_TYPES[mime]) {
        throw new Error("Incorrect image type.");
      }

      if (entry.size <= 0 || entry.size > MAX_BYTES) {
        throw new Error("Incorrect image size.");
      }

      uploadedFiles.set(item.fileField, entry);
    }

    const resolvedManifest: Array<
      ImageManifestItem & {
        newKey?: string;
      }
    > = [];

    for (const item of normalizedManifest) {
      if (!item.fileField) {
        resolvedManifest.push(item);
        continue;
      }

      const file = uploadedFiles.get(item.fileField);

      if (!file) {
        throw new Error("Image file not found.");
      }

      const extension = ALLOWED_IMAGE_TYPES[file.type.toLowerCase()];

      const filename = `${Date.now()}-${randomUUID()}.${extension}`;

      const key = `catalog/vehicles/images/${id}/${filename}`;

      const arrayBuffer = await file.arrayBuffer();

      await saveFile(key, new Uint8Array(arrayBuffer));

      newKeys.push(key);

      resolvedManifest.push({
        ...item,
        newKey: key,
      });
    }

    const preservedIds = new Set(
      resolvedManifest
        .filter((image) => image.id)
        .map((image) => image.id as string),
    );

    const removedImages = currentVehicle.images.filter(
      (image) => !preservedIds.has(image.id),
    );

    const replacedOldKeys = resolvedManifest
      .filter(
        (
          image,
        ): image is typeof image & {
          id: string;
          newKey: string;
        } => Boolean(image.id) && Boolean(image.newKey),
      )
      .map((image) => {
        return existingImages.get(image.id)!.key;
      });

    const slug = normalizeToSlug(`${brand.name}-${data.model}-${data.year}`);

    try {
      await prisma.$transaction(async (tx) => {
        await tx.vehicleGeneral.update({
          where: {
            id,
          },
          data: {
            vin: data.vin,
            slug,
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

        await tx.vehicleTechnical.upsert({
          where: {
            vehicleId: id,
          },

          update: {
            engineFuelType: data.engineFuelType,

            engineConfiguration: data.engineConfiguration,

            engineCylinders: Number(data.engineCylinders),

            enginePower: Number(data.enginePower),

            engineDisplacement: Number(data.engineDisplacement),

            engineTurbo: data.engineTurbo,

            drivetrain: data.drivetrain,

            transmission: data.transmission,
          },

          create: {
            vehicleId: id,

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

        await tx.vehicleSpecification.deleteMany({
          where: {
            vehicleId: id,
          },
        });

        if (specifications.length > 0) {
          await tx.vehicleSpecification.createMany({
            data: specifications.map((specificationId) => ({
              vehicleId: id,
              specificationId,
            })),
          });
        }

        if (removedImages.length > 0) {
          await tx.vehicleImage.deleteMany({
            where: {
              vehicleId: id,
              id: {
                in: removedImages.map((image) => image.id),
              },
            },
          });
        }

        for (const image of resolvedManifest) {
          if (!image.id) continue;

          await tx.vehicleImage.update({
            where: {
              id: image.id,
            },
            data: {
              position: image.position,

              ...(image.newKey
                ? {
                    key: image.newKey,
                  }
                : {}),
            },
          });
        }

        const imagesToCreate = resolvedManifest.filter(
          (
            image,
          ): image is typeof image & {
            newKey: string;
          } => !image.id && Boolean(image.newKey),
        );

        if (imagesToCreate.length > 0) {
          await tx.vehicleImage.createMany({
            data: imagesToCreate.map((image) => ({
              vehicleId: id,
              key: image.newKey,
              position: image.position,
            })),
          });
        }
      });
    } catch (error) {
      await Promise.allSettled(newKeys.map((key) => deleteFile(key)));

      throw error;
    }

    const obsoleteKeys = [
      ...removedImages.map((image) => image.key),
      ...replacedOldKeys,
    ];

    const deletionResults = await Promise.allSettled(
      obsoleteKeys.map((key) => deleteFile(key)),
    );

    deletionResults.forEach((result) => {
      if (result.status === "rejected") {
        console.error(
          "Could not delete obsolete vehicle image:",
          result.reason,
        );
      }
    });

    revalidatePath("/dashboard/catalog");

    revalidatePath("/catalog");
    revalidatePath("/");

    return NextResponse.json({
      success: true,
      message: "The vehicle has been updated successfully!",
    });
  } catch (error) {
    await Promise.allSettled(newKeys.map((key) => deleteFile(key)));

    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : "Unknown error.",
      },
      {
        status: 400,
      },
    );
  }
}
