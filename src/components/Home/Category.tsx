"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";

const Category = () => {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const categoryList = [
    { name: "Elektronik" },
    { name: "Giyim" },
    { name: "Kırtasiye" },
    { name: "Oto" },
    { name: "Bebek" },
    { name: "Spor" },
    { name: "Kişisel Bakım" },
    { name: "Ev Eşyaları", urlName: "Ev-Esyalari" },
    { name: "Pet" },
    { name: "Kitap" },
  ];

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

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleCategoryClick = (categoryName: string) => {
    const category = categoryPushList.find((cat) => cat.name === categoryName);
    if (category) {
      router.push(`/category/${category.urlName}`);
    }
  };

  return (
    <div className="md:py-8 py-5 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-10 ">
      {isLoading
        ? Array(5)
            .fill(0)
            .map((_, index) => (
              <Skeleton
                key={index}
                className="min-w-[790px] h-[58px] rounded-md"
              />
            ))
        : categoryList.map((category, index) => (
            <div
              key={index}
              className="w-full text-gray-300 font-semibold border-r lg:px-10 border-gray-500 flex items-center justify-center py-2 "
              onClick={() => handleCategoryClick(category.name)}
            >
              <span className="cursor-pointer hover:text-white ">{category.name}</span>
            </div>
          ))}
    </div>
  );
};

export default Category;
