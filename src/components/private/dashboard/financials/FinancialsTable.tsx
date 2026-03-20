"use client";

import { useEffect, useState } from "react";
import { BiSearch } from "react-icons/bi";
import { Vehicle } from "@/src/interfaces/index";
import { useSearchParams } from "next/navigation";
import { Pagination } from "../table/pagination/Pagination";
import { FinancialsTableItem } from "./FinancialsTableItem";
import { AddInvestmentModal } from "./modal/AddInvestmentModal";
import { Investment } from "@/src/interfaces/investment";
import { addInvestment } from "@/src/actions/private/financials.actions";
import { ServerResponse } from "../../../../interfaces/actions";
import toast from "react-hot-toast";

interface Props {
  name: string;
  headers: string[];
  data?: any[]; //! change to interface vehicle
  amountPages: number;
}

interface Modals {
  view: boolean;
  create: boolean;
  edit: boolean;
}
type Options = keyof Modals;

export const FinancialsTable = ({
  name,
  headers,
  data,
  amountPages = 1,
}: Props) => {
  const [search, setSearch] = useState("");
  const [dataList, setDataList] = useState<Vehicle[]>();
  const [openModal, setOpenModal] = useState<Modals>({
    view: false,
    create: false,
    edit: false,
  });
  const [targetId, setTargetId] = useState("");
  const [pagination, setPagination] = useState({
    limitInf: 1,
    limitSup: data?.length ?? 20,
  });

  const searchParams = useSearchParams();
  const page = searchParams.get("page");

  useEffect(() => {
    if (data) {
      const end = Number(page) * 20;
      const start = end - 20;
      const sliceData = data.slice(start, end);
      setDataList(sliceData);
      setPagination({
        limitInf: start,
        limitSup: sliceData.length + start,
      });
    }
  }, [searchParams, data, page]);

  const findData = (value: string) => {
    if (!data) return;

    const q = value.toLowerCase();

    const dataFounds = data.filter((row) => {
      const fullmodel = `
        ${row.brand.toLowerCase()} 
        ${row.model.toLowerCase()} 
        ${row.year}
      `;

      return fullmodel.includes(q);
    });
    if (dataFounds) {
      setDataList(dataFounds);
    }
  };

  const handleSearch = (value: string) => {
    setSearch(value);
    findData(value);
  };

  const handleOpenModal = (value: boolean, option: Options) => {
    setOpenModal((prev) => ({ ...prev, [option]: value }));
  };

  const handleAddInvestment = async (investment: Investment) => {
    const response: ServerResponse<any> = await addInvestment(investment);

    if (!response.success) {
      toast.error(response.error ?? "Unknow error.");
      return false;
    }
    toast.success(response.message ?? "");
    return true;
  };

  return (
    <>
      <div className="relative overflow-x-auto shadow-sm sm:rounded-lg m-5 bg-zinc-900 border border-stone-700">
        <div className="flex flex-row w-full h-20 items-center justify-between border-b border-stone-700 px-10">
          <span className="text-xl text-gray-50 font-bold">{name}</span>
        </div>
        <div className="px-8 py-6">
          <div className="relative">
            <BiSearch
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              size={16}
            />
            <input
              type="text"
              placeholder="Search by model, brand or year..."
              value={search}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-3 border border-stone-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>
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
            {dataList &&
              dataList.map((vehicle) => (
                <FinancialsTableItem
                  key={vehicle.id}
                  vehicle={vehicle}
                  handleOpenModal={handleOpenModal}
                  setOpenConfirm={() => handleOpenModal}
                  setOpenEdit={() => handleOpenModal}
                  setTargetId={setTargetId}
                />
              ))}
          </tbody>
        </table>
        {data && (
          <Pagination
            pages={amountPages}
            results={data.length}
            limitInf={pagination.limitInf}
            limitSup={pagination.limitSup}
          />
        )}
      </div>
      <AddInvestmentModal
        open={openModal.create}
        setOpen={handleOpenModal}
        handleAction={handleAddInvestment}
        type={"create"}
        vehicle={dataList && dataList.find((veh) => veh.id === targetId)}
      />
    </>
  );
};
