import { DefaultButton } from "@/src/components/button/DefaultButton";
import { CheckBoxInput } from "@/src/components/input/CheckBoxInput";
import { TextInput } from "@/src/components/input/TextInput";
import { useState } from "react";

export const SecuritySpecificationModal = () => {
  const [specification, setSpecification] = useState("");

  const handleAddSpecification = () => {};

  const handleChange = (value: string) => {
    setSpecification(value);
  };

  return (
    <div className="flex flex-col p-5 gap-8 border-b rounded-t border-stone-700">
      <div className="flex flex-row items-center justify-between">
        <span className="text-xl font-semibold">Security Specifications</span>
        <div className="flex flex-row items-end gap-3">
          <TextInput
            name="Specification"
            label={false}
            value={specification}
            valueOption="specification"
            onChange={handleChange}
          />
          <DefaultButton
            name="Add Specification"
            style="bg-green-800 hover:bg-green-700"
            onClick={() => {}}
          />
        </div>
      </div>
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
