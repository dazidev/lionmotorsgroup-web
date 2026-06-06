"use client";

import { useEffect, useState } from "react";
import { BiSearch } from "react-icons/bi";
import toast from "react-hot-toast";
import { CatalogTableItem } from "./CatalogTableItem";
import { Vehicle } from "@/src/interfaces/index";
import { createAdmin, deleteVehicle, editAdmin } from "@/src/actions";
import { FormModal } from "../../modal/FormModal";
import { ConfirmModal } from "../../modal/ConfirmModal";
import { SpecificationManageModal } from "../specification/SpecificationManageModal";
import { CreateVehicleModal } from "../modal/CreateVehicleModal";
import { useSearchParams } from "next/navigation";
import { Pagination } from "../../table/pagination/Pagination";
import { UpdateVehicleModal } from "../modal/UpdateVehicleModal";

interface Props {
  name: string;
  headers: string[];
  data?: Vehicle[]; //! change to interface vehicle
  amountPages: number;
}

interface Modals {
  create: boolean;
  update: boolean;
  confirm: boolean;
  addBrand: boolean;
}

export const CatalogTable = ({
  name,
  headers,
  data,
  amountPages = 1,
}: Props) => {
  const [search, setSearch] = useState("");
  const [dataList, setDataList] = useState<Vehicle[]>();
  const [openModal, setOpenModal] = useState<Modals>({
    create: false,
    update: false,
    confirm: false,
    addBrand: false,
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
      console.log(`${end} ${start}`);
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

  const handleOpenModal = (value: boolean, option: string) => {
    setOpenModal((prev) => ({ ...prev, [option]: value }));
  };

  const handleRemove = async () => {
    try {
      const remove = await deleteVehicle(targetId);
      if (!remove.success) return toast.error(remove.message as string);
      return toast.success(`${remove.message}`);
    } catch (error) {
      toast.error(`${error}`);
    } finally {
      setTargetId("");
    }
  };

  const handleCreate = async (field: any): Promise<boolean> => {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.email)) return false;
    if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(
        field.password,
      )
    )
      return false;
    if (
      !field.name ||
      !field.lastname ||
      !field.email ||
      !field.password ||
      !field.role
    )
      return false;
    try {
      const response = await createAdmin(field);
      if (!response.success) {
        toast.error(`${response.message}`);
        return false;
      }

      toast.success("The administrator has been created successfully");
      return true;
    } catch (error) {
      toast.error(`${error}`);
      return false;
    }
  };

  return (
    <>
      <div className="relative overflow-x-auto shadow-sm sm:rounded-lg m-5 bg-zinc-900 border border-stone-700">
        <div className="flex flex-row w-full h-20 items-center justify-between border-b border-stone-700 px-10">
          <span className="text-xl text-gray-50 font-bold">{`${name}`}</span>
          <div className="flex gap-3">
            <button
              className="block px-5 py-2 text-white font-bold rounded-lg cursor-pointer hover:brightness-110 bg-gold-700"
              type="button"
              onClick={() => handleOpenModal(true, "addBrand")}
            >
              Manage Details
            </button>
            <button
              className="block px-5 py-2 text-white font-bold rounded-lg cursor-pointer hover:brightness-110 bg-gold-700"
              type="button"
              onClick={() => handleOpenModal(true, "create")}
            >
              {`Create ${name.slice(0, -1)}`}
            </button>
          </div>
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
                <CatalogTableItem
                  key={vehicle.id}
                  vehicle={vehicle}
                  setOpenConfirm={handleOpenModal}
                  setOpenEdit={handleOpenModal}
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
      <FormModal
        open={openModal.create}
        setOpen={() => handleOpenModal}
        handleAction={handleCreate}
        type="create"
      />
      <SpecificationManageModal
        open={openModal.addBrand}
        setOpen={handleOpenModal}
      />
      <ConfirmModal
        open={openModal.confirm}
        setOpen={handleOpenModal}
        handleRemove={handleRemove}
      />
      <CreateVehicleModal open={openModal.create} setOpen={handleOpenModal} />
      <UpdateVehicleModal
        open={openModal.update}
        setOpen={handleOpenModal}
        vehicle={data?.find((veh) => veh.id === targetId)!}
      />
    </>
  );
};
