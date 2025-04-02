import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-fraunces",
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "E-Commerce - Your One-Stop Shopping Destination",
  description:
    "Discover a wide range of products at great prices. Shop with confidence on our secure platform.",
  keywords: [
    "e-commerce",
    "online shopping",
    "digital marketplace",
    "retail",
    "products",
    "shopping",
  ],
  authors: [{ name: "Team Zero" }],
  creator: "E-Commerce",
  publisher: "E-Commerce",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("http://localhost:3000"),
  openGraph: {
    title: "E-Commerce - Your One-Stop Shopping Destination",
    description:
      "Discover a wide range of products at great prices. Shop with confidence on our secure platform.",
    url: "http://localhost:3000",
    siteName: "E-Commerce",
    images: [
      {
        url: "/ecommerce-logo.jpg",
        width: 1200,
        height: 630,
        alt: "E-Commerce Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${fraunces.variable} ${inter.variable}`}>
        {children}
      </body>
    </html>
  );
}
