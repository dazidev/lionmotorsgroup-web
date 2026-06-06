import { BasicVehicleResponse } from "@/src/interfaces";
import { ViewInvestmentTableItem } from "./ViewInvestmentTableItem";
import { deleteInvestment } from "@/src/actions/private/financials.actions";
import toast from "react-hot-toast";
import { ConfirmModal } from "../../../modal/ConfirmModal";
import { useState } from "react";
import { ViewInvoiceModal } from "./ViewInvoiceModal";

interface Props {
  headers: string[];
  vehicleData: BasicVehicleResponse;
}

type Modals = {
  invoice: boolean;
  confirm: boolean;
};

export const ViewInvestmentTable = ({ headers, vehicleData }: Props) => {
  const { year, brand, model, vin } = vehicleData;

  const [openModal, setOpenModal] = useState<Modals>({
    invoice: false,
    confirm: false,
  });
  const [targetId, setTargetId] = useState("");

  const handleOpenModal = (value: boolean, option: string) => {
    setOpenModal((prev) => ({ ...prev, [option]: value }));
  };

  const handleRemoveInvestment = async () => {
    try {
      const remove = await deleteInvestment(targetId);
      if (!remove.success) return toast.error(remove.message as string);
      return toast.success(`${remove.message}`);
    } catch (error) {
      toast.error(`${error}`);
    } finally {
      setTargetId("");
    }
  };

  return (
    <div className="relative overflow-x-auto shadow-sm sm:rounded-lg m-5 bg-zinc-900 border border-stone-700">
      <div className="flex flex-col w-full h-20 border-b border-stone-700 px-10 items-center justify-center">
        <span className="text-xl text-gray-50 font-bold">{`${brand.name} ${model} ${year}`}</span>
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
          {vehicleData.investments &&
            vehicleData.investments.map((inv) => (
              <ViewInvestmentTableItem
                key={inv.id}
                id={inv.id}
                name={inv.name}
                description={inv.description}
                amount={inv.amount}
                invoice={inv.invoiceKey}
                date={inv.date}
                vehicleId={inv.vehicleId}
                handleOpenModal={handleOpenModal}
                setTargetId={setTargetId}
              />
            ))}
        </tbody>
      </table>
      <ConfirmModal
        open={openModal.confirm}
        setOpen={handleOpenModal}
        handleRemove={handleRemoveInvestment}
      />
      <ViewInvoiceModal
        open={openModal.invoice}
        setOpen={handleOpenModal}
        investment={vehicleData.investments.find((inv) => inv.id === targetId)!}
      />
    </div>
  );
};
