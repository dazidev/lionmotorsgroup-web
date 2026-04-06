"use server";

import prisma from "@/src/lib/prisma";

import { VehicleCatalog } from "@/src/components/public/catalog/VehicleCatalog";

export default async function CatalogPage() {
  const vehicles = await prisma.vehicleGeneral.findMany({
    select: {
      id: true,
      brand: {
        select: {
          name: true,
        },
      },
      slug: true,
      shortId: true,
      model: true,
      year: true,
      mileage: true,
      price: true,
      images: {
        where: { position: 0 },
        take: 1,
      },
    },
  });

  return (
    <div className="flex justify-center pt-20">
      <div className="flex flex-col items-start w-full sm:w-[1350px]">
        <VehicleCatalog vehicles={vehicles} />
      </div>
    </div>
  );
}
