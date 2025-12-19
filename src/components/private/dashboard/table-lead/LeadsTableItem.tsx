"use client";

import { Lead } from "@/src/interfaces/lead";
import { FormatDate } from "@/src/utils/format-date";
import React from "react";

interface Props {
  lead: Lead;
  setOpenConfirm: (value: boolean) => void;
  setOpenView: (value: boolean) => void;
  setTargetId: React.Dispatch<React.SetStateAction<string>>;
}

export const LeadsTableItem = ({
  lead,
  setOpenConfirm,
  setOpenView,
  setTargetId,
}: Props) => {
  const { id, name, lastname, email, phoneNumber, createdAt, status } = lead;

  const fullName = `${name} ${lastname}`;
  const date = new Date(createdAt);
  const statusColor = status == "attended" ? "bg-emerald-600" : "bg-red-800";

  const formatUSA = FormatDate.complete(date);

  const handleClickDelete = () => {
    setOpenConfirm(true);
    setTargetId(id);
  };

  const handleView = () => {
    setOpenView(true);
    setTargetId(id);
  };

  return (
    <>
      <tr className="bg-zinc-900 hover:bg-zinc-800 text-gray-50">
        <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap ">
          <div className="flex items-center gap-3">
            <span className="font-semibold">{fullName}</span>
          </div>
        </th>
        <td className="px-6 py-4">
          <span className=""> {email} </span>
        </td>
        <td className="px-6 py-4">
          <span className="inline-flex items-centerrounded-full">
            {phoneNumber}
          </span>
        </td>
        <td className="px-6 py-4">
          <span className="inline-flex items-center gap-1.5">
            <span
              className={`flex w-30 justify-center h-auto rounded p-1 ${statusColor} font-bold`}
            >
              {status.toUpperCase()}
            </span>
          </span>
        </td>
        <td className="px-6 py-4">
          <span className="inline-flex items-centerrounded-full">
            {formatUSA}
          </span>
        </td>
        <td className="pl-6 py-4">
          <div className="flex gap-2">
            <button
              className="w-16 h-8 rounded-md border border-stone-700 bg-blue-900 hover:bg-blue-600 flex items-center justify-center transition-all"
              onClick={handleView}
            >
              <span>View</span>
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
    </>
  );
};
