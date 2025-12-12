"use client";

import { useEffect, useState } from "react";
import { RxCaretSort } from "react-icons/rx";
import toast from "react-hot-toast";
import { LeadsTableItem } from "../table-lead/LeadsTableItem";
import { ConfirmModal } from "../modal/ConfirmModal";
import { Lead } from "@/src/interfaces/lead";
import { LeadView } from "./LeadView";
import { deleteLead } from "@/src/actions";

interface Props {
  name: string;
  headers: string[];
  data?: Lead[];
}

interface Order {
  option: "date" | "status";
  date: "Asc" | "Desc";
  status: "Attended" | "Unattended";
}

export const LeadsTable = ({ name, headers, data }: Props) => {
  const [search, setSearch] = useState<Order>({
    option: "date",
    date: "Asc",
    status: "Attended",
  });
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

  const handleOpenModalConfirm = (value: boolean) => {
    setOpenModal((prev) => ({ ...prev, confirm: value }));
  };

  const handleOpenModalView = (value: boolean) => {
    setOpenModal((prev) => ({ ...prev, view: value }));
  };

  const handleRemove = async () => {
    try {
      const remove = await deleteLead(targetId);
      if (!remove.success) return toast.error(remove.message as string);
      return toast.success(`${remove.message}`);
    } catch (error) {
      toast.error(`${error}`);
    } finally {
      setTargetId("");
    }
  };

  const handleOrderByStatus = () => {
    let orderData = null;
    if (search.status === "Attended") {
      setSearch((prev) => ({ ...prev, status: "Unattended" }));
      orderData = data?.slice().sort((x, y) => {
        if (x.status === "unattended" && y.status !== "unattended") return -1;
        if (x.status !== "unattended" && y.status === "unattended") return 1;
        return 0;
      });
    } else {
      setSearch((prev) => ({ ...prev, status: "Attended" }));
      orderData = data?.slice().sort((x, y) => {
        if (x.status === "attended" && y.status !== "attended") return -1;
        if (x.status !== "attended" && y.status === "attended") return 1;
        return 0;
      });
    }
    if (orderData !== null) {
      setDataList(orderData);
    }
  };

  const handleOrderByDate = () => {
    let orderData = null;
    if (search.date === "Asc") {
      setSearch((prev) => ({ ...prev, date: "Desc" }));
      orderData = data
        ?.slice()
        .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    } else {
      setSearch((prev) => ({ ...prev, date: "Asc" }));
      orderData = data
        ?.slice()
        .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
    }
    if (orderData !== null) {
      setDataList(orderData);
    }
  };

  const handleOptionSearch = (value: string) => {
    if (value === "date" || value === "status") {
      setSearch((prev) => ({ ...prev, option: value }));
    }
  };

  const handleSearch = () => {
    if (search.option === "date") {
      handleOrderByDate();
    } else if (search.option === "status") {
      handleOrderByStatus();
    }
  };

  return (
    <>
      <div className="relative overflow-x-auto shadow-sm sm:rounded-lg m-5 bg-zinc-900 border border-stone-700">
        <div className="flex flex-row w-full h-20 items-center justify-between border-b border-stone-700">
          <span className="text-2xl text-gray-50 font-bold m-10">{`${name}`}</span>
        </div>
        <div className="px-8 py-6">
          <div className="flex w-min px-2 flex-row items-baseline bg-zinc-800/80 gap-3">
            <span className="whitespace-nowrap font-semibold">Sort by:</span>
            <select
              id="sort"
              className="w-auto p-2.5 text-white placeholder-zinc-500 outline-none focus:bg-zinc-700/80"
              value={search.option}
              onChange={(e) => {
                handleOptionSearch(e.target.value);
              }}
            >
              <option value="date">Date</option>
              <option value="status">Status</option>
            </select>
            <button
              className="w-auto py-2 pl-2 hover:bg-zinc-700/80 flex items-center justify-center transition-all"
              onClick={handleSearch}
            >
              <span className="flex justify-center items-center gap-2">
                {search.option === "date" ? search.date : search.status}
                <RxCaretSort className=" text-gray-200" size={22} />
              </span>
            </button>
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
