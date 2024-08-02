"use client";

import { Rating } from "@mui/material";
import Image from "next/image";
import Counter from "../General/Counter";
import { useState } from "react";
import Button from "../General/Button";
import Comment from "./Comment";
import Heading from "../General/Heading";

export type CardProductProps = {
  id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  image: string;
  inStock: boolean;
};

const DetailClient = ({ product }: { product: any }) => {
  const [cardProduct, setCardProduct] = useState<CardProductProps>({
    id: product.id,
    name: product.name,
    description: product.description,
    price: product.price,
    quantity: 1,
    image: product.image,
    inStock: product.inStock,
  });

  const increaseFunc = () => {
    if (cardProduct.quantity == 10) return;
    setCardProduct((prev) => ({ ...prev, quantity: prev.quantity + 1 }));
  };

  const decreaseFunc = () => {
    if (cardProduct.quantity == 1) return;
    setCardProduct((prev) => ({ ...prev, quantity: prev.quantity - 1 }));
  };

  return (
    <div className="my-10">
      <div className="md:flex block justify-center md:border">
        <div className="relative md:h-[700px] md:w-[400px] sm:w-[570px] h-[600px] w-[420px] flex-1 bg-slate-100">
          <Image src={product?.image} alt="" fill />
        </div>
        <div className="md:w-1/2 bg-gray-200 p-10 w-[420px] sm:w-[570px] ">
          <div className="flex items-center justify-between">
            <div className="text-xl md:text-2xl space-y-3 text-black font-semibold">
              {product.name}
            </div>
            <div className="text-black text-start">
              <div className="font-bold">STOK DURUMU: </div>
              {product.inStock ? (
                <div className="text-sm text-green-600">Ürün stokta mevcut</div>
              ) : (
                <div className="text-sm text-red-600">
                  Ürün stokta bulunmamaktadır
                </div>
              )}
            </div>
          </div>
          <div className="text-blue-600 font-semibold">{product.brand}</div>
          <div className="flex items-center justify-between">
            <div className="text-black/80 font-bold text-xl md:text-3xl">
              {product.price} ₺
            </div>
            <div className="flex flex-col items-center gap-2">
              <Rating
                name="read-only"
                value={product.value}
                readOnly
                className="text-lg"
              />
              <span className="text-black text-xs">
                {product.evaluation} Değerlendirme
              </span>
            </div>
          </div>
          <div className="text-black text-sm max-w-[450px] mt-2">
            {product.description}
          </div>
          <div className="flex flex-col gap-5">
            <div>
              <Counter
                cardProduct={cardProduct}
                increaseFunc={increaseFunc}
                decreaseFunc={decreaseFunc}
              />
            </div>
            <div>
              <Button text="Sepete Ekle" onClick={() => {}} />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-20 py-10 bg-white">
        <Heading text="Yorumlar" bold color center />
        <div className="p-5">
          {product?.reviews?.map((prd: any) => (
            <Comment key={prd.id} prd={prd} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DetailClient;
