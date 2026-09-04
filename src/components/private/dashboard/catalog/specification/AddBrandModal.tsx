"use client";
import { useState } from "react";
import { TextInput } from "@/src/components/input/TextInput";
import { DefaultButton } from "@/src/components/button/DefaultButton";
import { ImageInput } from "@/src/components/input/ImageInput";
import { CloseButton } from "../../../../button/CloseButton";
import { PromiseResponse } from "@/src/interfaces";
import toast from "react-hot-toast";

interface Props {
  open: boolean;
  setOpen: (value: boolean) => void;
  file: File | null;
  setFile: (f: File | null) => void;
  preview: string | null;
  setPreview: (f: string | null) => void;
  addBrand: () => Promise<PromiseResponse>;
  brand: string;
  setBrand: (value: string, option: string | undefined) => void;
}

export const AddBrandModal = ({
  open,
  setOpen,
  file,
  setFile,
  preview,
  setPreview,
  addBrand,
  brand,
  setBrand,
}: Props) => {
  const [loading, setLoading] = useState<boolean>(false);

  const clearFields = () => {
    setBrand("", "brand");
    setFile(null);
    setPreview(null);
  };

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await addBrand();

      if (!response.success) {
        toast.error(`${response.message}`);
        return;
      }

      clearFields();
      setOpen(false);
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;
  return (
    <div
      id="crud-modal"
      tabIndex={-1}
      className="overflow-y-auto overflow-x-hidden fixed z-50 flex justify-center items-center w-full md:inset-0 h-screen max-h-full bg-zinc-800/90"
    >
      <div className="relative p-4 w-full max-w-md max-h-full">
        <div className="relative bg-zinc-900 rounded-2xl shadow-2xl border border-stone-700">
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t border-stone-700">
            <h3 className="text-lg font-semibold">Add Brand</h3>
            <CloseButton onClick={() => setOpen(false)} />
          </div>
          <form className="p-5" onSubmit={handleSubmit}>
            <div className="flex flex-col w-full justify-center items-center gap-5">
              <div className="flex w-full gap-3">
                <TextInput
                  name="Brand"
                  styles="w-full"
                  value={brand}
                  valueOption="brand"
                  onChange={setBrand}
                />
              </div>
              <ImageInput
                file={file}
                setFile={setFile}
                preview={preview}
                setPreview={setPreview}
              />

              <div className="flex items-end justify-end w-full">
                <div className="flex-1" />
                <DefaultButton
                  name="Add Brand"
                  type="submit"
                  size="w-35"
                  loading={loading}
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
