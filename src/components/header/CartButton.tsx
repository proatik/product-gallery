"use client";

import Link from "next/link";

// main context.
import { useMainContext } from "@/contexts/MainContext";

const CartButton = () => {
  const { cart } = useMainContext();
  const totalInCart = Object.keys(cart).length;

  return (
    <div className="flex items-center space-x-2">
      <Link
        href="/cart"
        className="relative flex flex-col items-center gap-1 px-2 py-1 text-center text-gray-700 transition rounded-md hover:text-teal-600"
      >
        <div className="text-2xl">
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
              d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
            />
          </svg>
        </div>

        <div className="text-xs leading-3">Cart</div>

        {totalInCart > 0 && (
          <div className="absolute flex items-center justify-center w-5 h-5 text-xs text-white rounded-full -right-1 -top-1 bg-teal-600">
            {totalInCart}
          </div>
        )}
      </Link>
    </div>
  );
};

export default CartButton;
