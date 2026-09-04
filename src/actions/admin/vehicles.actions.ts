"use server";

import {
  ServerResponse,
  Vehicle,
  VpicDecodeVinValuesResponse,
} from "@/src/interfaces";
import { requireAuth } from "@/src/lib";
import prisma from "@/src/lib/prisma";
import { revalidatePath } from "next/cache";
import { deleteDirectory } from "@/src/lib/storage/local-storage";

export async function getVehicleSlug(
  id: string,
): Promise<ServerResponse<{ slug: string }>> {
  try {
    await requireAuth("admin");

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

export async function getVehicles(
  amount?: number,
): Promise<ServerResponse<Vehicle[]>> {
  try {
    await requireAuth("admin");

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
    await requireAuth("admin");

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
    await requireAuth("admin");

    const vehicle = await prisma.vehicleGeneral.findUnique({
      where: { id },
      select: {
        id: true,
      },
    });

    if (!vehicle) {
      throw new Error("Vehicle not found.");
    }

    await prisma.vehicleGeneral.delete({
      where: { id },
    });

    await deleteDirectory(`catalog/vehicles/images/${id}`);

    revalidatePath("/dashboard/catalog");
    revalidatePath("/catalog");
    revalidatePath("/");

    return {
      success: true,
      message: "The vehicle and its images have been deleted successfully.",
    };
  } catch (error) {
    console.error(error);

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
    await requireAuth("admin");

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
