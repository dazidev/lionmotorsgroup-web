import { CatalogBrand } from "@/src/context/CatalogProvider";
import { VehicleState } from "@/src/interfaces";

type ValueOption = string[] | object[];

interface Props {
  name: string;
  value: string;
  valueOption: keyof VehicleState | "typeSpecification";
  options: ValueOption;
  onChange: (
    value: string,
    option: keyof VehicleState | "typeSpecification",
  ) => void;
  styles?: string;
  required?: boolean;
}

export const SelectInput = ({
  name,
  value,
  valueOption,
  options,
  onChange,
  styles,
  required = false,
}: Props) => {
  const handleChange = (value: string) => {
    if (valueOption === "typeSpecification") {
      onChange(value, valueOption);
    } else onChange(value, valueOption);
  };

  function isBrand(data: object): data is CatalogBrand {
    return "imagePath" in data;
  }

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
        required={required}
      >
        <option value="">{`Select ${name.replace("*", "")}`}</option>
        {options.map((option) => {
          let formatOption;

          if (typeof option === "string") {
            if (
              option === "in_stock" ||
              option === "on_sale" ||
              option === "reserved" ||
              option === "sold"
            ) {
              formatOption = option.replace("_", " ").toUpperCase();
            } else if (option === "FOUR_X_FOUR") {
              formatOption = "4x4";
            } else if (option === "FOUR_X_TWO") {
              formatOption = "4x2";
            } else {
              formatOption = option;
            }

            return (
              <option key={option} value={option}>
                {formatOption}
              </option>
            );
          } else if (typeof option === "object") {
            if (isBrand(option)) {
              return (
                <option key={option.id} value={option.id}>
                  {option.name}
                </option>
              );
            }
          }
        })}
      </select>
    </div>
  );
};
