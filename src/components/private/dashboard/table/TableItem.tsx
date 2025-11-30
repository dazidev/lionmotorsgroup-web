"use client";

import { User } from "@/src/interfaces";
import React from "react";

interface Props {
  user: User;
  setOpenConfirm: (value: boolean) => void;
  setOpenEdit: (value: boolean) => void;
  setOpenChangePass: (value: boolean) => void;
  setTargetId: React.Dispatch<React.SetStateAction<string>>;
}

export const TableItem = ({
  user,
  setOpenConfirm,
  setOpenEdit,
  setOpenChangePass,
  setTargetId,
}: Props) => {
  const { id, name, lastname, email, role } = user;

  const initialNameLetters = `${name.slice(0, 1).toUpperCase()}${lastname
    .slice(0, 1)
    .toUpperCase()}`;
  const fullName = `${name} ${lastname}`;
  const formatRole = role.replace("_", " ");

  const handleClickDelete = () => {
    setOpenConfirm(true);
    setTargetId(id);
  };

  const handleClickEdit = () => {
    setOpenEdit(true);
    setTargetId(id);
  };

  const handleClickChangePass = () => {
    setOpenChangePass(true);
    setTargetId(id);
  };

  return (
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
          {formatRole}
        </span>
      </td>
      <td className="px-6 py-4">
        <span className="inline-flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
          Active
        </span>
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
            className="w-24 h-8 rounded-md border border-stone-700 bg-gold-700 hover:bg-gold-500 flex items-center justify-center transition-all"
            onClick={handleClickChangePass}
          >
            <span>Password</span>
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
