"use client";

import { BasicVehicleResponse } from "@/src/interfaces";
import React from "react";

interface Modals {
  manage: boolean;
  create: boolean;
}
type Options = keyof Modals;

interface Props {
  vehicle: BasicVehicleResponse;
  handleOpenModal: (value: boolean, option: Options) => void;
  setTargetId: React.Dispatch<React.SetStateAction<string>>;
}

export const FinancialsTableItem = ({
  vehicle,
  handleOpenModal,
  setTargetId,
}: Props) => {
  const {
    id,
    vin,
    brand,
    model,
    year,
    price,
    investment,
    status,
    investments,
  } = vehicle;

  const formatStatus = status.replace("_", " ").toUpperCase();
  const formatPrice = new Intl.NumberFormat("en-US").format(price);
  const totalInvestments =
    investments.reduce((acc, item) => acc + item.amount, 0) + investment;
  const formatInvestment = new Intl.NumberFormat("en-US").format(
    totalInvestments,
  );
  const formatRevenue = new Intl.NumberFormat("en-US").format(
    price - totalInvestments,
  );

  const getColorStatus = () => {
    if (status === "in_stock") return "bg-gray-600";
    else if (status === "on_sale") return "bg-green-600";
    else if (status === "sold") return "bg-blue-700";
    return "";
  };

  const colorStatus = getColorStatus();

  const clickOpenModal = (option: Options) => {
    handleOpenModal(true, option);
    setTargetId(id);
  };

  return (
    <tr className="bg-zinc-900 hover:bg-zinc-800 text-gray-50">
      <td className="px-6 py-4">
        <span className="font-semibold">{vin}</span>
      </td>
      <td className="px-6 py-4">
        <span className="font-semibold">{model}</span>
      </td>
      <td className="px-6 py-4">
        <span className=""> {brand.name} </span>
      </td>
      <td className="px-6 py-4">
        <span className="inline-flex items-centerrounded-full">{year}</span>
      </td>
      <td className="px-6 py-4">
        <span
          className={`inline-flex items-center justify-center py-1 px-1.5 w-22 rounded gap-1.5 font-semibold ${colorStatus}`}
        >
          {formatStatus}
        </span>
      </td>
      <td className="px-6 py-4">
        <span className="inline-flex items-centerrounded-full justify-end">{`$${formatPrice}`}</span>
      </td>
      <td className="px-6 py-4">
        <span className="inline-flex items-centerrounded-full justify-end">{`$${formatInvestment}`}</span>
      </td>
      <td className="px-6 py-4">
        <span className="inline-flex items-centerrounded-full justify-end">{`$${formatRevenue}`}</span>
      </td>
      <td className="pl-6 py-4">
        <div className="flex gap-2">
          <button
            className="w-16 h-8 rounded-md border border-stone-700 bg-gold-700 hover:bg-gold-600 flex items-center justify-center transition-all"
            onClick={() => clickOpenModal("create")}
          >
            <span>Add</span>
          </button>
          <button
            className="w-16 h-8 rounded-md border border-stone-700 bg-green-900 hover:bg-green-600 flex items-center justify-center transition-all"
            onClick={() => clickOpenModal("manage")}
          >
            <span>Manage</span>
          </button>
        </div>
      </td>
    </tr>
  );
};
