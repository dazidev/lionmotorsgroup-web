import { Lead } from "@/src/interfaces";
import { useEffect, useState } from "react";
import { FormatDate } from "../../../../utils/format-date";
import { getVehicleSlug, setAttend } from "@/src/actions";
import toast from "react-hot-toast";
import { CloseButton } from "@/src/components/button/CloseButton";
import { DefaultButton } from "@/src/components/button/DefaultButton";

interface Props {
  leads: Lead[];
  current: string;
  open: boolean;
  setOpen: (value: boolean) => void;
}

export const LeadView = ({ leads, current, open, setOpen }: Props) => {
  const [lead, setLead] = useState<Lead>();

  useEffect(() => {
    if (!leads) return;
    const currentLead = leads.find((l) => l.id === current);
    setLead(currentLead);
  }, [current]);

  const handleAttended = async () => {
    const response = await setAttend(lead?.id!);
    if (response.success === false) return toast.error(response.message!);
    setOpen(false);
    toast.success(response.message!);
  };

  const viewVehicle = async () => {
    if (lead?.vehicleId === undefined) return;
    const slug = await getVehicleSlug(lead.vehicleId);
    if (!slug.success) return;

    const url = `/catalog/${slug.data?.slug}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <>
      {open && (
        <div
          id="lead-view"
          className="overflow-y-auto overflow-x-hidden fixed z-50 flex justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full bg-zinc-800/90"
        >
          <div className="relative p-4 w-full max-w-md max-h-full">
            {/*<!-- Modal content -->*/}
            <div className="relative bg-zinc-900 rounded-2xl shadow-2xl border border-stone-700">
              <div className="sticky top-0 z-100 flex w-full border-b rounded-t-2xl border-stone-700 bg-zinc-800 p-5">
                <h1 className="text-2xl font-semibold">Lead Details</h1>
                <CloseButton onClick={setOpen} />
              </div>
              {lead && (
                <div className="flex flex-col p-5 gap-3">
                  <div>
                    <span
                      className={`w-auto h-auto rounded py-1 px-2 ${
                        lead.status == "attended"
                          ? "bg-emerald-600"
                          : "bg-red-800"
                      } mr-3`}
                    >
                      {lead.status}
                    </span>
                    <span
                      className={"w-auto h-auto rounded py-1 px-2 bg-blue-800"}
                    >
                      {FormatDate.onlyDate(lead.createdAt)}
                    </span>
                  </div>
                  <div className="flex flex-col mt-2 text-xl gap-1">
                    <div className="flex gap-3">
                      <div className="flex-1 min-w-0">
                        <label htmlFor="name">First Name</label>
                        <input
                          className="w-full px-2 py-2 mb-2 bg-zinc-800/80 border-2 border-gold-500/20 rounded-xl text-white placeholder-zinc-500 outline-none"
                          value={lead.name}
                          readOnly
                          type="text"
                          name="name"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <label htmlFor="lastname">Last Name</label>
                        <input
                          className="w-full px-2 py-2 mb-2 bg-zinc-800/80 border-2 border-gold-500/20 rounded-xl text-white placeholder-zinc-500 outline-none"
                          value={lead.lastname}
                          readOnly
                          type="text"
                          name="lastname"
                        />
                      </div>
                    </div>
                    <label htmlFor="email">Email</label>
                    <input
                      className="w-full px-2 py-2 mb-2 bg-zinc-800/80 border-2 border-gold-500/20 rounded-xl text-white placeholder-zinc-500 outline-none"
                      value={lead.email}
                      readOnly
                      type="text"
                      name="email"
                    />
                    <div className="flex gap-3">
                      <div className="flex-1 min-w-0">
                        <label htmlFor="phone-number">Phone Number</label>
                        <input
                          className="w-full px-2 py-2 mb-2 bg-zinc-800/80 border-2 border-gold-500/20 rounded-xl text-white placeholder-zinc-500 outline-none"
                          value={
                            lead.phoneNumber ? lead.phoneNumber : "Unanswered"
                          }
                          readOnly
                          type="text"
                          name="phone-number"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <label htmlFor="zipcode">Zip Code</label>
                        <input
                          className="w-full px-2 py-2 mb-2 bg-zinc-800/80 border-2 border-gold-500/20 rounded-xl text-white placeholder-zinc-500 outline-none"
                          value={lead.zipcode ? lead.zipcode : "Unanswered"}
                          readOnly
                          type="text"
                          name="zipcode"
                        />
                      </div>
                    </div>
                    <label htmlFor="comments">Comments</label>
                    <textarea
                      className="w-full h-auto px-2 py-2 mb-2 bg-zinc-800/80 border-2 border-gold-500/20 rounded-xl text-white placeholder-zinc-500 outline-none"
                      value={lead.comments ? lead.comments : "Unanswered"}
                      readOnly
                      name="comments"
                    />
                  </div>
                </div>
              )}
              <div className="flex justify-end gap-3 pb-5 pr-5">
                <DefaultButton
                  name={"View Vehicle"}
                  loading={false}
                  onClick={viewVehicle}
                />
                {lead?.status === "unattended" && (
                  <DefaultButton
                    name="Attended"
                    style="bg-emerald-900 hover:bg-emerald-800"
                    onClick={handleAttended}
                    loading={false}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
