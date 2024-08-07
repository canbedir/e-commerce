import React from "react";
import Heading from "../General/Heading";
import { products } from "@/utils/Products";
import ProductCard from "./ProductCard";
import getProducts from "@/app/actions/getProducts";

const Products = async () => {
  const products = await getProducts({ category: null });

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
