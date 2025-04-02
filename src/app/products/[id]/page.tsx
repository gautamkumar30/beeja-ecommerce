import Image from "next/image";
import { motion } from "framer-motion";
import AddToCartButton from "../AddToCartButton";
import Product, { IProduct } from "@/models/products.models";
import ProductDetails from "./_components/product-details";
import dbConnect from "@/lib/db";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await dbConnect();
  const productDoc = await Product.findById((await params).id);

  if (!productDoc) {
    return <div>Product not found</div>;
  }

  const product = JSON.parse(JSON.stringify(productDoc));

  return <ProductDetails product={product} />;
}
