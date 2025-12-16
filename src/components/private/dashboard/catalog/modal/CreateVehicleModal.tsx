import { getVehiclesDetailsByVin } from "@/src/actions";
import { CloseButton } from "@/src/components/button/CloseButton";
import { DefaultButton } from "@/src/components/button/DefaultButton";
import { SelectInput } from "@/src/components/input/SelectInput";
import { TextInput } from "@/src/components/input/TextInput";
import {
  ServerResponse,
  VehicleState,
  VehicleResponse,
} from "@/src/interfaces";
import { regex } from "@/src/utils/regex";
import { useState } from "react";
import { SecuritySpecificationModal } from "./specification/SecuritySpecificationModal";
import { ConfortSpecificationModal } from "./specification/ConfortSpecificationModal";

interface Props {
  open: boolean;
  setOpen: (value: boolean, option: string) => void;
}

export const CreateVehicleModal = ({ open, setOpen }: Props) => {
  const [vehicleData, setVehicleData] = useState<VehicleState>({
    //* General
    vin: "",
    year: "",
    brand: "",
    model: "",
    series: "",
    doors: "",
    colorExt: "",
    colorInt: "",
    mileage: "",
    price: "",
    status: "",
    type: "",
    //* Technical
    engineFuelType: "",
    engineConfiguration: "",
    engineCylinders: "",
    enginePower: "",
    engineDisplacement: "",
    engineTurbo: "",
    drivetrain: "",
    transmission: "",
  });

  const statusOptions = ["in_stock", "on_sale", "sold"];

  const handleSearch = async () => {
    if (!regex.vin.test(vehicleData.vin)) return;

    const searchResponse: ServerResponse = await getVehiclesDetailsByVin(
      vehicleData.vin,
      vehicleData.year
    );

    if (!searchResponse.success) return;

    const data: VehicleResponse = searchResponse.data;

    console.log(data);

    setVehicleData({
      vin: data.general.vin,
      year: data.general.year,
      brand: data.general.brand,
      model: data.general.model,
      series: data.general.series,
      doors: data.general.doors,
      colorExt: "",
      colorInt: "",
      mileage: "",
      price: "",
      status: "",
      type: "",
      engineFuelType: data.technical.fuelType,
      engineConfiguration: data.technical.engine.configuration,
      engineCylinders: data.technical.engine.cylinders,
      enginePower: data.technical.engine.power,
      engineDisplacement: data.technical.engine.displacement,
      engineTurbo: data.technical.engine.turbo,
      drivetrain: data.technical.drivetrain,
      transmission: data.technical.transmission,
    });
  };

  const handleChange = (
    value: string,
    option: keyof VehicleState | undefined
  ) => {
    if (option === undefined) return;
    setVehicleData((prev) => ({ ...prev, [option]: value }));
  };

  return (
    <>
      {open && (
        <div
          tabIndex={-1}
          className="overflow-hidden fixed z-50 flex justify-center items-center w-full md:inset-0 h-screen"
        >
          <div className="relative p-4 w-full max-w-5xl max-h-full">
            <div className="relative h-[calc(100vh-5rem)] overflow-y-auto no-scrollbar bg-zinc-900 rounded-2xl shadow-2xl border border-stone-700">
              <div className="flex border-b rounded-t border-stone-700 p-5">
                <span className="text-2xl font-semibold ">Create Vehicle</span>
                <CloseButton onClick={setOpen} />
              </div>
              <div className="flex p-5 border-b rounded-t border-stone-700">
                <div className="flex justify-left items-end w-150 gap-3">
                  <TextInput
                    name={"VIN"}
                    styles="flex-3"
                    value={vehicleData.vin}
                    valueOption="vin"
                    onChange={handleChange}
                  />
                  <TextInput
                    name={"Year"}
                    styles="flex-1"
                    value={vehicleData.year}
                    valueOption="year"
                    onChange={handleChange}
                  />
                  <DefaultButton name="Search Vehicle" onClick={handleSearch} />
                </div>
              </div>
              <div className="gap-3">
                <div className="flex flex-col p-5 gap-3 border-b rounded-t border-stone-700">
                  <span className="text-xl font-semibold">
                    General Specifications
                  </span>
                  <div className="flex min-w-full gap-3">
                    <TextInput
                      name={"VIN"}
                      styles="flex-2"
                      value={vehicleData.vin}
                      valueOption="vin"
                      onChange={handleChange}
                    />
                    <TextInput
                      name={"Year"}
                      styles="flex-1"
                      value={vehicleData.year}
                      valueOption="year"
                      onChange={handleChange}
                    />
                    <TextInput
                      name={"Brand"}
                      styles="flex-2"
                      value={vehicleData.brand}
                      valueOption="brand"
                      onChange={handleChange}
                    />
                    <TextInput
                      name={"Model"}
                      styles="flex-2"
                      value={vehicleData.model}
                      valueOption="model"
                      onChange={handleChange}
                    />
                  </div>

                  <div className="flex min-w-full gap-3">
                    <TextInput
                      name={"Series"}
                      styles="flex-3"
                      value={vehicleData.series}
                      valueOption="series"
                      onChange={handleChange}
                    />
                    <TextInput
                      name={"Doors"}
                      styles="flex-2"
                      value={vehicleData.doors}
                      valueOption="doors"
                      onChange={handleChange}
                    />
                    <TextInput
                      name={"Color Ext"}
                      styles="flex-2"
                      value={vehicleData.colorExt}
                      valueOption="colorExt"
                      onChange={handleChange}
                    />
                    <TextInput
                      name={"Color Int"}
                      styles="flex-2"
                      value={vehicleData.colorInt}
                      valueOption="colorInt"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="flex min-w-full gap-3">
                    <TextInput
                      name={"Mileage"}
                      styles="flex-2"
                      value={vehicleData.mileage}
                      valueOption="mileage"
                      onChange={handleChange}
                    />
                    <TextInput
                      name={"Price"}
                      styles="flex-2"
                      value={vehicleData.price}
                      valueOption="price"
                      onChange={handleChange}
                    />
                    <SelectInput
                      name={"Status"}
                      options={statusOptions}
                      styles="flex-2"
                      value={vehicleData.status}
                      valueOption="status"
                      onChange={handleChange}
                    />
                    <TextInput
                      name={"Type"}
                      styles="flex-2"
                      value={vehicleData.type}
                      valueOption="type"
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="flex flex-col p-5 gap-3 border-b rounded-t border-stone-700">
                  <span className="text-xl font-semibold">
                    Technical Specifications
                  </span>
                  <div className="flex min-w-full gap-3">
                    <TextInput
                      name={"Engine Fuel Type"}
                      styles="flex-3"
                      value={vehicleData.engineFuelType}
                      valueOption="engineFuelType"
                      onChange={handleChange}
                    />
                    <TextInput
                      name={"Engine Configuration"}
                      styles="flex-4"
                      value={vehicleData.engineConfiguration}
                      valueOption="engineConfiguration"
                      onChange={handleChange}
                    />
                    <TextInput
                      name={"Engine Cylinders"}
                      styles="flex-3"
                      value={vehicleData.engineCylinders}
                      valueOption="engineCylinders"
                      onChange={handleChange}
                    />
                    <TextInput
                      name={"Engine Power"}
                      styles="flex-3"
                      value={vehicleData.enginePower}
                      valueOption="enginePower"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="flex min-w-full gap-3">
                    <TextInput
                      name={"Engine Displacement"}
                      styles="flex-3"
                      value={vehicleData.engineDisplacement}
                      valueOption="engineDisplacement"
                      onChange={handleChange}
                    />
                    <TextInput
                      name={"Engine Turbo"}
                      styles="flex-2"
                      value={vehicleData.engineTurbo}
                      valueOption="engineTurbo"
                      onChange={handleChange}
                    />
                    <TextInput
                      name={"Drivetrain"}
                      styles="flex-3"
                      value={vehicleData.drivetrain}
                      valueOption="drivetrain"
                      onChange={handleChange}
                    />
                    <TextInput
                      name={"Transmission"}
                      styles="flex-3"
                      value={vehicleData.transmission}
                      valueOption="transmission"
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <SecuritySpecificationModal />
                <ConfortSpecificationModal />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
