"use server";

import { ServerResponse, VpicDecodeVinValuesResponse } from "@/src/interfaces";
import prisma from "@/src/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getVehicles() {
  try {
    const vehicles = await prisma.vehicle.findMany();
    if (!vehicles) return { success: false };

    return {
      success: true,
      data: vehicles,
    };
  } catch (error) {
    return { success: false };
  }
}

export async function deleteVehicle(id: string): Promise<ServerResponse> {
  //! todo: makes validations!!!!!
  try {
    await prisma.vehicle.delete({ where: { id } });

    revalidatePath("/dashboard/catalog");
    return {
      success: true,
      message: "The vehicle has been delete successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: "There was an error deleting the vehicle.",
    };
  }
}

export async function getVehiclesDetailsByVin(
  vin: string,
  year: string
): Promise<ServerResponse> {
  const formatVin = vin.toUpperCase();

  const url = `https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVinValues/${formatVin}?format=json&modelyear=${year}`;

  try {
    const res: VpicDecodeVinValuesResponse = await fetch(url, {
      cache: "no-store",
    })
      .then((response) => response.json())
      .catch();

    const data = res.Results[0];

    console.log(data);

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

    console.log(payload);

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
