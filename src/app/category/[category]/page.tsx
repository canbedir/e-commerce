import React from "react";
import Heading from "@/components/General/Heading";
import ProductCard from "@/components/Home/ProductCard";
import { Product } from "@prisma/client";
import Category from "@/components/Home/Category";

interface CategoryPageProps {
  params: {
    category: string;
  };
}

const CategoryPage = async ({ params }: CategoryPageProps) => {
  const categoryUrl = params.category;

  const categoryPushList = [
    { name: "Elektronik", urlName: "Elektronik" },
    { name: "Giyim", urlName: "Giyim" },
    { name: "Kırtasiye", urlName: "Kirtasiye" },
    { name: "Oto", urlName: "Oto" },
    { name: "Bebek", urlName: "Bebek" },
    { name: "Spor", urlName: "Spor" },
    { name: "Kişisel Bakım", urlName: "Kisisel-Bakim" },
    { name: "Ev Eşyaları", urlName: "Ev-Esyalari" },
    { name: "Pet", urlName: "Pet" },
    { name: "Kitap", urlName: "Kitap" },
  ];

  const category =
    categoryPushList.find((cat) => cat.urlName === categoryUrl)?.name ||
    categoryUrl;

  const host = process.env.MAIN_SITE_URL
    ? `https://${process.env.MAIN_SITE_URL}`
    : "http://localhost:3000";
  const response = await fetch(`${host}/api/search?category=${categoryUrl}`, {
    cache: "no-store",
  });
  const products: Product[] = await response.json();

  if (!products.length) {
    return (
      <div className="">
        <Category/>
        <div className="text-white text-2xl mt-10">
        {`${category} kategorisinde ürün bulunamadı.`}
        </div>
      </div>
    );
  }

  return (
    <div className="p-4">
      <Category />
      <Heading text={`${category} kategorisindeki ürünler:`} />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12 mt-10">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;
