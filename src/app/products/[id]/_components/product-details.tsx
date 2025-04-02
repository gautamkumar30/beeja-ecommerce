"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { IProduct } from "@/models/products.models";
import AddToCartButton from "../../AddToCartButton";

interface ProductDetailsProps {
  product: IProduct;
}

export default function ProductDetails({ product }: ProductDetailsProps) {
  const [quantity, setQuantity] = useState(1);

  const incrementQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className="min-h-screen bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full aspect-square relative rounded-lg overflow-hidden bg-gray-100"
          >
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover object-center"
              priority
            />
          </motion.div>

          {/* Product info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0"
          >
            <div className="flex justify-between items-center">
              <h1 className="text-3xl font-medium tracking-tight text-gray-900">
                {product.name}
              </h1>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                {product.category}
              </span>
            </div>

            <div className="mt-3">
              <h2 className="sr-only">Product information</h2>
              <p className="text-3xl tracking-tight text-gray-900">
                £{product.price.toFixed(2)}
              </p>
            </div>

            <div className="mt-6">
              <h3 className="sr-only">Description</h3>
              <div className="text-base text-gray-700 space-y-6">
                {product.description}
              </div>
            </div>

            <div className="mt-8">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-gray-900">Quantity</h3>
                <span className="text-sm text-gray-500">
                  {product.stock} items available
                </span>
              </div>

              <div className="flex items-center mt-2 space-x-3">
                <button
                  onClick={decrementQuantity}
                  disabled={quantity <= 1}
                  className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="sr-only">Decrease quantity</span>
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20 12H4"
                    />
                  </svg>
                </button>
                <span className="text-base font-medium text-gray-700 w-8 text-center">
                  {quantity}
                </span>
                <button
                  onClick={incrementQuantity}
                  disabled={quantity >= product.stock}
                  className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="sr-only">Increase quantity</span>
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <div className="mt-8 flex flex-col space-y-4">
              <AddToCartButton
                productId={product._id}
                price={product.price}
                // className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              />

              {/* Stock Status */}
              {product.stock < 10 && product.stock > 0 && (
                <p className="text-sm text-orange-600">
                  Low stock - only {product.stock} left!
                </p>
              )}
              {product.stock === 0 && (
                <p className="text-sm text-red-600">Out of stock</p>
              )}
            </div>

            {/* Delivery and Returns */}
            <div className="mt-10 border-t border-gray-200 pt-10">
              <h3 className="text-sm font-medium text-gray-900">
                Shipping Information
              </h3>
              <div className="mt-4 space-y-4">
                <div className="flex items-start">
                  <svg
                    className="flex-shrink-0 h-5 w-5 text-green-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <p className="ml-3 text-sm text-gray-600">
                    Free shipping on orders over £50
                  </p>
                </div>
                <div className="flex items-start">
                  <svg
                    className="flex-shrink-0 h-5 w-5 text-green-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    />
                  </svg>
                  <p className="ml-3 text-sm text-gray-600">
                    30-day hassle-free returns
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
