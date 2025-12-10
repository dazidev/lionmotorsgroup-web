"use client";
import Image from "next/image";
import { redirect } from "next/navigation";

export const VehicleCard = () => {
  return (
    <div
      className="w-full h-auto bg-stone-900 rounded-sm border border-gold-700/50 hover:scale-102 transition-transform duration-500 cursor-pointer"
      onClick={() => redirect("/catalog/ford")}
    >
      <div>
        <Image
          src={"/cars/1.webp"}
          alt={`Ford`}
          width={800}
          height={600}
          className="object-cover w-full h-full rounded-t-sm"
        />
      </div>
      <div className="p-2">
        <div className="flex flex-row justify-between items-start">
          <div>
            <h2>FORD</h2>
            <h2 className="font-semibold text-xl">F-350 LARIAT</h2>
            <h2>2021</h2>
          </div>
          <span className="bg-gray-50 text-gray-900 p-1 rounded-sm h-auto">
            14,576 miles
          </span>
        </div>
        <span className="block w-full h-px bg-gold-700/50 my-2"></span>
        <span className="text-3xl font-semibold text-gold-500">$48,900</span>
      </div>
    </div>
  );
};
