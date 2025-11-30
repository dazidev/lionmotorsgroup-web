"use client";

import { useEffect, useState } from "react";
import { BiSearch } from "react-icons/bi";
import toast from "react-hot-toast";
import { TableItem } from "./TableItem";
import { User } from "@/src/interfaces/index";
import { createAdmin, deleteAdmin, editAdmin } from "@/src/actions";
import { FormModal } from "../modal/FormModal";
import { ConfirmModal } from "../modal/ConfirmModal";
import { ChangePasswordModal } from "../modal/ChangePasswordModal";

interface Props {
  name: string;
  headers: string[];
  data?: User[];
}

export const Table = ({ name, headers, data }: Props) => {
  const [search, setSearch] = useState("");
  const [dataList, setDataList] = useState<User[]>();
  const [openModal, setOpenModal] = useState({
    create: false,
    confirm: false,
    edit: false,
    changePassword: false,
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

  const handleOpenModalCreate = (value: boolean) => {
    setOpenModal((prev) => ({ ...prev, create: value }));
  };

  const handleOpenModalConfirm = (value: boolean) => {
    setOpenModal((prev) => ({ ...prev, confirm: value }));
  };

  const handleOpenModalEdit = (value: boolean) => {
    setOpenModal((prev) => ({ ...prev, edit: value }));
  };

  const handleOpenModalChangePassword = (value: boolean) => {
    setOpenModal((prev) => ({ ...prev, changePassword: value }));
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
        <div className="flex flex-row w-full h-20 items-center justify-between border-b border-stone-700">
          <span className="text-xl text-gray-50 font-bold m-10">{`${name}`}</span>
          <button
            className="block mr-10 px-5 py-2 text-white font-bold rounded-lg cursor-pointer hover:brightness-110 focus:ring-2 bg-gold-700 focus:ring-gold-400"
            type="button"
            onClick={() => handleOpenModalCreate(true)}
          >
            {`Create ${name.slice(0, -1)}`}
          </button>
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
              dataList.map((admin) => (
                <TableItem
                  key={admin.id}
                  user={admin}
                  setOpenConfirm={handleOpenModalConfirm}
                  setOpenEdit={handleOpenModalEdit}
                  setOpenChangePass={handleOpenModalChangePassword}
                  setTargetId={setTargetId}
                />
              ))}
          </tbody>
        </table>
      </div>
      <FormModal
        open={openModal.create}
        setOpen={handleOpenModalCreate}
        handleAction={handleCreate}
        type="create"
      />
      <FormModal
        open={openModal.edit}
        setOpen={handleOpenModalEdit}
        handleAction={handleEdit}
        type="edit"
        user={data?.find((user) => {
          return user.id === targetId;
        })}
      />
      <ConfirmModal
        open={openModal.confirm}
        setOpen={handleOpenModalConfirm}
        handleRemove={handleRemove}
      />
      <ChangePasswordModal
        id={targetId}
        open={openModal.changePassword}
        setOpen={handleOpenModalChangePassword}
      />
    </>
  );
};
