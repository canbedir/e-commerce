"use client";
import { Rating } from "@mui/material";
import { StarIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { useToast } from "../ui/use-toast";
import useCart from "@/hooks/useCart";
import { useReviews } from "@/hooks/useReviews";
import Link from "next/link";

const ProductCard = ({ product }: { product: any }) => {
  const router = useRouter();
  const { addToBasket, cartPrdcts } = useCart();
  const [displayButton, setDisplayButton] = useState(false);
  const { reviews, averageRating } = useReviews(product.id);
  const { toast } = useToast();

  const addToBasketFnc = () => {
    const cardProduct = {
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      quantity: 1,
      image: product.image,
      inStock: product.inStock,
    };
    addToBasket(cardProduct);
  };

  const ToastFnc = () => {
    toast({
      title: "Ürün sepete eklendi",
      variant: "active",
    });
  };

  const handleCombinedClick = () => {
    addToBasketFnc();
    ToastFnc();
    setDisplayButton(true);
  };

  useEffect(() => {
    const isInCart = cartPrdcts?.some((cart: any) => cart.id === product.id);
    setDisplayButton(!!isInCart);
  }, [cartPrdcts, product.id]);

  return (
    <div className="w-[240px] cursor-pointer shadow-lg p-2 rounded-md border text-white border-white hover:border-red-700 bg-zinc-900 hover:bg-zinc-800 flex flex-col justify-between">
      <Link href={`product/${product.id}`} passHref>
        <div className="relative h-[180px]">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-contain"
          />
        </div>
      </Link>
      <div className="mt-2 flex flex-col items-start gap-1 flex-grow">
        <div className="flex gap-2">
          <span className="font-bold line-clamp-2">
            {product.brand}
            <span className="font-normal ml-2">{product.name}</span>
          </span>
        </div>
        <div className="flex text-xs gap-1">
          <Rating
            name="read-only"
            value={averageRating}
            readOnly
            className="text-xl"
            sx={{
              "& .MuiRating-iconFilled": {
                color: "#FFD700",
              },
              "& .MuiRating-iconEmpty": {
                color: "#b1b1b1",
              },
            }}
          />
          <span className="text-slate-300">({reviews.length})</span>
        </div>
      </div>
      <div className="flex itemscenter justify-between w-full font-semibold text-lg md:text-xl mt-5 self-start">
        <div>
          {product.price} <span className="text-green-600">₺</span>
        </div>
        <div>
          {displayButton ? (
            <Button size={"sm"} variant={"active"}>
              Ürün Sepette
            </Button>
          ) : (
            <Button
              size={"sm"}
              variant={"secondary"}
              onClick={handleCombinedClick}
            >
              Sepete Ekle
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
