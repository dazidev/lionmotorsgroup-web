"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface Props {
  path: string;
  labelText: string;
  mobile?: boolean;
  setClose?: (value: boolean) => void;
}

export const TopNavItem = ({
  path,
  labelText,
  mobile = false,
  setClose,
}: Props) => {
  const currentPath = usePathname();

  return (
    <li>
      <Link
        href={path}
        onClick={() => {
          if (mobile && setClose) setClose(false);
        }}
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
          <span className={"ms-3 text-3xl sm:text-2xl"}>{labelText}</span>
        </div>
      </Link>
    </li>
  );
};
