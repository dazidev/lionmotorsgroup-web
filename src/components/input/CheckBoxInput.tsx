export const CheckBoxInput = () => {
  return (
    <div className="flex items-center gap-2">
      <input
        type="checkbox"
        id="html"
        name="intereses"
        value="HTML"
        className="h-4.5 w-4.5 accent-yellow-500 cursor-pointer"
      />
      <label htmlFor="html">HTML</label>
    </div>
  );
};
