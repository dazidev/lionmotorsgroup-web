import { titleFont } from "@/src/config/fonts";
import { Carousel } from "@/src/components";

interface Props {
  params: { id: string };
}

export default function CatalogVehicleIdPage({ params }: Props) {
  return (
    <>
      <div className="flex flex-row w-full items-start pt-5 overflow-hidden gap-5">
        <div className="flex-8 min-w-0 text-xl gap-5">
          <Carousel width="" height="1"></Carousel>
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
          <div className="flex flex-col h-auto bg-stone-900 rounded-2xl text-center gap-5 p-5">
            <h1 className="text-2xl text-left">Confirm Availability</h1>
            <div className="flex flex-row gap-5">
              <input
                placeholder="First Name"
                className="flex-1 min-w-0 px-4 py-3.5 bg-zinc-800/80 border-2 border-gray-200/20 rounded-xl text-white placeholder-zinc-500 outline-none transition-all duration-300 focus:bg-zinc-800 focus:border-gray-200 focus:ring-4 focus:ring-gold-500/10"
                required
                type="text"
                name="first-name"
              />
              <input
                placeholder="Last Name"
                className="flex-1 min-w-0 px-4 py-3.5 bg-zinc-800/80 border-2 border-gray-200/20 rounded-xl text-white placeholder-zinc-500 outline-none transition-all duration-300 focus:bg-zinc-800 focus:border-gray-200 focus:ring-4 focus:ring-gold-500/10"
                required
                type="text"
                name="last-name"
              />
            </div>
            <input
              placeholder="Email"
              className="w-full px-4 py-3.5 bg-zinc-800/80 border-2 border-gray-200/20 rounded-xl text-white placeholder-zinc-500 outline-none transition-all duration-300 focus:bg-zinc-800 focus:border-gray-200 focus:ring-4 focus:ring-gold-500/10"
              required
              type="email"
              name="email"
            />
            <div className="flex flex-row gap-5">
              <input
                placeholder="Zip Code"
                className="flex-1 min-w-0 px-4 py-3.5 bg-zinc-800/80 border-2 border-gray-200/20 rounded-xl text-white placeholder-zinc-500 outline-none transition-all duration-300 focus:bg-zinc-800 focus:border-gray-200 focus:ring-4 focus:ring-gold-500/10"
                required
                type="number"
                name="zip-code"
              />
              <input
                placeholder="Phone Number"
                className="flex-1 min-w-0 px-4 py-3.5 bg-zinc-800/80 border-2 border-gray-200/20 rounded-xl text-white placeholder-zinc-500 outline-none transition-all duration-300 focus:bg-zinc-800 focus:border-gray-200 focus:ring-4 focus:ring-gold-500/10"
                required
                type="number"
                name="phone-number"
              />
            </div>
            <textarea
              placeholder="Comments (optional)"
              className="w-full px-4 py-3.5 h-30 bg-zinc-800/80 border-2 border-gray-200/20 rounded-xl text-white placeholder-zinc-500 outline-none transition-all duration-300 focus:bg-zinc-800 focus:border-gray-200 focus:ring-4 focus:ring-gold-500/10"
              required
              name="comments"
            />
            <button
              type="submit"
              className="w-full px-6 py-4 bg-linear-to-r from-gold-500 to-gold-600 text-black text-base font-semibold rounded-xl transition-all duration-300 hover:from-gold-400 hover:to-gold-500 hover:-translate-y-0.5 active:translate-y-0 tracking-wide"
            >
              Confirm Availability
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
