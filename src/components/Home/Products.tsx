import React from "react";
import Heading from "../General/Heading";
import ProductCard from "./ProductCard";
import getProducts from "@/app/actions/getProducts";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link"; // Tüm Ürünler düğmesi için Link komponentini import ediyoruz
import { Button } from "../ui/button";
import { MdOutlineArrowRightAlt } from "react-icons/md";

const Products = async () => {
  const products = await getProducts({ category: null });

  const displayLimit = 12; // Gösterilecek maksimum ürün sayısı (3 satır x 4 sütun = 12)

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
      <h1 className="text-2xl font-semibold text-white">Ürünler</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-32 gap-y-14 mt-10">
        {products.slice(0, displayLimit).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      {products.length > displayLimit && (
        <div className="flex justify-start mt-16">
          <Link href="/all-products">
            <Button size={"lg"} className="bg-orange-500 hover:bg-orange-600">Daha Fazlası <MdOutlineArrowRightAlt size={25}/></Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Products;
