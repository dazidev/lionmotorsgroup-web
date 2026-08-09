"use client";

import { saveLead } from "@/src/actions";
import { FormLead } from "@/src/interfaces";
import { regex } from "@/src/utils/regex";
import { FormEvent, useState } from "react";
import { ErrorDialog } from "../../dialog/ErrorDialog";
import { SuccessDialog } from "../../dialog/SuccessDialog";
import { TypeLead } from "@prisma/client";
import { getSchemaErrorMessage, leadSchema } from "@/src/schemas";

interface Loading {
  status: "" | "loading" | "loaded";
  message: string;
}

export const FormContactUs = () => {
  const initialStateForm = {
    name: "",
    lastname: "",
    email: "",
    zipcode: "",
    phoneNumber: "",
    comments: "",
    type: "general" as TypeLead,
  };
  const [form, setForm] = useState<FormLead>(initialStateForm);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState<Loading>({
    status: "",
    message: "",
  });

  const cleanForm = () => {
    setForm(initialStateForm);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = leadSchema.safeParse(form);

    if (!result.success) {
      const error = getSchemaErrorMessage(result.error, "lead", "frontend");
      return setError(error);
    }
    setError("");

    setLoading((prev) => ({ ...prev, status: "loading" }));

    const response = await saveLead(form);
    if (!response.success) {
      setError(response.message!);
      setLoading((prev) => ({ ...prev, status: "" }));
      return;
    }

    cleanForm();
    setLoading({
      status: "loaded",
      message: response.message!,
    });
    return;
  };

  const handleChange = (value: string, option: keyof FormLead) => {
    setForm((prev) => ({ ...prev, [option]: value }));
  };

  return (
    <form
      className="flex flex-col items h-auto w-[75%] bg-stone-900 rounded-2xl text-center gap-5 p-5"
      onSubmit={(e) => handleSubmit(e)}
    >
      <div className="text-center">
        <h2 className="text-4xl font-light text-white">
          Contact <em className="italic text-gold-400">Us</em>
        </h2>
      </div>
      <p className="text-center text-gray-300 text-lg max-w-2xl mx-auto">
        Have questions about a vehicle or our services? Fill out the form below
        and our team will contact you shortly.
      </p>
      <div className="flex flex-row gap-5">
        <input
          placeholder="First Name"
          className="flex-1 min-w-0 px-4 py-3.5 bg-zinc-800/80 border-2 border-gray-200/20 rounded-xl text-white placeholder-zinc-500 outline-none transition-all duration-300 focus:bg-zinc-800 focus:border-gray-200 focus:ring-4 focus:ring-gold-500/10"
          value={form.name}
          onChange={(e) => {
            handleChange(e.target.value, "name");
          }}
          required
          type="text"
          name="first-name"
        />
        <input
          placeholder="Last Name"
          className="flex-1 min-w-0 px-4 py-3.5 bg-zinc-800/80 border-2 border-gray-200/20 rounded-xl text-white placeholder-zinc-500 outline-none transition-all duration-300 focus:bg-zinc-800 focus:border-gray-200 focus:ring-4 focus:ring-gold-500/10"
          required
          value={form.lastname}
          onChange={(e) => {
            handleChange(e.target.value, "lastname");
          }}
          type="text"
          name="last-name"
        />
      </div>
      <input
        placeholder="Email"
        className="w-full px-4 py-3.5 bg-zinc-800/80 border-2 border-gray-200/20 rounded-xl text-white placeholder-zinc-500 outline-none transition-all duration-300 focus:bg-zinc-800 focus:border-gray-200 focus:ring-4 focus:ring-gold-500/10"
        required
        value={form.email}
        onChange={(e) => {
          handleChange(e.target.value, "email");
        }}
        type="email"
        name="email"
      />
      <div className="flex flex-row gap-5">
        <input
          placeholder="Zip Code (optional)"
          className="flex-1 min-w-0 px-4 py-3.5 bg-zinc-800/80 border-2 border-gray-200/20 rounded-xl text-white placeholder-zinc-500 outline-none transition-all duration-300 focus:bg-zinc-800 focus:border-gray-200 focus:ring-4 focus:ring-gold-500/10"
          value={form.zipcode}
          onChange={(e) => {
            handleChange(e.target.value, "zipcode");
          }}
          type="number"
          name="zip-code"
        />
        <input
          placeholder="Phone Number"
          className="flex-1 min-w-0 px-4 py-3.5 bg-zinc-800/80 border-2 border-gray-200/20 rounded-xl text-white placeholder-zinc-500 outline-none transition-all duration-300 focus:bg-zinc-800 focus:border-gray-200 focus:ring-4 focus:ring-gold-500/10"
          required
          value={form.phoneNumber}
          onChange={(e) => {
            handleChange(e.target.value, "phoneNumber");
          }}
          type="number"
          name="phone-number"
        />
      </div>
      <textarea
        placeholder="Comments (optional)"
        className="w-full px-4 py-3.5 h-40 bg-zinc-800/80 border-2 border-gray-200/20 rounded-xl text-white placeholder-zinc-500 outline-none transition-all duration-300 focus:bg-zinc-800 focus:border-gray-200 focus:ring-4 focus:ring-gold-500/10"
        maxLength={200}
        value={form.comments}
        onChange={(e) => {
          handleChange(e.target.value, "comments");
        }}
        name="comments"
      />

      <button
        type="submit"
        disabled={loading.status === "loading" ? true : false}
        className="w-full px-6 py-4 bg-linear-to-r from-gold-500 to-gold-600 text-black text-base font-semibold rounded-xl transition-all duration-300 hover:from-gold-400 hover:to-gold-500 hover:-translate-y-0.5 active:translate-y-0 tracking-wide"
      >
        {loading.status === "loading" ? "Loading..." : "Send"}
      </button>

      {error && <ErrorDialog error={error} />}
      {loading.status === "loaded" && (
        <SuccessDialog message={loading.message} />
      )}
    </form>
  );
};
