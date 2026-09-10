import { getBasicVehicles } from "@/src/actions";
import { FinancialsTable } from "@/src/components/private/dashboard/financials/FinancialsTable";
import { FinancialProvider } from "@/src/context/FinancialProvider";
import Image from "next/image";
import { redirect } from "next/navigation";

type SearchParams = {
  table?: string | string[];
  page?: string | string[];
};

interface Props {
  searchParams: Promise<SearchParams>;
}

export default async function FinancialsPage({ searchParams }: Props) {
  const listHeaders = [
    "vin",
    "model",
    "brand",
    "year",
    "status",
    "sale price",
    "invested",
    "revenue",
    "actions",
  ];
  const { table, page } = await searchParams;

  if (!table || !page) {
    redirect("/dashboard/financials?table=financials-vehicles&page=1");
  }

  const vehiclesRes = await getBasicVehicles();

  const amountPages = Math.max(
    1,
    Math.ceil((vehiclesRes.data?.length ?? 0) / 20),
  );

  return (
    <div className="flex flex-col items-center justify-between min-h-[calc(100vh-8.25rem)] w-[90%]">
      <div className="m-8 w-full">
        <FinancialProvider vehiclesData={vehiclesRes.data ?? []}>
          <FinancialsTable
            headers={listHeaders}
            name={"Financials"}
            amountPages={amountPages}
          />
        </FinancialProvider>
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
