"use client";

import { useState } from "react";
import Image from "next/image";
import { CloseButton } from "@/src/components";
import { InvestmentResponse } from "@/src/interfaces";
import { getImageUrl } from "@/src/utils/images";

interface Props {
  open: boolean;
  setOpen: (value: boolean, option: string) => void;
  investment: InvestmentResponse;
}

export const ViewInvoiceModal = ({ open, setOpen, investment }: Props) => {
  const [downloading, setDownloading] = useState(false);

  if (!open) return null;

  const imageUrl = getImageUrl(investment.invoiceKey);

  const handleDownload = async () => {
    try {
      setDownloading(true);

      const response = await fetch(imageUrl);

      if (!response.ok) {
        throw new Error("There was an error downloading the invoice.");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const extension =
        investment.invoiceKey.split(".").pop()?.split("?")[0] ?? "jpg";

      const link = document.createElement("a");
      link.href = url;
      link.download = `invoice-${investment.name}.${extension}`;

      document.body.appendChild(link);
      link.click();

      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.log(error);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="overflow-y-auto overflow-x-hidden fixed z-50 flex justify-center items-center w-full md:inset-0 h-screen max-h-full bg-zinc-800/90">
      <div className="relative p-4 w-full max-w-md max-h-[90vh]">
        <div className="relative bg-zinc-900 rounded-2xl shadow-2xl border border-stone-700 overflow-hidden">
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t border-stone-700">
            <h3 className="text-lg font-semibold">Invoice</h3>

            <div className="flex items-center gap-3">
              <CloseButton onClick={() => setOpen(false, "invoice")} />
            </div>
          </div>

          <div className="flex flex-col w-full justify-center items-center p-5">
            <div className="relative w-full max-w-sm aspect-[3/4] rounded-xl overflow-hidden border border-stone-700 bg-zinc-800">
              <Image
                src={imageUrl}
                alt={`invoice-${investment.name}`}
                fill
                className="object-contain p-2"
              />
            </div>
            <div className="flex w-full items-end justify-end pt-5">
              <button
                type="button"
                onClick={handleDownload}
                disabled={downloading}
                className="px-3 py-2 rounded-lg bg-gold-500 text-black text-sm font-semibold hover:bg-gold-600 disabled:opacity-60 hover:cursor-pointer"
              >
                {downloading ? "Downloading..." : "Download"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
