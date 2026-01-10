"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Image from "next/image";
import { Skeleton } from "../../loading/Skeleton";
import { useState } from "react";

interface Props {
  images: string[];
}

export const CarouselVehicleImages = ({ images }: Props) => {
  const [loading, setLoading] = useState(true);

  return (
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
        className="mySwiper rounded-2xl shadow-2xl overflow-hidden"
      >
        {images.map((src, index) => (
          <SwiperSlide className="flex items-center justify-center bg-linear-to-br from-gray-100 to-gray-200">
            <div className="relative w-full h-full">
              {loading && (
                <Skeleton width="w-full" height="h-full" rounded="rounded-lg" />
              )}
              <Image
                src={`https://images.lionmotorsgroup.com/${src}`}
                alt={`Car ${index + 1}`}
                width={1200}
                height={800}
                className="object-cover w-full hover:scale-105 transition-transform duration-500"
                priority={index === 0}
                onLoadingComplete={() => setLoading(false)}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
