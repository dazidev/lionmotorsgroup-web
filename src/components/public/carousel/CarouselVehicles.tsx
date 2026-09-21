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
        slidesPerView="auto"
        spaceBetween={16}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        className="w-full"
      >
        {vehicles.map((veh) => (
          <SwiperSlide
            key={veh.id}
            className="
              !w-full
              sm:!w-[calc((100%_-_16px)/2)]
              lg:!w-[calc((100%_-_32px)/3)]
              xl:!w-[calc((100%_-_48px)/4)]
            "
          >
            <div className="flex justify-center py-2">
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
