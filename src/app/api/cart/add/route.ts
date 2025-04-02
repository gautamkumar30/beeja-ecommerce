import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import dbConnect from "@/lib/db";
import Cart from "@/models/cart.models";
import Product from "@/models/products.models";

export async function POST(request: Request) {
  try {
    await dbConnect();
    const cookieStore = cookies();
    const userId = cookieStore.get("userId");

    if (!userId) {
      return NextResponse.json(
        { error: "Not authenticated" },
        { status: 401 }
      );
    }

    const { productId, price, quantity = 1 } = await request.json();

    if (!productId || !price) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Verify product exists and price matches
    const product = await Product.findById(productId);
    if (!product) {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      );
    }

    if (product.price !== price) {
      return NextResponse.json(
        { error: "Invalid price" },
        { status: 400 }
      );
    }

    // Find or create cart for user
    let cart = await Cart.findOne({ userId: userId.value });
    
    if (!cart) {
      cart = new Cart({
        userId: userId.value,
        items: [],
      });
    }

    // Check if product already in cart
    const existingItem = cart.items.find(
      (item) => item.productId.toString() === productId
    );

    if (existingItem) {
      // Update quantity if product exists
      existingItem.quantity += quantity;
    } else {
      // Add new item to cart
      cart.items.push({
        productId,
        quantity,
        price,
      });
    }

    await cart.save();

    return NextResponse.json(
      { message: "Product added to cart successfully", cart },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error adding to cart:", error);
    return NextResponse.json(
      { error: "Failed to add product to cart" },
      { status: 500 }
    );
  }
}
