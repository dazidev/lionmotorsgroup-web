import React from "react";
import { HeroCarousel } from "../carousel/HeroCarousel";
import Link from "next/link";

export const Hero = () => {
  return (
    <section className="min-h-[75vh] flex justify-center items-center relative overflow-hidden">
      <HeroCarousel />
      <div className="w-full h-full min-h-[75vh] flex justify-center items-center bg-black/40 z-40">
        <div className="sm:w-[1350px]">
          <div className="relative max-w-[620px] animate-fadeUp">
            <span className="font-serif text-6xl font-light leading-[1.1] tracking-tight mb-8 text-white">
              More than a car, a{" "}
              <em className="italic text-gold-400">lifelong relationship.</em>
            </span>

            <p className="font-serif text-xl font-light italic text-white/90 leading-[1.7] mb-12 pl-5 border-l-2 border-gold">
              "We don’t just hand you the keys to a car, we open the door to a
              lifelong relationship."
            </p>

            <div className="flex gap-4 items-center">
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
