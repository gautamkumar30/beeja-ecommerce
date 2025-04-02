import Link from "next/link";
import Image from "next/image";
import dbConnect from "@/lib/db";
import Product, { IProduct } from "@/models/products.models";
import AddToCartButton from "./AddToCartButton";

export default async function ProductsPage() {
  await dbConnect();
  const productsDoc = await Product.find({});
  const products = JSON.parse(JSON.stringify(productsDoc)) as IProduct[];

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-medium text-gray-900">
              Shop All Products
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              {products.length} items
            </p>
          </div>

          {/* Sort Dropdown */}
          <div className="relative">
            <select
              className="block w-48 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              defaultValue="featured"
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="newest">Newest</option>
            </select>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
            <div key={product._id} className="group relative">
              {/* Product Image */}
              <Link href={`/products/${product._id}`}>
                <div className="aspect-square w-full overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75 transition-opacity">
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={500}
                    height={500}
                    className="h-full w-full object-contain object-center"
                  />
                </div>
              </Link>

              {/* Discount Badge */}
              <div className="absolute top-2 left-2">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                  20% Off
                </span>
              </div>

              {/* Product Info */}
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-900">
                    <Link href={`/products/${product._id}`}>
                      {product.name}
                    </Link>
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    {product.category}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">
                    £{product.price.toFixed(2)}
                  </p>
                  {product.stock < 10 && (
                    <p className="mt-1 text-xs text-orange-500">
                      Only {product.stock} left
                    </p>
                  )}
                </div>
              </div>

              <div className="mt-4">
                <AddToCartButton
                  productId={product._id}
                  price={product.price}
                />
              </div>
            </div>
          ))}
        </div>

        {products.length === 0 && (
          <div className="text-center py-12">
            <h3 className="mt-2 text-sm font-medium text-gray-900">
              No products found
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Please check back later for new products.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
