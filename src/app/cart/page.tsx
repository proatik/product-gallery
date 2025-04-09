import { Metadata } from "next";

// react components.
import Cart from "@/components/cart/Cart";

export const metadata: Metadata = {
  title: "Product Gallery | Cart",
  description:
    "Review and manage the items in your shopping cart. All selected products will be included in your order. Happy shopping!",
};

const CartPage = () => {
  return (
    <div className="container min-h-[calc(100dvh-138px)] gap-6 pt-4 pb-16">
      <Cart />
    </div>
  );
};

export default CartPage;
