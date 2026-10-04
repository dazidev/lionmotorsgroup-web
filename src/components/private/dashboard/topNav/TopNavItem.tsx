"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface Props {
  path: string;
  labelText: string;
}

export const TopNavItem = ({ path, labelText }: Props) => {
  const currentPath = usePathname();
  const active =
    path === "/dashboard" ? currentPath === path : currentPath.startsWith(path);

  return (
    <li className="shrink-0">
      <Link
        href={path}
        className={`
          flex items-center justify-center
          h-14
          px-4 xl:px-5
          whitespace-nowrap
          rounded-lg
          transition-colors
          ${
            active
              ? "text-gold-400 font-bold"
              : "text-gold-700 hover:text-gold-400"
          }
        `}
      >
        <span className="text-base sm:text-lg xl:text-xl">{labelText}</span>
      </Link>
    </li>
  );
};
