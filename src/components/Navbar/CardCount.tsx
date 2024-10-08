"use client";
import useCart from "@/hooks/useCart";
import Link from "next/link";
import React from "react";
import { FaBasketShopping } from "react-icons/fa6";

const CardCount = () => {
  const { cartPrdcts } = useCart();
  const cartCount = cartPrdcts?.length || 0;

  return (
    <div className="hidden md:flex relative">
      <Link href={"/cart"} className="flex items-center">
        <FaBasketShopping size={25} className="cursor-pointer" />
        {cartCount > 0 && (
          <div className="absolute -top-2 -right-2 bg-red-600 text-sm w-4 h-4 flex items-center justify-center rounded-full">
            {cartCount}
          </div>
        )}
      </Link>
    </div>
  );
};

export default CardCount;
