import { notFound } from "next/navigation";

// data.
import { Product } from "@/data/products";

// react components.
import Description from "@/components/product-details/Description";
import ProductDetails from "@/components/product-details/ProductDetails";

export type FetchProductResponse = {
  ok: boolean;
  product: Product | null;
};

// fetch product.
const fetchProduct = async (id: string): Promise<FetchProductResponse> => {
  try {
    const baseURL =
      process.env.BASE_URL || "http://localhost:3000/api/products";

    const response = await fetch(`${baseURL}/${id}`);

    if (!response.ok) {
      throw new Error("Failed to fetch product");
    }

    return await response.json();
  } catch (error) {
    console.log(error);
    return { ok: false, product: null };
  }
};

export async function generateMetadata({ params }: ProductPageProps) {
  const { ok, product } = await fetchProduct((await params).id);

  if (!ok || !product) {
    return {
      title: "Product Gallery | 404",
      description: "The requested product could not be found.",
    };
  }

  return {
    title: ` Product Gallery | ${product.name}`,
    description: product.description,
  };
}

type ProductPageProps = {
  params: Promise<{ id: string }>;
};

const ProductPage = async ({ params }: ProductPageProps) => {
  const { ok, product } = await fetchProduct((await params).id);

  if (!ok || !product) {
    notFound();
  }

  return (
    <>
      <ProductDetails product={product} />
      <Description />
    </>
  );
};

export default ProductPage;
