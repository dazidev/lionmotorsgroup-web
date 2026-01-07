"use client";
import { useCatalog } from "@/src/context/CatalogProvider";

interface Props {
  id: string;
  value: string;
  checked: boolean;
}

export const CheckBoxInput = ({ id, value, checked }: Props) => {
  const { handleCheckedSpec } = useCatalog();

  return (
    <div className="flex items-center gap-2 ">
      <input
        type="checkbox"
        id={id}
        value={value}
        className="h-4.5 w-4.5 accent-yellow-500 cursor-pointer"
        checked={checked}
        onChange={() => handleCheckedSpec(id)}
      />
      <label htmlFor={id} className="cursor-pointer">
        {value}
      </label>
    </div>
  );
};
