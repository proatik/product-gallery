"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

// data.
import { Product } from "@/data/products";

// custom hooks.
import { useMainContext } from "@/contexts/MainContext";

// utility function.
import { notify } from "@/utils";

type ProductDetailsProps = {
  product: Product;
};

const ProductDetails = ({ product }: ProductDetailsProps) => {
  const { addToCard } = useMainContext();

  const [quantity, setQuantity] = useState(1);
  const [selected, setSelected] = useState(0);
  const [imageSrc, setImageSrc] = useState(product.images[0]);

  const handleAddToCart = async () => {
    addToCard(product, quantity);
    notify({
      type: "success",
      message: `Product #${product.id}  added to cart!`,
    });
  };

  const handleError = () => {
    setImageSrc("/placeholder-2.png");
  };

  useEffect(() => {
    setImageSrc(product.images[selected]);
  }, [selected]);

  return (
    <div className="container mt-4 grid grid-cols-2 gap-6">
      <div>
        <Image
          priority
          width={612}
          height={553}
          src={imageSrc}
          alt="feature image"
          onError={handleError}
          className="w-full border border-slate-600"
        />
        <div className="grid grid-cols-5 gap-4 mt-4">
          {product?.images?.map((image, index) => (
            <Image
              key={index}
              height={80}
              width={108}
              alt={`image-${index + 1}`}
              src={image || "/placeholder-1.png"}
              onClick={() => setSelected(index)}
              className={`w-full border cursor-pointer ${
                index === selected ? "border-teal-600 opacity-50" : ""
              }`}
            />
          ))}
        </div>
      </div>

      <div>
        <h2 className="mb-2 text-3xl font-medium uppercase">
          {product?.name || ""}
        </h2>

        <div className="space-y-2">
          <p className="space-x-2 font-semibold text-gray-800">
            Availability:{" "}
            {product.inStock ? (
              <span className="text-green-600">In Stock</span>
            ) : (
              <span className="text-red-600">Out of Stock</span>
            )}
          </p>

          <p className="space-x-2">
            <span className="font-semibold text-gray-800">Category: </span>
            <span className="text-gray-600">
              {product?.category.name || ""}
            </span>
          </p>
        </div>

        <div className="flex items-baseline mt-4 mb-1 space-x-2 font-roboto">
          <p className="text-xl font-semibold text-[#fd3d57]">
            ${product?.price || 0}
          </p>
        </div>
        <p className="mt-4 text-gray-600">{product?.description || ""}</p>

        {/* quantity */}
        <div className="mt-4">
          <h3 className="mb-1 text-sm text-gray-800 uppercase">Quantity</h3>
          <div className="flex text-gray-600 border border-gray-300 divide-x divide-gray-300 w-max">
            <button
              disabled={quantity < 2}
              onClick={() => setQuantity(quantity - 1)}
              className="flex items-center justify-center w-8 h-8 text-xl transition-all cursor-pointer select-none hover:bg-slate-200 disabled:hover:cursor-not-allowed disabled:bg-slate-200/50 disabled:hover:bg-slate-200/50"
            >
              -
            </button>
            <div className="flex items-center justify-center w-8 h-8 text-base">
              {quantity}
            </div>
            <button
              disabled={!product.inStock}
              onClick={() => setQuantity(quantity + 1)}
              className="flex items-center justify-center w-8 h-8 text-xl transition-all cursor-pointer select-none hover:bg-slate-200 disabled:hover:cursor-not-allowed disabled:bg-slate-200/50 disabled:hover:bg-slate-200/50"
            >
              +
            </button>
          </div>
        </div>

        {/* cart */}
        <div className="flex gap-3 pt-5 pb-5 mt-6">
          <button
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className="flex items-center gap-2 px-8 py-2 font-medium text-white uppercase transition border rounded bg-teal-600 border-teal-600 hover:bg-transparent hover:text-teal-600 cursor-pointer disabled:hover:text-slate-600 disabled:bg-white disabled:opacity-70 disabled:cursor-not-allowed disabled:border-slate-600 disabled:text-slate-600"
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
                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
              />
            </svg>
            <i className="fa-solid fa-bag-shopping" /> Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
