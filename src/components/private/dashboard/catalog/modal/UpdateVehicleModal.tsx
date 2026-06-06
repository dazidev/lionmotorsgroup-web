"use client";

import { attachVehicleImages, createVehicle } from "@/src/actions";
import { DefaultButton } from "@/src/components/button/DefaultButton";
import { CloseButton } from "@/src/components/button/CloseButton";
import { SelectInput } from "@/src/components/input/SelectInput";
import { TextInput } from "@/src/components/input/TextInput";
import { Carousel } from "@/src/components/public/carousel/Carousel";
import {
  VehicleState,
  FuelType,
  DrivetrainType,
  TransmissionType,
  Vehicle,
} from "@/src/interfaces";
import { useEffect, useState } from "react";
import { SecuritySpecificationModal } from "./specification/SecuritySpecificationModal";
import { ConfortSpecificationModal } from "./specification/ConfortSpecificationModal";
import { useLockBodyScroll } from "@/src/hooks/useLockBodyScroll";
import { useCatalog } from "@/src/context/CatalogProvider";
import { SwiperSlide } from "swiper/react";
import { ImageInput } from "@/src/components/input/ImageInput";

import { LuMinus, LuPlus } from "react-icons/lu";
import toast from "react-hot-toast";

const NUM_INITIAL_IMAGES = 5;
const MAX_IMAGES = 15;
const R2_PUBLIC_URL = "https://images.lionmotorsgroup.com";

type ImageItem = {
  id?: string;
  key?: string;
  position: number;
  file: File | null;
  image: string | null;
  isExisting: boolean;
};

type ImagesState = ImageItem[];

const createEmptyImage = (position: number): ImageItem => ({
  position,
  file: null,
  image: null,
  isExisting: false,
});

interface Props {
  open: boolean;
  setOpen: (value: boolean, option: string) => void;
  vehicle?: Vehicle | null;
}

const statusOptions = ["in_stock", "on_sale", "sold"];

const fuelOptions: FuelType[] = [
  "diesel",
  "electric",
  "gas",
  "gasoline",
  "hybrid",
];

const drivetrainOptions: DrivetrainType[] = ["FOUR_X_FOUR", "FOUR_X_TWO"];

const transmissionOptions: TransmissionType[] = ["automatic", "manual"];

type InitialVehicleState = {
  //* General
  id: string;
  vin: string;
  year: string;
  brand: string;
  model: string;
  series: string;
  doors: string;
  colorExt: string;
  colorInt: string;
  mileage: string;
  price: string;
  status: string;
  type: string;
  investment: string;

  //* Technical
  engineFuelType: string;
  engineConfiguration: string;
  engineCylinders: string;
  enginePower: string;
  engineDisplacement: string;
  engineTurbo: string;
  drivetrain: string;
  transmission: string;
};

const InitialState: InitialVehicleState = {
  //* General
  id: "",
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

export const UpdateVehicleModal = ({ open, setOpen, vehicle }: Props) => {
  const [vehicleData, setVehicleData] =
    useState<InitialVehicleState>(InitialState);

  const [loading, setLoading] = useState({
    updateVehicle: false,
  });

  const { brandsData, specificationsData, resetCheckedSpec } = useCatalog();

  const [imageAmount, setImageAmount] = useState(NUM_INITIAL_IMAGES);

  const [images, setImages] = useState<ImagesState>(() =>
    Array.from({ length: NUM_INITIAL_IMAGES }, (_, index) =>
      createEmptyImage(index),
    ),
  );

  useLockBodyScroll(open);

  const colors = specificationsData
    .filter((spec) => spec.type === "visual")
    .map((spec) => spec.name);

  const resetImagesState = () => {
    const initialImages = Array.from(
      { length: NUM_INITIAL_IMAGES },
      (_, index) => createEmptyImage(index),
    );

    setImages(initialImages);
  };

  const clearData = () => {
    setImageAmount(NUM_INITIAL_IMAGES);
    resetImagesState();
    resetCheckedSpec();
    setVehicleData(InitialState);
  };

  const handleChange = (value: string, option: string | undefined) => {
    if (option === undefined) return;

    setVehicleData((prev) => ({
      ...prev,
      [option]: value,
    }));
  };

  const handleImageAmount = (value: number) => {
    if (value < NUM_INITIAL_IMAGES) return;
    if (value > MAX_IMAGES) return;

    setImageAmount(value);
  };

  useEffect(() => {
    if (!vehicle) return;

    setVehicleData({
      //* General
      id: vehicle.id,
      vin: vehicle.vin,
      year: vehicle.year.toString(),
      brand: vehicle.brand.id,
      model: vehicle.model,
      series: vehicle.series,
      doors: vehicle.doors.toString(),
      colorExt: vehicle.colorExt ?? "",
      colorInt: vehicle.colorInt ?? "",
      mileage: vehicle.mileage.toString(),
      price: vehicle.price.toString(),
      status: vehicle.status,
      type: vehicle.type ?? "",
      investment: vehicle.investment.toString(),

      //* Technical
      engineFuelType: vehicle.technical?.engineFuelType ?? "",
      engineConfiguration: vehicle.technical?.engineConfiguration ?? "",
      engineCylinders: vehicle.technical?.engineCylinders.toString() ?? "",
      enginePower: vehicle.technical?.enginePower.toString() ?? "",
      engineDisplacement:
        vehicle.technical?.engineDisplacement.toString() ?? "",
      engineTurbo: vehicle.technical?.engineTurbo ?? "",
      drivetrain: vehicle.technical?.drivetrain ?? "",
      transmission: vehicle.technical?.transmission ?? "",
    });

    const orderedImages: ImagesState = [...vehicle.images]
      .sort((a, b) => a.position - b.position)
      .map((img) => ({
        id: img.id,
        key: img.key,
        position: img.position,
        file: null,
        image: `${R2_PUBLIC_URL}/${img.key}`,
        isExisting: true,
      }));

    console.log("ORDERED IMAGES:", orderedImages);

    const imagesToShow =
      orderedImages.length >= NUM_INITIAL_IMAGES
        ? orderedImages
        : [
            ...orderedImages,
            ...Array.from(
              { length: NUM_INITIAL_IMAGES - orderedImages.length },
              (_, index) => createEmptyImage(orderedImages.length + index),
            ),
          ];

    setImages(imagesToShow);
    setImageAmount(imagesToShow.length);
  }, [vehicle]);

  useEffect(() => {
    if (!open) {
      clearData();
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;

    setImages((prev) => {
      if (imageAmount > prev.length) {
        const newImages = Array.from(
          { length: imageAmount - prev.length },
          (_, index) => createEmptyImage(prev.length + index),
        );

        return [...prev, ...newImages];
      }

      if (imageAmount < prev.length) {
        return prev.slice(0, imageAmount);
      }

      return prev;
    });
  }, [imageAmount, open]);

  const handleUpdateVehicle = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setLoading((prev) => ({ ...prev, updateVehicle: true }));

      const specifications = specificationsData
        .filter((spec) => spec.checked)
        .map((spec) => spec.id);

      const imagesWithFile = images.filter(
        (img): img is ImageItem & { file: File } => img.file !== null,
      );

      const imagesData = imagesWithFile.map((img) => ({
        mime: img.file.type,
        ext: img.file.name.split(".").pop(),
        size: img.file.size,
      }));

      /*
        Por ahora dejo tu lógica base con createVehicle.
        Cuando tengas la action updateVehicle, aquí se cambia por esa.
      */
      const vehicleResponse = await createVehicle(
        vehicleData as VehicleState,
        specifications,
        imagesData,
      );

      if (!vehicleResponse.success) {
        throw new Error(vehicleResponse.message);
      }

      if (
        vehicleResponse.data === undefined ||
        vehicleResponse.data.urls.length === 0
      ) {
        throw new Error("Unknown error.");
      }

      for (let index = 0; index < imagesWithFile.length; index++) {
        const file = imagesWithFile[index].file;
        const url = vehicleResponse.data.urls[index].url;

        const putRes = await fetch(url, {
          method: "PUT",
          headers: {
            "Content-Type": file.type,
          },
          body: file,
        });

        if (!putRes.ok) {
          throw new Error("There was an error uploading the images.");
        }
      }

      const keys = vehicleResponse.data.urls.map(({ key }) => key);
      const vehicleId = vehicleResponse.data.vehicleId;

      const imagesResponse = await attachVehicleImages(vehicleId, keys);

      if (!imagesResponse.success) {
        throw new Error(imagesResponse.message);
      }

      toast.success(imagesResponse.message);
      clearData();
      setOpen(false, "update");
    } catch (error) {
      console.log(error);
      toast.error(
        `${error instanceof Error ? error.message : "Unknown error."}`,
      );
    } finally {
      setLoading((prev) => ({ ...prev, updateVehicle: false }));
    }
  };

  if (!open) return null;
  if (!vehicle) return null;

  return (
    <div
      tabIndex={-1}
      className="overflow-hidden fixed z-50 flex justify-center items-center w-full md:inset-0 h-screen bg-zinc-800/90"
    >
      <div className="relative p-4 w-full max-w-5xl max-h-full">
        <div className="relative h-[calc(100vh-5rem)] overflow-y-auto no-scrollbar bg-zinc-900 rounded-2xl shadow-2xl border border-stone-700">
          <div className="sticky top-0 z-100 flex w-full border-b rounded-t-2xl border-stone-700 bg-zinc-800 p-5">
            <span className="text-2xl font-semibold">Update Vehicle</span>
            <CloseButton onClick={setOpen} element="update" />
          </div>

          <form className="gap-3" onSubmit={handleUpdateVehicle}>
            <fieldset
              disabled={loading.updateVehicle}
              className="contents disabled:opacity-60"
            >
              <div className="flex flex-col p-5 gap-3 border-b rounded-t border-stone-700">
                <span className="text-xl font-semibold">Financials</span>

                <div className="flex max-w-70 gap-3">
                  <TextInput
                    name="Initial Investment"
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
                    name="VIN *"
                    styles="flex-2"
                    value={vehicleData.vin}
                    valueOption="vin"
                    onChange={handleChange}
                    required
                  />

                  <TextInput
                    name="Year *"
                    styles="flex-1"
                    value={vehicleData.year}
                    valueOption="year"
                    onChange={handleChange}
                    required
                  />

                  <SelectInput
                    name="Brand *"
                    options={brandsData}
                    styles="flex-2"
                    value={vehicleData.brand}
                    valueOption="brand"
                    onChange={handleChange}
                    required
                  />

                  <TextInput
                    name="Model *"
                    styles="flex-2"
                    value={vehicleData.model}
                    valueOption="model"
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="flex min-w-full gap-3">
                  <TextInput
                    name="Series"
                    styles="flex-3"
                    value={vehicleData.series}
                    valueOption="series"
                    onChange={handleChange}
                  />

                  <TextInput
                    name="Doors"
                    styles="flex-2"
                    value={vehicleData.doors}
                    valueOption="doors"
                    onChange={handleChange}
                  />

                  <SelectInput
                    name="Color Ext *"
                    options={colors}
                    styles="flex-2"
                    value={vehicleData.colorExt}
                    valueOption="colorExt"
                    onChange={handleChange}
                    required
                  />

                  <SelectInput
                    name="Color Int"
                    options={colors}
                    styles="flex-2"
                    value={vehicleData.colorInt}
                    valueOption="colorInt"
                    onChange={handleChange}
                  />
                </div>

                <div className="flex min-w-full gap-3">
                  <TextInput
                    name="Mileage *"
                    styles="flex-2"
                    value={vehicleData.mileage}
                    valueOption="mileage"
                    onChange={handleChange}
                    required
                  />

                  <TextInput
                    name="Price *"
                    styles="flex-2"
                    value={vehicleData.price}
                    valueOption="price"
                    onChange={handleChange}
                    required
                  />

                  <SelectInput
                    name="Status *"
                    options={statusOptions}
                    styles="flex-2"
                    value={vehicleData.status}
                    valueOption="status"
                    onChange={handleChange}
                    required
                  />

                  <TextInput
                    name="Type"
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
                    name="Engine Fuel Type *"
                    options={fuelOptions}
                    styles="flex-3"
                    value={vehicleData.engineFuelType}
                    valueOption="engineFuelType"
                    onChange={handleChange}
                    required
                  />

                  <TextInput
                    name="Engine Configuration"
                    styles="flex-4"
                    value={vehicleData.engineConfiguration}
                    valueOption="engineConfiguration"
                    onChange={handleChange}
                  />

                  <TextInput
                    name="Engine Cylinders"
                    styles="flex-3"
                    value={vehicleData.engineCylinders}
                    valueOption="engineCylinders"
                    onChange={handleChange}
                  />

                  <TextInput
                    name="Engine Power"
                    styles="flex-3"
                    value={vehicleData.enginePower}
                    valueOption="enginePower"
                    onChange={handleChange}
                  />
                </div>

                <div className="flex min-w-full gap-3">
                  <TextInput
                    name="Engine Displacement"
                    styles="flex-3"
                    value={vehicleData.engineDisplacement}
                    valueOption="engineDisplacement"
                    onChange={handleChange}
                  />

                  <TextInput
                    name="Engine Turbo"
                    styles="flex-2"
                    value={vehicleData.engineTurbo}
                    valueOption="engineTurbo"
                    onChange={handleChange}
                  />

                  <SelectInput
                    name="Drivetrain *"
                    options={drivetrainOptions}
                    styles="flex-3"
                    value={vehicleData.drivetrain}
                    valueOption="drivetrain"
                    onChange={handleChange}
                    required
                  />

                  <SelectInput
                    name="Transmission *"
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
                      key={img.id ?? `new-image-${index}`}
                      className="flex items-center justify-center"
                    >
                      <ImageInput
                        file={img.file}
                        setFile={(file: File | null) =>
                          setImages((prev) =>
                            prev.map((item, i) =>
                              i === index
                                ? {
                                    ...item,
                                    file,
                                    position: index,
                                  }
                                : item,
                            ),
                          )
                        }
                        preview={img.image}
                        setPreview={(image: string | null) =>
                          setImages((prev) =>
                            prev.map((item, i) =>
                              i === index
                                ? {
                                    ...item,
                                    image,
                                    position: index,
                                  }
                                : item,
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
                  name="Update Vehicle"
                  size="w-40"
                  loading={loading.updateVehicle}
                />
              </div>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  );
};
