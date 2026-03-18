import { titleFont } from "@/src/config/fonts";
import Image from "next/image";
import { Grid } from "../../../components";
import { getBrands } from "@/src/actions";
import ImageWithLoader from "../../../components/image/ImageWithLoader";
import { redirect } from "next/navigation";
import { BrandCard } from "@/src/components/public/card/BrandCard";
import { GooglePlacesResponse } from "@/src/interfaces/https/google-reviews";
import { CarouselReviews } from "@/src/components/public/carousel/CarouselReviews";

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
    <main className="my-5">
      <h1 className="text-4xl font-bold">Available car brands</h1>
      <Grid>
        {dataBrands &&
          dataBrands.map((brand) => <BrandCard key={brand.id} brand={brand} />)}
      </Grid>

      <h1 className="text-4xl font-bold mt-20">Our customers recommend us</h1>
      <div className="flex flex-row mt-10 gap-5 w-full">
        <CarouselReviews reviews={reviews} />
      </div>
    </main>
  );
}
