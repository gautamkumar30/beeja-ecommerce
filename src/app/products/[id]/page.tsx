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
  console.log((await params).id);

  await dbConnect();
  const product = (await Product.findById((await params).id)) as IProduct;

  console.log(product);

  return <ProductDetails product={product} />;
}
