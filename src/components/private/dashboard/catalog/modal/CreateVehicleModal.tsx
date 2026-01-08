"use client";
import { getVehiclesDetailsByVin } from "@/src/actions";
import { DefaultButton } from "@/src/components/button/DefaultButton";
import { CloseButton } from "@/src/components/button/CloseButton";
import { SelectInput } from "@/src/components/input/SelectInput";
import { TextInput } from "@/src/components/input/TextInput";
import { Carousel } from "@/src/components/public/carousel/Carousel";
import {
  ServerResponse,
  VehicleState,
  VehicleResponse,
} from "@/src/interfaces";
import { regex } from "@/src/utils/regex";
import { useEffect, useState } from "react";
import { SecuritySpecificationModal } from "./specification/SecuritySpecificationModal";
import { ConfortSpecificationModal } from "./specification/ConfortSpecificationModal";
import { useLockBodyScroll } from "@/src/hooks/useLockBodyScroll";
import { useCatalog } from "@/src/context/CatalogProvider";
import { SwiperSlide } from "swiper/react";
import { ImageInput } from "@/src/components/input/ImageInput";

import { LuMinus, LuPlus } from "react-icons/lu";

type ImageItem = {
  file: File | null;
  image: string | null;
};

type ImagesState = ImageItem[];

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
  const [loading, setLoading] = useState({
    searchVehicle: false,
  });
  const { brandsData } = useCatalog();

  const [imageAmount, setImageAmount] = useState(5);
  const [images, setImages] = useState<ImagesState>([]);

  let amount = Array.from({ length: imageAmount }, (_, i) => i + 1);

  useEffect(() => {
    amount = Array.from({ length: imageAmount }, (_, i) => i + 1);
    if (images.length === 0) {
      const initialImages = amount.map(() => {
        return {
          file: null,
          image: null,
        };
      });
      setImages(initialImages);
    }
    // add
    if (imageAmount > images.length) {
      setImages((prev) => {
        return [...prev, { file: null, image: null }];
      });
    }
    // subtract
    else if (imageAmount < images.length) {
      setImages((prev) => prev.slice(0, -1));
    }
  }, [imageAmount]);

  const statusOptions = ["in_stock", "on_sale", "sold"];

  const handleSearch = async () => {
    if (!regex.vin.test(vehicleData.vin)) return;

    const searchResponse: ServerResponse<any> = await getVehiclesDetailsByVin(
      vehicleData.vin,
      vehicleData.year
    );

    if (!searchResponse.success) return;

    const data: VehicleResponse = searchResponse.data;

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

  const handleChange = (value: string, option: string | undefined) => {
    if (option === undefined) return;
    setVehicleData((prev) => ({ ...prev, [option]: value }));
  };

  const handleImageAmount = (value: number) => {
    if (value < imageAmount && imageAmount <= 5) return;
    if (value > imageAmount && imageAmount >= 15) return;
    setImageAmount(value);
  };

  useLockBodyScroll(open);
  if (!open) return null;
  return (
    <div
      tabIndex={-1}
      className="overflow-hidden fixed z-50 flex justify-center items-center w-full md:inset-0 h-screen bg-zinc-800/90"
    >
      <div className="relative p-4 w-full max-w-5xl max-h-full">
        <div className="relative h-[calc(100vh-5rem)] overflow-y-auto no-scrollbar bg-zinc-900 rounded-2xl shadow-2xl border border-stone-700">
          <div className="sticky top-0 z-100 flex w-full border-b rounded-t-2xl border-stone-700 bg-zinc-800 p-5">
            <span className="text-2xl font-semibold">Create Vehicle</span>
            <CloseButton onClick={setOpen} element="create" />
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
              <DefaultButton
                name="Search Vehicle"
                onClick={handleSearch}
                size="w-40"
                loading={loading.searchVehicle}
              />
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
                <SelectInput
                  name={"Brand"}
                  options={brandsData}
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
            <div className="flex flex-col items-end w-full h-auto p-10 gap-5 border-b border-stone-700">
              <Carousel>
                {images.map((img, index) => (
                  <SwiperSlide
                    key={index}
                    className="flex items-center justify-center"
                  >
                    <ImageInput
                      file={img.file ?? null}
                      setFile={(f: File | null) =>
                        setImages((prev) =>
                          prev.map((img, i) =>
                            i === index ? { ...img, file: f } : img
                          )
                        )
                      }
                      preview={img.image ?? null}
                      setPreview={(f: string | null) =>
                        setImages((prev) =>
                          prev.map((img, i) =>
                            i === index ? { ...img, image: f } : img
                          )
                        )
                      }
                      label={false}
                      inputId={index.toString()}
                    />
                  </SwiperSlide>
                ))}
              </Carousel>
              <div className="flex flex-row items-center w-50 h-10 text-2xl border border-gray-50 rounded-xl">
                <button
                  className="flex flex-1 h-10 justify-center items-center cursor-pointer border-r"
                  onClick={() => handleImageAmount(imageAmount - 1)}
                >
                  <LuMinus className="transition-transform active:scale-130" />
                </button>
                <span className="flex flex-2 justify-center items-center h-10">
                  {imageAmount}
                </span>
                <button
                  className="flex flex-1 h-10 items-center justify-center cursor-pointer border-l"
                  onClick={() => handleImageAmount(imageAmount + 1)}
                >
                  <LuPlus className="transition-transform active:scale-130" />
                </button>
              </div>
            </div>
            <div className="flex p-5 justify-end">
              <DefaultButton
                name="Create Vehicle"
                onClick={handleSearch}
                size="w-40"
                loading={loading.searchVehicle}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
