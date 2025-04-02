import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import dbConnect from "@/lib/db";
import Cart from "@/models/cart.models";

export async function PUT(request: Request) {
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

    const { itemId, quantity } = await request.json();

    if (!itemId || typeof quantity !== "number" || quantity < 1) {
      return NextResponse.json(
        { error: "Invalid request data" },
        { status: 400 }
      );
    }

    const cart = await Cart.findOne({ userId: userId.value });

    if (!cart) {
      return NextResponse.json(
        { error: "Cart not found" },
        { status: 404 }
      );
    }

    // Find and update the item quantity
    const item = cart.items.id(itemId);
    if (!item) {
      return NextResponse.json(
        { error: "Item not found in cart" },
        { status: 404 }
      );
    }

    item.quantity = quantity;
    await cart.save();

    return NextResponse.json(cart);
  } catch (error) {
    console.error("Cart update error:", error);
    return NextResponse.json(
      { error: "Failed to update cart" },
      { status: 500 }
    );
  }
}
