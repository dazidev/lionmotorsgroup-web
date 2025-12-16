"use client";

import { Vehicle } from "@/src/interfaces";
import React from "react";

interface Props {
  vehicle: Vehicle;
  setOpenConfirm: (value: boolean) => void;
  setOpenEdit: (value: boolean) => void;
  setTargetId: React.Dispatch<React.SetStateAction<string>>;
}

export const CatalogTableItem = ({
  vehicle,
  setOpenConfirm,
  setOpenEdit,
  setTargetId,
}: Props) => {
  const { id, vin, brand, model, year, mileage, price, status } = vehicle;

  const formatStatus = status.replace("_", " ").toUpperCase();
  const formatPrice = new Intl.NumberFormat("en-US").format(price);

  const getColorStatus = () => {
    if (status === "in_stock") return "bg-gray-600";
    else if (status === "on_sale") return "bg-green-600";
    else if (status === "sold") return "bg-blue-700";
    return "";
  };

  const colorStatus = getColorStatus();

  const handleClickDelete = () => {
    setOpenConfirm(true);
    setTargetId(id);
  };

  const handleClickEdit = () => {
    setOpenEdit(true);
    setTargetId(id);
  };

  return (
    <tr className="bg-zinc-900 hover:bg-zinc-800 text-gray-50">
      <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap ">
        <div className="flex items-center gap-3">
          <span className="font-semibold">{model}</span>
        </div>
      </th>
      <td className="px-6 py-4">
        <span className=""> {brand} </span>
      </td>
      <td className="px-6 py-4">
        <span className="inline-flex items-centerrounded-full">{year}</span>
      </td>
      <td className="px-6 py-4">
        <span
          className={`inline-flex items-center py-1 px-1.5 rounded gap-1.5 font-semibold ${colorStatus}`}
        >
          {formatStatus}
        </span>
      </td>
      <td className="px-6 py-4">
        <span className="inline-flex items-centerrounded-full">{`$${formatPrice}`}</span>
      </td>
      <td className="pl-6 py-4">
        <div className="flex gap-2">
          <button
            className="w-16 h-8 rounded-md border border-stone-700 bg-blue-900 hover:bg-blue-600 flex items-center justify-center transition-all"
            onClick={handleClickEdit}
          >
            <span>Edit</span>
          </button>

          <button
            className="w-20 h-8 rounded-md border border-stone-700 bg-red-900 hover:bg-red-600 flex items-center justify-center transition-all"
            onClick={handleClickDelete}
          >
            <span>Delete</span>
          </button>
        </div>
      </td>
    </tr>
  );
};
