"use client";

import { updateInvestmentById } from "@/src/actions/private/financials.actions";
import { useFinancial } from "@/src/context/FinancialProvider";
import { ServerResponse } from "@/src/interfaces";
import { Investment } from "@/src/interfaces/investment";
import { useState } from "react";
import toast from "react-hot-toast";

interface Props {
  id: string;
  name: string;
  description: string;
  amount: number;
  date: Date;
  vehicleId: string;
}

export const ViewInvestmentTableItem = ({
  id,
  name,
  description,
  amount,
  date,
}: Props) => {
  const { revalidateData } = useFinancial();
  const [initialInvest, setInitialInvest] = useState({
    name,
    description,
    amount,
    date,
  });
  const [invest, setInvest] = useState({
    name,
    description,
    amount,
    date,
  });

  const updated =
    invest.name === initialInvest.name &&
    invest.description === initialInvest.description &&
    invest.amount === initialInvest.amount &&
    new Date(invest.date).getTime() === new Date(initialInvest.date).getTime();

  const handleChangeInvest = (
    value: string | number,
    option: keyof typeof invest,
  ) => {
    setInvest((prev) => ({ ...prev, [option]: value }));
  };

  const updateInvestment = async () => {
    const investment: Investment = {
      id,
      name: invest.name,
      description: invest.description,
      amount: invest.amount.toString(),
      date: invest.date,
    };
    const response: ServerResponse<any> =
      await updateInvestmentById(investment);

    // todo: I would change the invest state, bringing the data from database.
    if (!response.success) {
      toast.error(response.message ?? "Unknow error.");
      return;
    }

    toast.success(response.message ?? "");
    setInitialInvest(invest);
    revalidateData();
    return;
  };

  return (
    <tr className="bg-zinc-900 hover:bg-zinc-800 text-gray-50">
      <td className="px-2 py-4">
        <input
          type="text"
          className="font-semibold hover:bg-stone-900 focus:bg-stone-900 p-4 outline-none"
          value={invest.name}
          onChange={(e) => handleChangeInvest(e.currentTarget.value, "name")}
        />
      </td>
      <td className="px-2 py-4">
        <textarea
          rows={4}
          className="font-semibold w-2xl max-w-2xl hover:bg-stone-900 focus:bg-stone-900 p-4 outline-none"
          value={invest.description}
          onChange={(e) =>
            handleChangeInvest(e.currentTarget.value, "description")
          }
        />
      </td>
      <td className="px-2 py-4">
        <input
          type="number"
          className="no-arrows font-semibold hover:bg-stone-900 focus:bg-stone-900 p-4 outline-none"
          value={invest.amount}
          onChange={(e) =>
            handleChangeInvest(Number(e.currentTarget.value), "amount")
          }
        />
      </td>
      <td className="px-2 py-4">
        <input
          type="date"
          className="font-semibold hover:bg-stone-900 focus:bg-stone-900 p-4 outline-none"
          value={new Date(invest.date).toISOString().split("T")[0]}
          onChange={(e) => handleChangeInvest(e.currentTarget.value, "date")}
        />
      </td>
      <td className="pl-6 py-4">
        <div className="flex gap-2">
          <button
            className={`w-16 h-8 rounded-md border border-stone-700 ${updated ? `bg-gray-800` : `bg-green-900 hover:bg-green-600`} flex items-center justify-center transition-all`}
            onClick={updateInvestment}
            disabled={updated}
          >
            <span>Save</span>
          </button>

          <button
            className="w-16 h-8 rounded-md border border-stone-700 bg-red-900 hover:bg-red-600 flex items-center justify-center transition-all"
            onClick={() => {}}
          >
            <span>Delete</span>
          </button>
        </div>
      </td>
    </tr>
  );
};
