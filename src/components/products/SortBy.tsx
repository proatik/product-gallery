"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const SortBy = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [sortBy, setSortBy] = useState("default");

  useEffect(() => {
    const updatedParams = new URLSearchParams(searchParams.toString());

    if (sortBy === "default") updatedParams.delete("sort");
    else updatedParams.set("sort", sortBy);

    if (updatedParams.size)
      router.push(`/products/?${updatedParams.toString()}`);
  }, [sortBy]);

  useEffect(() => {
    const sort = searchParams.get("sort") || "";
    setSortBy(sort);
  }, []);

  return (
    <div className="flex justify-end col-span-full">
      <div>
        <label className="block mb-1 text-sm text-slate-800">Sort by</label>

        <div className="relative">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded pl-3 pr-8 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md appearance-none cursor-pointer"
          >
            <option value="default">Default</option>
            <option value="price-l-h">Price (Low - High)</option>
            <option value="price-h-l">Price (High - Low)</option>
            <option value="name-a-z">Name (A - Z)</option>
            <option value="name-z-a">Name (Z - A)</option>
          </select>
          <svg
            fill="none"
            strokeWidth="1.2"
            viewBox="0 0 24 24"
            stroke="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 ml-1 absolute top-2.5 right-2.5 text-slate-700"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default SortBy;
