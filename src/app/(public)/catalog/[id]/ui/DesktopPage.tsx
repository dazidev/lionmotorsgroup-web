import { CarouselVehicleImages, FormAvailability } from "@/src/components";
import { GeneralCard } from "@/src/components/public/card/GeneralCard";
import { InformationCard } from "@/src/components/public/card/InformationCard";

interface Props {
  images: any[];
  generalData: any[];
  technicalData: any[];
  specificationData: any[];
  vehicleData: {
    id: string;
    year: number;
    brand: {
      name: string;
    };
    model: string;
  };
  milesFormat: string;
  priceFormat: string;
}

export const DesktopPage = ({
  images,
  generalData,
  technicalData,
  specificationData,
  vehicleData,
  milesFormat,
  priceFormat,
}: Props) => {
  return (
    <>
      <div className="flex flex-row w-full items-start pt-25 overflow-hidden gap-5">
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
          <GeneralCard
            vehicleData={vehicleData}
            milesFormat={milesFormat}
            priceFormat={priceFormat}
          />
          <FormAvailability vehicleId={vehicleData.id} />
        </div>
      </div>
    </>
  );
};
