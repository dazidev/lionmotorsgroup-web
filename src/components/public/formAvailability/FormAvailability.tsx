"use client";

import { saveLead } from "@/src/actions";
import { FormLead } from "@/src/interfaces";
import { regex } from "@/src/utils/regex";
import { FormEvent, useState } from "react";
import { ErrorDialog } from "../../dialog/ErrorDialog";
import { SuccessDialog } from "../../dialog/SuccessDialog";

interface Props {
  vehicleId: string;
}

interface Loading {
  status: "" | "loading" | "loaded";
  message: string;
}

export const FormAvailability = ({ vehicleId }: Props) => {
  const initialStateForm = {
    name: "",
    lastname: "",
    email: "",
    zipcode: "",
    phoneNumber: "",
    comments: "",
    vehicleId: vehicleId,
  };
  const [form, setForm] = useState<FormLead>(initialStateForm);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState<Loading>({
    status: "",
    message: "",
  });

  const formValidation = (form: FormLead) => {
    const { name, lastname, email, zipcode, phoneNumber, comments, vehicleId } =
      form;
    if (name.length > 16 || name.length < 2)
      return "Name must be between 2 and 16 characters.";
    if (lastname.length > 16 || lastname.length < 2)
      return "Last name must be between 2 and 16 characters.";
    if (!regex.email.test(email)) return "Please enter a valid email address.";
    if (zipcode && !regex.zipcode.test(zipcode))
      return "Please enter a valid ZIP code (e.g., 12345 or 12345-6789).";
    if (phoneNumber && !regex.phoneNumber.test(phoneNumber))
      return "Please enter a valid U.S. phone number.";
    if (comments && comments.length > 200)
      return "Comments cannot exceed 200 characters.";
    if (!regex.uuidv4.test(vehicleId)) return "Unknown error.";
    return "";
  };

  const cleanForm = () => {
    setForm(initialStateForm);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validation = formValidation(form);
    if (validation) return setError(validation);
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
      className="flex flex-col h-auto bg-stone-900 rounded-2xl text-center gap-5 p-5"
      onSubmit={(e) => handleSubmit(e)}
    >
      <h1 className="text-2xl text-left">Confirm Availability</h1>
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
          placeholder="Zip Code"
          className="flex-1 min-w-0 px-4 py-3.5 bg-zinc-800/80 border-2 border-gray-200/20 rounded-xl text-white placeholder-zinc-500 outline-none transition-all duration-300 focus:bg-zinc-800 focus:border-gray-200 focus:ring-4 focus:ring-gold-500/10"
          required
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
        {loading.status === "loading" ? "Loading..." : "Confirm Availability"}
      </button>

      {error && <ErrorDialog error={error} />}
      {loading.status === "loaded" && (
        <SuccessDialog message={loading.message} />
      )}
    </form>
  );
};
