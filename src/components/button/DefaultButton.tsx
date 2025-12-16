interface Props {
  name: string;
  onClick: () => void;
  style?: string;
}

export const DefaultButton = ({
  name,
  onClick,
  style = "bg-gold-700 hover:bg-gold-600",
}: Props) => {
  return (
    <div className="col-span-2">
      <button
        type="button"
        className={`w-full h-12 rounded-xl px-5 py-3 text-white hover:cursor-pointer focus:outline-none active:scale-98 ${style}`}
        onClick={onClick}
      >
        {name}
      </button>
    </div>
  );
};
