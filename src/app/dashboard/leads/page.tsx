import { getLeads } from "@/src/actions";
import { LeadsTable } from "@/src/components";
import Image from "next/image";
import { redirect } from "next/navigation";

type SearchParams = {
  table?: string | string[];
  page?: string | string[];
};

interface Props {
  searchParams: Promise<SearchParams>;
}

export default async function LeadsPage({ searchParams }: Props) {
  const { table, page } = await searchParams;

  if (!table || !page) {
    redirect("/dashboard/leads?table=leads&page=1");
  }

  const responseLeads = await getLeads();
  const { data } = responseLeads;

  const amountPages = Math.max(1, Math.ceil((data?.length ?? 0) / 20));

  const listHeaders = [
    "Full Name",
    "Email",
    "Phone Number",
    "Type",
    "Status",
    "Date",
    "Actions",
  ];

  return (
    <div className="flex flex-col items-center justify-between min-h-[calc(100vh-8.25rem)] w-[90%]">
      <div className="m-8 w-full">
        <LeadsTable
          name="Leads"
          headers={listHeaders}
          data={data}
          amountPages={amountPages}
        />
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
