"use client";

import { useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function PaymentSuccessPage() {
  useEffect(() => {
    const confetti = () => {
      const colors = ["#4F46E5", "#818CF8", "#C7D2FE", "#E0E7FF"];
      for (let i = 0; i < 50; i++) {
        createConfetti(colors[Math.floor(Math.random() * colors.length)]);
      }
    };

    const createConfetti = (color: string) => {
      const confetti = document.createElement("div");
      confetti.className = "confetti";
      confetti.style.backgroundColor = color;
      confetti.style.left = Math.random() * 100 + "vw";
      confetti.style.animationDuration = Math.random() * 3 + 2 + "s";
      confetti.style.opacity = Math.random().toString();
      document.getElementById("confetti-container")?.appendChild(confetti);

      // Remove confetti after animation
      setTimeout(() => confetti.remove(), 5000);
    };

    confetti();
    const interval = setInterval(confetti, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center relative overflow-hidden">
      {/* Confetti container */}
      <div
        id="confetti-container"
        className="absolute inset-0 pointer-events-none"
      />

      {/* Success Card */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, type: "spring", bounce: 0.3 }}
        className="w-full max-w-md mx-4 bg-white p-8 rounded-2xl shadow-lg border border-gray-100"
      >
        {/* Success Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", bounce: 0.5 }}
          className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-6"
        >
          <svg
            className="w-8 h-8 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </motion.div>

        {/* Text Content */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-center space-y-4"
        >
          <h1 className="text-2xl font-medium text-gray-900">
            Payment Successful!
          </h1>
          <p className="text-gray-500">
            Thank you for your purchase. Your order has been confirmed.
          </p>

          {/* Order Info */}
          <div className="bg-gray-50 rounded-xl p-4 mt-6">
            <div className="text-sm text-gray-600">
              <p>Order confirmation and tracking details</p>
              <p>have been sent to your email.</p>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col gap-3 mt-8">
            <Link
              href="/products"
              className="inline-flex justify-center items-center px-4 py-2.5 border border-transparent text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Continue Shopping
            </Link>
            <Link
              href="/orders"
              className="inline-flex justify-center items-center px-4 py-2.5 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              View Order Status
            </Link>
          </div>
        </motion.div>
      </motion.div>

      <style jsx global>{`
        .confetti {
          position: absolute;
          width: 8px;
          height: 8px;
          animation: fall linear forwards;
        }

        @keyframes fall {
          to {
            transform: translateY(100vh) rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}
