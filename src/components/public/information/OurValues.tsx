export const OurValues = () => {
  return (
    <section
      className="flex justify-center bg-stone-900 py-28 px-8 md:px-16"
      id="values"
    >
      <div className="sm:w-[1350px]">
        <div className="text-center mb-20">
          <p className="line-both font-sans text-xl font-medium tracking-[0.2em] uppercase text-gold-700 mb-4 flex items-center justify-center gap-4">
            What defines us
          </p>
          <h2 className="text-4xl font-light text-white">
            Our <em className="italic text-gold-400">Values</em>
          </h2>
        </div>

        <div className="grid grid-cols-5 max-w-[1100px] mx-auto gap-px border border-gold-border bg-gold-border max-[900px]:grid-cols-1">
          <div className="bg-stone-900 p-12 text-center hover:bg-stone-900/80 cursor-default">
            <div className="font-serif text-5xl font-light text-gold-400/20 leading-none mb-5 duration-300">
              01
            </div>
            <div className="font-serif text-lg font-normal text-white leading-snug">
              Trust
            </div>
          </div>
          <div className="bg-stone-900 p-12 text-center hover:bg-stone-900/80 cursor-default">
            <div className="font-serif text-5xl font-light text-gold-400/20 leading-none mb-5">
              02
            </div>
            <div className="font-serif text-lg font-normal text-white leading-snug">
              Long-term relationships
            </div>
          </div>
          <div className="bg-stone-900 p-12 text-center hover:bg-stone-900/80 cursor-default">
            <div className="font-serif text-5xl font-light text-gold-400/20 leading-none mb-5">
              03
            </div>
            <div className="font-serif text-lg font-normal text-white leading-snug">
              Sense of community
            </div>
          </div>
          <div className="bg-stone-900 p-12 text-center hover:bg-stone-900/80 cursor-default">
            <div className="font-serif text-5xl font-light text-gold-400/20 leading-none mb-5">
              04
            </div>
            <div className="font-serif text-lg font-normal text-white leading-snug">
              Purpose
            </div>
          </div>
          <div className="bg-stone-900 p-12 text-center hover:bg-stone-900/80 cursor-default">
            <div className="font-serif text-5xl font-light text-gold-400/20 leading-none mb-5">
              05
            </div>
            <div className="font-serif text-lg font-normal text-white leading-snug">
              Humanity
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
