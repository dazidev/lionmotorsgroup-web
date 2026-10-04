"use client";
import { addSpecification } from "@/src/actions";
import { DefaultButton } from "@/src/components/button/DefaultButton";
import { CheckBoxInput } from "@/src/components/input/CheckBoxInput";
import { TextInput } from "@/src/components/input/TextInput";
import { useCatalog } from "@/src/context/CatalogProvider";
import { useState } from "react";
import toast from "react-hot-toast";

export const ConfortSpecificationModal = () => {
  const [specification, setSpecification] = useState("");
  const [loading, setLoading] = useState(false);

  const { specificationsData, revalidateData } = useCatalog();

  const handleAddSpecification = async () => {
    if (!specification) return;
    if (loading) return;
    setLoading(true);

    const response = await addSpecification(specification, "confort");
    if (!response.success) {
      toast.error(`${response.message}`);
      setLoading(false);
      return;
    }

    toast.success(`${response.message}`);
    revalidateData("specifications");
    setSpecification("");
    setLoading(false);
  };

  const handleChange = (value: string) => {
    setSpecification(value);
  };

  return (
    <div className="flex flex-col p-4 sm:p-5 gap-6 sm:gap-8 border-b border-stone-700">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <span className="text-xl font-semibold">Confort Specifications</span>
        <div className="flex flex-col sm:flex-row sm:items-end w-full md:w-auto gap-3">
          <TextInput
            name="Specification"
            label={false}
            value={specification}
            valueOption="specification"
            onChange={handleChange}
            styles="w-full sm:min-w-60"
          />
          <DefaultButton
            name="Add Specification"
            style="bg-green-800 hover:bg-green-700"
            size="w-full sm:w-42"
            loading={loading}
            onClick={handleAddSpecification}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {specificationsData
          .filter((row) => row.type.includes("confort"))
          .map((s) => (
            <CheckBoxInput
              key={s.id}
              value={s.name}
              id={s.id}
              checked={s.checked}
            />
          ))}
      </div>
    </div>
  );
};
