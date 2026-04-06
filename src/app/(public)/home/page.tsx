import { Grid } from "../../../components";
import { getBrands } from "@/src/actions";
import { BrandCard } from "@/src/components/public/card/BrandCard";
import { GooglePlacesResponse } from "@/src/interfaces/https/google-reviews";
import { CarouselReviews } from "@/src/components/public/carousel/CarouselReviews";
import { OurValues } from "@/src/components/public/information/OurValues";
import { MissionVision } from "@/src/components/public/information/MissionVision";
import { Hero } from "@/src/components/public/information/Hero";
import prisma from "@/src/lib/prisma";
import { CarouselVehicles } from "@/src/components/public/carousel/CarouselVehicles";

const API_KEY = process.env.API_GOOGLE_KEY;
const PLACE_ID = process.env.PLACE_ID;

export default async function HomePage() {
  const brands = await getBrands();

  const dataBrands = brands.data;

  const reviewsUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${PLACE_ID}&fields=reviews,rating&key=${API_KEY}`;

  const responseReview = await fetch(reviewsUrl);
  const dataReview: GooglePlacesResponse = await responseReview.json();
  const reviews = dataReview.result.reviews;

  const vehicles = await prisma.vehicleGeneral.findMany({
    select: {
      id: true,
      brand: {
        select: {
          name: true,
        },
      },
      slug: true,
      shortId: true,
      model: true,
      year: true,
      mileage: true,
      price: true,
      images: {
        where: { position: 0 },
        take: 1,
      },
    },
  });

  return (
    <main className="mb-5">
      <Hero />
      <section className="flex justify-center py-28" id="brands">
        <div className="flex flex-col sm:w-[1350px]">
          <div className="text-center mb-20">
            <p className="line-both font-sans text-xl font-medium tracking-[0.2em] uppercase text-gold-700 mb-4 flex items-center justify-center gap-4">
              Our cars
            </p>
            <h2 className="text-4xl font-light text-white">
              The most <em className="italic text-gold-400">recent</em>
            </h2>
          </div>
          <div className="">
            <CarouselVehicles vehicles={vehicles} />
          </div>
          <div className="text-center my-20">
            <h2 className="text-4xl font-light text-white">
              Available <em className="italic text-gold-400">brands</em>
            </h2>
          </div>
          <Grid option="brands">
            {dataBrands &&
              dataBrands.map((brand) => (
                <BrandCard key={brand.id} brand={brand} />
              ))}
          </Grid>
        </div>
      </section>
      <OurValues />
      <MissionVision />
      <section className="flex flex-col items-center w-full py-28" id="reviews">
        <div className="w-full md:w-[1350px]">
          <div className="text-center mb-20">
            <p className="line-both font-sans text-xl font-medium tracking-[0.2em] uppercase text-gold-700 mb-4 flex items-center justify-center gap-4">
              Our costumers
            </p>
            <h2 className="text-4xl font-light text-white">
              They <em className="italic text-gold-400">recommend us</em>
            </h2>
          </div>
          <div className="flex flex-row mt-10 gap-5 w-full px-5 md:px-0">
            <CarouselReviews reviews={reviews} />
          </div>
        </div>
      </section>
    </main>
  );
}
