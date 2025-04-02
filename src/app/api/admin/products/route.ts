import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Product from "@/models/products.models";

export async function POST(request: Request) {
  try {
    await dbConnect();
    const body = await request.json();

    const { name, description, price, image, category, stock } = body;

    // Validate required fields
    if (!name || !description || !price || !image || !category || !stock) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Create new product
    const product = await Product.create({
      name,
      description,
      price,
      image,
      category,
      stock,
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error("Error creating product:", error);
    return NextResponse.json(
      { error: "Error creating product" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await dbConnect();
    const products = await Product.find({}).sort({ createdAt: -1 });
    return NextResponse.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { error: "Error fetching products" },
      { status: 500 }
    );
  }
}
