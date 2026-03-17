import { FinancialsTable } from "@/src/components/private/dashboard/financials/FinancialsTable";
import { titleFont } from "@/src/config/fonts";
import Image from "next/image";

export default function FinancialsPage() {
  const listHeaders = ["Model", "Brand", "Year", "Status", "Price", "Actions"];

  return <FinancialsTable headers={listHeaders} />;
}
