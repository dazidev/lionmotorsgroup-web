"use client";

import { CloseButton } from "@/src/components/button/CloseButton";
import { useLockBodyScroll } from "@/src/hooks/useLockBodyScroll";
import { Vehicle } from "@/src/interfaces";
import { Investment } from "@/src/interfaces/investment";
import React, { useEffect, useState } from "react";

interface Modals {
  manage: boolean;
  create: boolean;
}
type Options = keyof Modals;

interface Props {
  open: boolean;
  setOpen: (value: boolean, options: Options) => void;
  handleAction: (investment: Investment) => Promise<boolean>;
  type: "create" | "edit";
  vehicle?: Vehicle;
}

export const AddInvestmentModal = ({
  open,
  setOpen,
  handleAction,
  type,
  vehicle,
}: Props) => {
  const [field, setField] = useState({
    VIN: "",
    name: "",
    description: "",
    amount: "",
    date: "",
  });

  useEffect(() => {
    if (vehicle) {
      setField((prev) => ({ ...prev, VIN: vehicle.vin }));
    }
  }, [vehicle]);

  const handleChange = (value: string, nameField: string) => {
    setField((prev) => ({ ...prev, [nameField]: value }));
  };

  const clearFields = () => {
    setField((prev) => ({
      ...prev,
      name: "",
      description: "",
      amount: "",
      date: "",
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const investment: Investment = {
      id: vehicle?.id!,
      name: field.name,
      description: field.description,
      amount: field.amount,
      date: new Date(field.date),
    };

    const response = await handleAction(investment);
    if (!response) return;
    clearFields();
    setOpen(false, "create");
  };

  useLockBodyScroll(open);
  if (!open) return null;
  return (
    <>
      {/*<!-- Main modal -->*/}
      {open && (
        <div
          id="crud-modal"
          tabIndex={-1}
          className="overflow-y-auto overflow-x-hidden fixed z-50 flex justify-center items-center w-full md:inset-0 h-screen max-h-full bg-zinc-800/90"
        >
          <div className="relative p-4 w-full max-w-lg max-h-full">
            {/*<!-- Modal content -->*/}
            <div className="relative bg-zinc-900 rounded-2xl shadow-2xl border border-stone-700">
              {/*<!-- Modal header -->*/}
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t-2xl bg-zinc-800 border-stone-700">
                <h3 className="text-2xl font-semibold">Add Investment</h3>
                <CloseButton onClick={() => setOpen(false, "create")} />
              </div>
              {/*<!-- Modal body -->*/}
              <form className="p-4 md:p-5" onSubmit={handleSubmit}>
                <div className="grid gap-4 mb-4 grid-cols-2">
                  <div className="col-span-2">
                    <label
                      htmlFor="VIN"
                      className="block mb-2 text-sm font-medium"
                    >
                      VIN
                    </label>
                    <input
                      type="text"
                      name="VIN"
                      id="VIN"
                      className="w-full p-2.5 bg-zinc-800/80 border-2 border-gold-500/20 rounded-xl text-white placeholder-zinc-500 outline-none focus:bg-zinc-800 focus:border-gold-500 focus:ring-4 focus:ring-gold-500/10"
                      placeholder="VIN"
                      required
                      disabled={true}
                      value={field.VIN}
                    />
                  </div>
                  <div className="col-span-2">
                    <label
                      htmlFor="name"
                      className="block mb-2 text-sm font-medium"
                    >
                      Investment Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      className="w-full p-2.5 bg-zinc-800/80 border-2 border-gold-500/20 rounded-xl text-white placeholder-zinc-500 outline-none focus:bg-zinc-800 focus:border-gold-500 focus:ring-4 focus:ring-gold-500/10"
                      placeholder="Enter investment name"
                      required
                      value={field.name}
                      onChange={(e) => {
                        handleChange(e.target.value, "name");
                      }}
                    />
                  </div>
                  <div className="col-span-2">
                    <label
                      htmlFor="description"
                      className="block mb-2 text-sm font-medium"
                    >
                      Investment Description
                    </label>
                    <textarea
                      name="description"
                      id="description"
                      rows={6}
                      className="w-full p-2.5 bg-zinc-800/80 border-2 border-gold-500/20 rounded-xl text-white placeholder-zinc-500 outline-none focus:bg-zinc-800 focus:border-gold-500 focus:ring-4 focus:ring-gold-500/10"
                      placeholder="Enter Investment Description"
                      required
                      value={field.description}
                      onChange={(e) => {
                        handleChange(e.target.value, "description");
                      }}
                    />
                  </div>

                  {type === "create" && (
                    <div className="col-span-2">
                      <label
                        htmlFor="amount"
                        className="block mb-2 text-sm font-medium"
                      >
                        Investment Amount
                      </label>
                      <input
                        type="number"
                        name="amount"
                        id="amount"
                        className="w-full p-2.5 bg-zinc-800/80 border-2 border-gold-500/20 rounded-xl text-white placeholder-zinc-500 outline-none focus:bg-zinc-800 focus:border-gold-500 focus:ring-4 focus:ring-gold-500/10"
                        placeholder="Enter Investment Amount"
                        required
                        value={field.amount}
                        onChange={(e) => {
                          handleChange(e.target.value, "amount");
                        }}
                      />
                    </div>
                  )}
                  <div className="col-span-2">
                    <label
                      htmlFor="date"
                      className="block mb-2 text-sm font-medium"
                    >
                      Investment Date
                    </label>
                    <input
                      type="date"
                      name="date"
                      id="date"
                      className="w-full p-2.5 bg-zinc-800/80 border-2 border-gold-500/20 rounded-xl text-white placeholder-zinc-500 outline-none focus:bg-zinc-800 focus:border-gold-500 focus:ring-4 focus:ring-gold-500/10"
                      placeholder="Enter Investment Date"
                      required
                      value={field.date}
                      onChange={(e) => {
                        handleChange(e.target.value, "date");
                      }}
                    />
                  </div>
                </div>
                <div className="flex justify-end mt-10">
                  <button
                    type="submit"
                    className="text-white inline-flex items-end bg-gold-700 hover:bg-gold-600 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  >
                    Add Investment
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
