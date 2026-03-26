import React from "react";

export const Hero = () => {
  return (
    <section className="min-h-screen flex justify-center items-center relative overflow-hidden md:px-16 px-8">
      <div className="absolute inset-0 hero-radial"></div>
      <div className="absolute inset-0 hero-grid-lines"></div>

      <div className="hero-accent absolute right-[8%] top-1/2 -translate-y-1/2 w-[520px] h-[520px] rounded-full border border-gold-border pointer-events-none"></div>

      <div className="sm:w-[1350px]">
        <div className="relative max-w-[620px] animate-fadeUp">
          <p className="line-before font-sans text-xl font-medium tracking-[0.2em] uppercase text-gold-700 mb-6 flex items-center gap-4">
            Trusted dealership
          </p>

          <h1 className="font-serif text-6xl font-light leading-[1.1] tracking-tight mb-8 text-white">
            More than a car, a{" "}
            <em className="italic text-gold-400">lifelong relationship</em>.
          </h1>

          <p className="font-serif text-xl font-light italic text-white/60 leading-[1.7] mb-12 pl-5 border-l-2 border-gold">
            "We don’t just hand you the keys to a car, we open the door to a
            lifelong relationship."
          </p>

          <div className="flex gap-4 items-center">
            <a
              href="#nosotros"
              className="font-sans text-xs font-medium tracking-widest uppercase text-dark bg-gold px-9 py-4 no-underline inline-block transition-all duration-300 hover:bg-gold-light hover:-translate-y-px"
            >
              Conócenos
            </a>
            <a
              href="#contacto"
              className="font-sans text-xs font-normal tracking-widest uppercase text-white/70 bg-transparent px-9 py-4 border border-white/20 no-underline inline-block transition-all duration-300 hover:border-gold hover:text-gold"
            >
              Agendar cita
            </a>
          </div>
        </div>

        <div className="scroll-line absolute bottom-10 left-1/2 bounce2 flex flex-col items-center gap-2 text-white/30 text-[0.65rem] tracking-[0.15em] uppercase">
          Scroll
        </div>
      </div>
    </section>
  );
};
