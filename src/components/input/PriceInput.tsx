import { useState } from "react";

type Action = (option: "min" | "max", value: string) => void;

interface Props {
  name: string;
  placeholder?: string;
  value: number;
  option: "min" | "max";
  action: Action;
  onChange: (value: number, option: "min" | "max") => void;
  isEditing: boolean;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  styles?: string;
  label?: boolean;
}

export const PriceInput = ({
  name,
  placeholder,
  value,
  option,
  action,
  onChange,
  isEditing,
  setIsEditing,
  styles,
  label = true,
}: Props) => {
  const handleAction = (val: string) => {
    action(option, val);
  };

  return (
    <div className={`relative col-span-2 ${styles}`}>
      {label && (
        <label htmlFor={option} className="block mb-2 text-sm font-medium">
          {name}
        </label>
      )}

      <input
        id={option}
        name={option}
        type="text"
        className="w-full h-12 p-2.5 pl-6 bg-zinc-800/80 border-2 border-gold-500/20 rounded-xl text-white placeholder-zinc-500 outline-none focus:bg-zinc-800 focus:border-gold-500 focus:ring-4 focus:ring-gold-500/10"
        placeholder={placeholder ? placeholder : `Enter ${name}`}
        required
        value={
          isEditing ? String(value) : Intl.NumberFormat("en-US").format(value)
        }
        onChange={(e) => {
          const rawValue = e.target.value.replaceAll(",", "");

          if (rawValue === "") {
            onChange(0, option);
            return;
          }

          const numericValue = Number(rawValue);

          if (!Number.isNaN(numericValue)) {
            onChange(numericValue, option);
          }
        }}
        onFocus={() => setIsEditing(true)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleAction(e.currentTarget.value);
            e.currentTarget.blur();
          }
        }}
        onBlur={(e) => {
          setIsEditing(false);
          handleAction(e.currentTarget.value);
        }}
      />
      <span className="absolute bottom-2.5 left-2">$</span>
    </div>
  );
};
