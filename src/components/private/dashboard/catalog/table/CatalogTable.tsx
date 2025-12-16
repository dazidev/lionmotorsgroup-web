"use client";

import { useEffect, useState } from "react";
import { BiSearch } from "react-icons/bi";
import toast from "react-hot-toast";
import { CatalogTableItem } from "./CatalogTableItem";
import { Vehicle } from "@/src/interfaces/index";
import { createAdmin, deleteVehicle, editAdmin } from "@/src/actions";
import { FormModal } from "../../modal/FormModal";
import { ConfirmModal } from "../../modal/ConfirmModal";
import { CatalogModalAddBrand } from "../modal/CatalogModalAddBrand";
import { CreateVehicleModal } from "../modal/CreateVehicleModal";

interface Props {
  name: string;
  headers: string[];
  data?: any[]; //! change to interface vehicle
}

interface Modals {
  create: boolean;
  confirm: boolean;
  edit: boolean;
  addBrand: boolean;
}

export const CatalogTable = ({ name, headers, data }: Props) => {
  const [search, setSearch] = useState("");
  const [dataList, setDataList] = useState<Vehicle[]>();
  const [openModal, setOpenModal] = useState<Modals>({
    create: false,
    confirm: false,
    edit: false,
    addBrand: false,
  });
  const [targetId, setTargetId] = useState("");

  useEffect(() => {
    if (data) {
      setDataList(data);
    }
  }, [data]);

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
        field.password
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

  const handleEdit = async (field: any): Promise<boolean> => {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.email)) return false;
    if (!field.name || !field.lastname || !field.email || !field.role)
      return false;

    try {
      const response = await editAdmin(targetId, field);
      if (!response.success) {
        toast.error(`${response.message}`);
        return false;
      }

      toast.success(`${response.message}`);
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
              Add Brand
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
                  setOpenConfirm={() => handleOpenModal}
                  setOpenEdit={() => handleOpenModal}
                  setTargetId={setTargetId}
                />
              ))}
          </tbody>
        </table>
      </div>
      <FormModal
        open={openModal.create}
        setOpen={() => handleOpenModal}
        handleAction={handleCreate}
        type="create"
      />
      <CatalogModalAddBrand
        open={openModal.addBrand}
        setOpen={handleOpenModal}
        handleAction={handleCreate}
      />
      {/*<FormModal
        open={openModal.edit}
        setOpen={handleOpenModalEdit}
        handleAction={handleEdit}
        type="edit"
        vehicle={data?.find((user) => {
          return user.id === targetId;
        })}
      />*/}
      <ConfirmModal
        open={openModal.confirm}
        setOpen={() => handleOpenModal}
        handleRemove={handleRemove}
      />
      <CreateVehicleModal open={openModal.create} setOpen={handleOpenModal} />
    </>
  );
};
