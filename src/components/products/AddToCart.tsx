"use client";

// data.
import { Product } from "@/data/products";

// main context.
import { useMainContext } from "@/contexts/MainContext";

// utility function.
import { notify } from "@/utils";

type AddToCartProps = {
  product: Product;
};

const AddToCart = ({ product }: AddToCartProps) => {
  const { addToCard } = useMainContext();

  const handleAddToCart = async () => {
    addToCard(product);
    notify({
      type: "success",
      message: `Product #${product.id}  added to cart!`,
    });
  };

  return (
    <button
      onClick={handleAddToCart}
      disabled={!product?.inStock}
      className="m-1 w-auto py-1 text-center rounded-md text-teal-600 transition border bg-white border-teal-600 hover:bg-teal-600 hover:text-white cursor-pointer disabled:hover:text-slate-600 disabled:bg-white disabled:opacity-70 disabled:cursor-not-allowed disabled:border-slate-600 disabled:text-slate-600"
    >
      Add to cart
    </button>
  );
};

export default AddToCart;
