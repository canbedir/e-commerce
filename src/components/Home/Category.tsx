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
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-wrap justify-center items-center gap-2 md:gap-4">
        {categoryList.map((category, index) => (
          <React.Fragment key={index}>
            {index > 0 && <span className="text-gray-300 hidden md:inline">|</span>}
            <button 
              onClick={() => handleCategoryClick(category.name)}
              className="text-sm md:text-base text-gray-300 hover:text-white hover:underline transition-colors duration-300 ease-in-out p-2"
            >
              {category.name}
            </button>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default Category;
