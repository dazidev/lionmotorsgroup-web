"use client";

import { TopNavItem } from "./TopNavItem";
import { useState } from "react";
import { IoMenu } from "react-icons/io5";
import { IoCloseSharp } from "react-icons/io5";

export const TopNavMobileButtom = () => {
  const [open, setOpen] = useState(false);

  const handleClose = (value: boolean) => {
    setOpen(value);
  };

  return (
    <>
      <div className="fixed top-0 right-0 z-50 sm:hidden flex justify-end items-center w-30 h-20 px-5 2xl:px-0">
        <button onClick={() => setOpen((prev) => !prev)}>
          {open ? (
            <IoCloseSharp
              width={50}
              height={50}
              className="text-gold-400 w-12 h-12"
            />
          ) : (
            <IoMenu
              width={50}
              height={50}
              className="text-gold-400 w-12 h-12"
            />
          )}
        </button>
      </div>
      {open && (
        <div className="fixed top-0 z-40 w-full min-h-screen pt-25 bg-stone-900 sm:hidden">
          <ul className="flex flex-col justify-center">
            <TopNavItem
              path="/home"
              labelText="Home"
              mobile={true}
              setClose={handleClose}
            />
            <TopNavItem
              path="/catalog"
              labelText="Catalog"
              mobile={true}
              setClose={handleClose}
            />
            <TopNavItem
              path="/about-us"
              labelText="About Us"
              mobile={true}
              setClose={handleClose}
            />
          </ul>
        </div>
      )}
    </>
  );
};
