"use client";

import { CloseButton } from "@/src/components/button/CloseButton";
import { useLockBodyScroll } from "@/src/hooks/useLockBodyScroll";
import { AdminForm, User } from "@/src/interfaces";
import React, { useEffect, useState } from "react";

interface Props {
  open: boolean;
  setOpen: (value: boolean) => void;
  handleAction: (field: any) => Promise<boolean>;
  type: "create" | "edit";
  user?: User;
}

export const FormModal = ({
  open,
  setOpen,
  handleAction,
  type,
  user,
}: Props) => {
  const [field, setField] = useState<AdminForm>({
    name: "",
    lastname: "",
    email: "",
    password: "",
    role: "",
  });

  useEffect(() => {
    if (user) {
      setField({
        name: user.name,
        lastname: user.lastname,
        email: user.email,
        password: "",
        role: user.role,
      });
    }
  }, [user]);

  const handleChange = (value: string, nameField: string) => {
    setField((prev) => ({ ...prev, [nameField]: value }));
  };

  const clearFields = () => {
    setField(() => ({
      name: "",
      lastname: "",
      email: "",
      password: "",
      role: "",
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await handleAction(field);
    if (!response) return;
    clearFields();
    setOpen(false);
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
          <div className="relative p-4 w-full max-w-md max-h-full">
            {/*<!-- Modal content -->*/}
            <div className="relative bg-zinc-900 rounded-2xl shadow-2xl border border-stone-700">
              {/*<!-- Modal header -->*/}
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t-2xl bg-zinc-800 border-stone-700">
                <h3 className="text-2xl font-semibold">
                  {`${
                    type.charAt(0).toUpperCase() + type.slice(1)
                  } Administrator`}
                </h3>
                <CloseButton onClick={setOpen} />
              </div>
              {/*<!-- Modal body -->*/}
              <form className="p-4 md:p-5" onSubmit={handleSubmit}>
                <div className="grid gap-4 mb-4 grid-cols-2">
                  <div className="col-span-2">
                    <label
                      htmlFor="name"
                      className="block mb-2 text-sm font-medium"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      className="w-full p-2.5 bg-zinc-800/80 border-2 border-gold-500/20 rounded-xl text-white placeholder-zinc-500 outline-none focus:bg-zinc-800 focus:border-gold-500 focus:ring-4 focus:ring-gold-500/10"
                      placeholder="Enter Name"
                      required
                      value={field.name}
                      onChange={(e) => {
                        handleChange(e.target.value, "name");
                      }}
                    />
                  </div>
                  <div className="col-span-2">
                    <label
                      htmlFor="lastname"
                      className="block mb-2 text-sm font-medium"
                    >
                      Lastname
                    </label>
                    <input
                      type="text"
                      name="lastname"
                      id="lastname"
                      className="w-full p-2.5 bg-zinc-800/80 border-2 border-gold-500/20 rounded-xl text-white placeholder-zinc-500 outline-none focus:bg-zinc-800 focus:border-gold-500 focus:ring-4 focus:ring-gold-500/10"
                      placeholder="Enter Lastname"
                      required
                      value={field.lastname}
                      onChange={(e) => {
                        handleChange(e.target.value, "lastname");
                      }}
                    />
                  </div>
                  <div className="col-span-2">
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm font-medium"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      className="w-full p-2.5 bg-zinc-800/80 border-2 border-gold-500/20 rounded-xl text-white placeholder-zinc-500 outline-none focus:bg-zinc-800 focus:border-gold-500 focus:ring-4 focus:ring-gold-500/10"
                      placeholder="Enter Email"
                      required
                      value={field.email}
                      onChange={(e) => {
                        handleChange(e.target.value, "email");
                      }}
                    />
                  </div>

                  {type === "create" && (
                    <div className="col-span-2">
                      <label
                        htmlFor="password"
                        className="block mb-2 text-sm font-medium"
                      >
                        Password
                      </label>
                      <input
                        type="password"
                        name="password"
                        id="password"
                        className="w-full p-2.5 bg-zinc-800/80 border-2 border-gold-500/20 rounded-xl text-white placeholder-zinc-500 outline-none focus:bg-zinc-800 focus:border-gold-500 focus:ring-4 focus:ring-gold-500/10"
                        placeholder="Enter Password"
                        required
                        value={field.password}
                        onChange={(e) => {
                          handleChange(e.target.value, "password");
                        }}
                      />
                    </div>
                  )}
                  <div className="col-span-2">
                    <label
                      htmlFor="role"
                      className="block mb-2 text-sm font-medium"
                    >
                      Role
                    </label>
                    <select
                      id="role"
                      className="w-full p-2.5 bg-zinc-800/80 border-2 border-gold-500/20 rounded-xl text-white placeholder-zinc-500 outline-none focus:bg-zinc-800 focus:border-gold-500 focus:ring-4 focus:ring-gold-500/10"
                      value={field.role}
                      onChange={(e) => handleChange(e.target.value, "role")}
                    >
                      <option value="">Select role</option>
                      <option value="admin">Admin</option>
                      <option value="moderator">Moderator</option>
                    </select>
                  </div>
                </div>
                <div className="flex justify-end mt-10">
                  <button
                    type="submit"
                    className="text-white inline-flex items-end bg-gold-700 hover:bg-gold-600 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  >
                    {`${
                      type.charAt(0).toUpperCase() + type.slice(1)
                    } Administrator`}
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
