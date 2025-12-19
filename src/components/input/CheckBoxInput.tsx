interface Props {
  id: string;
  value: string;
}

export const CheckBoxInput = ({ id, value }: Props) => {
  return (
    <div className="flex items-center gap-2">
      <input
        type="checkbox"
        id={id}
        value={value}
        className="h-4.5 w-4.5 accent-yellow-500 cursor-pointer"
      />
      <label htmlFor={id}>{value}</label>
    </div>
  );
};
