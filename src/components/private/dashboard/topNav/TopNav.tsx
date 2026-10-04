"use server";
import { TopNavItem } from "./TopNavItem";
import Image from "next/image";
import { redirect } from "next/navigation";
import { auth } from "@/src/auth.config";
import { UserOptions } from "./UserOptions";

export const TopNav = async () => {
  const session = await auth();

  if (!session?.user) {
    redirect("/auth/login");
  }

  const { name, lastname, email, role } = session.user;

  return (
    <nav className="fixed top-0 z-50 w-full bg-zinc-900 border-b shadow-2xl border-b-gold-700/50">
      <div className="flex items-center justify-between h-20 px-4 sm:px-6 lg:px-[5%]">
        <div className="flex items-center shrink-0">
          <Image
            src="/logo-sin-fondo-leon.png"
            alt="Logo"
            width={80}
            height={80}
            className="w-14 h-14 sm:w-16 sm:h-16 object-contain"
          />
        </div>

        <div className="hidden lg:flex flex-1 justify-center">
          <ul className="flex items-center">
            <TopNavItem path="/dashboard" labelText="Home" />
            <TopNavItem path="/dashboard/admins" labelText="Admins" />
            <TopNavItem path="/dashboard/catalog" labelText="Catalog" />
            <TopNavItem path="/dashboard/leads" labelText="Leads" />
            <TopNavItem path="/dashboard/financials" labelText="Financials" />
          </ul>
        </div>

        <UserOptions
          name={name ?? ""}
          lastname={lastname ?? ""}
          email={email ?? ""}
          role={role ?? ""}
        />
      </div>

      <div className="lg:hidden overflow-x-auto no-scrollbar border-t border-stone-800">
        <ul className="flex min-w-max px-2">
          <TopNavItem path="/dashboard" labelText="Home" />
          <TopNavItem path="/dashboard/admins" labelText="Admins" />
          <TopNavItem path="/dashboard/catalog" labelText="Catalog" />
          <TopNavItem path="/dashboard/leads" labelText="Leads" />
          <TopNavItem path="/dashboard/financials" labelText="Financials" />
        </ul>
      </div>
    </nav>
  );
};
