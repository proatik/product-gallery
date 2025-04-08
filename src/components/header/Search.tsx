"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const Search = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [value, setValue] = useState("");

  useEffect(() => {
    let timer = setTimeout(() => {
      handleSearch();
    }, 500);

    const handleSearch = () => {
      const updatedParams = new URLSearchParams(searchParams.toString());

      if (!value) updatedParams.delete("search");
      else updatedParams.set("search", value);

      if (updatedParams.size)
        router.push(`/products/?${updatedParams.toString()}`);
    };

    return () => {
      clearTimeout(timer);
    };
  }, [value]);

  useEffect(() => {
    const search = searchParams.get("search") || "";
    setValue(search);
  }, []);

  return (
    <div className="relative flex w-full max-w-xl">
      <span className="absolute hidden text-lg text-gray-400 md:inline left-4 top-3">
        <svg
          fill="none"
          strokeWidth={1.5}
          className="size-6"
          viewBox="0 0 24 24"
          stroke="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
          />
        </svg>
      </span>

      <input
        type="search"
        value={value}
        placeholder="search product"
        onChange={(e) => setValue(e.target.value)}
        className="hidden w-full py-3 pl-12 pr-3 border border-slate-400 rounded-md focus:outline-none md:flex focus:border-teal-600"
      />
    </div>
  );
};

export default Search;
