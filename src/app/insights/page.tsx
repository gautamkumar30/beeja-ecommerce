"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function InsightsPage() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getInsights = async () => {
    if (!question.trim()) {
      setError("Please enter a question");
      return;
    }

    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/insights", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to get insights");
      }

      setAnswer(data.answer);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to get insights");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold text-gray-900"
          >
            Product Insights
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-2 text-gray-600"
          >
            Ask questions about our products and get AI-powered insights
          </motion.p>
        </div>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-lg shadow-sm p-6 space-y-6"
        >
          {/* Input Section */}
          <div>
            <label
              htmlFor="question"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Your Question
            </label>
            <textarea
              id="question"
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-gray-900"
              placeholder="Ask anything about our products, e.g., 'What are our best-selling electronics?' or 'Which products are low in stock?'"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
            />
          </div>

          {/* Example Questions */}
          <div className="flex flex-wrap gap-2">
            <span className="text-xs text-gray-500">Example questions:</span>
            {[
              "What are our most expensive products?",
              "Which categories have the most items?",
              "Are there any products out of stock?",
              "What's the average price in each category?",
            ].map((q) => (
              <button
                key={q}
                onClick={() => setQuestion(q)}
                className="text-xs text-indigo-600 hover:text-indigo-800 bg-indigo-50 px-2 py-1 rounded-full"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Ask Button */}
          <div className="flex justify-center">
            <button
              onClick={getInsights}
              disabled={loading}
              className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
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
                  Analyzing...
                </>
              ) : (
                "Get Insights"
              )}
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-red-600 text-center text-sm"
            >
              {error}
            </motion.div>
          )}

          {/* AI Response */}
          {answer && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6"
            >
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <div className="flex-shrink-0">
                    <svg
                      className="h-6 w-6 text-indigo-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                      />
                    </svg>
                  </div>
                  <h3 className="ml-3 text-sm font-medium text-gray-900">
                    AI Response
                  </h3>
                </div>
                <div className="prose prose-sm max-w-none text-gray-600">
                  {answer.split("\n").map((line, i) => (
                    <p key={i} className="mb-2">
                      {line}
                    </p>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Tips Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-12 text-center text-sm text-gray-500"
        >
          <h3 className="font-medium text-gray-900 mb-2">
            Tips for better questions:
          </h3>
          <ul className="space-y-1">
            <li>Ask about specific product categories</li>
            <li>Inquire about pricing trends</li>
            <li>Check stock availability</li>
            <li>Compare products within categories</li>
          </ul>
        </motion.div>
      </div>
    </div>
  );
}
