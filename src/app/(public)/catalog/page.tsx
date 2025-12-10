import Image from "next/image";
import { redirect } from "next/navigation";
import { VehicleCard } from "@/src/components";

export default function CatalogPage() {
  return (
    <>
      <section className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-5 my-10">
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
      </section>
    </>
  );
}
