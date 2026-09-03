import { getAdmins } from "@/src/actions";
import { Table } from "@/src/components";
import Image from "next/image";

export default async function AdminsPage() {
  const responseAdmins = await getAdmins();
  const { data } = responseAdmins;

  const listHeaders = ["Full Name", "Email", "Role", "Status", "Actions"];
  return (
    <div className="flex flex-col items-center justify-between w-[90%] min-h-full">
      <div className="m-8 w-full">
        <Table name={"Administrators"} headers={listHeaders} data={data} />
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
