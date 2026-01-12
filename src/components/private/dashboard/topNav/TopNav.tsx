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

  const { id, name, lastname, email, role } = session.user;

  console.log(session.user); //! delete

  return (
    <nav className="fixed top-0 z-50 w-full px-[5%] h-20 bg-zinc-900 border-b shadow-2xl border-b-gold-700/50">
      <div className="flex flex-row px-3 py-3">
        <div className="flex items-center h-14 justify-end pl-5">
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
            <TopNavItem path="/dashboard/leads" labelText="Leads" />
          </ul>
        </div>

        <div className="">
          <UserOptions
            name={name ?? ""}
            lastname={lastname ?? ""}
            email={email ?? ""}
            role={role ?? ""}
          />
        </div>
      </div>
    </nav>
  );
};
