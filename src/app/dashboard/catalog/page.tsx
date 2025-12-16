"use server";
import { getBrands, getSpecifications, getVehicles } from "@/src/actions";
import { CatalogTable } from "@/src/components";
import { CatalogProvider } from "@/src/context/CatalogProvider";
import Image from "next/image";

export default async function CatalogPage() {
  const listHeaders = ["Model", "Brand", "Year", "Status", "Price", "Actions"];

  const [vehiclesRes, securityRes, confortRes, brandsRes] = await Promise.all([
    getVehicles(),
    getSpecifications("security"),
    getSpecifications("confort"),
    getBrands(),
  ]);

  return (
    <div className="flex flex-col items-center justify-between min-h-[calc(100vh-8.25rem)] w-[90%]">
      <div className="m-8 w-full">
        <CatalogProvider
          securitySpecsData={securityRes.data ?? []}
          confortSpecsData={confortRes.data ?? []}
          brandsData={brandsRes.data ?? []}
        >
          <CatalogTable
            name={"Vehicles"}
            headers={listHeaders}
            data={vehiclesRes.data}
          />
        </CatalogProvider>
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
