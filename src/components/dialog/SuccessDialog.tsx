import { FaCheckCircle } from "react-icons/fa";

interface Props {
  message: string;
}

export const SuccessDialog = ({ message }: Props) => {
  return (
    <div className="flex flex-row bg-green-400/80 py-2 px-3 gap-3">
      <div className="w-auto">
        <FaCheckCircle className=" text-green-100" size={24} />
      </div>
      <span className=" text-red-100 text-left">{message}</span>
    </div>
  );
};
