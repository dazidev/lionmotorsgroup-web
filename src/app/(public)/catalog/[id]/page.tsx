import { titleFont } from "@/src/config/fonts";
import { Carousel, FormAvailability } from "@/src/components";
import { SwiperSlide } from "swiper/react";
import Image from "next/image";

const carImages = [
  { src: "/cars/1.webp", width: 1200, height: 1000 },
  { src: "/cars/2.jpg", width: 1200, height: 1000 },
  { src: "/cars/3.jpg", width: 1200, height: 1000 },
  { src: "/cars/4.jpg", width: 1200, height: 1000 },
  { src: "/cars/5.jpg", width: 1200, height: 1000 },
  { src: "/cars/6.jpg", width: 1200, height: 1000 },
  { src: "/cars/7.avif", width: 1200, height: 1000 },
  { src: "/cars/8.webp", width: 1200, height: 1000 },
  { src: "/cars/9.webp", width: 1200, height: 1000 },
  { src: "/cars/10.avif", width: 1200, height: 1000 },
  { src: "/cars/11.webp", width: 1200, height: 1000 },
];

interface Props {
  params: { id: string };
}

export default function CatalogVehicleIdPage({ params }: Props) {
  return (
    <>
      <div className="flex flex-row w-full items-start pt-5 overflow-hidden gap-5">
        <div className="flex-8 min-w-0 text-xl gap-5">
          <Carousel>
            {carImages.map((image, index) => (
              <SwiperSlide
                key={index}
                className="flex items-center justify-center bg-linear-to-br from-gray-100 to-gray-200"
              >
                <div className="relative w-full h-full">
                  <Image
                    src={image.src}
                    alt={`Car ${index + 1}`}
                    width={image.width}
                    height={image.height}
                    className="object-cover w-full hover:scale-105 transition-transform duration-500"
                    priority={index === 0}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Carousel>
          <section className="flex flex-col mt-5 gap-3">
            <h2 className="text-3xl">General Information</h2>
            <span className="block w-full h-px bg-gray-300"></span>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))]">
              <div>VIN: 1FT8W3BT4MEE15325</div>
              <div>Exterior Color: Silver</div>
              <div>Interior Color: Black</div>
              <div>Year: 2021</div>
              <div>Model: F-350 Lariat</div>
              <div>Brand: Ford</div>
              <div>Drivetrain: 4x4</div>
              <div>Transmission: 10 speed automatic</div>
            </div>
          </section>
          <section className="flex flex-col mt-5 gap-3">
            <h2 className="text-3xl">General Information</h2>
            <span className="block w-full h-px bg-gray-300"></span>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))]">
              <div>VIN: 1FT8W3BT4MEE15325</div>
              <div>Exterior Color: Silver</div>
              <div>Interior Color: Black</div>
              <div>Year: 2021</div>
              <div>Model: F-350 Lariat</div>
              <div>Brand: Ford</div>
              <div>Drivetrain: 4x4</div>
              <div>Transmission: 10 speed automatic</div>
            </div>
          </section>
        </div>
        <div className="flex-4 min-w-0 flex flex-col gap-5">
          <div className="w-full h-auto bg-stone-900 rounded-2xl text-center gap-5 p-5">
            <div className="py-5">
              <p className="text-3xl">2021 FORD</p>
              <h1 className="text-5xl font-bold">F-350 LARIAT</h1>
              <p className="text-2xl">14,576 miles</p>
            </div>
            <span className="block w-full h-px bg-gray-300"></span>
            <div className="py-5">
              <h1 className="flex justify-between text-4xl font-bold">
                <p>Price</p>
                <p className="text-gold-500">$48,900</p>
              </h1>
            </div>
          </div>
          <FormAvailability />
        </div>
      </div>
    </>
  );
}
