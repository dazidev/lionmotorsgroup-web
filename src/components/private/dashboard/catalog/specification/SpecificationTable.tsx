"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { BiSearch } from "react-icons/bi";
import toast from "react-hot-toast";
import { SpecificationTableItem } from "./SpecificationTableItem";
import { Brands, Specifications } from "@/src/interfaces/index";
import { deleteBrand, deleteSpecification } from "@/src/actions";
import { ConfirmModal } from "../../modal/ConfirmModal";
import { useCatalog } from "@/src/context/CatalogProvider";
import { DefaultButton } from "../../../../button/DefaultButton";

interface Props {
  name: string;
  headers: string[];
  data?: Specifications[] | Brands[];
  setOpenAddBrand: () => void;
}

interface Modals {
  create: boolean;
  confirm: boolean;
  addBrand: boolean;
}

export const SpecificationTable = ({
  name,
  headers,
  data,
  setOpenAddBrand,
}: Props) => {
  const { revalidateData } = useCatalog();
  const [search, setSearch] = useState("");
  const [dataList, setDataList] = useState<Specifications[] | Brands[]>();
  const [openModal, setOpenModal] = useState<Modals>({
    create: false,
    confirm: false,
    addBrand: false,
  });
  const [targetId, setTargetId] = useState("");

  useEffect(() => {
    if (data) {
      setDataList(data);
    }
  }, [data]);

  /*const findData = (value: string) => {
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
  };*/

  const handleSearch = (value: string) => {
    setSearch(value);
    // findData(value);
  };

  const handleOpenModal = (value: boolean, option: string) => {
    setOpenModal((prev) => ({ ...prev, [option]: value }));
  };

  const handleRemove = async () => {
    try {
      let remove;
      if (name === "Brands") {
        remove = await deleteBrand(targetId);
      } else {
        remove = await deleteSpecification(targetId);
      }
      if (!remove.success) return toast.error(remove.message as string);

      toast.success(`${remove.message}`);
      name === "Brands"
        ? revalidateData("brands")
        : revalidateData("specifications");
      return;
    } catch (error) {
      toast.error(`${error}`);
    } finally {
      setTargetId("");
    }
  };

  return (
    <>
      <div className="relative overflow-x-auto shadow-sm sm:rounded-lg m-5 bg-zinc-900 border border-stone-700">
        <div className="flex flex-row w-full h-20 items-center justify-between border-b border-stone-700 px-10">
          <span className="text-xl text-gray-50 font-bold">{`${name}`}</span>
          {name === "Brands" && (
            <DefaultButton
              name={"Add Brand"}
              loading={false}
              onClick={setOpenAddBrand}
            />
          )}
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
              dataList.map((s) => (
                <SpecificationTableItem
                  key={s.id}
                  data={s}
                  setOpenConfirm={handleOpenModal}
                  setTargetId={setTargetId}
                />
              ))}
          </tbody>
        </table>
      </div>
      <ConfirmModal
        open={openModal.confirm}
        setOpen={handleOpenModal}
        handleRemove={handleRemove}
      />
    </>
  );
};
