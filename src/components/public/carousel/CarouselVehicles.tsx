"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay } from "swiper/modules";
import { ReviewCard } from "../review/ReviewCard";
import { chunkArray } from "@/src/utils/chunkArray";
import { VehicleCardInterface } from "@/src/interfaces";
import { VehicleCard } from "../catalog/VehicleCard";

interface Props {
  vehicles: VehicleCardInterface[];
}

export const CarouselVehicles = ({ vehicles }: Props) => {
  const grouped = chunkArray(vehicles, 4);

  return (
    <>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        modules={[Autoplay]}
      >
        {grouped.map((group, i) => (
          <SwiperSlide key={i}>
            <div className="flex flex-row justify-between py-2 px-2 gap-3">
              {group.map((veh) => (
                <VehicleCard
                  key={veh.id}
                  brand={veh.brand.name}
                  model={veh.model}
                  year={veh.year}
                  miles={veh.mileage}
                  price={veh.price}
                  image={veh.images[0].key}
                  link={`${veh.slug}-${veh.shortId}`}
                />
              ))}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};
