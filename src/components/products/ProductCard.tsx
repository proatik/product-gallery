import Link from "next/link";
import Image from "next/image";

// data.
import { Product } from "@/data/products";

// react components.
import AddToCart from "./AddToCart";

type ProductCardProps = {
  product: Product;
};

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <div className="flex flex-col justify-between overflow-hidden bg-white rounded shadow group">
      <div>
        <Link href={`/products/${product?.id}`}>
          <div className="relative">
            <span className="block text-sm absolute right-1 top-1 rounded -y-1 px-2 border border-slate-300 bg-slate-200 text-slate-700">
              {product?.category.name}
            </span>
            <Image
              width={230}
              height={170}
              alt="Product"
              src={product?.thumbnail}
              className="w-full h-auto max-h-[270px] aspect-[3/4] object-center"
            />
          </div>
        </Link>

        <div className="px-4 pt-4 pb-3">
          <Link href={`/products/${product?.id}`}>
            <h4 className="mb-2 min-h-16 text-md font-medium text-gray-800 uppercase transition hover:text-teal-600">
              {product?.name}
            </h4>
          </Link>
          <div className="flex items-baseline justify-between mb-1 space-x-2">
            <p className="text-lg font-semibold text-teal-600">
              ${(product?.price || 0).toFixed(2)}
            </p>

            <p className="text-md font-semibold">
              {product?.inStock ? (
                <span className="text-green-500">In Stock</span>
              ) : (
                <span className="text-red-500">Out of Stock</span>
              )}
            </p>
          </div>
        </div>
      </div>

      <AddToCart product={product} />
    </div>
  );
};

export default ProductCard;
