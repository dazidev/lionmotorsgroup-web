"use server";

import {
  CreateVehicleResponse,
  DataImage,
  ServerResponse,
  Vehicle,
  VehicleState,
  VpicDecodeVinValuesResponse,
} from "@/src/interfaces";
import { r2 } from "@/src/lib/cloudflare-r2";
import prisma from "@/src/lib/prisma";
import { normalizeToSlug } from "@/src/utils/format";
import { DeleteObjectsCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { StatusVehicle } from "@prisma/client";
import { revalidatePath } from "next/cache";

const MAX_BYTES = Number(process.env.MAX_UPLOAD_BYTES ?? 5_000_000);
const BUCKET = process.env.R2_BUCKET!;

export async function getVehicleSlug(
  id: string,
): Promise<ServerResponse<{ slug: string }>> {
  try {
    const vehicle = await prisma.vehicleGeneral.findUnique({
      where: { id },
      select: { slug: true, shortId: true },
    });

    if (!vehicle) throw new Error("Vehicle doesn't exists.");

    const slug = `${vehicle.slug}-${vehicle.shortId}`;

    return {
      success: true,
      data: {
        slug,
      },
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "Unknown error.",
    };
  }
}

export async function createVehicle(
  data: VehicleState,
  specifications: string[],
  images: DataImage[],
): Promise<ServerResponse<CreateVehicleResponse>> {
  const allow = [
    "image/jpeg",
    "image/png",
    "image/webp",
    "image/jpg",
    "image/avif",
  ];

  try {
    // todo: make important validations
    const investment = Number(data.investment);
    if (!Number.isFinite(investment))
      throw new Error("The investment must be a number.");

    if (images.length < 5)
      throw new Error("You need to upload at least 5 images.");

    images.forEach((img, index) => {
      if (!allow.includes(img.mime))
        throw new Error(`Incorrect image type, image ${index + 1}.`);
      if (!img.ext || img.ext.length > 8)
        throw new Error(`Incorrect image extension, image ${index + 1}.`);
      if (!img.size || img.size > MAX_BYTES)
        throw new Error(`Incorrect image size, image ${index + 1}.`);
    });

    const exists = await prisma.vehicleGeneral.findUnique({
      where: { vin: data.vin },
    });

    if (exists)
      throw new Error("The vehicle has already exists! Duplicate VIN.");

    const brand = await prisma.brand.findUnique({ where: { id: data.brand } });
    if (!brand) throw new Error("There was an error getting the brand name.");

    const slug = normalizeToSlug(`${brand.name}-${data.model}-${data.year}`);

    const vehicle = await prisma.$transaction(async (tx) => {
      const createdVehicle = await tx.vehicleGeneral.create({
        data: {
          vin: data.vin,
          slug,
          year: Number(data.year),
          brand: { connect: { id: data.brand } },
          model: data.model,
          series: data.series,
          doors: Number(data.doors),
          colorExt: data.colorExt,
          colorInt: data.colorInt,
          mileage: Number(data.mileage),
          price: Number(data.price),
          status: data.status as StatusVehicle,
          type: data.type,
          investment: Number(data.investment),
        },
      });

      const shortId = createdVehicle.id.replace(/-/g, "").slice(0, 10);

      await tx.vehicleGeneral.update({
        where: { id: createdVehicle.id },
        data: { shortId },
      });

      await tx.vehicleTechnical.create({
        data: {
          vehicle: { connect: { id: createdVehicle.id } },
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
          data: specifications.map((s) => ({
            vehicleId: createdVehicle.id,
            specificationId: s,
          })),
        });
      }

      return {
        ...createdVehicle,
        shortId,
      };
    });

    const urls = await Promise.all(
      images.map(async (img) => {
        const key = `catalog/vehicles/images/${
          vehicle.id
        }/${Date.now()}-${crypto.randomUUID()}.${img.ext}`;

        const cmd = new PutObjectCommand({
          Bucket: BUCKET,
          Key: key,
          ContentType: img.mime,
          ContentLength: img.size,
        });

        const url = await getSignedUrl(r2, cmd, { expiresIn: 600 });

        return {
          url,
          key,
        };
      }),
    );
    revalidatePath("/dashboard/catalog");
    revalidatePath("/catalog");
    revalidatePath("/");
    return {
      success: true,
      data: {
        urls: urls ?? [],
        vehicleId: vehicle.id,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

export async function attachVehicleImages(id: string, keys: string[]) {
  try {
    await prisma.vehicleImage.createMany({
      data: keys.map((key, index) => ({
        vehicleId: id,
        key: key,
        position: index,
      })),
    });

    return {
      success: true,
      message: "The vehicle has been created successfully!",
    };
  } catch (error) {
    return {
      success: false,
      message: "There was error attaching the images.",
    };
  }
}

export async function getVehicles(
  amount?: number,
): Promise<ServerResponse<Vehicle[]>> {
  try {
    const vehicles = await prisma.vehicleGeneral.findMany({
      include: {
        brand: true,
        technical: true,
        specifications: {
          include: {
            specification: true,
          },
        },
        images: {
          orderBy: {
            position: "asc",
          },
        },
      },
    });
    if (!vehicles) return { success: false };

    return {
      success: true,
      data: vehicles,
    };
  } catch (error) {
    return { success: false };
  }
}

export async function getBasicVehicles() {
  try {
    const vehicles = await prisma.vehicleGeneral.findMany({
      select: {
        id: true,
        vin: true,
        year: true,
        model: true,
        brand: true,
        status: true,
        price: true,
        investment: true,
        investments: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    if (!vehicles) return { success: false };

    return {
      success: true,
      data: vehicles,
    };
  } catch (error) {
    return { success: false };
  }
}

export async function deleteVehicle(id: string): Promise<ServerResponse<any>> {
  try {
    const vehicle = await prisma.vehicleGeneral.findUnique({
      where: { id },
      include: {
        images: true,
      },
    });

    if (!vehicle) {
      throw new Error("Vehicle not found.");
    }

    const imageKeys = vehicle.images.map((image) => image.key);

    if (imageKeys.length > 0) {
      const command = new DeleteObjectsCommand({
        Bucket: BUCKET,
        Delete: {
          Objects: imageKeys.map((key) => ({
            Key: key,
          })),
          Quiet: true,
        },
      });

      await r2.send(command);
    }

    await prisma.vehicleGeneral.delete({
      where: { id },
    });

    revalidatePath("/dashboard/catalog");
    revalidatePath("/catalog");
    revalidatePath("/");

    return {
      success: true,
      message: "The vehicle and its images have been deleted successfully.",
    };
  } catch (error) {
    console.log(error);

    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "There was an error deleting the vehicle.",
    };
  }
}

export async function getVehiclesDetailsByVin(
  vin: string,
  year: string,
): Promise<ServerResponse<any>> {
  const formatVin = vin.toUpperCase();

  const url = `https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVinValues/${formatVin}?format=json&modelyear=${year}`;

  try {
    const res: VpicDecodeVinValuesResponse = await fetch(url, {
      cache: "no-store",
    })
      .then((response) => response.json())
      .catch();

    const data = res.Results[0];

    const payload = {
      general: {
        vin: vin,
        year: data.ModelYear,
        brand: data.Make,
        model: data.Model,
        series: data.Series || data.Trim,
        doors: data.Doors,
      },
      technical: {
        fuelType: data.FuelTypePrimary,
        engine: {
          configuration: data.EngineConfiguration,
          cylinders: data.EngineCylinders,
          power: data.EngineHP,
          displacement: data.DisplacementL,
          turbo: data.Turbo,
        },
        drivetrain: data.DriveType,
        transmission: data.TransmissionStyle,
      },
    };

    return {
      success: true,
      data: payload,
    };
  } catch (error) {
    return {
      success: false,
    };
  }
}
