"use client";
import { logout } from "@/src/actions";
import { useClickOutside } from "@/src/hooks/useClickOutside";
import { useRef, useState } from "react";

interface Props {
  name: string;
  lastname: string;
  email: string;
  role: string;
}

export const UserOptions = ({ name, lastname, email, role }: Props) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const shortName = `${name?.slice(0, 1)}${lastname?.slice(0, 1)}`;

  useClickOutside(menuRef, () => setOpen(false), [btnRef]);

  return (
    <div className="relative shrink-0">
      <div className="flex items-center gap-3">
        <div className="hidden md:flex flex-col text-right max-w-55">
          <div className="text-base lg:text-lg font-semibold text-white truncate">
            Hi, {name}
          </div>

          <div className="text-sm text-slate-200 truncate">{email}</div>
        </div>

        <button
          ref={btnRef}
          type="button"
          className="w-10 h-10 shrink-0 rounded-full bg-linear-to-br from-gold-400 to-gold-700 flex items-center justify-center text-white font-semibold cursor-pointer"
          onClick={() => setOpen((v) => !v)}
        >
          {shortName}
        </button>
      </div>

      {open && (
        <div
          ref={menuRef}
          className="
            absolute
            right-0
            top-full
            mt-3
            z-60
            w-64
            max-w-[calc(100vw-2rem)]
            flex flex-col
            bg-zinc-900
            rounded-xl
            border border-stone-700
            shadow-2xl
          "
        >
          <div className="flex flex-col p-3 border-b border-stone-700 min-w-0">
            <span className="font-semibold truncate">
              {`${name} ${lastname}`}
            </span>

            <span className="text-sm text-slate-300 truncate">{email}</span>

            <span className="text-sm text-slate-400">{role}</span>
          </div>

          <div className="py-1 hover:bg-zinc-800 rounded-b-xl">
            <button
              className="flex w-full py-2 cursor-pointer"
              onClick={() => {
                setOpen(false);
                logout();
              }}
            >
              <span className="px-3">Sign Out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
