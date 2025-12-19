import { VehicleState } from "@/src/interfaces";

interface Props {
  name: string;
  value: string;
  valueOption: keyof VehicleState | "typeSpecification";
  options: string[];
  onChange: (
    value: string,
    option: keyof VehicleState | "typeSpecification"
  ) => void;
  styles?: string;
}

export const SelectInput = ({
  name,
  value,
  valueOption,
  options,
  onChange,
  styles,
}: Props) => {
  const handleChange = (value: string) => {
    if (valueOption === "typeSpecification") {
      onChange(value, valueOption);
    } else onChange(value, valueOption);
  };

  return (
    <div className={`col-span-2 ${styles}`}>
      <label htmlFor={name} className="block mb-2 text-sm font-medium">
        {name}
      </label>
      <select
        id={name}
        className="w-full h-12 p-2.5 bg-zinc-800/80 border-2 border-gold-500/20 rounded-xl text-white placeholder-zinc-500 outline-none focus:bg-zinc-800 focus:border-gold-500 focus:ring-4 focus:ring-gold-500/10"
        value={value}
        onChange={(e) => {
          handleChange(e.target.value);
        }}
      >
        <option value="">{`Select ${name}`}</option>
        {options.map((option) => {
          let formatOption;

          if (
            option === "in_stock" ||
            option === "on_sale" ||
            option === "sold"
          ) {
            formatOption = option.replace("_", " ").toUpperCase();
          } else {
            formatOption = option;
          }

          return (
            <option key={option} value={option}>
              {formatOption}
            </option>
          );
        })}
      </select>
    </div>
  );
};
