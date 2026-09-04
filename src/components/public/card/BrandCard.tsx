"use client";
import { redirect } from "next/navigation";
import ImageWithLoader from "../../image/ImageWithLoader";
import { getImageUrl } from "@/src/utils/images";
import { Brands } from "@/src/interfaces";

interface Props {
  brand: Brands;
}

export const BrandCard = ({ brand }: Props) => {
  const linkImage = getImageUrl(brand.imagePath);

  return (
    <div
      key={brand.id}
      className="flex flex-col h-30 md:h-40 p-6 items-center justify-center gap-2 bg-stone-900 rounded-2xl shadow-2xl hover:scale-102 transition-transform duration-500 cursor-pointer"
      onClick={() => redirect(`/catalog/?brand=${brand.name}`)}
    >
      <ImageWithLoader src={linkImage} alt={`logo-${brand.name}`} />
      <p>{brand.name}</p>
    </div>
  );
};
