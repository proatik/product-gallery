import { NextRequest, NextResponse } from "next/server";

// data.
import { products } from "@/data/products";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const product = products.find((product) => product.id.toString() === id);

  if (product) {
    return NextResponse.json({
      ok: true,
      product,
    });
  } else {
    return NextResponse.json(
      {
        ok: false,
        message: "Product not found",
      },
      { status: 404 }
    );
  }
}
