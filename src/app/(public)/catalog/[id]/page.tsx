"use server";

import prisma from "@/src/lib/prisma";
import { DesktopPage } from "./ui/DesktopPage";
import { MobilePage } from "./ui/MobilePage";
import { Footer } from "@/src/components";

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
    vehicleData.mileage,
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
    { name: "Exterior color", value: vehicleData.colorExt },
    { name: "Interior color", value: vehicleData.colorInt },
    { name: "Type", value: vehicleData.type },
  ];

  const technicalData = [
    { name: "Fuel type", value: vehicleData.technical?.engineFuelType },
    {
      name: "Configuration",
      value: vehicleData.technical?.engineConfiguration,
    },
    { name: "Cylinders", value: vehicleData.technical?.engineCylinders },
    { name: "Power", value: `${vehicleData.technical?.enginePower} HP` },
    {
      name: "Displacement",
      value: `${vehicleData.technical?.engineDisplacement} L`,
    },
    { name: "Turbo", value: vehicleData.technical?.engineTurbo },
    { name: "Drivetrain", value: vehicleData.technical?.drivetrain },
    { name: "Transmission", value: vehicleData.technical?.transmission },
  ];

  const specificationData = vehicleData.specifications.map(
    ({ specification }) => ({
      id: specification.id,
      name: specification.name,
      type: specification.type,
    }),
  );

  return (
    <>
      <div className="block md:hidden">
        <MobilePage
          images={images}
          generalData={generalData}
          technicalData={technicalData}
          specificationData={specificationData}
          vehicleData={vehicleData}
          milesFormat={milesFormat}
          priceFormat={priceFormat}
        />
      </div>

      <div className="hidden md:flex items-center justify-center">
        <DesktopPage
          images={images}
          generalData={generalData}
          technicalData={technicalData}
          specificationData={specificationData}
          vehicleData={vehicleData}
          milesFormat={milesFormat}
          priceFormat={priceFormat}
        />
      </div>
      <Footer />
    </>
  );
}
