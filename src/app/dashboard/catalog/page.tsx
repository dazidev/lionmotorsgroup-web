"use server";
import { getVehicles } from "@/src/actions";
import { CatalogTable } from "@/src/components";
import Image from "next/image";

export default async function Home() {
  const listHeaders = ["Model", "Brand", "Year", "Status", "Price", "Actions"];

  const responseVehicles = await getVehicles();
  const { data } = responseVehicles;

  return (
    <div className="flex flex-col items-center justify-between min-h-[calc(100vh-8.25rem)] w-[90%]">
      <div className="m-8 w-full">
        <CatalogTable name={"Vehicles"} headers={listHeaders} data={data} />
      </div>
      <div className="mb-5">
        <Image
          src="/logo-sin-fondo-letras.png"
          alt="Logo"
          width={300}
          height={300}
        />
      </div>
    </div>
  );
}
