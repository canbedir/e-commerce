"use client"
import { Rating } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const ProductCard = ({ product }: { product: any }) => {

  const router = useRouter()

  return (
    <div onClick={()=> router.push(`product/${product.id}`)} className="w-[240px] cursor-pointer shadow-lg p-2 rounded-md bg-slate-200 hover:bg-slate-300 flex flex-col justify-between">
      <div className="relative h-[180px]">
        <Image src={product.image} alt="" fill className="object-contain" />
      </div>
      <div className="mt-2 flex flex-col items-start gap-1 flex-grow">
        <div className="flex gap-2">
          <span className="text-black font-bold line-clamp-2">
            {product.brand}
            <span className="text-black font-normal ml-2">{product.name}</span>
          </span>
        </div>
        <div className="flex text-xs gap-1">
          <Rating name="read-only" value={product.value} readOnly className="text-lg" />
          <span className="text-slate-500">({product.evaluation})</span>
        </div>
      </div>
      <div className="text-red-700 font-semibold text-lg md:text-xl mt-2 self-start">
        {product.price} ₺
      </div>
    </div>
  );
};

export default ProductCard;
