import { CloseButton } from "@/src/components/button/CloseButton";
import { DefaultButton } from "@/src/components/button/DefaultButton";
import { useLockBodyScroll } from "@/src/hooks/useLockBodyScroll";

interface Props {
  open: boolean;
  setOpen: (value: boolean, option: string) => void;
  handleRemove: () => void;
}

export const ConfirmModal = ({ open, setOpen, handleRemove }: Props) => {
  const handleConfirm = () => {
    handleRemove();
    setOpen(false, "confirm");
  };

  const handleCancel = () => {
    setOpen(false, "confirm");
  };

  useLockBodyScroll(open);
  if (!open) return null;
  return (
    <>
      {open && (
        <div
          id="popup-modal"
          tabIndex={-1}
          className="overflow-y-auto overflow-x-hidden fixed flex z-50 justify-center items-center w-full md:inset-0 h-screen max-h-full bg-zinc-800/90"
        >
          <div className="relative p-4 w-full max-w-md max-h-full">
            <div className="relative bg-zinc-900 border border-stone-700 rounded-lg shadow-sm">
              <div className="flex pr-2 pt-2">
                <CloseButton onClick={setOpen} element="confirm" />
              </div>
              <div className="p-5 text-center">
                <svg
                  className="mx-auto mb-5 text-gray-400 w-12 h-12"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
                <h3 className="mb-5 text-lg font-normal text-gray-200">
                  Are you sure you want to delete this?
                </h3>
                <div className="flex justify-center flex-row gap-3">
                  <DefaultButton
                    name="Yes, I'm sure"
                    style="bg-red-900 hover:bg-red-800"
                    onClick={handleConfirm}
                    loading={false}
                  />
                  <DefaultButton
                    name="No, cancel"
                    style="bg-zinc-900 hover:bg-zinc-800 border border-stone-700"
                    onClick={handleCancel}
                    loading={false}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
