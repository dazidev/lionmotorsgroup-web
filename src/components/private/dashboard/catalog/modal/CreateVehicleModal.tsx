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
  FuelType,
  DrivetrainType,
  TransmissionType,
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
import toast from "react-hot-toast";

type ImageItem = {
  file: File | null;
  image: string | null;
};

type ImagesState = ImageItem[];

interface Props {
  open: boolean;
  setOpen: (value: boolean, option: string) => void;
}

const statusOptions = ["in_stock", "on_sale", "reserved", "sold"];
const fuelOptions: FuelType[] = [
  "diesel",
  "electric",
  "gas",
  "gasoline",
  "hybrid",
];
const drivetrainOptions: DrivetrainType[] = ["FOUR_X_FOUR", "FOUR_X_TWO"];
const transmissionOptions: TransmissionType[] = ["automatic", "manual"];

const NUM_INITIAL_IMAGES = 5;

const initialVehicleState = {
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
  investment: "",
  //* Technical
  engineFuelType: "",
  engineConfiguration: "",
  engineCylinders: "",
  enginePower: "",
  engineDisplacement: "",
  engineTurbo: "",
  drivetrain: "",
  transmission: "",
};

export const CreateVehicleModal = ({ open, setOpen }: Props) => {
  const [vehicleData, setVehicleData] = useState(initialVehicleState);
  const [loading, setLoading] = useState({
    searchVehicle: false,
    createVehicle: false,
  });
  const { brandsData, specificationsData, resetCheckedSpec } = useCatalog();

  const [imageAmount, setImageAmount] = useState(NUM_INITIAL_IMAGES);
  const [images, setImages] = useState<ImagesState>([]);

  const amount = Array.from({ length: NUM_INITIAL_IMAGES }, (_, i) => i + 1);

  const colors = specificationsData
    .filter((spec) => spec.type === "visual")
    .map((spec) => spec.name);

  useEffect(() => {
    if (open === false) {
      clearData();
    }
    if (images.length === 0) {
      resetImagesState();
    }
    // add
    else if (imageAmount > images.length) {
      setImages((prev) => {
        return [...prev, { file: null, image: null }];
      });
    }
    // subtract
    else if (imageAmount < images.length) {
      setImages((prev) => prev.slice(0, -1));
    }
  }, [imageAmount, open]);

  const resetImagesState = () => {
    const initialImages = amount.map(() => {
      return {
        file: null,
        image: null,
      };
    });

    setImages(initialImages);
  };

  const handleSearch = async () => {
    if (!regex.vin.test(vehicleData.vin)) return;

    const searchResponse: ServerResponse<any> = await getVehiclesDetailsByVin(
      vehicleData.vin,
      vehicleData.year,
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
      investment: "",
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

  const handleCreateVehicle = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setLoading((prev) => ({
        ...prev,
        createVehicle: true,
      }));

      const specifications = specificationsData
        .filter((spec) => spec.checked)
        .map((spec) => spec.id);

      const imagesToUpload = images.filter(
        (img): img is typeof img & { file: File } => img.file !== null,
      );

      const formData = new FormData();

      formData.append("vehicle", JSON.stringify(vehicleData));

      formData.append("specifications", JSON.stringify(specifications));

      imagesToUpload.forEach(({ file }) => {
        formData.append("images", file);
      });

      const response = await fetch("/api/admin/vehicles", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.message ?? "There was an error creating the vehicle.",
        );
      }

      toast.success(
        result.message ?? "The vehicle has been created successfully!",
      );

      clearData();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unknown error.");
    } finally {
      setLoading((prev) => ({
        ...prev,
        createVehicle: false,
      }));
    }
  };

  const clearData = () => {
    setImageAmount(NUM_INITIAL_IMAGES);
    resetImagesState();
    resetCheckedSpec();
    setVehicleData(initialVehicleState);
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
          <form className="gap-3" onSubmit={handleCreateVehicle}>
            <fieldset
              disabled={loading.createVehicle}
              className="contents disabled:opacity-60"
            >
              <div className="flex flex-col p-5 gap-3 border-b rounded-t border-stone-700">
                <span className="text-xl font-semibold">Financials</span>
                <div className="flex max-w-70 gap-3">
                  <TextInput
                    name={"Initial Investment *"}
                    styles="flex-3"
                    value={vehicleData.investment}
                    valueOption="investment"
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="flex flex-col p-5 gap-3 border-b rounded-t border-stone-700">
                <span className="text-xl font-semibold">
                  General Specifications
                </span>
                <div className="flex min-w-full gap-3">
                  <TextInput
                    name={"VIN *"}
                    styles="flex-2"
                    value={vehicleData.vin}
                    valueOption="vin"
                    onChange={handleChange}
                    required
                  />
                  <TextInput
                    name={"Year *"}
                    styles="flex-1"
                    value={vehicleData.year}
                    valueOption="year"
                    onChange={handleChange}
                    required
                  />
                  <SelectInput
                    name={"Brand *"}
                    options={brandsData}
                    styles="flex-2"
                    value={vehicleData.brand}
                    valueOption="brand"
                    onChange={handleChange}
                    required
                  />
                  <TextInput
                    name={"Model *"}
                    styles="flex-2"
                    value={vehicleData.model}
                    valueOption="model"
                    onChange={handleChange}
                    required
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
                  <SelectInput
                    name={"Color Ext *"}
                    options={colors}
                    styles="flex-2"
                    value={vehicleData.colorExt}
                    valueOption="colorExt"
                    onChange={handleChange}
                    required
                  />
                  <SelectInput
                    name={"Color Int"}
                    options={colors}
                    styles="flex-2"
                    value={vehicleData.colorInt}
                    valueOption="colorInt"
                    onChange={handleChange}
                  />
                </div>
                <div className="flex min-w-full gap-3">
                  <TextInput
                    name={"Mileage *"}
                    styles="flex-2"
                    value={vehicleData.mileage}
                    valueOption="mileage"
                    onChange={handleChange}
                    required
                  />
                  <TextInput
                    name={"Price *"}
                    styles="flex-2"
                    value={vehicleData.price}
                    valueOption="price"
                    onChange={handleChange}
                    required
                  />
                  <SelectInput
                    name={"Status *"}
                    options={statusOptions}
                    styles="flex-2"
                    value={vehicleData.status}
                    valueOption="status"
                    onChange={handleChange}
                    required
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
                  <SelectInput
                    name={"Engine Fuel Type *"}
                    options={fuelOptions}
                    styles="flex-3"
                    value={vehicleData.engineFuelType}
                    valueOption="engineFuelType"
                    onChange={handleChange}
                    required
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
                  <SelectInput
                    name={"Drivetrain *"}
                    options={drivetrainOptions}
                    styles="flex-3"
                    value={vehicleData.drivetrain}
                    valueOption="drivetrain"
                    onChange={handleChange}
                    required
                  />
                  <SelectInput
                    name={"Transmission *"}
                    options={transmissionOptions}
                    styles="flex-3"
                    value={vehicleData.transmission}
                    valueOption="transmission"
                    onChange={handleChange}
                    required
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
                              i === index ? { ...img, file: f } : img,
                            ),
                          )
                        }
                        preview={img.image ?? null}
                        setPreview={(f: string | null) =>
                          setImages((prev) =>
                            prev.map((img, i) =>
                              i === index ? { ...img, image: f } : img,
                            ),
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
                    type="button"
                    className="flex flex-1 h-10 justify-center items-center cursor-pointer border-r"
                    onClick={() => handleImageAmount(imageAmount - 1)}
                  >
                    <LuMinus className="transition-transform active:scale-130" />
                  </button>
                  <span className="flex flex-2 justify-center items-center h-10">
                    {imageAmount}
                  </span>
                  <button
                    type="button"
                    className="flex flex-1 h-10 items-center justify-center cursor-pointer border-l"
                    onClick={() => handleImageAmount(imageAmount + 1)}
                  >
                    <LuPlus className="transition-transform active:scale-130" />
                  </button>
                </div>
              </div>
              <div className="flex p-5 justify-end">
                <DefaultButton
                  type="submit"
                  name="Create Vehicle"
                  size="w-40"
                  loading={loading.createVehicle}
                />
              </div>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  );
};
