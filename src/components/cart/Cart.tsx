"use client";

import Link from "next/link";

// main context.
import { useMainContext } from "@/contexts/MainContext";

// react components.
import CartItem from "./CartItem";

const Cart = () => {
  const { cart } = useMainContext();

  const sortedItems =
    Object.values(cart).sort((a, b) => a.product.id - b.product.id) || [];

  const totalPrice = sortedItems
    .reduce((total, item) => total + item.product.price * item.quantity, 0)
    .toFixed(2);

  const count = sortedItems?.length;

  return (
    <div className="max-w-6xl mx-auto space-y-4 md:min-h-80">
      {count === 0 && (
        <div className="flex items-center justify-center gap-2 p-4 py-8 font-mono text-2xl border border-gray-200 rounded bg-slate-100/30 text-slate-600">
          <span>Your cart is</span>
          <span className="text-violet-600">null</span>
        </div>
      )}

      {count > 0 && (
        <div className="flex items-center justify-between p-4 border border-gray-200 rounded bg-slate-100/20">
          <span className="text-xl">
            Total items :{" "}
            <span className="text-teal-600 font-semibold">
              {String(count).padStart(2, "0")}
            </span>
          </span>

          <span className="text-xl">
            Total Price :{" "}
            <span className="text-[#fd3d57] font-semibold">
              ${totalPrice.padStart(2, "0")}
            </span>
          </span>

          <Link
            href="#"
            className="px-4 py-2 text-center text-white transition border rounded bg-teal-600 border-teal-600 hover:bg-transparent hover:text-teal-600"
          >
            Checkout Now
          </Link>
        </div>
      )}

      {count > 0 &&
        sortedItems.map(({ product, quantity }) => (
          <CartItem key={product.id} product={product} quantity={quantity} />
        ))}
    </div>
  );
};

export default Cart;
