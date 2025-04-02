import Link from "next/link";
import Image from "next/image";

export default function HomePage() {
  const brands = [
    { name: "Disney", logo: "/brands/disney.svg" },
    { name: "Samsung", logo: "/brands/samsung.svg" },
    { name: "Nike", logo: "/brands/nike.svg" },
    { name: "Apple", logo: "/brands/apple.svg" },
    { name: "LG", logo: "/brands/lg.svg" },
    { name: "Sony", logo: "/brands/sony.svg" },
  ];

  return (
    <main>
      <section className="bg-[#1a1f2e] text-white relative overflow-hidden">
        <div className="container mx-auto px-4 py-16 md:py-24 flex flex-col md:flex-row items-center justify-between">
          {/* Left side - Text Content */}
          <div className="md:w-1/2 z-10">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Limited Time Offer!
            </h1>
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Up to 50% OFF!
            </h2>
            <p className="text-gray-300 mb-8">
              Don&apos;t Wait - Limited Stock at Unbeatable Prices!
            </p>
            <Link
              href="/products"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-md transition-colors"
            >
              Shop Now
            </Link>
          </div>

          {/* Right side - Illustration */}
          <div className="md:w-1/2 mt-8 md:mt-0">
            <div className="relative w-full h-[300px] md:h-[400px]">
              <Image
                src="/hero-illustration.svg"
                alt="Shopping Illustration"
                fill
                style={{ objectFit: "contain" }}
                priority
              />
            </div>
          </div>
        </div>

        {/* Brands Section */}
        <div className="container mx-auto px-4 py-12 border-t border-gray-800">
          <div className="grid grid-cols-3 md:grid-cols-6 gap-8 items-center justify-items-center opacity-70">
            {brands.map((brand) => (
              <div
                key={brand.name}
                className="relative w-24 h-12 grayscale hover:grayscale-0 transition-all"
              >
                <Image
                  src={brand.logo}
                  alt={brand.name}
                  fill
                  style={{ objectFit: "contain" }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
