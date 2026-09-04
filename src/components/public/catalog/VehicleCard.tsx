"use client";
import { getImageUrl } from "@/src/utils/images";
import Image from "next/image";
import { redirect } from "next/navigation";

interface Props {
  brand: string;
  model: string;
  year: number;
  miles: number;
  price: number;
  image: string;
  link: string;
}

export const VehicleCard = ({
  brand,
  model,
  year,
  miles,
  price,
  image,
  link,
}: Props) => {
  const milesFormat = new Intl.NumberFormat("en-US").format(miles);
  const priceFormat = new Intl.NumberFormat("en-US").format(price);

  return (
    <div
      className="w-full md:max-w-80 h-auto bg-stone-900 rounded-sm border border-gold-700/50 hover:scale-102 transition-transform duration-500 cursor-pointer"
      onClick={() => redirect(`/catalog/${link}`)}
    >
      <div>
        <Image
          src={getImageUrl(image)}
          alt={`Ford`}
          width={800}
          height={600}
          className="object-cover w-full max-h-50 rounded-t-sm"
        />
      </div>
      <div className="p-2">
        <div className="flex flex-row justify-between items-start">
          <div>
            <h2 className="text-xl">{brand}</h2>
            <h2 className="font-semibold text-2xl">{model}</h2>
            <h2 className="text-xl">{year}</h2>
          </div>
          <span className="bg-gray-50 text-gray-900 p-1 rounded-sm h-auto text-xl">
            {`${milesFormat} miles`}
          </span>
        </div>
        <span className="block w-full h-px bg-gold-700/50 my-2"></span>
        <span className="text-3xl font-semibold text-gold-500">{`$${priceFormat}`}</span>
      </div>
    </div>
  );
};
