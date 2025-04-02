import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Product from "@/models/products.models";

const API_KEY = "AIzaSyDcnoN4NOP-1_yUqheEIK6QEn9CClVawDQ";

export async function POST(req: Request) {
  const { question } = await req.json();

  if (!question) {
    return NextResponse.json(
      { error: "Question is required." },
      { status: 400 }
    );
  }

  try {
    // Connect to database and fetch products
    await dbConnect();
    const products = await Product.find({});

    // Format products data for the AI
    const productsContext = products.map((p) => ({
      name: p.name,
      description: p.description,
      price: p.price,
      category: p.category,
      stock: p.stock,
    }));

    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = await genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `You are a helpful AI assistant for an e-commerce store. You have access to the following products data:
${JSON.stringify(productsContext, null, 2)}

Please answer the following question about these products: ${question}

Provide a clear and concise response based only on the available product data. If you cannot answer the question with the given data, please say so.`;

    const result = await model.generateContent([prompt]);

    if (result && result.response) {
      const generatedText = await result.response.text();
      return NextResponse.json({ answer: generatedText });
    } else {
      throw new Error("No response received from model.");
    }
  } catch (error) {
    console.error("Error generating answer:", error);
    return NextResponse.json(
      { error: "Failed to generate answer" },
      { status: 500 }
    );
  }
}
