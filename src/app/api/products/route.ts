import { type NextRequest } from "next/server";

// data
import { products } from "@/data/products";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const category = searchParams.get("category");
    const priceMin = searchParams.get("priceMin");
    const priceMax = searchParams.get("priceMax");
    const search = searchParams.get("search");
    const page = searchParams.get("page");
    const availability = searchParams.get("availability");

    const categories = category ? category.split(",").map(Number) : [];
    const min = priceMin ? parseFloat(priceMin) : 0;
    const max = priceMax ? parseFloat(priceMax) : 100000;
    const searchTerm = search ? search : "";
    const currentPage = page ? parseInt(page, 10) : 1;
    const limit = 10;
    const skip = (currentPage - 1) * limit;

    let filteredProducts = products.filter((product) => {
      const categoryMatch =
        categories.length > 0 ? categories.includes(product.category.id) : true;

      const priceMatch = product.price >= min && product.price <= max;

      const nameMatch = searchTerm
        ? product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.description.toLowerCase().includes(searchTerm.toLowerCase())
        : true;

      const availabilityMatch =
        availability === "in-stock"
          ? product.inStock === true
          : availability === "out-of-stock"
          ? product.inStock === false
          : true;

      return categoryMatch && priceMatch && nameMatch && availabilityMatch;
    });

    const paginatedProducts = filteredProducts.slice(skip, skip + limit);

    const totalProducts = filteredProducts.length;
    const totalPages = Math.ceil(totalProducts / limit);

    return Response.json({
      ok: true,
      totalPages,
      currentPage,
      totalProducts,
      products: paginatedProducts,
    });
  } catch (error) {
    return Response.json(
      {
        ok: false,
        message: "Something went wrong. Please try again later.",
      },
      { status: 500 }
    );
  }
}
