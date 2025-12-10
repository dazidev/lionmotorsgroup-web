"use client";

import { useEffect, useState } from "react";
import { BiSearch } from "react-icons/bi";
import toast from "react-hot-toast";
import { LeadsTableItem } from "../table-lead/LeadsTableItem";
import { deleteAdmin } from "@/src/actions";
import { ConfirmModal } from "../modal/ConfirmModal";
import { Lead } from "@/src/interfaces/lead";
import { LeadView } from "./LeadView";

interface Props {
  name: string;
  headers: string[];
  data?: Lead[];
}

export const LeadsTable = ({ name, headers, data }: Props) => {
  const [search, setSearch] = useState("");
  const [dataList, setDataList] = useState<Lead[]>();
  const [openModal, setOpenModal] = useState({
    view: false,
    confirm: false,
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
      const fullname = `${row.name.toLowerCase()} ${row.lastname.toLowerCase()}`;
      const email = row.email.toLowerCase();

      return fullname.includes(q) || email.includes(q);
    });
    if (dataFounds) {
      setDataList(dataFounds);
    }
  };

  const handleSearch = (value: string) => {
    setSearch(value);
    findData(value);
  };

  const handleOpenModalConfirm = (value: boolean) => {
    setOpenModal((prev) => ({ ...prev, confirm: value }));
  };

  const handleOpenModalView = (value: boolean) => {
    setOpenModal((prev) => ({ ...prev, view: value }));
  };

  const handleRemove = async () => {
    try {
      const remove = await deleteAdmin(targetId);
      if (!remove.success) return toast.error(remove.message as string);
      return toast.success(`${remove.message}`);
    } catch (error) {
      toast.error(`${error}`);
    } finally {
      setTargetId("");
    }
  };

  const selectLead = (): Lead | undefined => {
    if (!dataList) return;
    const currentLead = dataList.find((lead) => lead.id === targetId);
    if (typeof currentLead === "undefined") return;

    return currentLead;
  };

  return (
    <>
      <div className="relative overflow-x-auto shadow-sm sm:rounded-lg m-5 bg-zinc-900 border border-stone-700">
        <div className="flex flex-row w-full h-20 items-center justify-between border-b border-stone-700">
          <span className="text-xl text-gray-50 font-bold m-10">{`${name}`}</span>
        </div>
        <div className="px-8 py-6">
          <div className="relative">
            <BiSearch
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              size={16}
            />
            <input
              type="text"
              placeholder="Search by name or email..."
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
              dataList.map((lead) => (
                <LeadsTableItem
                  key={lead.id}
                  lead={lead}
                  setOpenConfirm={handleOpenModalConfirm}
                  setOpenView={handleOpenModalView}
                  setTargetId={setTargetId}
                />
              ))}
          </tbody>
        </table>
      </div>
      <ConfirmModal
        open={openModal.confirm}
        setOpen={handleOpenModalConfirm}
        handleRemove={handleRemove}
      />
      {}
      <LeadView
        leads={dataList!}
        current={targetId}
        open={openModal.view}
        setOpen={handleOpenModalView}
      />
    </>
  );
};
