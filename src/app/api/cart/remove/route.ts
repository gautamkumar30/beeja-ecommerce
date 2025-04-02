import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import dbConnect from "@/lib/db";
import Cart from "@/models/cart.models";

export async function DELETE(request: Request) {
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

    const { itemId } = await request.json();

    if (!itemId) {
      return NextResponse.json(
        { error: "Item ID is required" },
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

    // Remove the item from the cart
    cart.items = cart.items.filter(item => item._id.toString() !== itemId);
    await cart.save();

    return NextResponse.json(cart);
  } catch (error) {
    console.error("Cart remove error:", error);
    return NextResponse.json(
      { error: "Failed to remove item from cart" },
      { status: 500 }
    );
  }
}
