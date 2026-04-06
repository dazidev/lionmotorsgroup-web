"use client";

import { VehicleCard } from "@/src/components";
import { Grid } from "../../../components";
import { FaAngleDown } from "react-icons/fa6";
import { FaArrowRightArrowLeft } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import { VehicleCardInterface } from "@/src/interfaces";
import { useState } from "react";

interface Props {
  vehicles: VehicleCardInterface[];
}

export const VehicleCatalog = ({ vehicles }: Props) => {
  const [open, setOpen] = useState({
    order: false,
  });

  return (
    <>
      <div className="flex flex-row w-full justify-between items-center bg-zinc-900 mt-5 py-3 px-4 border border-zinc-800 rounded-sm">
        <FaSearch />
        <input type="text" />
      </div>
      <div className="flex flex-row items-start w-full">
        <div className="flex-2/8 mt-5 h-auto bg-zinc-900 border border-zinc-800 rounded-sm">
          <div className="px-3">
            <h3 className="text-xl font-bold py-5">Search Filters</h3>
            <div className="flex flex-row justify-between items-center text-xl py-3 border-t border-zinc-800">
              <span>Price</span>
              <FaAngleDown />
            </div>
            <div className="flex flex-row justify-between items-center text-xl py-3 border-t border-zinc-800">
              <span>Brand</span>
              <FaAngleDown />
            </div>
            <div className="flex flex-row justify-between items-center text-xl py-3 border-t border-zinc-800">
              <span>Model</span>
              <FaAngleDown />
            </div>
            <div className="flex flex-row justify-between items-center text-xl py-3 border-t border-zinc-800">
              <span>Year and Mileage</span>
              <FaAngleDown />
            </div>
            <div className="flex flex-row justify-between items-center text-xl py-3 border-t border-zinc-800">
              <span>Mechanical</span>
              <FaAngleDown />
            </div>
            <div className="flex flex-row justify-between items-center text-xl py-3 border-t border-zinc-800">
              <span>Color</span>
              <FaAngleDown />
            </div>
          </div>
        </div>
        <div className="flex-6/8">
          <div className="flex flex-row justify-between mt-5 pl-5">
            <span className="flex py-2">{vehicles.length} Results</span>
            <div className="relative">
              <button
                className="flex items-center gap-3 bg-zinc-900 px-3 py-2 border border-zinc-800 rounded-3xl hover:cursor-pointer"
                onClick={() => {
                  setOpen((prev) => ({ ...prev, order: !prev.order }));
                }}
              >
                <span>Lower price</span>
                <FaArrowRightArrowLeft className="rotate-90" />
              </button>
              {open.order && (
                <div className="absolute top-full mt-2 p-3 w-56 right-0 flex flex-col z-10 bg-zinc-900 border border-zinc-800 rounded-sm">
                  <div className="mb-5">
                    <h3 className="text-sm font-bold">Price</h3>
                    <div>
                      <span className="flex flex-row items-center gap-3 py-1">
                        <input
                          type="checkbox"
                          id={"lower-price"}
                          value={"lower-price"}
                          className="h-4.5 w-4.5 accent-yellow-500 cursor-pointer"
                          checked={true}
                          onChange={() => {}}
                        />
                        <label
                          htmlFor={"lower-price"}
                          className="cursor-pointer"
                        >
                          Lower price
                        </label>
                      </span>
                    </div>
                    <div>
                      <span className="flex flex-row items-center gap-3 py-1">
                        <input
                          type="checkbox"
                          id={"lower-price"}
                          value={"lower-price"}
                          className="h-4.5 w-4.5 accent-yellow-500 cursor-pointer"
                          checked={false}
                          onChange={() => {}}
                        />
                        <label
                          htmlFor={"lower-price"}
                          className="cursor-pointer"
                        >
                          Higher price
                        </label>
                      </span>
                    </div>
                  </div>
                  <div className="mb-5">
                    <h3 className="text-sm font-bold">Mileage</h3>
                    <div>
                      <span className="flex flex-row items-center gap-3 py-1">
                        <input
                          type="checkbox"
                          id={"lower-price"}
                          value={"lower-price"}
                          className="h-4.5 w-4.5 accent-yellow-500 cursor-pointer"
                          checked={false}
                          onChange={() => {}}
                        />
                        <label
                          htmlFor={"lower-price"}
                          className="cursor-pointer"
                        >
                          Less mileage
                        </label>
                      </span>
                    </div>
                    <div>
                      <span className="flex flex-row items-center gap-3 py-1">
                        <input
                          type="checkbox"
                          id={"lower-price"}
                          value={"lower-price"}
                          className="h-4.5 w-4.5 accent-yellow-500 cursor-pointer"
                          checked={false}
                          onChange={() => {}}
                        />
                        <label
                          htmlFor={"lower-price"}
                          className="cursor-pointer"
                        >
                          More mileage
                        </label>
                      </span>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-bold">Year</h3>
                    <div>
                      <span className="flex flex-row items-center gap-3 py-1">
                        <input
                          type="checkbox"
                          id={"lower-price"}
                          value={"lower-price"}
                          className="h-4.5 w-4.5 accent-yellow-500 cursor-pointer"
                          checked={false}
                          onChange={() => {}}
                        />
                        <label
                          htmlFor={"lower-price"}
                          className="cursor-pointer"
                        >
                          Newer
                        </label>
                      </span>
                    </div>
                    <div>
                      <span className="flex flex-row items-center gap-3 py-1">
                        <input
                          type="checkbox"
                          id={"lower-price"}
                          value={"lower-price"}
                          className="h-4.5 w-4.5 accent-yellow-500 cursor-pointer"
                          checked={false}
                          onChange={() => {}}
                        />
                        <label
                          htmlFor={"lower-price"}
                          className="cursor-pointer"
                        >
                          Older
                        </label>
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          <Grid option="vehicles">
            {vehicles &&
              vehicles.map((veh) => (
                <VehicleCard
                  key={veh.id}
                  brand={veh.brand.name}
                  model={veh.model}
                  year={veh.year}
                  miles={veh.mileage}
                  price={veh.price}
                  image={veh.images[0].key}
                  link={`${veh.slug}-${veh.shortId}`}
                />
              ))}
          </Grid>
        </div>
      </div>
    </>
  );
};
