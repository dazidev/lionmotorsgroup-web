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

export const MobilePage = ({
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
      <div className="flex flex-col w-full items-start p-5 pt-25 overflow-hidden gap-5">
        <CarouselVehicleImages images={images} />
        <GeneralCard
          vehicleData={vehicleData}
          milesFormat={milesFormat}
          priceFormat={priceFormat}
        />
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

        <FormAvailability vehicleId={vehicleData.id} />
      </div>
    </>
  );
};
