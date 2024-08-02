"use client";
import useCart from "@/hooks/useCart";
import Link from "next/link";
import React from "react";
import { FaBasketShopping } from "react-icons/fa6";

const CardCount = () => {
  const { cartPrdcts } = useCart();
  return (
    <div className="hidden md:flex relative">
      <Link href={"/cart"} className="flex items-center">
        <FaBasketShopping size={25} className="cursor-pointer" />
          <div className="absolute -top-2 -right-2 bg-red-600 text-sm w-4 h-4 flex items-center justify-center rounded-full">
            {cartPrdcts?.length}
          </div>
      </Link>
    </div>
  );
};

export default CardCount;
