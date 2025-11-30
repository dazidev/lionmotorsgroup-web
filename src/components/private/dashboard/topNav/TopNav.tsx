import React from "react";
import { TopNavItem } from "./TopNavItem";
import Image from "next/image";
import { redirect } from "next/navigation";
import { auth } from "@/src/auth.config";

export const TopNav = async () => {
  const session = await auth();

  if (!session?.user) {
    redirect("/auth/login");
  }

  const { name, email } = session.user;

  console.log(session.user);

  return (
    <nav className="fixed top-0 z-50 w-full px-[5%] h-20 bg-zinc-900 border-b shadow-2xl border-b-gold-700/50">
      <div className="flex flex-row px-3 py-3 lg:px-5 lg:pl-3">
        <div className="flex items-center justify-end pl-5">
          <Image
            src="/logo-sin-fondo-leon.png"
            alt="Logo"
            width={80}
            height={80}
          ></Image>
        </div>

        <div className="flex-1">
          <ul className="flex flex-row justify-center">
            <TopNavItem path="/dashboard" labelText="Home" />
            <TopNavItem path="/dashboard/admins" labelText="Admins" />
            <TopNavItem path="/dashboard/catalog" labelText="Catalog" />
          </ul>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex flex-col text-right">
            <div className="text-lg font-semibold text-white">Hi, {name}</div>
            <div className="text-sm text-slate-200">{email}</div>
          </div>
          <div className="w-10 h-10 rounded-full bg-linear-to-br from-gold-400 to-gold-700 flex items-center justify-center text-white font-semibold">
            DZ
          </div>
        </div>
      </div>
    </nav>
  );
};
