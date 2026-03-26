interface Props {
  vehicleData: {
    id: string;
    year: number;
    brand: {
      name: string;
    };
    model: string;
  };
  milesFormat: string;
  priceFormat: string;
}

export const GeneralCard = ({
  vehicleData,
  milesFormat,
  priceFormat,
}: Props) => {
  return (
    <div className="flex flex-row w-full items-start overflow-hidden gap-5">
      <div className="w-full h-auto bg-stone-900 rounded-2xl text-center gap-5 p-5">
        <div className="pb-5 md:py-5">
          <p className="text-3xl">{`${
            vehicleData.year
          } ${vehicleData.brand.name.toUpperCase()}`}</p>
          <h1 className="text-5xl font-bold">{`${vehicleData.model.toUpperCase()}`}</h1>
          <p className="text-2xl">{`${milesFormat} miles`}</p>
        </div>
        <span className="block w-full h-px bg-gray-300"></span>
        <div className="pt-5 md:py-5">
          <h1 className="flex justify-between text-4xl font-bold">
            <p>Price</p>
            <p className="text-gold-500">{`$${priceFormat}`}</p>
          </h1>
        </div>
      </div>
    </div>
  );
};
