"use client";

import { useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function PaymentSuccessPage() {
  useEffect(() => {
    // Confetti effect
    const confetti = () => {
      const colors = ["#FF69B4", "#00FFFF", "#7B68EE", "#FFD700"];
      for (let i = 0; i < 100; i++) {
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
    const interval = setInterval(confetti, 3000); // Create new confetti every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-500 via-purple-500 to-pink-500 flex flex-col items-center justify-center relative overflow-hidden">
      {/* Confetti container */}
      <div
        id="confetti-container"
        className="absolute inset-0 pointer-events-none"
      />

      {/* Success Card */}
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, type: "spring", bounce: 0.4 }}
        className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 max-w-md w-full mx-4 shadow-2xl border border-white/20"
      >
        {/* Success Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1, rotate: 360 }}
          transition={{ delay: 0.2, type: "spring", bounce: 0.5 }}
          className="w-20 h-20 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full mx-auto flex items-center justify-center mb-6"
        >
          <svg
            className="w-12 h-12 text-white"
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
          className="text-center"
        >
          <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-100 bg-clip-text text-transparent mb-2">
            Yaass! Payment Successful
          </h1>
          <p className="text-white/80 mb-8">
            Your order is confirmed and will be shipped soon! 🚀
          </p>

          {/* Emojis Row */}
          <div className="flex justify-center gap-4 mb-8 text-4xl">
            <motion.span
              initial={{ rotate: -45 }}
              animate={{ rotate: 0 }}
              transition={{ delay: 0.6, type: "spring" }}
            >
              🎉
            </motion.span>
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.8 }}
            >
              💫
            </motion.span>
            <motion.span
              initial={{ rotate: 45 }}
              animate={{ rotate: 0 }}
              transition={{ delay: 1, type: "spring" }}
            >
              ✨
            </motion.span>
          </div>

          {/* Buttons */}
          <div className="flex flex-col gap-4">
            <Link
              href="/products"
              className="bg-white/20 hover:bg-white/30 text-white font-medium py-3 px-6 rounded-xl transition-all duration-300 hover:shadow-lg hover:scale-105 backdrop-blur-sm"
            >
              Continue Shopping
            </Link>
            <Link
              href="/orders"
              className="text-white/80 hover:text-white underline underline-offset-4 font-medium transition-colors"
            >
              View Order Status
            </Link>
          </div>
        </motion.div>
      </motion.div>
    </div>

    // <style jsx global>{`
    //   .confetti {
    //     position: absolute;
    //     width: 10px;
    //     height: 10px;
    //     animation: fall linear forwards;
    //   }

    //   @keyframes fall {
    //     to {
    //       transform: translateY(100vh) rotate(360deg);
    //     }
    //   }
    // `}</style>
  );
}
