import { getBasicVehicles, getVehicles } from "@/src/actions";
import { getInvestments } from "@/src/actions/private/financials.actions";
import { FinancialsTable } from "@/src/components/private/dashboard/financials/FinancialsTable";
import { titleFont } from "@/src/config/fonts";
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

  const amountPages = vehiclesRes.data
    ? Math.ceil(vehiclesRes.data.length / 20)
    : 1;

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
