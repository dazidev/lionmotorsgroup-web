export const MissionVision = () => {
  return (
    <section className="py-32 md:px-16 px-8 relative overflow-hidden" id="our">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-20 max-w-5xl mx-auto relative">
        <div className="card-corner relative p-14 bg-stone-900/70 hover:bg-stone-900 border border-gold-border-t">
          <p className="font-sans text-sm font-medium tracking-[0.2em] uppercase text-gold-700 mb-6">
            Misión
          </p>
          <h3 className="font-serif text-3xl font-light text-white mb-6 leading-snug">
            Build <em className="italic text-gold-400">lifelong</em>{" "}
            relationships
          </h3>
          <p className="font-sans text-lg font-light text-white/60 leading-[1.9]">
            Our mission is to build lifelong relationships with every client,
            based on trust, family values, and honest service. More than selling
            cars, we strive to support our families and our community at every
            stage of their journey, providing assistance, maintenance, and
            solutions with the same commitment and care we would give to our
            own.
          </p>
        </div>

        <div className="card-corner relative p-14 bg-stone-900/70 hover:bg-stone-900 border border-gold-border-t">
          <p className="font-sans text-sm font-medium tracking-[0.2em] uppercase text-gold-700 mb-6">
            Visión
          </p>
          <h3 className="font-serif text-3xl font-light text-white mb-6 leading-snug">
            Part of <em className="italic text-gold-400">your family</em>, today
            and for generations to come.
          </h3>
          <p className="font-sans text-lg font-light text-white/60 leading-[1.9]">
            To be a dealership recognized for becoming part of our customers’
            families, today and for generations to come. We aim to be a trusted
            point for both the American and Latino community, where every person
            feels heard, valued, and supported, creating a legacy of lasting
            relationships that go beyond the purchase of a vehicle.
          </p>
        </div>
      </div>
    </section>
  );
};
