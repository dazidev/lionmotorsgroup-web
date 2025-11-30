"use client";

import { useActionState } from "react";
import { useSearchParams } from "next/navigation";
import { authenticate } from "@/src/actions";

export const LoginForm = () => {
  const searchParams = useSearchParams();

  //** errorMessage (contiene el error); isPending (es un loading ya implicito); callbackUrl (aun no se que hace) */

  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";
  const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
    undefined
  );

  return (
    <form action={formAction} className="flex flex-col">
      <label htmlFor="email">Email</label>
      <input
        placeholder="Enter you email..."
        className="w-full px-4 py-3.5 mb-5 bg-zinc-800/80 border-2 border-gold-500/20 rounded-xl text-white placeholder-zinc-500 outline-none transition-all duration-300 focus:bg-zinc-800 focus:border-gold-500 focus:ring-4 focus:ring-gold-500/10"
        required
        type="email"
        name="email"
      />

      <label htmlFor="password">Password</label>
      <input
        placeholder="Enter your password..."
        className="w-full px-4 py-3.5 mb-2 bg-zinc-800/80 border-2 border-gold-500/20 rounded-xl text-white placeholder-zinc-500 outline-none transition-all duration-300 focus:bg-zinc-800 focus:border-gold-500 focus:ring-4 focus:ring-gold-500/10"
        required
        type="password"
        name="password"
      />

      <button className="text-right text-gold-600 hover:text-gold-400 mb-5 sm:mb-10">
        Forgot Password?
      </button>

      {errorMessage && (
        <p className="text-red-500 text-center mb-2 sm:mb-5">{errorMessage}</p>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="w-full px-6 py-4 bg-linear-to-r from-gold-500 to-gold-600 text-black text-base font-semibold rounded-xl shadow-lg shadow-gold-500/30 transition-all duration-300 hover:from-gold-400 hover:to-gold-500 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-gold-500/40 active:translate-y-0 tracking-wide"
        aria-disabled={isPending}
      >
        {/* todo: it could be better!!! */}
        {isPending ? <p>Loading...</p> : <p>Sign In</p>}
      </button>
    </form>
  );
};
