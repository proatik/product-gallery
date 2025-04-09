import { Metadata } from "next";

import { Suspense } from "react";

// data.
import { Product } from "@/data/products";

// react components.
import Sidebar from "@/components/products/Sidebar";
import Products from "@/components/products/Products";

export type FetchProductsResponse = {
  ok: boolean;
  totalPages: number;
  currentPage: number;
  totalProducts: number;
  products: Product[];
};

export const metadata: Metadata = {
  title: "Product Gallery | Products",
  description:
    "Browse our extensive collection of products in the Product Gallery. Find high-quality items with detailed information, pricing, and specifications to help you make informed purchasing decisions.",
};

// fetch products.
const fetchProducts = async (query: string): Promise<FetchProductsResponse> => {
  try {
    const baseURL = process.env.BASE_URL || "http://localhost:3000";

    const response = await fetch(`${baseURL}/api/products?${query}`);

    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }

    return await response.json();
  } catch (error) {
    console.log(error);

    return {
      ok: false,
      products: [],
      totalPages: 0,
      currentPage: 0,
      totalProducts: 0,
    };
  }
};

// build query.
const buildQueryString = (searchParams: Record<string, string>) => {
  const queryParams = new URLSearchParams();

  for (const key in searchParams) {
    if (searchParams.hasOwnProperty(key)) {
      queryParams.append(key, searchParams[key]);
    }
  }

  return queryParams.toString();
};

type ProductsPageProps = {
  searchParams: Promise<Record<string, string>>;
};

const ProductsPage = async ({ searchParams }: ProductsPageProps) => {
  const query = buildQueryString(await searchParams);
  const { ok, products, ...stats } = await fetchProducts(query);

  return (
    <div className="container grid gap-6 pt-4 pb-16 items-start grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      <Suspense>
        <Sidebar />
      </Suspense>
      <Products products={products} stats={stats} />
    </div>
  );
};

export default ProductsPage;
