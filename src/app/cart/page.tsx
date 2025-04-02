"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface CartItem {
  _id: string;
  productId: {
    _id: string;
    name: string;
    image: string;
    price: number;
  };
  quantity: number;
  price: number;
}

interface CartData {
  items: CartItem[];
  totalAmount: number;
}

export default function CartPage() {
  const router = useRouter();
  const [cart, setCart] = useState<CartData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [promoCode, setPromoCode] = useState("");
  const [shipping, setShipping] = useState(5.0); // Default shipping cost
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const response = await fetch("/api/cart");
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch cart");
      }

      setCart(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load cart");
    } finally {
      setLoading(false);
    }
  };

  const handlePayment = async () => {
    setProcessing(true);
    try {
      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Navigate to success page
      router.push("/payment-success");
    } catch (err) {
      setError("Payment failed. Please try again.");
      setProcessing(false);
    }
  };

  const updateQuantity = async (itemId: string, newQuantity: number) => {
    if (newQuantity < 1) return;

    try {
      const response = await fetch("/api/cart/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          itemId,
          quantity: newQuantity,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update quantity");
      }

      fetchCart(); // Refresh cart data
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to update quantity"
      );
    }
  };

  const removeItem = async (itemId: string) => {
    try {
      const response = await fetch("/api/cart/remove", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ itemId }),
      });

      if (!response.ok) {
        throw new Error("Failed to remove item");
      }

      fetchCart(); // Refresh cart data
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to remove item");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-red-600 text-lg">{error}</div>
      </div>
    );
  }

  if (!cart || cart.items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <h2 className="text-2xl font-semibold mb-4 text-gray-900">
          Your cart is empty
        </h2>
        <Link
          href="/products"
          className="text-indigo-600 hover:text-indigo-500 font-medium"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white shadow-sm rounded-lg">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">
                  Shopping Cart
                </h2>
                <p className="text-gray-600">{cart.items.length} Items</p>
              </div>

              <div className="divide-y divide-gray-200">
                {cart.items.map((item) => (
                  <div key={item._id} className="p-6 flex space-x-6">
                    <div className="flex-shrink-0 w-24 h-24 relative bg-gray-200 rounded-md overflow-hidden">
                      <Image
                        src={item.productId.image}
                        alt={item.productId.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <div>
                          <h3 className="text-lg font-medium text-gray-900">
                            {item.productId.name}
                          </h3>
                          <p className="text-gray-600">
                            £{item.productId.price.toFixed(2)}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-gray-900">
                            £{(item.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      </div>
                      <div className="mt-4 flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <button
                            onClick={() =>
                              updateQuantity(item._id, item.quantity - 1)
                            }
                            className="p-1 rounded-md hover:bg-gray-100 text-gray-600"
                          >
                            -
                          </button>
                          <span className="w-8 text-center text-gray-900">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item._id, item.quantity + 1)
                            }
                            className="p-1 rounded-md hover:bg-gray-100 text-gray-600"
                          >
                            +
                          </button>
                        </div>
                        <button
                          onClick={() => removeItem(item._id)}
                          className="text-red-600 hover:text-red-500 font-medium"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6">
              <Link
                href="/products"
                className="text-indigo-600 hover:text-indigo-500 flex items-center font-medium"
              >
                <span>← Continue Shopping</span>
              </Link>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white shadow-sm rounded-lg p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">
                Order Summary
              </h2>

              <div className="space-y-4">
                <div className="flex justify-between text-gray-600">
                  <span>Items ({cart.items.length})</span>
                  <span className="text-gray-900">
                    £{cart.totalAmount.toFixed(2)}
                  </span>
                </div>

                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className="text-gray-900">£{shipping.toFixed(2)}</span>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <label
                    htmlFor="promo"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Promo Code
                  </label>
                  <div className="mt-1 flex space-x-2">
                    <input
                      type="text"
                      id="promo"
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md text-gray-900"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                    />
                    <button className="bg-gray-200 px-4 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-300">
                      Apply
                    </button>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <div className="flex justify-between">
                    <span className="font-semibold text-gray-900">
                      Total Cost
                    </span>
                    <span className="font-semibold text-gray-900">
                      £{(cart.totalAmount + shipping).toFixed(2)}
                    </span>
                  </div>
                </div>

                <button
                  onClick={handlePayment}
                  disabled={processing || !cart || cart.items.length === 0}
                  className="w-full bg-indigo-600 text-white py-3 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center"
                >
                  {processing ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Processing...
                    </>
                  ) : (
                    "Make Payment"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
