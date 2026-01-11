"use server";
import { CarouselVehicleImages, FormAvailability } from "@/src/components";
import { InformationCard } from "@/src/components/public/card/InformationCard";
import prisma from "@/src/lib/prisma";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function CatalogVehicleIdPage({ params }: Props) {
  const { id } = await params;

  const lastDashIndex = id.lastIndexOf("-");

  const slug = id.slice(0, lastDashIndex);
  const shortId = id.slice(lastDashIndex + 1);

  const vehicleData = await prisma.vehicleGeneral.findUnique({
    where: { slug, shortId },
    include: {
      brand: true,
      technical: true,
      images: true,
      specifications: {
        include: {
          specification: true,
        },
      },
    },
  });

  if (!vehicleData)
    return (
      <>
        <p>not found</p>
      </>
    );

  const milesFormat = new Intl.NumberFormat("en-US").format(
    vehicleData.mileage
  );
  const priceFormat = new Intl.NumberFormat("en-US").format(vehicleData.price);
  const images = Object.values(vehicleData.images).map(({ key }) => key);

  const generalData = [
    { name: "VIN", value: vehicleData.vin },
    { name: "Brand", value: vehicleData.brand.name },
    { name: "Model", value: vehicleData.model },
    { name: "Year", value: vehicleData.year },
    { name: "Series", value: vehicleData.series },
    { name: "Doors", value: vehicleData.doors },
    { name: "Exterior color", value: vehicleData.color_ext },
    { name: "Interior color", value: vehicleData.color_int },
    { name: "Type", value: vehicleData.type },
  ];

  const technicalData = [
    { name: "Fuel type", value: vehicleData.technical?.engine_fuel_type },
    {
      name: "Configuration",
      value: vehicleData.technical?.engine_configuration,
    },
    { name: "Cylinders", value: vehicleData.technical?.engine_cylinders },
    { name: "Power", value: `${vehicleData.technical?.engine_power} HP` },
    {
      name: "Displacement",
      value: `${vehicleData.technical?.engine_displacement} L`,
    },
    { name: "Turbo", value: vehicleData.technical?.engine_turbo },
    { name: "Drivetrain", value: vehicleData.technical?.drivetrain },
    { name: "Transmission", value: vehicleData.technical?.transmission },
  ];

  const specificationData = vehicleData.specifications.map(
    ({ specification }) => ({
      id: specification.id,
      name: specification.name,
      type: specification.type,
    })
  );

  return (
    <>
      <div className="flex flex-row w-full items-start pt-5 overflow-hidden gap-5">
        <div className="flex-8 min-w-0 text-xl">
          <CarouselVehicleImages images={images} />
          <InformationCard
            title="General Information"
            type="text"
            data={generalData}
          />
          <InformationCard
            title="Technical Information"
            type="text"
            data={technicalData}
          />
          <InformationCard
            title="Security Specifications"
            type="tag"
            data={specificationData}
            specificationType="security"
          />
          <InformationCard
            title="Confort Specifications"
            type="tag"
            data={specificationData}
            specificationType="confort"
          />
        </div>
        <div className="flex-4 min-w-0 flex flex-col gap-5">
          <div className="w-full h-auto bg-stone-900 rounded-2xl text-center gap-5 p-5">
            <div className="py-5">
              <p className="text-3xl">{`${
                vehicleData.year
              } ${vehicleData.brand.name.toUpperCase()}`}</p>
              <h1 className="text-5xl font-bold">{`${vehicleData.model.toUpperCase()}`}</h1>
              <p className="text-2xl">{`${milesFormat} miles`}</p>
            </div>
            <span className="block w-full h-px bg-gray-300"></span>
            <div className="py-5">
              <h1 className="flex justify-between text-4xl font-bold">
                <p>Price</p>
                <p className="text-gold-500">{`$${priceFormat}`}</p>
              </h1>
            </div>
          </div>
          <FormAvailability />
        </div>
      </div>
    </>
  );
}
