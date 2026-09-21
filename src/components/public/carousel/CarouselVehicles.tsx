"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";

import { VehicleCardInterface } from "@/src/interfaces";
import { VehicleCard } from "../catalog/VehicleCard";

interface Props {
  vehicles: VehicleCardInterface[];
}

export const CarouselVehicles = ({ vehicles }: Props) => {
  return (
    <div className="w-full min-w-0 overflow-hidden">
      <Swiper
        modules={[Autoplay]}
        slidesPerView={1}
        spaceBetween={16}
        centeredSlides={false}
        breakpoints={{
          640: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
          1280: {
            slidesPerView: 4,
          },
        }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        className="w-full min-w-0"
      >
        {vehicles.map((veh) => (
          <SwiperSlide key={veh.id}>
            <div className="flex w-full justify-center py-2">
              <VehicleCard
                brand={veh.brand.name}
                model={veh.model}
                year={veh.year}
                miles={veh.mileage}
                price={veh.price}
                image={veh.images[0].key}
                link={`${veh.slug}-${veh.shortId}`}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
