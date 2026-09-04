"use client";

import { useEffect, useState } from "react";
import { BiSearch } from "react-icons/bi";
import { BasicVehicleResponse } from "@/src/interfaces/index";
import { useRouter, useSearchParams } from "next/navigation";
import { Pagination } from "../table/pagination/Pagination";
import { FinancialsTableItem } from "./FinancialsTableItem";
import { AddInvestmentModal } from "./modal/AddInvestmentModal";
import { Investment } from "@/src/interfaces/investment";
import toast from "react-hot-toast";
import { ViewInvestmentModal } from "./modal/view/ViewInvestmentModal";
import { useFinancial } from "@/src/context/FinancialProvider";

interface Props {
  name: string;
  headers: string[];
  amountPages: number;
}

interface Modals {
  manage: boolean;
  create: boolean;
}
type Options = keyof Modals;

export const FinancialsTable = ({ name, headers, amountPages = 1 }: Props) => {
  const { vehiclesData, revalidateData } = useFinancial();
  const [search, setSearch] = useState("");
  const [dataList, setDataList] = useState<BasicVehicleResponse[]>();
  const [openModal, setOpenModal] = useState<Modals>({
    manage: false,
    create: false,
  });
  const [targetId, setTargetId] = useState("");
  const [pagination, setPagination] = useState({
    limitInf: 1,
    limitSup: vehiclesData?.length ?? 20,
  });

  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const searchParams = useSearchParams();
  const page = searchParams.get("page");
  const router = useRouter();

  useEffect(() => {
    if (vehiclesData) {
      const end = Number(page) * 20;
      const start = end - 20;
      const sliceData = vehiclesData.slice(start, end);
      setDataList(vehiclesData);
      setPagination({
        limitInf: start,
        limitSup: sliceData.length + start,
      });
    }
  }, [searchParams, vehiclesData, page]);

  const findData = (value: string) => {
    if (!vehiclesData) return;

    const q = value.toLowerCase();

    const dataFounds = vehiclesData.filter((row) => {
      const fullmodel = `
        ${row.brand.name.toLowerCase()} 
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

  const handleAddInvestment = async (
    investment: Investment,
  ): Promise<boolean> => {
    try {
      if (!file) {
        throw new Error("Select image!");
      }

      const formData = new FormData();

      formData.append("investment", JSON.stringify(investment));

      formData.append("image", file);

      const response = await fetch("/api/admin/investments", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.message ?? "There was an error creating the investment.",
        );
      }

      await revalidateData();

      toast.success(
        result.message ?? "The investment has been created successfully.",
      );

      router.refresh();

      return true;
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unknown error.");

      return false;
    }
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
                  setTargetId={setTargetId}
                />
              ))}
          </tbody>
        </table>
        {vehiclesData && (
          <Pagination
            pages={amountPages}
            results={vehiclesData.length}
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
        file={file}
        setFile={setFile}
        preview={preview}
        setPreview={setPreview}
      />
      <ViewInvestmentModal
        open={openModal.manage}
        setOpen={handleOpenModal}
        vehicleData={dataList && dataList.find((veh) => veh.id === targetId)}
      />
    </>
  );
};
