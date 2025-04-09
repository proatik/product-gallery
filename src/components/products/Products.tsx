// data.
import { Product } from "@/data/products";

// react components.
import SortBy from "./SortBy";
import Pagination from "./Pagination";
import ProductCard from "./ProductCard";

type ProductsProps = {
  products: Product[];
  stats: {
    totalPages: number;
    currentPage: number;
    totalProducts: number;
  };
};

const Products = ({ products, stats }: ProductsProps) => {
  return (
    <div className="md:col-span-2 lg:col-span-3">
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <SortBy />

        {!Boolean(products?.length) && (
          <div className="flex items-center justify-center col-span-3 gap-2 p-4 py-8 font-mono text-2xl border border-gray-200 rounded bg-slate-100/30 text-slate-600">
            <span>Oops! It seems there are no products available</span>
          </div>
        )}

        {products?.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {Boolean(products?.length) && <Pagination stats={stats} />}
    </div>
  );
};

export default Products;
