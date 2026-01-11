import { changeAdminPassword } from "@/src/actions";
import { CloseButton } from "@/src/components/button/CloseButton";
import { useLockBodyScroll } from "@/src/hooks/useLockBodyScroll";
import { regex } from "@/src/utils/regex";
import { useState } from "react";
import toast from "react-hot-toast";

interface Props {
  id: string;
  open: boolean;
  setOpen: (value: boolean) => void;
}

export const ChangePasswordModal = ({ id, open, setOpen }: Props) => {
  const [newPass, setNewPass] = useState({
    password: "",
    repeatPassword: "",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!regex.password.test(newPass.password)) return;
    if (!regex.password.test(newPass.repeatPassword)) return;
    if (!(newPass.password === newPass.repeatPassword)) return;

    try {
      const response = await changeAdminPassword(id, newPass.password);
      if (!response.success) return toast.error(`${response.message}`);

      toast.success(`${response.message}`);
    } catch (error) {
      return toast.error(`${error}`);
    }

    setNewPass({
      password: "",
      repeatPassword: "",
    });
    setOpen(false);
  };

  useLockBodyScroll(open);
  if (!open) return null;
  return (
    <>
      {open && (
        <div
          id="crud-modal"
          tabIndex={-1}
          className="overflow-y-auto overflow-x-hidden fixed z-50 flex justify-center items-center w-full md:inset-0 h-screen max-h-full bg-zinc-800/90"
        >
          <div className="relative p-4 w-full max-w-md max-h-full">
            {/*<!-- Modal content -->*/}
            <div className="relative bg-zinc-900 rounded-2xl shadow-2xl border border-stone-700">
              {/*<!-- Modal header -->*/}
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t-2xl border-stone-700 bg-zinc-800">
                <h3 className="text-2xl font-semibold">Change Password</h3>
                <CloseButton onClick={setOpen} />
              </div>
              {/*<!-- Modal body -->*/}
              <form className="p-4 md:p-5" onSubmit={handleSubmit}>
                <div className="col-span-2 mb-5">
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium"
                  >
                    New Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    className="w-full p-2.5 bg-zinc-800/80 border-2 border-gold-500/20 rounded-xl text-white placeholder-zinc-500 outline-none focus:bg-zinc-800 focus:border-gold-500 focus:ring-4 focus:ring-gold-500/10"
                    placeholder="Enter Password"
                    required
                    value={newPass.password}
                    onChange={(e) => {
                      setNewPass((prev) => ({
                        ...prev,
                        password: e.target.value,
                      }));
                    }}
                  />
                </div>
                <div className="col-span-2">
                  <label
                    htmlFor="repeatPassword"
                    className="block mb-2 text-sm font-medium"
                  >
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    name="repeatPassword"
                    id="repeatPassword"
                    className="w-full p-2.5 bg-zinc-800/80 border-2 border-gold-500/20 rounded-xl text-white placeholder-zinc-500 outline-none focus:bg-zinc-800 focus:border-gold-500 focus:ring-4 focus:ring-gold-500/10"
                    placeholder="Enter Password"
                    required
                    value={newPass.repeatPassword}
                    onChange={(e) => {
                      setNewPass((prev) => ({
                        ...prev,
                        repeatPassword: e.target.value,
                      }));
                    }}
                  />
                </div>
                <div className="flex justify-end mt-10">
                  <button
                    type="submit"
                    className="text-white inline-flex items-end bg-gold-700 hover:bg-gold-600 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  >
                    Change Password
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
