import { HeroCarousel } from "../carousel/HeroCarousel";
import Link from "next/link";

export const Hero = () => {
  return (
    <section className="min-h-[75vh] flex justify-center items-center relative overflow-hidden">
      <HeroCarousel />
      <div className="w-full h-full min-h-[75vh] flex justify-center items-center bg-black/40 z-20">
        <div className="px-2 md:w-[1350px] md:p-0">
          <div className="relative max-w-[620px] text-center sm:text-start animate-fadeUp">
            <span className="flex flex-col font-serif text-4xl sm:text-6xl font-light leading-[1.1] tracking-tight text-white mb-4">
              More than a car, a{" "}
              <em className="italic text-gold-400">lifelong relationship.</em>
            </span>

            <p className="font-serif text-md sm:text-xl font-light italic text-white/90 leading-[1.7] mb-12 pl-5 sm:border-l-2 sm:border-gold">
              "We don’t just hand you the keys to a car, we open the door to a
              lifelong relationship."
            </p>

            <div className="flex gap-4 items-center justify-center sm:justify-start">
              <Link
                href="https://lionmotorsllc.startyourcreditapproval.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-lg font-bold bg-gold-700/70 p-3 rounded-sm hover:scale-105 hover:bg-gold-600"
              >
                Apply for Financing
              </Link>
              <Link
                href="/#contact-us"
                className="text-lg font-bold bg-gold-700/70 p-3 rounded-sm hover:scale-105 hover:bg-gold-600"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
