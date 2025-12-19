"use client";
import { CloseButton } from "@/src/components/button/CloseButton";
import { DefaultButton } from "@/src/components/button/DefaultButton";
import { TextInput } from "@/src/components/input/TextInput";
import { useState } from "react";
import { SpecificationTable } from "./SpecificationTable";
import { useCatalog } from "@/src/context/CatalogProvider";
import { SelectInput } from "@/src/components/input/SelectInput";
import { addBrand, addSpecification } from "@/src/actions";
import toast from "react-hot-toast";
import { useLockBodyScroll } from "@/src/hooks/useLockBodyScroll";

interface Props {
  open: boolean;
  setOpen: (value: boolean, option: string) => void;
}

type Pages = "brands" | "specifications";

export const SpecificationManageModal = ({ open, setOpen }: Props) => {
  const [field, setField] = useState({
    brand: "",
    specification: "",
    typeSpecification: "",
  });

  const [page, setPage] = useState<Pages>("brands");

  const { brandsData, specificationsData, revalidateData } = useCatalog();

  const headers =
    page === "brands"
      ? ["name", "path", "actions"]
      : ["name", "type", "actions"];

  const handleChange = (value: string, option: string | undefined) => {
    if (option === undefined) return;
    setField((prev) => ({ ...prev, [option]: value }));
  };

  const clearFields = () => {
    setField(() => ({
      brand: "",
      specification: "",
      typeSpecification: "",
    }));
  };

  const handleAddBrand = async () => {
    if (!field.brand) return;

    const response = await addBrand(field.brand);

    if (!response.success) return toast.error(`${response.message}`);
    toast.success(`${response.message}`);
    revalidateData("brands");
    clearFields();
    return;
  };

  const handleAddSpecification = async () => {
    if (!field.specification) return;
    if (
      field.typeSpecification !== "security" &&
      field.typeSpecification !== "confort"
    )
      return;

    const response = await addSpecification(
      field.specification,
      field.typeSpecification
    );

    if (!response.success) return toast.error(`${response.message}`);
    toast.success(`${response.message}`);
    revalidateData("specifications");
    clearFields();
    return;
  };

  useLockBodyScroll(open);
  if (!open) return null;
  return (
    <div
      id="crud-modal"
      tabIndex={-1}
      className="fixed z-50 md:inset-0 overflow-x-hidden flex justify-center items-center w-full h-[calc(100%)] max-h-full bg-zinc-800/90"
    >
      <div className="relative w-full max-w-5xl max-h-full">
        <div className="relative overflow-y-auto h-[calc(100vh-5rem)] bg-zinc-900 rounded-2xl shadow-2xl border border-stone-700">
          <div className="flex px-5 rounded-t-2xl bg-zinc-800">
            <h3 className="flex-3 text-lg font-semibold pt-5">
              Manage Details
            </h3>

            <div className="pt-5">
              <CloseButton onClick={setOpen} element="addBrand" />
            </div>
          </div>
          <div className="flex items-end">
            <div
              className={`flex-10 h-10 bg-zinc-800 ${
                page === "brands" ? "rounded-br-2xl" : ""
              }`}
            />
            <div className="relative flex flex-2 flex-row">
              <div className="absolute top-0 z-0 w-full h-5 bg-zinc-800"></div>
              <button
                className={`relative z-10 flex-1 py-2 px-4 h-10 cursor-pointer ${
                  page === "brands"
                    ? "bg-zinc-900 rounded-t-2xl"
                    : "bg-zinc-800 rounded-br-2xl"
                }`}
                onClick={() => {
                  setPage("brands");
                }}
              >
                <span>Brands</span>
              </button>
              <button
                className={`relative z-10 flex-1 p-2 cursor-pointer ${
                  page === "specifications"
                    ? "bg-zinc-900 rounded-t-2xl"
                    : "bg-zinc-800 rounded-bl-2xl"
                }`}
                onClick={() => {
                  setPage("specifications");
                }}
              >
                <span>Specifications</span>
              </button>
            </div>

            <div
              className={`flex-1 h-10 bg-zinc-800 ${
                page === "specifications" ? "rounded-bl-2xl" : ""
              }`}
            ></div>
          </div>
          <div className="flex p-5">
            {page === "brands" ? (
              <div className="flex flex-row items-end gap-3">
                <TextInput
                  name="Brand"
                  value={field.brand}
                  valueOption="brand"
                  onChange={handleChange}
                />
                <DefaultButton
                  name="Add Brand"
                  type="button"
                  loading={false}
                  onClick={handleAddBrand}
                />
              </div>
            ) : (
              <div className="flex flex-row items-end gap-3">
                <TextInput
                  name="Specification"
                  value={field.specification}
                  valueOption="specification"
                  onChange={handleChange}
                />
                <SelectInput
                  name="type"
                  options={["security", "confort"]}
                  value={field.typeSpecification}
                  onChange={handleChange}
                  valueOption="typeSpecification"
                />
                <DefaultButton
                  name="Add Specification"
                  type="button"
                  loading={false}
                  onClick={handleAddSpecification}
                />
              </div>
            )}
          </div>
          <SpecificationTable
            name={page === "brands" ? "Brands" : "Specifications"}
            headers={headers}
            data={page === "brands" ? brandsData : specificationsData}
          />
        </div>
      </div>
    </div>
  );
};
