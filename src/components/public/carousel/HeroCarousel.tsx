"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay } from "swiper/modules";

export const HeroCarousel = () => {
  return (
    <div className="absolute inset-0 w-full h-full z-10">
      <Swiper
        className="w-full h-full"
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        modules={[Autoplay]}
      >
        <SwiperSlide className="relative w-full h-full">
          <Image
            src="/banner/banner-1.jpeg"
            alt="banner-1"
            fill
            className="object-cover"
            priority
          />
        </SwiperSlide>

        <SwiperSlide className="relative w-full h-full">
          <Image
            src="/banner/banner-2.jpeg"
            alt="banner-2"
            fill
            className="object-cover"
          />
        </SwiperSlide>

        <SwiperSlide className="relative w-full h-full">
          <Image
            src="/banner/banner-3.jpeg"
            alt="banner-3"
            fill
            className="object-cover"
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};
