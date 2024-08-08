"use client";

import React, { useState, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";

const Category = () => {
  const [isLoading, setIsLoading] = useState(true);

  const categoryList = [
    { name: "Ayakkabı" },
    { name: "Çanta" },
    { name: "Gömlek" },
    { name: "Gözlük" },
    { name: "Tshirt" },
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 10);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="gap-3 md:gap-10 md:py-8 py-5 grid grid-cols-3 md:grid-cols-5">
      {isLoading
        ? Array(5)
            .fill(0)
            .map((_, index) => (
              <Skeleton
                key={index}
                className="min-w-[120px] h-[48px] rounded-md"
              />
            ))
        : categoryList.map((category, index) => (
            <div
              key={index}
              className="text-white border border-white rounded-md min-w-[120px] flex flex-1 items-center justify-center cursor-pointer text-center px-4 py-2 hover:border-red-700 transition"
            >
              {category.name}
            </div>
          ))}
    </div>
  );
};

export default Category;
