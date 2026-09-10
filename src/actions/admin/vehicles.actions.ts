"use server";

import {
  ServerResponse,
  Vehicle,
  VpicDecodeVinValuesResponse,
} from "@/src/interfaces";
import { requireAuth } from "@/src/lib";
import prisma from "@/src/lib/prisma";
import { revalidatePath } from "next/cache";
import {
  deleteDirectory,
  moveDirectoryIfExists,
} from "@/src/lib/storage/local-storage";
import { lockVehicleRow } from "@/src/lib/database/vehicle-lock";

const HARD_DELETE_WINDOW_MS = 24 * 60 * 60 * 1000;

export async function getVehicleSlug(
  id: string,
): Promise<ServerResponse<{ slug: string }>> {
  try {
    await requireAuth("admin");

    const vehicle = await prisma.vehicleGeneral.findFirst({
      where: {
        id,
        deletedAt: null,
      },
      select: {
        slug: true,
        shortId: true,
      },
    });

    if (!vehicle) {
      throw new Error("Vehicle doesn't exists.");
    }

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
      where: {
        deletedAt: null,
      },
      take: amount,
      include: {
        brand: true,
        technical: true,
        specifications: {
          where: {
            deletedAt: null,
          },
          include: {
            specification: true,
          },
        },
        images: {
          where: {
            deletedAt: null,
          },
          orderBy: {
            position: "asc",
          },
        },
      },
    });

    return {
      success: true,
      data: vehicles,
    };
  } catch (error) {
    console.error("[getVehicles]", error);

    return {
      success: false,
    };
  }
}

export async function getBasicVehicles() {
  try {
    await requireAuth("admin");

    const vehicles = await prisma.vehicleGeneral.findMany({
      where: {
        deletedAt: null,
      },
      select: {
        id: true,
        vin: true,
        year: true,
        model: true,
        brand: true,
        status: true,
        price: true,
        investment: true,
        investments: {
          where: {
            deletedAt: null,
          },
        },
        createdAt: true,
        updatedAt: true,
      },
    });

    return {
      success: true,
      data: vehicles,
    };
  } catch (error) {
    console.error("[getBasicVehicles]", error);

    return {
      success: false,
    };
  }
}

export async function deleteVehicle(id: string): Promise<ServerResponse<any>> {
  try {
    await requireAuth("admin");

    const deletion = await prisma.$transaction(async (tx) => {
      const locked = await lockVehicleRow(tx, id);

      if (!locked) {
        throw new Error("Vehicle not found.");
      }

      const vehicle = await tx.vehicleGeneral.findUnique({
        where: { id },
        select: {
          id: true,
          createdAt: true,
          deletedAt: true,
          investments: {
            select: {
              id: true,
            },
          },
        },
      });

      if (!vehicle) {
        throw new Error("Vehicle not found.");
      }

      if (vehicle.deletedAt) {
        return {
          type: "alreadyDeleted" as const,
          investmentIds: [] as string[],
        };
      }

      const investmentIds = vehicle.investments.map(
        (investment) => investment.id,
      );

      const canHardDelete =
        Date.now() - vehicle.createdAt.getTime() < HARD_DELETE_WINDOW_MS;

      if (canHardDelete) {
        await tx.vehicleGeneral.delete({
          where: { id },
        });

        return {
          type: "hard" as const,
          investmentIds,
        };
      }

      const deletedAt = new Date();

      await tx.vehicleGeneral.update({
        where: { id },
        data: { deletedAt },
      });

      await tx.vehicleTechnical.updateMany({
        where: {
          vehicleId: id,
          deletedAt: null,
        },
        data: { deletedAt },
      });

      await tx.vehicleImage.updateMany({
        where: {
          vehicleId: id,
          deletedAt: null,
        },
        data: { deletedAt },
      });

      await tx.vehicleSpecification.updateMany({
        where: {
          vehicleId: id,
          deletedAt: null,
        },
        data: { deletedAt },
      });

      await tx.vehicleInvestment.updateMany({
        where: {
          vehicleId: id,
          deletedAt: null,
        },
        data: { deletedAt },
      });

      await tx.lead.updateMany({
        where: {
          vehicleId: id,
          deletedAt: null,
        },
        data: { deletedAt },
      });

      return {
        type: "soft" as const,
        investmentIds,
      };
    });

    if (deletion.type === "alreadyDeleted") {
      return {
        success: true,
        message: "The vehicle has already been deleted.",
      };
    }

    if (deletion.type === "hard") {
      const cleanupResults = await Promise.allSettled([
        deleteDirectory(`catalog/vehicles/images/${id}`),
        deleteDirectory(`catalog/vehicles/deleted/${id}`),
        ...deletion.investmentIds.flatMap((investmentId) => [
          deleteDirectory(`financials/invoices/images/${investmentId}`),
          deleteDirectory(`financials/invoices/deleted/${investmentId}`),
        ]),
      ]);

      cleanupResults.forEach((result) => {
        if (result.status === "rejected") {
          console.error(
            `[deleteVehicle] Filesystem cleanup failed for vehicle ${id}:`,
            result.reason,
          );
        }
      });
    }

    if (deletion.type === "soft") {
      const moveResults = await Promise.allSettled([
        moveDirectoryIfExists(
          `catalog/vehicles/images/${id}`,
          `catalog/vehicles/deleted/${id}`,
        ),
        ...deletion.investmentIds.map((investmentId) =>
          moveDirectoryIfExists(
            `financials/invoices/images/${investmentId}`,
            `financials/invoices/deleted/${investmentId}`,
          ),
        ),
      ]);

      moveResults.forEach((result) => {
        if (result.status === "rejected") {
          console.error(
            `[deleteVehicle] Filesystem move failed for vehicle ${id}:`,
            result.reason,
          );
        }
      });
    }

    revalidatePath("/dashboard/catalog");
    revalidatePath("/dashboard/financials");
    revalidatePath("/dashboard/leads");
    revalidatePath("/catalog");
    revalidatePath("/");

    return {
      success: true,
      message:
        deletion.type === "hard"
          ? "The vehicle has been permanently deleted."
          : "The vehicle has been deleted.",
    };
  } catch (error) {
    console.error("[deleteVehicle]", error);

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
