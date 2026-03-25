"use client";

import { getInvestmentByVehicle } from "@/src/actions/private/financials.actions";
import { CloseButton } from "@/src/components";
import { InvestmentResponse } from "@/src/interfaces/investment";
import { useEffect, useState } from "react";
import { ViewInvestmentTable } from "./ViewInvestmentTable";

interface Modals {
  manage: boolean;
  create: boolean;
}
type Options = keyof Modals;

interface Props {
  open: boolean;
  setOpen: (value: boolean, options: Options) => void;
  vehicleId: string;
  vehicleData: {
    year: string;
    brand: string;
    model: string;
    vin: string;
  };
}

export const ViewInvestmentModal = ({
  open,
  setOpen,
  vehicleId,
  vehicleData,
}: Props) => {
  const [data, setData] = useState<InvestmentResponse[]>();

  useEffect(() => {
    const investments = async () => {
      const response = await getInvestmentByVehicle(vehicleId);
      if (!response.success) {
        setData([]);
        return;
      }
      setData(response.data);
    };

    investments();
  }, [vehicleId]);

  if (!open) return null;
  return (
    <>
      {open && (
        <div
          id="crud-modal"
          tabIndex={-1}
          className="overflow-y-auto overflow-x-hidden fixed z-50 flex justify-center items-center w-full md:inset-0 h-screen max-h-full bg-zinc-800/90"
        >
          <div className="relative p-4 w-full max-w-full max-h-full">
            <div className="relative bg-zinc-900 rounded-2xl shadow-2xl border border-stone-700">
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t-2xl bg-zinc-800 border-stone-700">
                <h3 className="text-2xl font-semibold">View Investments</h3>
                <CloseButton onClick={() => setOpen(false, "manage")} />
              </div>
              <ViewInvestmentTable
                headers={["Name", "Description", "Amount", "Date", "Actions"]}
                data={data ? data : []}
                vehicleData={vehicleData}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};
