import { Lead } from "@/src/interfaces";
import { useEffect, useState } from "react";
import { FormatDate } from "../../../../utils/format-date";
import { setAttend } from "@/src/actions";
import toast from "react-hot-toast";

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

  return (
    <>
      {open && (
        <div
          id="lead-view"
          className="overflow-y-auto overflow-x-hidden fixed z-50 flex justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
        >
          <div className="relative p-4 w-full max-w-md max-h-full">
            {/*<!-- Modal content -->*/}
            <div className="relative p-5 bg-zinc-900 rounded-xl shadow-2xl border border-stone-700">
              <div>
                <h1 className="text-3xl font-semibold text-gold-700">
                  LEAD DETAILS
                </h1>
                <button
                  type="button"
                  className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:text-gold-700 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                  data-modal-hide="popup-modal"
                  onClick={() => {
                    setOpen(false);
                  }}
                >
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              {lead && (
                <>
                  <span
                    className={`w-auto h-auto rounded p-1 ${
                      lead.status == "attended"
                        ? "bg-emerald-600"
                        : "bg-red-800"
                    } mr-3`}
                  >
                    {lead.status}
                  </span>
                  <span className={"w-auto h-auto rounded p-1 bg-blue-800"}>
                    {FormatDate.onlyDate(lead.createdAt)}
                  </span>
                  <div className="flex flex-col mt-2 text-xl">
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
                </>
              )}
              <div className="flex justify-end mt-5 gap-3">
                <button
                  type="submit"
                  className=" bg-gold-700 hover:bg-gold-600 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  <span>View Car</span>
                </button>
                {lead?.status === "unattended" && (
                  <button
                    onClick={handleAttended}
                    className="bg-emerald-900 hover:bg-emerald-800 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  >
                    <span>Attended</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
