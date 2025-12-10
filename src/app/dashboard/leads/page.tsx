import { getLeads } from "@/src/actions";
import { LeadsTable } from "@/src/components";
import Image from "next/image";

export default async function LeadsPage() {
  const responseLeads = await getLeads();
  const { data } = responseLeads;

  const listHeaders = [
    "Full Name",
    "Email",
    "Phone Number",
    "Status",
    "Date",
    "Actions",
  ];
  return (
    <div className="flex flex-col items-center justify-between min-h-[calc(100vh-8.25rem)] w-[90%]">
      <div className="m-8 w-full">
        <LeadsTable name={"Leads"} headers={listHeaders} data={data} />
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
