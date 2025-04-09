"use client";

import { useEffect, useState, useRef, useMemo } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

type PatinationProps = {
  stats: {
    totalPages: number;
    currentPage: number;
    totalProducts: number;
  };
};

const Pagination = ({ stats }: PatinationProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const isInitialRender = useRef(true);
  const searchParams = useSearchParams();

  const [current, setCurrent] = useState(() => {
    const page = searchParams.get("page");
    return page ? parseInt(page, 10) : stats?.currentPage || 1;
  });

  const pages = useMemo(() => {
    return Array.from({ length: stats?.totalPages || 1 }, (_, i) => i + 1);
  }, [stats?.totalPages]);

  useEffect(() => {
    const updatedParams = new URLSearchParams(searchParams.toString());
    updatedParams.set("page", current.toString());

    router.push(`${pathname}?${updatedParams.toString()}`);
  }, [current]);

  useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false;
    } else {
      setCurrent(1);
    }
  }, [stats?.totalPages]);

  useEffect(() => {
    setCurrent(stats?.currentPage || 1);
  }, []);

  const getPaginationPages = () => {
    const maxPageButtons = 6;

    if (!pages.length) return [];
    if (pages.length <= maxPageButtons) return pages;

    let result = [];
    const firstPage = 1;
    const lastPage = pages.length;

    if (current <= 3) {
      result = [1, 2, 3, 4, "-", lastPage];
    } else if (current >= pages.length - 2) {
      result = [1, "-", lastPage - 3, lastPage - 2, lastPage - 1, lastPage];
    } else {
      result = [
        firstPage,
        "-",
        current - 1,
        current,
        current + 1,
        "-",
        lastPage,
      ];
    }

    return result.filter(
      (page) =>
        page === "-" || (typeof page === "number" && page <= pages.length)
    );
  };

  return (
    <div className="flex items-center justify-center gap-1 md:gap-2 p-2 md:p-4 mt-8 font-mono text-lg rounded bg-white shadow">
      {getPaginationPages().map((page, index) => (
        <button
          key={index}
          onClick={() => page !== "-" && setCurrent(+page)}
          className={`border text-slate-600 rounded-md transition-all ${
            page === current
              ? "px-2 py-1 md:px-6 bg-teal-600 text-white border-teal-600 cursor-pointer hover:shadow-md"
              : page === "-"
              ? "p-1 border-transparent"
              : "px-2 py-1 md:px-6 cursor-pointer hover:shadow-md"
          }`}
        >
          {page}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
