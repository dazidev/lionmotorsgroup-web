"use client";

import React, { useState } from "react";

interface Props {
  open: boolean;
  setOpen: (value: boolean, option: string) => void;
  handleAction: (field: any) => Promise<boolean>;
}

export const CatalogModalAddBrand = ({
  open,
  setOpen,
  handleAction,
}: Props) => {
  const [field, setField] = useState({
    brand: "",
  });

  const handleChange = (value: string, nameField: string) => {
    setField((prev) => ({ ...prev, [nameField]: value }));
  };

  const clearFields = () => {
    setField(() => ({
      brand: "",
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await handleAction(field);
    if (!response) return;
    clearFields();
    setOpen(false, "addBrand");
  };

  return (
    <>
      {/*<!-- Main modal -->*/}
      {open && (
        <div
          id="crud-modal"
          tabIndex={-1}
          className="overflow-y-auto overflow-x-hidden fixed z-50 flex justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
        >
          <div className="relative p-4 w-full max-w-md max-h-full">
            {/*<!-- Modal content -->*/}
            <div className="relative bg-zinc-900 rounded-2xl shadow-2xl border border-stone-700">
              {/*<!-- Modal header -->*/}
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t border-stone-700">
                <h3 className="text-lg font-semibold">Add Brand</h3>
                <button
                  type="button"
                  className="text-gray-400 bg-transparent hover:text-gold-600 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center "
                  onClick={() => setOpen(false, "addBrand")}
                >
                  <svg
                    className="w-3 h-3"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              {/*<!-- Modal body -->*/}
              <form className="p-4 md:p-5" onSubmit={handleSubmit}>
                <div className="grid gap-4 mb-4 grid-cols-2">
                  <div className="col-span-2">
                    <label
                      htmlFor="name"
                      className="block mb-2 text-sm font-medium"
                    >
                      Brand
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      className="w-full p-2.5 bg-zinc-800/80 border-2 border-gold-500/20 rounded-xl text-white placeholder-zinc-500 outline-none focus:bg-zinc-800 focus:border-gold-500 focus:ring-4 focus:ring-gold-500/10"
                      placeholder="Enter Brand"
                      required
                      value={field.brand}
                      onChange={(e) => {
                        handleChange(e.target.value, "brand");
                      }}
                    />
                  </div>
                </div>
                <div className="flex justify-end mt-10">
                  <button
                    type="submit"
                    className="text-white inline-flex items-end bg-gold-700 hover:bg-gold-600 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  >
                    Add Brand
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
