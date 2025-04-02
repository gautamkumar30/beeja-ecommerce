import Link from "next/link";
import Image from "next/image";
import Hero from "./_components/Hero";
import HowWeWork from "./_components/HowweWork";
import DummyTestimonials from "./_components/dummyTestimonials";
import Footer from "./_components/Footer";

export default function HomePage() {
  // const brands = [
  //   { name: "Disney", logo: "/brands/disney.svg" },
  //   { name: "Samsung", logo: "/brands/samsung.svg" },
  //   { name: "Nike", logo: "/brands/nike.svg" },
  //   { name: "Apple", logo: "/brands/apple.svg" },
  //   { name: "LG", logo: "/brands/lg.svg" },
  //   { name: "Sony", logo: "/brands/sony.svg" },
  // ];

  return (
    <main>
      <Hero/>
      <HowWeWork/>
      <DummyTestimonials />
      <Footer />
    </main>
 
  );
}
