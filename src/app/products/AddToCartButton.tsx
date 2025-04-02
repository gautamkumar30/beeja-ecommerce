"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface AddToCartButtonProps {
  productId: string;
  price: number;
}

export default function AddToCartButton({
  productId,
  price,
}: AddToCartButtonProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAddToCart = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/cart/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId,
          price,
          quantity: 1, // Default quantity when adding to cart
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 401) {
          // Not authenticated, redirect to login
          router.push("/login");
          return;
        }
        throw new Error(data.error || "Failed to add to cart");
      }

      // Show success feedback
      router.refresh(); // Refresh the page to update cart count if displayed in header
    } catch (error) {
      console.error("Error adding to cart:", error);
      setError(
        error instanceof Error ? error.message : "Failed to add to cart"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button
        onClick={handleAddToCart}
        disabled={loading}
        className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-[120px]"
      >
        {loading ? (
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 border-t-2 border-b-2 border-white rounded-full animate-spin"></div>
            <span>Adding...</span>
          </div>
        ) : (
          "Add to Cart"
        )}
      </button>
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </div>
  );
}
