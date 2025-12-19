"use server";
import { getBrands, getSpecifications, getVehicles } from "@/src/actions";
import { CatalogTable } from "@/src/components";
import { CatalogProvider } from "@/src/context/CatalogProvider";
import Image from "next/image";
import { redirect } from "next/navigation";

type SearchParams = {
  table?: string | string[];
  page?: string | string[];
};

interface Props {
  searchParams: Promise<SearchParams>;
}

export default async function CatalogPage({ searchParams }: Props) {
  const listHeaders = ["Model", "Brand", "Year", "Status", "Price", "Actions"];
  const { table, page } = await searchParams;

  if (!table || !page) {
    redirect("/dashboard/catalog?table=vehicles&page=1");
  }

  const [vehiclesRes, specificationsRes, brandsRes] = await Promise.all([
    getVehicles(),
    getSpecifications(),
    getBrands(),
  ]);

  const amountPages = vehiclesRes.data
    ? Math.ceil(vehiclesRes.data.length / 20)
    : 1;

  return (
    <div className="flex flex-col items-center justify-between min-h-[calc(100vh-8.25rem)] w-[90%]">
      <div className="m-8 w-full">
        <CatalogProvider
          specificationsData={specificationsRes.data ?? []}
          brandsData={brandsRes.data ?? []}
        >
          <CatalogTable
            name={"Vehicles"}
            headers={listHeaders}
            data={vehiclesRes.data ?? []}
            amountPages={amountPages}
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
