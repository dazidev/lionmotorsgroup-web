import React from "react";
import { TopNavItem } from "./TopNavItem";
import Image from "next/image";
import { redirect } from "next/navigation";
import { auth } from "@/src/auth.config";

export const TopNavPublic = async () => {
  return (
    <nav className="fixed top-0 z-50 w-full h-20 flex justify-center bg-zinc-900 border-b shadow-2xl border-b-gold-700/50">
      <div className="flex justify-between flex-row w-full sm:w-[1350px] py-3">
        <div className="flex items-center justify-end">
          <Image
            src="/logo-sin-fondo-leon.png"
            alt="Logo"
            width={80}
            height={80}
          ></Image>
        </div>

        <div className="">
          <ul className="flex flex-row justify-center">
            <TopNavItem path="/home" labelText="Home" />
            <TopNavItem path="/catalog" labelText="Catalog" />
            <TopNavItem path="/about-us" labelText="About Us" />
          </ul>
        </div>
      </div>
    </nav>
  );
};
