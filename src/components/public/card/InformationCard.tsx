"use server";
import { GiCheckMark } from "react-icons/gi";

type dataText = { name: string; value: string | number | undefined };
type dataTag = { id: string; name: string; type: string };

interface Props {
  title: string;
  type: "text" | "tag";
  data: dataText[] | dataTag[];
  specificationType?: "security" | "confort";
}

function isDataText(item: dataText | dataTag): item is dataText {
  return "value" in item;
}

function isDataTag(item: dataText | dataTag): item is dataTag {
  return "id" in item && "type" in item;
}

export const InformationCard = async ({
  title,
  data,
  type,
  specificationType,
}: Props) => {
  const style =
    type === "text"
      ? "grid py-5 gap-3 grid-cols-[repeat(auto-fit,minmax(300px,1fr))]"
      : "flex flex-wrap gap-3";
  return (
    <section className="flex flex-col w-full md:my-5 gap-3 bg-stone-900 p-5 rounded-2xl">
      <h2 className="text-3xl font-bold text-gold-500">{title}</h2>
      <span className="block w-full h-px bg-gray-500/70"></span>
      <div className={style}>
        {type === "text" &&
          data.map((item) => {
            if (isDataText(item)) {
              const { name, value } = item;

              let formatValue = value;
              if (typeof value === "string") {
                formatValue = value.slice(0, 1).toUpperCase() + value.slice(1);
                if (value === "FOUR_X_FOUR") {
                  formatValue = "4x4";
                } else if (value === "FOUR_X_TWO") {
                  formatValue = "4x2";
                }
              }

              if (value) {
                return (
                  <span
                    key={name}
                    className="flex justify-between border-b border-b-gray-500/70 pb-3"
                  >
                    <p className="text-gray-500/70">{name}</p>
                    <p className="font-bold">{formatValue}</p>
                  </span>
                );
              }
            }
          })}

        {type === "tag" &&
          data.map((item) => {
            if (isDataTag(item)) {
              const { id, name, type } = item;
              if (type === specificationType) {
                return (
                  <span
                    key={id}
                    className="flex w-auto flex-row gap-3 items-center text-gold-500 bg-zinc-800/80 py-1 px-4 border border-gray-200/20 rounded-2xl"
                  >
                    <GiCheckMark size={16} />
                    <p className="">{name}</p>
                  </span>
                );
              }
            }
          })}
      </div>
    </section>
  );
};
