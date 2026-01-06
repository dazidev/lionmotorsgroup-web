import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export const Grid = ({ children }: Props) => {
  return (
    <section className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-5 my-10">
      {children}
    </section>
  );
};
