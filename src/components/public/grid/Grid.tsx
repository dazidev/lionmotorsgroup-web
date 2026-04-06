import { ReactNode } from "react";

type Options = "brands" | "vehicles";

interface Props {
  children: ReactNode;
  option: Options;
}

export const Grid = ({ children, option }: Props) => {
  const styles =
    option === "brands"
      ? "grid grid-cols-[repeat(auto-fill,minmax(120px,1fr))] md:grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-5"
      : "flex flex-col my-5 pl-5 items-center md:grid md:grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-5";

  return <section className={styles}>{children}</section>;
};
