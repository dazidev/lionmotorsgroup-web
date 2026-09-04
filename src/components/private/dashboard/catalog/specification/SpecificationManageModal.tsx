"use client";
import { CloseButton } from "@/src/components/button/CloseButton";
import { DefaultButton } from "@/src/components/button/DefaultButton";
import { TextInput } from "@/src/components/input/TextInput";
import { useState } from "react";
import { SpecificationTable } from "./SpecificationTable";
import { useCatalog } from "@/src/context/CatalogProvider";
import { SelectInput } from "@/src/components/input/SelectInput";
import { addSpecification } from "@/src/actions";
import toast from "react-hot-toast";
import { useLockBodyScroll } from "@/src/hooks/useLockBodyScroll";
import { AddBrandModal } from "./AddBrandModal";
import { PromiseResponse } from "@/src/interfaces";

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
  const [brandModal, setBrandModal] = useState<boolean>(false);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const [page, setPage] = useState<Pages>("brands");

  const { brandsData, specificationsData, revalidateData } = useCatalog();

  const headers =
    page === "brands"
      ? ["name", "image", "actions"]
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

  const handleAddSpecification = async () => {
    if (!field.specification) return;
    if (
      field.typeSpecification !== "security" &&
      field.typeSpecification !== "confort" &&
      field.typeSpecification !== "visual"
    )
      return;

    const response = await addSpecification(
      field.specification,
      field.typeSpecification,
    );

    if (!response.success) return toast.error(`${response.message}`);
    toast.success(`${response.message}`);
    revalidateData("specifications");
    clearFields();
    return;
  };

  const handleOpenBrandModal = () => {
    setBrandModal(!brandModal);
  };

  const handleAddBrand = async (): Promise<PromiseResponse> => {
    try {
      if (!field.brand.trim()) {
        throw new Error("Insert brand!");
      }

      if (!file) {
        throw new Error("Select image!");
      }

      const formData = new FormData();

      formData.append("name", field.brand.trim());
      formData.append("image", file);

      const response = await fetch("/api/admin/brands", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.message ?? "There was an error creating the brand.",
        );
      }

      toast.success(
        result.message ?? "The brand has been created successfully.",
      );

      revalidateData("brands");

      clearFields();

      return {
        success: true,
      };
    } catch (error) {
      return {
        success: false,
        message: error instanceof Error ? error.message : "Unknown error.",
      };
    }
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
            <h3 className="flex-3 text-2xl font-semibold pt-5">
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
            />
          </div>
          <div className="flex p-5">
            {page === "specifications" && (
              <div className="flex flex-row items-end gap-3">
                <TextInput
                  name="Specification"
                  value={field.specification}
                  valueOption="specification"
                  onChange={handleChange}
                />
                <SelectInput
                  name="type"
                  options={["security", "confort", "visual"]}
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
            setOpenAddBrand={handleOpenBrandModal}
          />
        </div>
      </div>
      <AddBrandModal
        open={brandModal}
        setOpen={handleOpenBrandModal}
        file={file}
        setFile={setFile}
        preview={preview}
        setPreview={setPreview}
        addBrand={handleAddBrand}
        brand={field.brand}
        setBrand={handleChange}
      />
    </div>
  );
};
