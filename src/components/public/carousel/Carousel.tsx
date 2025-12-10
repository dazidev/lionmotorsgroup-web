"use client";
import Image from "next/image";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

interface Props {
  height: string;
  width: string;
}

const carImages = [
  { src: "/cars/1.webp", width: 1200, height: 1000 },
  { src: "/cars/2.jpg", width: 1200, height: 1000 },
  { src: "/cars/3.jpg", width: 1200, height: 1000 },
  { src: "/cars/4.jpg", width: 1200, height: 1000 },
  { src: "/cars/5.jpg", width: 1200, height: 1000 },
  { src: "/cars/6.jpg", width: 1200, height: 1000 },
  { src: "/cars/7.avif", width: 1200, height: 1000 },
  { src: "/cars/8.webp", width: 1200, height: 1000 },
  { src: "/cars/9.webp", width: 1200, height: 1000 },
  { src: "/cars/10.avif", width: 1200, height: 1000 },
  { src: "/cars/11.webp", width: 1200, height: 1000 },
];

export const Carousel = ({ width, height }: Props) => {
  return (
    <div className="relative w-full h-auto]">
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
        {carImages.map((image, index) => (
          <SwiperSlide
            key={index}
            className="flex items-center justify-center bg-linear-to-br from-gray-100 to-gray-200"
          >
            <div className="relative w-full h-full">
              <Image
                src={image.src}
                alt={`Car ${index + 1}`}
                width={image.width}
                height={image.height}
                className="object-cover w-full hover:scale-105 transition-transform duration-500"
                priority={index === 0}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
