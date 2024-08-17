import React from "react";
import getProducts from "@/app/actions/getProducts";
import { Skeleton } from "@/components/ui/skeleton";
import ProductCard from "@/components/Home/ProductCard";
import Category from "@/components/Home/Category";

const AllProducts = async () => {
  const products = await getProducts({ category: null });

  if (!products.length) {
    return (
      <div className="p-4 mt-10">
        <div className="text-2xl font-semibold text-white">Tüm Ürünler</div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12 mt-10">
          {Array(8)
            .fill(0)
            .map((_, index) => (
              <Skeleton
                key={index}
                className="h-[280px] w-[240px] rounded-md"
              />
            ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-4">
      <Category />
      <div className="text-2xl font-semibold text-white">Tüm Ürünler</div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-32 gap-y-14 mt-10">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default AllProducts;
