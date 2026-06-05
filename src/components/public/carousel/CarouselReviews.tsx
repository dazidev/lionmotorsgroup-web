"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay } from "swiper/modules";
import { ReviewCard } from "../review/ReviewCard";
import { chunkArray } from "@/src/utils/chunkArray";
import { Reviews } from "@prisma/client";

interface Props {
  reviews: Reviews[];
}

export const CarouselReviews = ({ reviews }: Props) => {
  const grouped = chunkArray<Reviews>(reviews, 3);

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
            <div className="felx justify-center grid grid-cols-1 md:grid-cols-3 gap-3">
              {group.map((review, j) => (
                <ReviewCard
                  key={j}
                  stars={review.rating}
                  name={review.name}
                  comment={review.comment ?? ""}
                />
              ))}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};
