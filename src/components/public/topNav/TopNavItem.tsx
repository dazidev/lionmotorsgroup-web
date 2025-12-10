"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface Props {
  path: string;
  labelText: string;
}

export const TopNavItem = ({ path, labelText }: Props) => {
  const currentPath = usePathname();

  return (
    <li>
      <Link
        href={path}
        className={`
          flex items-center h-14  rounded-lg 
          ${
            currentPath === path
              ? " text-gold-400 font-bold"
              : "text-gold-700 hover:text-gold-400"
          }
        `}
      >
        <div className="flex items-center pl-8">
          <span className={"ms-3 text-2xl"}>{labelText}</span>
        </div>
      </Link>
    </li>
  );
};
