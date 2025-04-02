import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Product from "@/models/products.models";

export async function POST(request: Request) {
  try {
    await dbConnect();
    const body = await request.json();
    
    const product = await Product.create(body);
    
    return NextResponse.json(
      { message: "Product created successfully", product },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating product:", error);
    return NextResponse.json(
      { error: "Failed to create product" },
      { status: 500 }
    );
  }
}
