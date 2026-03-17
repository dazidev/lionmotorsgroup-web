interface Props {
  headers: string[];
}

export const FinancialsTable = ({ headers }: Props) => {
  return (
    <>
      <div className="relative overflow-x-auto shadow-sm sm:rounded-lg m-5 bg-zinc-900 border border-stone-700">
        <div className="flex flex-row w-full h-20 items-center justify-between border-b border-stone-700">
          <span className="text-xl text-gray-50 font-bold m-10">{``}</span>
          <button
            className="block mr-10 px-5 py-2 text-white font-bold rounded-lg cursor-pointer hover:brightness-110 focus:ring-2 bg-gold-700 focus:ring-gold-400"
            type="button"
          >
            {`Create vehicle `}
          </button>
        </div>

        <table className="w-full text-sm text-left rtl:text-right text-gray-500 pt-5">
          <thead className="text-xs text-gray-100 uppercase bg-zinc-800">
            <tr>
              {headers.map((header) => (
                <th key={header} scope="col" className="px-6 py-3">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody></tbody>
        </table>
      </div>
    </>
  );
};
