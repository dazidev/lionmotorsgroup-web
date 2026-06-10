export const dynamic = "force-dynamic";

import prisma from "@/src/lib/prisma";

import { VehicleCatalog } from "@/src/components/public/catalog/VehicleCatalog";
import { Suspense } from "react";
import { Footer } from "@/src/components";

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
      colorExt: true,
      technical: {
        select: {
          drivetrain: true,
          transmission: true,
          engineFuelType: true,
        },
      },
      images: {
        where: { position: 0 },
        take: 1,
      },
    },
    where: {
      status: "on_sale",
    },
  });

  return (
    <div className="flex flex-col h-full justify-between pt-20">
      <div className="flex w-full justify-center">
        <div className="flex flex-col items-start w-full mb-10 sm:w-[1350px]">
          <Suspense fallback={<div></div>}>
            <VehicleCatalog vehicles={vehicles} />
          </Suspense>
        </div>
      </div>

      <Footer />
    </div>
  );
}
