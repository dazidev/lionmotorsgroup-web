"use client";

import { VehicleCard } from "@/src/components";
import { Grid } from "../../../components";
import { FaArrowRightArrowLeft } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import {
  DrivetrainType,
  FuelType,
  TransmissionType,
  VehicleCardInterface,
} from "@/src/interfaces";
import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { VehicleMenuFilter } from "./VehicleMenuFilter";

type Order =
  | "lower-price"
  | "higher-price"
  | "less-mileage"
  | "more-mileage"
  | "newer"
  | "older";

export interface Filters {
  rangePrice: {
    min: number;
    max: number;
  };
  brand: string[];
  model: string[];
  year: string[];
  rangeMileage: {
    min: number;
    max: number;
  };
  fuel: string[];
  transmission: string[];
  drivetrain: string[];
  color: string[];
  order: Order;
}

interface VehicleModel {
  brand: string;
  model: string;
}

export interface FilterData {
  lowerPrice: number;
  higherPrice: number;
  lowerMileage: number;
  higherMileage: number;
  brands: string[];
  models: VehicleModel[];
  years: number[];
  drivetrain: (DrivetrainType | undefined)[];
  transmission: (TransmissionType | undefined)[];
  engineFuelType: (FuelType | undefined)[];
  colors: string[];
}

export type OpenFilter =
  | ""
  | "order"
  | "price"
  | "brand"
  | "model"
  | "yearMilage"
  | "mechanical"
  | "color";

interface Props {
  vehicles: VehicleCardInterface[];
}

export const VehicleCatalog = ({ vehicles }: Props) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [data, setData] = useState<VehicleCardInterface[]>(vehicles);
  const [isEditing, setIsEditing] = useState(false);
  const [openOrder, setOpenOrder] = useState(false);
  const [filters, setFilters] = useState<Filters>({
    rangePrice: {
      min: 0,
      max: 0,
    },
    brand: [],
    model: [],
    year: [],
    rangeMileage: {
      min: 0,
      max: 0,
    },
    fuel: [],
    transmission: [],
    drivetrain: [],
    color: [],
    order: "lower-price",
  });

  const filterData = useMemo(() => {
    const prices = vehicles.map((vehicle) => vehicle.price);
    const mileages = vehicles.map((vehicle) => vehicle.mileage);

    return {
      lowerPrice: prices.length ? Math.min(...prices) : 0,
      higherPrice: prices.length ? Math.max(...prices) : 0,

      lowerMileage: mileages.length ? Math.min(...mileages) : 0,
      higherMileage: mileages.length ? Math.max(...mileages) : 0,

      brands: Array.from(
        new Set(vehicles.map((vehicle) => vehicle.brand.name)),
      ).sort((a, b) => a.localeCompare(b)),

      models: Array.from(
        new Map(
          vehicles.map((vehicle) => [
            `${vehicle.brand.name}-${vehicle.model}`,
            {
              brand: vehicle.brand.name,
              model: vehicle.model,
            },
          ]),
        ).values(),
      ).sort((a, b) => a.model.localeCompare(b.model)),

      years: Array.from(new Set(vehicles.map((vehicle) => vehicle.year))).sort(
        (a, b) => a - b,
      ),

      drivetrain: Array.from(
        new Set(vehicles.map((vehicle) => vehicle.technical?.drivetrain)),
      ).sort((a, b) => a!.localeCompare(b!)),
      transmission: Array.from(
        new Set(vehicles.map((vehicle) => vehicle.technical?.transmission)),
      ).sort((a, b) => a!.localeCompare(b!)),
      engineFuelType: Array.from(
        new Set(vehicles.map((vehicle) => vehicle.technical?.engineFuelType)),
      ).sort((a, b) => a!.localeCompare(b!)),
      colors: Array.from(
        new Set(vehicles.map((vehicle) => vehicle.colorExt)),
      ).sort((a, b) => a!.localeCompare(b!)),
    };
  }, [vehicles]);

  useEffect(() => {
    const param = {
      minPrice: searchParams.get("min_price"),
      maxPrice: searchParams.get("max_price"),
      brand: searchParams.get("brand"),
      model: searchParams.get("model"),
      year: searchParams.get("year"),
      minMileage: searchParams.get("min_mileage"),
      maxMileage: searchParams.get("max_mileage"),
      fuel: searchParams.get("fuel"),
      transmission: searchParams.get("transmission"),
      drivetrain: searchParams.get("drivetrain"),
      color: searchParams.get("color"),
    };

    setFilters((prev) => ({
      ...prev,
      rangePrice: {
        min: param.minPrice ? Number(param.minPrice) : filterData.lowerPrice,
        max: param.maxPrice ? Number(param.maxPrice) : filterData.higherPrice,
      },
      brand: param.brand ? param.brand.split(",") : [],
      model: param.model ? param.model.split(",") : [],
      year: param.year ? param.year.split(",") : [],
      rangeMileage: {
        min: param.minMileage
          ? Number(param.minMileage)
          : filterData.lowerMileage,
        max: param.maxMileage
          ? Number(param.maxMileage)
          : filterData.higherMileage,
      },
      fuel: param.fuel ? param.fuel.split(",") : [],
      transmission: param.transmission ? param.transmission.split(",") : [],
      drivetrain: param.drivetrain ? param.drivetrain.split(",") : [],
      color: param.color ? param.color.split(",") : [],
    }));
  }, []);

  useEffect(() => {
    if (isEditing) return;
    const filteredVehicles = vehicles.filter((veh) => {
      const matchPrice =
        veh.price >= filters.rangePrice.min &&
        veh.price <= filters.rangePrice.max;

      const matchBrand =
        filters.brand.length === 0 || filters.brand.includes(veh.brand.name);

      const matchModel =
        filters.model.length === 0 || filters.model.includes(veh.model);

      const matchYear =
        filters.year.length === 0 || filters.year.includes(veh.year.toString());

      const matchMilage =
        veh.mileage >= filters.rangeMileage.min &&
        veh.mileage <= filters.rangeMileage.max;

      const matchFuel =
        filters.fuel.length === 0 ||
        (veh.technical &&
          veh.technical.engineFuelType &&
          filters.fuel.includes(veh.technical.engineFuelType));

      const matchTransmission =
        filters.transmission.length === 0 ||
        (veh.technical &&
          veh.technical.transmission &&
          filters.transmission.includes(veh.technical.transmission));

      const matchDrivetrain =
        filters.drivetrain.length === 0 ||
        (veh.technical &&
          veh.technical.drivetrain &&
          filters.drivetrain.includes(veh.technical.drivetrain));

      const matchColor =
        filters.color.length === 0 || filters.color.includes(veh.colorExt);

      return (
        matchPrice &&
        matchBrand &&
        matchModel &&
        matchYear &&
        matchMilage &&
        matchFuel &&
        matchTransmission &&
        matchDrivetrain &&
        matchColor
      );
    });

    switch (filters.order) {
      case "lower-price":
        filteredVehicles.sort((a, b) => a.price - b.price);
        break;

      case "higher-price":
        filteredVehicles.sort((a, b) => b.price - a.price);
        break;

      case "less-mileage":
        filteredVehicles.sort((a, b) => a.mileage - b.mileage);
        break;

      case "more-mileage":
        filteredVehicles.sort((a, b) => b.mileage - a.mileage);
        break;

      case "newer":
        filteredVehicles.sort((a, b) => b.year - a.year);
        break;

      case "older":
        filteredVehicles.sort((a, b) => a.year - b.year);
        break;

      default:
        break;
    }

    setData(filteredVehicles);
  }, [vehicles, filters]);

  const handleOrder = (value: Order) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("order", value);

    setFilters((prev) => ({ ...prev, order: value }));

    router.push(`/catalog?${params.toString()}`);
  };

  return (
    <>
      <div className="flex w-full px-5 md:px-0">
        <div className="flex flex-row px-4 w-full justify-between items-center bg-zinc-900 mt-5 py-3 border border-zinc-800 rounded-sm">
          <FaSearch />
          <input type="text" />
        </div>
      </div>
      <div className="flex flex-col px-5 md:px-0 md:flex-row items-start w-full">
        <div className="flex w-full md:flex-2/8">
          <VehicleMenuFilter
            filters={filters}
            setFilters={setFilters}
            filterData={filterData}
            vehicles={vehicles}
            isEditing={isEditing}
            setIsEditing={setIsEditing}
          />
        </div>
        <div className="flex-col md:flex-6/8 w-full">
          <div className="flex flex-row justify-between mt-5 md:pl-5">
            <span className="flex py-2">{data.length} Results</span>
            <div className="relative">
              <button
                className="flex items-center gap-3 bg-zinc-900 px-3 py-2 border border-zinc-800 rounded-3xl hover:cursor-pointer"
                onClick={() => {
                  setOpenOrder((prev) => !prev);
                }}
              >
                <span>
                  {filters.order.slice(0, 1).toUpperCase() +
                    filters.order.slice(1).replace("-", " ")}
                </span>
                <FaArrowRightArrowLeft className="rotate-90" />
              </button>
              {openOrder && (
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
                          checked={filters.order === "lower-price"}
                          onChange={() => handleOrder("lower-price")}
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
                          id={"higher-price"}
                          value={"higher-price"}
                          className="h-4.5 w-4.5 accent-yellow-500 cursor-pointer"
                          checked={filters.order === "higher-price"}
                          onChange={() => handleOrder("higher-price")}
                        />
                        <label
                          htmlFor={"higher-price"}
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
                          id={"less-mileage"}
                          value={"less-mileage"}
                          className="h-4.5 w-4.5 accent-yellow-500 cursor-pointer"
                          checked={filters.order === "less-mileage"}
                          onChange={() => handleOrder("less-mileage")}
                        />
                        <label
                          htmlFor={"less-mileage"}
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
                          id={"more-mileage"}
                          value={"more-mileage"}
                          className="h-4.5 w-4.5 accent-yellow-500 cursor-pointer"
                          checked={filters.order === "more-mileage"}
                          onChange={() => handleOrder("more-mileage")}
                        />
                        <label
                          htmlFor={"more-mileage"}
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
                          id={"newer"}
                          value={"newer"}
                          className="h-4.5 w-4.5 accent-yellow-500 cursor-pointer"
                          checked={filters.order === "newer"}
                          onChange={() => handleOrder("newer")}
                        />
                        <label htmlFor={"newer"} className="cursor-pointer">
                          Newer
                        </label>
                      </span>
                    </div>
                    <div>
                      <span className="flex flex-row items-center gap-3 py-1">
                        <input
                          type="checkbox"
                          id={"older"}
                          value={"older"}
                          className="h-4.5 w-4.5 accent-yellow-500 cursor-pointer"
                          checked={filters.order === "older"}
                          onChange={() => handleOrder("older")}
                        />
                        <label htmlFor={"older"} className="cursor-pointer">
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
            {data &&
              data.map((veh) => (
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
