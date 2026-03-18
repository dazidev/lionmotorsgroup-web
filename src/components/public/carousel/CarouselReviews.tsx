"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay } from "swiper/modules";
import { Review } from "@/src/interfaces/https/google-reviews";
import { ReviewCard } from "../review/ReviewCard";
import { chunkArray } from "@/src/utils/chunkArray";

interface Props {
  reviews: Review[];
}

export const CarouselReviews = ({ reviews }: Props) => {
  const grouped = chunkArray(reviews, 3);

  return (
    <>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        loop={true}
        modules={[Autoplay]}
      >
        {grouped.map((group, i) => (
          <SwiperSlide key={i}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {group.map((review, j) => (
                <ReviewCard
                  key={j}
                  stars={review.rating}
                  name={review.author_name}
                  comment={review.text}
                />
              ))}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};
