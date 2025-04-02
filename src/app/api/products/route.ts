import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Product from "@/models/products.models";

export async function GET() {
  try {
    await dbConnect();
    const products = await Product.find({});
    return NextResponse.json({ products }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}
