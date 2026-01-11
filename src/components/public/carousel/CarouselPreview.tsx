"use client";

import { Dispatch, SetStateAction, useState } from "react";
import type { Swiper as SwiperInstance } from "swiper";
import { FreeMode, Navigation, Thumbs, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "swiper/css/pagination";
import { CloseButton } from "../../button/CloseButton";

interface Props {
  images: string[];
  setOpen: Dispatch<SetStateAction<boolean>>;
  currentIndex: number;
}

export function CarouselPreview({ images, setOpen, currentIndex }: Props) {
  const [thumbs, setThumbs] = useState<SwiperInstance | null>(null);

  return (
    <div className="flex flex-col fixed z-50 w-full h-screen inset-0 bg-black">
      <div className="flex p-2">
        <CloseButton onClick={setOpen} />
      </div>
      <div className="flex-15 px-10 pb-5">
        <Swiper
          modules={[Navigation, Thumbs, Pagination]}
          navigation
          loop={images.length > 1}
          pagination={{ type: "fraction" }}
          initialSlide={currentIndex}
          thumbs={{ swiper: thumbs && !thumbs.destroyed ? thumbs : null }}
          className="h-full"
        >
          {images.map((src) => (
            <SwiperSlide
              key={src}
              className="fixed z-50 flex items-center justify-center"
            >
              <div className="relative w-full h-full">
                <Image
                  src={`https://images.lionmotorsgroup.com/${src}`}
                  alt=""
                  fill
                  className="object-contain"
                  priority={false}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* THUMBS */}
      <div className="flex-2 border-t border-white/10 p-2">
        <Swiper
          modules={[FreeMode, Thumbs]}
          onSwiper={setThumbs}
          watchSlidesProgress
          freeMode={true}
          slidesPerView={images.length}
          spaceBetween={8}
          centerInsufficientSlides
          className="h-full w-full"
        >
          {images.map((src) => (
            <SwiperSlide
              key={src}
              className="w-20 sm:w-24 md:w-28 lg:w-32 opacity-60 [&.swiper-slide-thumb-active]:opacity-100"
            >
              <div className="relative h-full rounded-md overflow-hidden ring-1 ring-white/10">
                <Image
                  src={`https://images.lionmotorsgroup.com/${src}`}
                  alt=""
                  fill
                  className="object-cover"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
