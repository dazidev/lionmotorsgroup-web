"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import Image from "next/image";
import { Skeleton } from "../../loading/Skeleton";
import { useState } from "react";
import { CarouselPreview } from "./CarouselPreview";
import { useLockBodyScroll } from "@/src/hooks/useLockBodyScroll";

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
      <div className="relative w-full h-auto">
        <Swiper
          observer={true}
          observeParents={true}
          autoHeight={true}
          pagination={{
            type: "fraction",
          }}
          navigation={true}
          loop={true}
          modules={[Pagination, Navigation]}
          onSlideChange={(swiper) => {
            setCurrentIndex(swiper.realIndex);
          }}
          className="mySwiper rounded-2xl shadow-2xl overflow-hidden"
        >
          {images.map((src, index) => (
            <SwiperSlide className="flex items-center justify-center bg-linear-to-br from-gray-100 to-gray-200">
              <button
                className="flex w-full h-full"
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
                  src={`https://images.lionmotorsgroup.com/${src}`}
                  alt={`Vehicle-${index + 1}`}
                  width={1200}
                  height={1000}
                  className="object-cover w-full h-full hover:scale-105 transition-transform duration-500"
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
