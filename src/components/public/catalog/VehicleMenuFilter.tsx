import { FaAngleDown } from "react-icons/fa6";
import { PriceInput } from "../../input/PriceInput";
import { MileageInput } from "../../input/MileageInput";
import { DrivetrainKey, drivetrainLabels } from "@/src/utils/labels";
import { Dispatch, SetStateAction, useMemo, useState } from "react";
import { OpenFilter, Filters, FilterData } from "./VehicleCatalog";
import { useRouter, useSearchParams } from "next/navigation";
import { VehicleCardInterface } from "@/src/interfaces";

interface Props {
  filters: Filters;
  setFilters: Dispatch<SetStateAction<Filters>>;
  filterData: FilterData;
  vehicles: VehicleCardInterface[];
  isEditing: boolean;
  setIsEditing: Dispatch<SetStateAction<boolean>>;
}

export const VehicleMenuFilter = ({
  filters,
  setFilters,
  filterData,
  vehicles,
  isEditing,
  setIsEditing,
}: Props) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const params = new URLSearchParams(searchParams.toString());
  const [open, setOpen] = useState<OpenFilter>("");

  const handlePriceRange = (option: "min" | "max", value: string) => {
    const numericValue = Number(value.replaceAll(",", ""));

    if (Number.isNaN(numericValue)) return;

    let validValue = 0;

    const matchRange =
      numericValue >= filterData.lowerPrice &&
      numericValue <= filterData.higherPrice;

    if (option === "min") {
      validValue = filterData.lowerPrice;
      if (matchRange) {
        validValue = numericValue;
      }
    } else if (option === "max") {
      validValue = filterData.higherPrice;
      if (matchRange) {
        validValue = numericValue;
      }
    }

    updateRangePrice(validValue, option);

    params.set("min_price", filters.rangePrice.min.toString());
    params.set("max_price", filters.rangePrice.max.toString());

    router.push(`/catalog?${params.toString()}`);
  };

  const handleMileageRange = (option: "min" | "max", value: string) => {
    const numericValue = Number(value.replaceAll(",", ""));

    if (Number.isNaN(numericValue)) return;

    let validValue = 0;

    const matchRange =
      numericValue >= filterData.lowerMileage &&
      numericValue <= filterData.higherMileage;

    if (option === "min") {
      validValue = filterData.lowerMileage;
      if (matchRange) {
        validValue = numericValue;
      }
    } else if (option === "max") {
      validValue = filterData.higherMileage;
      if (matchRange) {
        validValue = numericValue;
      }
    }

    updateRangeMileage(validValue, option);

    params.set("min_mileage", filters.rangeMileage.min.toString());
    params.set("max_mileage", filters.rangeMileage.max.toString());

    router.push(`/catalog?${params.toString()}`);
  };

  const handleBrand = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    const currentBrands = params.get("brand");

    let brands = currentBrands ? currentBrands.split(",") : [];

    if (!brands.includes(value)) {
      brands.push(value);
    } else {
      brands = brands.filter((brand) => brand !== value);
    }

    params.set("brand", brands.join(","));

    if (brands.length === 0) {
      params.delete("brand");
    }

    setFilters((prev) => ({ ...prev, brand: brands }));

    router.push(`/catalog?${params.toString()}`);
  };

  const brandCounts = useMemo(() => {
    const vehiclesForBrandCount = vehicles.filter((veh) => {
      const matchPrice =
        veh.price >= filters.rangePrice.min &&
        veh.price <= filters.rangePrice.max;

      return matchPrice;
    });

    return vehiclesForBrandCount.reduce<Record<string, number>>((acc, veh) => {
      const brand = veh.brand.name;

      acc[brand] = (acc[brand] ?? 0) + 1;

      return acc;
    }, {});
  }, [vehicles, filters.rangePrice]);

  const handleModel = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    const currentModels = params.get("model");

    let models = currentModels ? currentModels.split(",") : [];

    if (!models.includes(value)) {
      models.push(value);
    } else {
      models = models.filter((brand) => brand !== value);
    }

    params.set("model", models.join(","));

    if (models.length === 0) {
      params.delete("model");
    }

    setFilters((prev) => ({ ...prev, model: models }));

    router.push(`/catalog?${params.toString()}`);
  };

  const modelCounts = useMemo(() => {
    const vehiclesForModelCount = vehicles.filter((veh) => {
      const matchPrice =
        veh.price >= filters.rangePrice.min &&
        veh.price <= filters.rangePrice.max;

      const matchBrand =
        filters.brand.length === 0 || filters.brand.includes(veh.brand.name);

      return matchPrice && matchBrand;
    });

    return vehiclesForModelCount.reduce<Record<string, number>>((acc, veh) => {
      const key = `${veh.brand.name}-${veh.model}`;

      acc[key] = (acc[key] ?? 0) + 1;

      return acc;
    }, {});
  }, [vehicles, filters.rangePrice.min, filters.rangePrice.max, filters.brand]);

  const handleYear = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    const currentYears = params.get("year");

    let years = currentYears ? currentYears.split(",") : [];

    if (!years.includes(value)) {
      years.push(value);
    } else {
      years = years.filter((year) => year !== value);
    }

    params.set("year", years.join(","));

    if (years.length === 0) {
      params.delete("year");
    }

    setFilters((prev) => ({ ...prev, year: years }));

    router.push(`/catalog?${params.toString()}`);
  };

  const handleFuel = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    const currentFuels = params.get("fuel");

    let fuels = currentFuels ? currentFuels.split(",") : [];

    if (!fuels.includes(value)) {
      fuels.push(value);
    } else {
      fuels = fuels.filter((fuel) => fuel !== value);
    }

    params.set("fuel", fuels.join(","));

    if (fuels.length === 0) {
      params.delete("fuel");
    }

    setFilters((prev) => ({ ...prev, fuel: fuels }));

    router.push(`/catalog?${params.toString()}`);
  };

  const handleTransmission = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    const currentTransmissions = params.get("transmission");

    let transmissions = currentTransmissions
      ? currentTransmissions.split(",")
      : [];

    if (!transmissions.includes(value)) {
      transmissions.push(value);
    } else {
      transmissions = transmissions.filter(
        (transmission) => transmission !== value,
      );
    }

    params.set("transmission", transmissions.join(","));

    if (transmissions.length === 0) {
      params.delete("transmission");
    }

    setFilters((prev) => ({ ...prev, transmission: transmissions }));

    router.push(`/catalog?${params.toString()}`);
  };

  const handleDrivetrain = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    const currentDrivetrains = params.get("drivetrain");

    let drivetrains = currentDrivetrains ? currentDrivetrains.split(",") : [];

    if (!drivetrains.includes(value)) {
      drivetrains.push(value);
    } else {
      drivetrains = drivetrains.filter((drivetrain) => drivetrain !== value);
    }

    params.set("drivetrain", drivetrains.join(","));

    if (drivetrains.length === 0) {
      params.delete("drivetrain");
    }

    setFilters((prev) => ({ ...prev, drivetrain: drivetrains }));

    router.push(`/catalog?${params.toString()}`);
  };

  const handleColor = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    const currentColors = params.get("color");

    let colors = currentColors ? currentColors.split(",") : [];

    if (!colors.includes(value)) {
      colors.push(value);
    } else {
      colors = colors.filter((color) => color !== value);
    }

    params.set("color", colors.join(","));

    if (colors.length === 0) {
      params.delete("color");
    }

    setFilters((prev) => ({ ...prev, color: colors }));

    router.push(`/catalog?${params.toString()}`);
  };

  const updateRangePrice = (value: number, option: "min" | "max") => {
    setFilters((prev) => ({
      ...prev,
      rangePrice: {
        ...prev.rangePrice,
        [option]: value,
      },
    }));
  };

  const updateRangeMileage = (value: number, option: "min" | "max") => {
    setFilters((prev) => ({
      ...prev,
      rangeMileage: {
        ...prev.rangeMileage,
        [option]: value,
      },
    }));
  };

  return (
    <div className="w-full mt-5 h-auto bg-zinc-900 border border-zinc-800 rounded-sm">
      <div className="px-3">
        <h3 className="text-xl font-bold py-5">Search Filters</h3>
        <div className="flex flex-col text-xl py-3 border-t border-zinc-800">
          <button
            className="flex flex-row justify-between items-center w-full focus:cursor-pointer"
            onClick={() => setOpen(open === "price" ? "" : "price")}
          >
            <span>Price</span>

            <FaAngleDown
              className={`transition-transform duration-300 ${open !== "price" ? "rotate-0" : "rotate-180"}`}
            />
          </button>
          <div className={`pt-2 gap-3 ${open !== "price" ? "hidden" : "flex"}`}>
            <PriceInput
              name={"From"}
              value={filters.rangePrice.min}
              option={"min"}
              action={handlePriceRange}
              onChange={updateRangePrice}
              isEditing={isEditing}
              setIsEditing={setIsEditing}
            />
            <PriceInput
              name={"To"}
              value={filters.rangePrice.max}
              option={"max"}
              action={handlePriceRange}
              onChange={updateRangePrice}
              isEditing={isEditing}
              setIsEditing={setIsEditing}
            />
          </div>
        </div>
        <div className="flex flex-col text-xl py-3 border-t border-zinc-800">
          <button
            className="flex flex-row justify-between items-center w-full focus:cursor-pointer"
            onClick={() => setOpen(open === "brand" ? "" : "brand")}
          >
            <span>Brand</span>

            <FaAngleDown
              className={`transition-transform duration-300 ${open !== "brand" ? "rotate-0" : "rotate-180"}`}
            />
          </button>
          <div
            className={`pt-2 ${open !== "brand" ? "hidden" : "flex flex-col"}`}
          >
            {filterData.brands.map((brand) => {
              const count = brandCounts[brand] ?? 0;
              const isSelected = filters.brand.includes(brand);
              const isDisabled = count === 0 && !isSelected;

              return (
                <span
                  key={brand}
                  className="flex flex-row items-center gap-3 py-1"
                >
                  <input
                    type="checkbox"
                    id={brand}
                    value={brand}
                    className="h-4.5 w-4.5 accent-yellow-500 cursor-pointer"
                    checked={isSelected}
                    disabled={isDisabled}
                    onClick={() => handleBrand(brand)}
                  />
                  <label
                    htmlFor={brand}
                    className={`cursor-pointer text-lg ${isDisabled ? "text-zinc-500" : "text-white"}`}
                  >
                    {brand} ({count})
                  </label>
                </span>
              );
            })}
          </div>
        </div>
        <div className="flex flex-col text-xl py-3 border-t border-zinc-800">
          <button
            className="flex flex-row justify-between items-center w-full focus:cursor-pointer"
            onClick={() => setOpen(open === "model" ? "" : "model")}
          >
            <span>Model</span>

            <FaAngleDown
              className={`transition-transform duration-300 ${open !== "model" ? "rotate-0" : "rotate-180"}`}
            />
          </button>
          <div
            className={`pt-2 ${open !== "model" ? "hidden" : "flex flex-col"}`}
          >
            {filterData.models.map((item) => {
              const key = `${item.brand}-${item.model}`;
              const count = modelCounts[key] ?? 0;
              const isSelected = filters.model.includes(item.model);
              if (
                filters.brand.length !== 0 &&
                !filters.brand.includes(item.brand)
              ) {
                return;
              }

              return (
                <span
                  key={key}
                  className="flex flex-row items-center gap-3 py-1"
                >
                  <input
                    type="checkbox"
                    id={item.model}
                    value={item.model}
                    className="h-4.5 w-4.5 accent-yellow-500 cursor-pointer"
                    checked={isSelected}
                    onClick={() => handleModel(item.model)}
                  />
                  <label
                    htmlFor={item.model}
                    className={`cursor-pointer text-lg ${false ? "text-zinc-500" : "text-white"}`}
                  >
                    {item.model} ({count})
                  </label>
                </span>
              );
            })}
          </div>
        </div>
        <div className="flex flex-col text-xl py-3 border-t border-zinc-800">
          <button
            className="flex flex-row justify-between items-center w-full focus:cursor-pointer"
            onClick={() => setOpen(open === "yearMilage" ? "" : "yearMilage")}
          >
            <span>Year and Mileage</span>

            <FaAngleDown
              className={`transition-transform duration-300 ${open !== "yearMilage" ? "rotate-0" : "rotate-180"}`}
            />
          </button>
          <div
            className={`pt-2 ${open !== "yearMilage" ? "hidden" : "flex flex-col"}`}
          >
            <span>Year</span>
            <div className="flex grid-cols-4 gap-2 pt-1">
              {filterData.years.map((year) => {
                return (
                  <button
                    key={year}
                    className={`flex border w-auto py-1 px-2 text-base text-center rounded-sm
                          ${filters.year.includes(year.toString()) ? "border-gold-500 text-gold-500 hover:bg-gold-700/30" : "border-white hover:bg-white hover:border-black hover:text-black"}
                          hover:cursor-pointer `}
                    onClick={() => handleYear(year.toString())}
                  >
                    {year}
                  </button>
                );
              })}
            </div>
            <span className="pt-4">Milage</span>
            <div className="flex flex-row pt-2 gap-3">
              <MileageInput
                name={"Minimum"}
                value={filters.rangeMileage.min}
                option={"min"}
                action={handleMileageRange}
                onChange={updateRangeMileage}
                isEditing={isEditing}
                setIsEditing={setIsEditing}
              />
              <MileageInput
                name={"maximum"}
                value={filters.rangeMileage.max}
                option={"max"}
                action={handleMileageRange}
                onChange={updateRangeMileage}
                isEditing={isEditing}
                setIsEditing={setIsEditing}
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col text-xl py-3 border-t border-zinc-800">
          <button
            className="flex flex-row justify-between items-center w-full focus:cursor-pointer"
            onClick={() => setOpen(open === "mechanical" ? "" : "mechanical")}
          >
            <span>Mechanical</span>

            <FaAngleDown
              className={`transition-transform duration-300 ${open !== "mechanical" ? "rotate-0" : "rotate-180"}`}
            />
          </button>
          <div
            className={`pt-2 ${open !== "mechanical" ? "hidden" : "flex flex-col"}`}
          >
            <span>Fuel</span>
            <div className="flex grid-cols-4 gap-2 pt-1">
              {filterData.engineFuelType.map((fuel) => {
                if (fuel) {
                  const fuelFormat =
                    fuel.slice(0, 1).toUpperCase() + fuel.slice(1);
                  return (
                    <button
                      key={fuel}
                      className={`flex border w-auto py-1 px-2 text-base text-center rounded-sm
                          ${filters.fuel.includes(fuel) ? "border-gold-500 text-gold-500 hover:bg-gold-700/30" : "border-white hover:bg-white hover:border-black hover:text-black"}
                          hover:cursor-pointer `}
                      onClick={() => handleFuel(fuel)}
                    >
                      {fuelFormat}
                    </button>
                  );
                }
              })}
            </div>
            <span className="pt-4">Transmission</span>
            <div className="flex grid-cols-4 gap-2 pt-1">
              {filterData.transmission.map((transmission) => {
                if (transmission) {
                  const transmissionFormat =
                    transmission.slice(0, 1).toUpperCase() +
                    transmission.slice(1);
                  return (
                    <button
                      key={transmission}
                      className={`flex border w-auto py-1 px-2 text-base text-center rounded-sm
                          ${filters.transmission.includes(transmission) ? "border-gold-500 text-gold-500 hover:bg-gold-700/30" : "border-white hover:bg-white hover:border-black hover:text-black"}
                          hover:cursor-pointer `}
                      onClick={() => handleTransmission(transmission)}
                    >
                      {transmissionFormat}
                    </button>
                  );
                }
              })}
            </div>
            <span className="pt-4">Drivetrain</span>
            <div className="flex grid-cols-4 gap-2 pt-1">
              {filterData.drivetrain.map((drivetrain) => {
                if (drivetrain) {
                  let drivetrainFormat =
                    drivetrainLabels[drivetrain as DrivetrainKey];
                  return (
                    <button
                      key={drivetrain}
                      className={`flex border w-auto py-1 px-2 text-base text-center rounded-sm
                          ${filters.drivetrain.includes(drivetrain) ? "border-gold-500 text-gold-500 hover:bg-gold-700/30" : "border-white hover:bg-white hover:border-black hover:text-black"}
                          hover:cursor-pointer `}
                      onClick={() => handleDrivetrain(drivetrain)}
                    >
                      {drivetrainFormat}
                    </button>
                  );
                }
              })}
            </div>
          </div>
        </div>
        <div className="flex flex-col text-xl py-3 border-t border-zinc-800">
          <button
            className="flex flex-row justify-between items-center w-full focus:cursor-pointer"
            onClick={() => setOpen(open === "color" ? "" : "color")}
          >
            <span>Color</span>

            <FaAngleDown
              className={`transition-transform duration-300 ${open !== "color" ? "rotate-0" : "rotate-180"}`}
            />
          </button>
          <div
            className={`pt-2 ${open !== "color" ? "hidden" : "flex flex-col"}`}
          >
            {filterData.colors.map((color) => {
              const isSelected = filters.color.includes(color);
              if (
                filters.brand.length !== 0 &&
                !filters.brand.includes(color)
              ) {
                return;
              }

              return (
                <span
                  key={color}
                  className="flex flex-row items-center gap-3 py-1"
                >
                  <input
                    type="checkbox"
                    id={color}
                    value={color}
                    className="h-4.5 w-4.5 accent-yellow-500 cursor-pointer"
                    checked={isSelected}
                    onClick={() => handleColor(color)}
                  />
                  <label
                    htmlFor={color}
                    className={`cursor-pointer text-lg ${false ? "text-zinc-500" : "text-white"}`}
                  >
                    {color}
                  </label>
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
