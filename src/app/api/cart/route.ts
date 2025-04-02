import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import dbConnect from "@/lib/db";
import Cart from "@/models/cart.models";

export async function GET() {
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

    // Find cart and populate product details
    const cart = await Cart.findOne({ userId: userId.value })
      .populate("items.productId", "name image price");

    if (!cart) {
      // Return empty cart if none exists
      return NextResponse.json({
        items: [],
        totalAmount: 0,
      });
    }

    return NextResponse.json(cart);
  } catch (error) {
    console.error("Cart fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch cart" },
      { status: 500 }
    );
  }
}
