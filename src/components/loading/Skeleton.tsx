export const Skeleton = ({
  width = "w-full",
  height = "h-4",
  rounded = "rounded-lg",
  className = "",
}) => {
  return (
    <div
      className={`bg-stone-800 ${width} ${height} ${rounded} ${className} relative overflow-hidden`}
    >
      <div className="absolute inset-0 animate-shimmer bg-linear-to-r from-transparent via-stone-700 to-transparent"></div>
    </div>
  );
};
