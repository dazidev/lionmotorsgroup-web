import Image from "next/image";
import { redirect } from "next/navigation";
import { VehicleCard } from "@/src/components";
import { Grid } from "../../../components";

export default function CatalogPage() {
  return (
    <>
      <Grid>
        <VehicleCard />
        <VehicleCard />
        <VehicleCard />
        <VehicleCard />
        <VehicleCard />
        <VehicleCard />
        <VehicleCard />
        <VehicleCard />
        <VehicleCard />
        <VehicleCard />
        <VehicleCard />
        <VehicleCard />
        <VehicleCard />
        <VehicleCard />
        <VehicleCard />
      </Grid>
    </>
  );
}
