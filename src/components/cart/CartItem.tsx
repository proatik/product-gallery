"use client";

import Link from "next/link";
import Image from "next/image";

// data.
import { Product } from "@/data/products";

// main context.
import { useMainContext } from "@/contexts/MainContext";

// utility functions.
import { notify } from "@/utils";

type CartItemProps = {
  product: Product;
  quantity: number;
};

const CartItem = ({ product, quantity }: CartItemProps) => {
  const { id, name, price, thumbnail } = product;
  const { incrementItem, decrementItem, removeFromCart } = useMainContext();

  const handleIncrementItem = () => {
    incrementItem(id.toString());
    notify({
      type: "success",
      message: `Product #${id} quantity increased!`,
    });
  };

  const handleDecrementItem = () => {
    decrementItem(id.toString());
    notify({
      type: "success",
      message: `Product #${id} quantity decreased!`,
    });
  };

  const handleRemoveFromCart = () => {
    removeFromCart(id.toString());
    notify({
      type: "success",
      message: `Product #${id} removed from cart!`,
    });
  };

  return (
    <div className="flex items-center justify-between gap-6 p-4 border border-gray-200 rounded">
      <div className="w-28">
        <Link href={`/products/${id}`}>
          <Image
            height={82}
            width={112}
            className="w-full border border-slate-200/50 rounded"
            alt="product image"
            src={thumbnail || ""}
          />
        </Link>
      </div>

      <div className="w-1/4 text-ellipsis">
        <Link href={`/products/${id}`}>
          <h2 className="text-md font-medium text-gray-800 uppercase">
            {name}
          </h2>
        </Link>
        <p className="text-sm text-gray-500">
          Unit Price: <span className="text-[#fd3d57]">${price || 0}</span>
        </p>
      </div>

      <div className="flex items-center gap-3">
        <button
          disabled={quantity <= 1}
          onClick={handleDecrementItem}
          className="flex items-center justify-center text-gray-600 transition-all rounded-full cursor-pointer min-w-8 min-h-8 hover:text-green-600 bg-slate-200/50 hover:bg-slate-200 disabled:cursor-not-allowed disabled:hover:bg-slate-200/50 disabled:hover:text-gray-600"
        >
          <svg
            fill="none"
            strokeWidth={1.5}
            className="size-6"
            viewBox="0 0 24 24"
            stroke="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
          </svg>
        </button>

        <span className="px-6 py-1 border rounded-md border-slate-300">
          {quantity || 0}
        </span>

        <button
          onClick={handleIncrementItem}
          className="flex items-center justify-center text-gray-600 transition-all rounded-full cursor-pointer min-w-8 min-h-8 hover:text-green-600 bg-slate-200/50 hover:bg-slate-200"
        >
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
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
        </button>
      </div>

      <div className="text-lg font-semibold text-center w-28 text-[#fd3d57]">
        ${((price || 0) * quantity).toFixed(2)}
      </div>

      <button
        onClick={handleRemoveFromCart}
        className="flex items-center justify-center text-gray-600 transition-all rounded-full cursor-pointer min-w-8 min-h-8 hover:text-[#fd3d57] bg-slate-200/50 hover:bg-slate-200"
      >
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
            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
          />
        </svg>
      </button>
    </div>
  );
};

export default CartItem;
