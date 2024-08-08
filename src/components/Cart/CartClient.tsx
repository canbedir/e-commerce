"use client";

import useCart from "@/hooks/useCart";
import Image from "next/image";
import { Button } from "../ui/button";
import { CardProductProps } from "../Detail/DetailClient";
import Counter from "../General/Counter";
import { Trash } from "lucide-react";
import Link from "next/link";

const CartClient = () => {
  const {
    cartPrdcts,
    removeFromCart,
    removeCart,
    checkoutCart,
    addToBasketIncrease,
    addToBasketDecrease,
  } = useCart();

  if (!cartPrdcts || cartPrdcts.length === 0) {
    return (
      <div className="text-white text-center h-[740px] flex flex-col gap-2 items-center justify-center">
        <div className="flex items-center -space-x-5">
          <h1 className="text-white text-7xl">hi</h1>
          <Image
            src={"/xlogo.png"}
            alt="logo"
            width={100}
            height={100}
            className="object-contain"
          />
        </div>
        <h1 className="font-extrabold text-3xl">
          Sepetiniz şu an boş görünüyor.
        </h1>
        <h2 className="text-white/80 text-lg">Beğendiğin ürünü seçip sepete ekle!</h2>
      </div>
    );
  }

  let cartPrdctsTotal = cartPrdcts
    .reduce(
      (acc: any, item: CardProductProps) => acc + item.quantity * item.price,
      0
    )
    .toFixed(2);

  return (
    <div className="my-3 md:my-10">
      <div className="flex items-center text-white font-semibold gap-3 text-center border-b py-3">
        <div className="w-1/5">Ürün resmi</div>
        <div className="w-1/5">Ürün adı</div>
        <div className="w-1/5">Ürün miktarı</div>
        <div className="w-1/5">Ürün fiyatı</div>
        <div className="w-1/5"></div>
      </div>

      <div className="max-h-[400px] overflow-y-auto">
        {cartPrdcts.map((cart) => (
          <div
            key={cart.id}
            className="flex items-center justify-between text-white text-center my-5"
          >
            <div className="rounded-lg flex items-center w-1/5 justify-center">
              <div className="w-[100px] h-[100px] bg-slate-200 flex items-center rounded-md">
                <Image src={cart.image} alt="" height={150} width={100} />
              </div>
            </div>
            <div className="w-1/5">{cart.name}</div>
            <div className="w-1/5 flex justify-center">
              <Counter
                btnColor
                txtColor
                cardProduct={cart}
                increaseFunc={() => addToBasketIncrease(cart)}
                decreaseFunc={() => addToBasketDecrease(cart)}
              />
            </div>
            <div className="w-1/5 font-semibold">{cart.price} ₺</div>
            <div className="w-1/5 flex justify-around">
              <Trash
                className="text-red-600 cursor-pointer hover:text-red-800"
                onClick={() => removeFromCart(cart)}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between my-5 py-5 border-t">
        <Button
          onClick={() => removeCart()}
          className="w-1/5"
          size={"lg"}
          variant={"destructive"}
        >
          Sepeti Sil
        </Button>
        <div className="text-lg md:text-2xl text-white/80 font-bold">
          <span>Toplam: {cartPrdctsTotal} ₺</span>
        </div>
      </div>
      <div className="text-end">
        <Link href={"/payment"}>
          <Button onClick={() => checkoutCart()} variant={"active"} size={"lg"}>
            Sipariş Ver
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default CartClient;
