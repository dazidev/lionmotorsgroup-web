"use client";

import { Brands, Specifications } from "@/src/interfaces";
import React, { useEffect, useState } from "react";

type Data = Specifications | Brands;

interface Props {
  data: Data;
  setOpenConfirm: (value: boolean, option: string) => void;
  setTargetId: React.Dispatch<React.SetStateAction<string>>;
}

function isBrand(data: Data): data is Brands {
  return "imagePath" in data;
}

function isSpec(data: Data): data is Specifications {
  return "type" in data;
}

export const SpecificationTableItem = ({
  data,
  setOpenConfirm,
  setTargetId,
}: Props) => {
  const [formatData, setFormatData] = useState<Data>();

  useEffect(() => {
    if (isBrand(data)) {
      setFormatData({
        id: data.id,
        name: data.name,
        imagePath: data.imagePath,
        createdAt: new Date(data.createdAt),
        updatedAt: new Date(data.updatedAt),
      });
    } else if (isSpec(data)) {
      setFormatData({
        id: data.id,
        name: data.name,
        type: data.type,
        createdAt: new Date(data.createdAt),
        updatedAt: new Date(data.updatedAt),
      });
    }
  }, [data]);

  const handleClickDelete = () => {
    setOpenConfirm(true, "confirm");
    setTargetId(data.id);
  };

  return (
    <tr className="bg-zinc-900 hover:bg-zinc-800 text-gray-50">
      {formatData &&
        Object.entries(formatData)
          .filter(([key]) => !["id", "createdAt", "updatedAt"].includes(key))
          .map(([key, value]) => (
            <td key={key} className="px-6 py-4">
              <span className="">{value}</span>
            </td>
          ))}
      <td className="pl-6 py-4">
        <div className="flex gap-2">
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
