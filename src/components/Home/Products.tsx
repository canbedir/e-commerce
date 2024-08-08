import React from "react";
import Heading from "../General/Heading";
import ProductCard from "./ProductCard";
import getProducts from "@/app/actions/getProducts";
import { Skeleton } from "@/components/ui/skeleton";

const Products = async () => {
  const products = await getProducts({ category: null });

  if (!products.length) {
    return (
      <div className="p-4">
        <Heading text="Tüm Ürünler" />
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
      <Heading text="Tüm Ürünler" />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12 mt-10">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Products;
