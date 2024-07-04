"use client";

import { Dispatch, SetStateAction } from "react";

interface Props {
  totalPage: number;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
}

const Pagination = ({ totalPage, page, setPage }: Props) => {
  return (
    <div className={`flex gap-2 justify-center`}>
      <button
        className="disabled:text-black"
        onClick={() => setPage((prev) => Math.max(prev - 1))}
        disabled={page === 1}
      >
        &#60;
      </button>
      {[...Array(totalPage)].map((_, index) => (
        <button
          key={index + 1}
          onClick={() => setPage(index + 1)}
          className={`${
            page === index + 1 ? "bg-slate-400 rounded-full" : "white"
          } py-1 px-2`}
        >
          {index + 1}
        </button>
      ))}
      <button
        className="disabled:text-black"
        onClick={() => setPage((prev) => Math.max(prev + 1))}
        disabled={page === totalPage}
      >
        &#62;
      </button>
    </div>
  );
};

export default Pagination;
