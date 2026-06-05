import { CarouselVehicleImages, FormAvailability } from "@/src/components";
import { GeneralCard } from "@/src/components/public/card/GeneralCard";
import { InformationCard } from "@/src/components/public/card/InformationCard";
import Link from "next/link";

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
        <div className="flex flex-col h-auto w-full bg-stone-900 rounded-2xl text-start gap-5 p-5">
          <span className="text-2xl text-left">
            Interested in this vehicle?
          </span>
          <p>
            Confirm availability or apply for financing today. Our team will
            contact you to help you with the next steps.
          </p>
          <Link
            href="https://lionmotorsllc.startyourcreditapproval.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full px-6 py-4 bg-linear-to-r from-gold-500 to-gold-600 text-black text-center font-semibold rounded-xl transition-all duration-300 hover:from-gold-400 hover:to-gold-500 hover:-translate-y-0.5 active:translate-y-0 tracking-wide"
          >
            Apply for Financing
          </Link>
        </div>
        <FormAvailability vehicleId={vehicleData.id} />
      </div>
    </>
  );
};
