"use server";

import Image from "next/image";
import { redirect } from "next/navigation";
import { VehicleCard } from "@/src/components";
import { Grid } from "../../../components";
import prisma from "@/src/lib/prisma";

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
    <>
      <Grid>
        {vehicles &&
          vehicles.map((veh) => (
            <VehicleCard
              key={veh.id}
              brand={veh.brand.name}
              model={veh.model}
              year={veh.year}
              miles={veh.mileage}
              price={veh.price}
              image={veh.images[0].key}
              link={`${veh.slug}-${veh.shortId}`}
            />
          ))}
      </Grid>
    </>
  );
}
