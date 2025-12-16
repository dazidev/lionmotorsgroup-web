import { VehicleState } from "@/src/interfaces";
import { capitalize } from "@/src/utils/format";

type Options = keyof VehicleState;
type OnChange = (value: string, option?: Options) => void;

interface Props {
  name: string;
  placeholder?: string;
  value: string;
  valueOption: keyof VehicleState | "specification";
  onChange: OnChange;
  styles?: string;
  label?: boolean;
}

export const TextInput = ({
  name,
  placeholder,
  value,
  valueOption,
  onChange,
  styles,
  label = true,
}: Props) => {
  const handleChange = (value: string) => {
    if (valueOption !== "specification") return onChange(value, valueOption);

    onChange(value);
  };

  return (
    <div className={`col-span-2 ${styles}`}>
      {label && (
        <label htmlFor={valueOption} className="block mb-2 text-sm font-medium">
          {name}
        </label>
      )}

      <input
        id={valueOption}
        name={valueOption}
        type="text"
        className="w-full h-12 p-2.5 bg-zinc-800/80 border-2 border-gold-500/20 rounded-xl text-white placeholder-zinc-500 outline-none focus:bg-zinc-800 focus:border-gold-500 focus:ring-4 focus:ring-gold-500/10"
        placeholder={placeholder ? placeholder : `Enter ${name}`}
        required
        value={value}
        onChange={(e) => {
          handleChange(e.target.value);
        }}
      />
    </div>
  );
};
