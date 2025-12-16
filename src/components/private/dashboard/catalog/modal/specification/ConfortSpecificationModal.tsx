import { CheckBoxInput } from "@/src/components/input/CheckBoxInput";

export const ConfortSpecificationModal = () => {
  return (
    <div className="flex flex-col p-5 gap-3 border-b rounded-t border-stone-700">
      <span className="text-xl font-semibold">Confort Specifications</span>
      <div className="grid grid-cols-4 gap-4">
        <CheckBoxInput />
        <CheckBoxInput />
        <CheckBoxInput />
        <CheckBoxInput />
        <CheckBoxInput />
      </div>
    </div>
  );
};
