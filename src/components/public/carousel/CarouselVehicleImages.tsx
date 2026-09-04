"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import Image from "next/image";
import { Skeleton } from "../../loading/Skeleton";
import { useState } from "react";
import { CarouselPreview } from "./CarouselPreview";
import { useLockBodyScroll } from "@/src/hooks/useLockBodyScroll";
import { getImageUrl } from "@/src/utils/images";

interface Props {
  images: string[];
}

export const CarouselVehicleImages = ({ images }: Props) => {
  const [openZoom, setOpenZoom] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useLockBodyScroll(openZoom);
  return (
    <>
      <div className="relative w-full aspect-[3/2]">
        <Swiper
          observer={true}
          observeParents={true}
          pagination={{
            type: "fraction",
          }}
          navigation={true}
          loop={true}
          modules={[Pagination, Navigation]}
          onSlideChange={(swiper) => {
            setCurrentIndex(swiper.realIndex);
          }}
          className="mySwiper w-full h-full rounded-2xl shadow-2xl overflow-hidden"
        >
          {images.map((src, index) => (
            <SwiperSlide
              key={src}
              className="flex items-center justify-center bg-linear-to-br from-gray-100 to-gray-200"
            >
              <button
                className="relative flex items-center justify-center w-full h-full"
                onClick={() => setOpenZoom(true)}
              >
                {loading && (
                  <Skeleton
                    width="w-full"
                    height="h-full"
                    rounded="rounded-lg"
                  />
                )}

                <Image
                  src={getImageUrl(src)}
                  alt={`Vehicle-${index + 1}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover hover:scale-105 transition-transform duration-500"
                  priority={index === 0}
                  onLoad={() => setLoading(false)}
                />
              </button>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      {openZoom && (
        <CarouselPreview
          images={images}
          currentIndex={currentIndex}
          setOpen={setOpenZoom}
        />
      )}
    </>
  );
};
