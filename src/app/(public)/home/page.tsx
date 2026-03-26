import { titleFont } from "@/src/config/fonts";
import Image from "next/image";
import { Grid } from "../../../components";
import { getBrands } from "@/src/actions";
import ImageWithLoader from "../../../components/image/ImageWithLoader";
import { redirect } from "next/navigation";
import { BrandCard } from "@/src/components/public/card/BrandCard";
import { GooglePlacesResponse } from "@/src/interfaces/https/google-reviews";
import { CarouselReviews } from "@/src/components/public/carousel/CarouselReviews";
import { OurValues } from "@/src/components/public/information/OurValues";
import { MissionVision } from "@/src/components/public/information/MissionVision";

const API_KEY = process.env.API_GOOGLE_KEY;
const PLACE_ID = process.env.PLACE_ID;

export default async function HomePage() {
  const brands = await getBrands();

  const dataBrands = brands.data;

  const reviewsUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${PLACE_ID}&fields=reviews,rating&key=${API_KEY}`;

  const responseReview = await fetch(reviewsUrl);
  const dataReview: GooglePlacesResponse = await responseReview.json();
  const reviews = dataReview.result.reviews;

  return (
    <main className="my-5 px-5 md:px-0">
      <OurValues />
      <MissionVision />
      <section className="py-28" id="brands">
        <div className="text-center mb-20">
          <p className="line-both font-sans text-xl font-medium tracking-[0.2em] uppercase text-gold-700 mb-4 flex items-center justify-center gap-4">
            Our cars
          </p>
          <h2 className="text-4xl font-light text-white">
            Available car <em className="italic text-gold-400">brands</em>
          </h2>
        </div>
        <Grid option="brands">
          {dataBrands &&
            dataBrands.map((brand) => (
              <BrandCard key={brand.id} brand={brand} />
            ))}
        </Grid>
      </section>
      <section className="py-28" id="reviews">
        <div className="text-center mb-20">
          <p className="line-both font-sans text-xl font-medium tracking-[0.2em] uppercase text-gold-700 mb-4 flex items-center justify-center gap-4">
            Our costumers
          </p>
          <h2 className="text-4xl font-light text-white">
            They <em className="italic text-gold-400">recommend us</em>
          </h2>
        </div>
        <div className="flex flex-row mt-10 gap-5 w-full">
          <CarouselReviews reviews={reviews} />
        </div>
      </section>
    </main>
  );
}
