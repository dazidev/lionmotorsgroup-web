import { ViewInvestmentTableItem } from "./ViewInvestmentTableItem";
import { InvestmentResponse } from "@/src/interfaces/investment";

interface Props {
  headers: string[];
  vehicleData: {
    year: string;
    brand: string;
    model: string;
    vin: string;
  };
  data: InvestmentResponse[];
}

export const ViewInvestmentTable = ({ headers, data, vehicleData }: Props) => {
  const { year, brand, model, vin } = vehicleData;
  return (
    <div className="relative overflow-x-auto shadow-sm sm:rounded-lg m-5 bg-zinc-900 border border-stone-700">
      <div className="flex flex-col w-full h-20 border-b border-stone-700 px-10 items-center justify-center">
        <span className="text-xl text-gray-50 font-bold">{`${brand} ${model} ${year}`}</span>
        <span className="text-xl text-gray-50 font-bold">{`${vin}`}</span>
      </div>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 pt-5">
        <thead className="text-xs text-gray-100 uppercase bg-zinc-800">
          <tr>
            {headers &&
              headers.map((header) => (
                <th key={header} scope="col" className="px-6 py-3">
                  {header}
                </th>
              ))}
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map((inv) => (
              <ViewInvestmentTableItem
                key={inv.id}
                id={inv.id}
                name={inv.name}
                description={inv.description}
                amount={inv.amount}
                date={inv.date}
                vehicleId={inv.vehicleId}
              />
            ))}
        </tbody>
      </table>
    </div>
  );
};
