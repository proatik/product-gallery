import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Product Gallery | Home",
  description: "Welcome to Product Gallery - Browse our collection of products",
};

const HomePage = () => {
  return (
    <div className="container min-h-[calc(100dvh-138px)] flex flex-col items-center justify-center gap-4">
      <p className="text-lg text-gray-600">
        This page is kept blank intentionally
      </p>
      <Link
        href="/products"
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
      >
        Go to Products
      </Link>
    </div>
  );
};

export default HomePage;
