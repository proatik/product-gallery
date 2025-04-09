"use client";

import { useState } from "react";

// react components.
import Search from "./Search";
import Sidebar from "../products/Sidebar";
import FullscreenModal from "../shared/FullscreenModal";

const Adjustment = () => {
  const [open, setOpen] = useState(false);

  function openModal() {
    setOpen(true);
  }

  function closeModal() {
    setOpen(false);
  }

  return (
    <>
      <button onClick={openModal} className="ml-3 text-gray-700 md:hidden">
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
            d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75"
          />
        </svg>
      </button>

      <FullscreenModal open={open} closeModal={closeModal}>
        <div className="fixed top-0 bottom-0 right-0 z-10 w-full max-w-sm p-4 bg-white">
          <div className="flex items-center justify-between w-full py-4 mb-6">
            <button
              onClick={closeModal}
              className="border border-[#E0E0E0] h-6 w-6 flex items-center justify-center cursor-pointer rounded hover:bg-[#F3F4F5] transition-all"
            >
              <svg
                fill="none"
                strokeWidth={1.5}
                className="size-5"
                viewBox="0 0 24 24"
                stroke="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div className="overflow-y-auto space-y-4 h-[80%] p-1">
            <Search small />
            <Sidebar small />
          </div>
        </div>
      </FullscreenModal>
    </>
  );
};

export default Adjustment;
