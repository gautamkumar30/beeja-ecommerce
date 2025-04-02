import dbConnect from "@/lib/db";
import Product from "@/models/products.models";
import AddToCartButton from "./AddToCartButton";

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  stock: number;
}

export default async function ProductsPage() {
  await dbConnect();
  const products = await Product.find({});

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product._id}
            className="border rounded-lg overflow-hidden shadow-lg relative"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
              <p className="text-gray-600 mb-2">{product.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold">${product.price}</span>
                <span className="text-sm text-gray-500">
                  Stock: {product.stock}
                </span>
              </div>
            </div>
            {/* Add to Cart Button */}
            <div className="absolute top-4 right-4">
              <AddToCartButton
                productId={product._id.toString()}
                price={product.price}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
