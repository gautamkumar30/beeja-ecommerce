import React from "react";
import Link from "next/link";
import Image from "next/image";

const Hero = () => {
  return (
    <div className="w-full min-h-screen bg-black text-white">
      {/* Navbar */}
      <nav className="flex justify-between items-center p-6 bg-gray-800 shadow-md">
        <h1 className="text-3xl font-bold text-white">ToyLand</h1>
        <ul className="flex gap-6">
          <li>
            <Link href="#" className="text-lg text-gray-300 hover:text-white">
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/products"
              className="text-lg text-gray-300 hover:text-white"
            >
              Products
            </Link>
          </li>
          <li>
            <Link href="#" className="text-lg text-gray-300 hover:text-white">
              About
            </Link>
          </li>
          <li>
            <Link
              href="/cart"
              className="text-lg text-gray-300 hover:text-white"
            >
              Cart
            </Link>
          </li>
        </ul>
      </nav>

      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center justify-between px-10 py-20">
        <div className="md:w-1/2 space-y-6">
          <h2 className="text-5xl font-bold text-white">
            Discover the Joy of Play!
          </h2>
          <p className="text-xl text-gray-300">
            Explore a world of fun with our exciting toy collection for kids of
            all ages.
          </p>
          <Link
            href="/shop"
            className="bg-gray-800 text-white px-6 py-3 text-lg font-semibold rounded-lg shadow hover:bg-white hover:text-gray-800 transition"
          >
            Shop Now
          </Link>
        </div>
        <div className="md:w-1/2 mt-10 md:mt-0 flex justify-center">
          <Image
            src="/toys-hero.jpg"
            alt="Toys"
            width={500}
            height={500}
            className="rounded-xl shadow-lg"
          />
        </div>
      </section>
    </div>
  );
};

export default Hero;
