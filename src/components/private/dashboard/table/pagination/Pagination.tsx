"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface Props {
  pages: number;
  limitInf: number;
  limitSup: number;
  results: number;
}

export const Pagination = ({ pages, limitInf, limitSup, results }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page"));

  const [arrayPages, setArrayPages] = useState<any[]>([]);
  const [nav, setNav] = useState({
    limitInf: 1,
    limitSup: pages,
  });

  useEffect(() => {
    const residual = pages % 2;
    if (arrayPages.length === 0) {
      if (pages <= 0) return setArrayPages([]);
      if (pages >= 1 && pages <= 6)
        return setArrayPages(Array.from({ length: pages }, (_, i) => i + 1));

      if (pages > 6) {
        let array, limitSup;
        if (residual === 0) {
          array = [1, 2, "...", pages];
          limitSup = 2;
        } else {
          array = [1, 2, 3, "...", pages];
          limitSup = 3;
        }
        setArrayPages(array);
        setNav({
          limitInf: 1,
          limitSup,
        });
        return;
      }
    }

    const cp = currentPage;
    const middle =
      residual === 0 ? Math.ceil(pages / 2) : Math.floor(pages / 2);

    if (
      (currentPage == nav.limitSup && currentPage !== pages) ||
      currentPage == nav.limitInf - 1
    ) {
      if (currentPage < middle) {
        residual === 0
          ? setArrayPages([cp, cp + 1, "...", pages])
          : setArrayPages([cp, cp + 1, cp + 2, "...", pages]);
      } else {
        residual === 0
          ? setArrayPages([1, "...", cp, cp + 1])
          : setArrayPages([1, "...", cp, cp + 1, cp + 2]);
      }

      setNav({
        limitInf: cp,
        limitSup: residual === 0 ? cp + 1 : cp + 2,
      });
      return;
    }
  }, [currentPage]);

  const setPage = (page: number) => {
    if (currentPage === page) return;

    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(page));
    router.push(`?${params.toString()}`, { scroll: true });
  };

  const handleNext = () => {
    if (currentPage === pages) return;

    setPage(currentPage + 1);
    return;
  };

  const handlePrevious = () => {
    if (currentPage <= 1) return;

    setPage(currentPage - 1);
    return;
  };

  return (
    <div className="flex w-full items-center justify-between border-t border-stone-700 p-5">
      <div>
        <span>{`Viewing ${limitInf + 1}-${limitSup} of ${results}`}</span>
      </div>
      <div className="flex">
        <button
          className="w-auto h-auto border border-stone-700 rounded-l-xl py-1 px-2 hover:bg-zinc-800 cursor-pointer"
          onClick={handlePrevious}
        >
          <span>Previous</span>
        </button>
        {arrayPages &&
          arrayPages.map((i) => (
            <button
              key={i}
              className={`
                flex w-8 h-auto justify-center border border-stone-700 py-1 px-2 hover:bg-zinc-800 cursor-pointer
                ${currentPage === i ? "font-bold" : ""}
                `}
              onClick={i === "..." ? () => {} : () => setPage(i)}
            >
              <span>{i}</span>
            </button>
          ))}
        <button
          className="w-auto h-auto border border-stone-700 rounded-r-xl py-1 px-2 hover:bg-zinc-800 cursor-pointer"
          onClick={handleNext}
        >
          <span>Next</span>
        </button>
      </div>
    </div>
  );
};
