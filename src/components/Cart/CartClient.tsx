"use client";

import useCart from "@/hooks/useCart";
import Image from "next/image";
import { Button } from "../ui/button";

const CartClient = () => {
  const { cartPrdcts, removeFromCart, removeCart } = useCart();

  if (!cartPrdcts || cartPrdcts.length === 0) {
    return <div>Sepetinizde ürün bulunmamaktadır</div>;
  }

  return (
    <div className="my-3 md:my-10">
      <div className="flex items-center gap-3 text-center border-b py-3">
        <div className="w-1/5">Ürün resmi</div>
        <div className="w-1/5">Ürün adı</div>
        <div className="w-1/5">Ürün miktarı</div>
        <div className="w-1/5">Ürün fiyatı</div>
        <div className="w-1/5"></div>
      </div>
      <div>
        {cartPrdcts.map((cart) => (
          <div
            key={cart.id}
            className="flex items-center justify-between text-center my-5"
          >
            <div className="rounded-lg flex items-center w-1/5 justify-center">
              <div className="w-[100px] h-[100px] bg-slate-200 flex items-center rounded-md">
                <Image src={cart.image} alt="" height={150} width={100} />
              </div>
            </div>
            <div className="w-1/5">{cart.name}</div>
            <div className="w-1/5">{cart.quantity}</div>
            <div className="w-1/5 font-semibold">{cart.price} ₺</div>
            <div className="w-1/5">
              <Button
                onClick={()=>removeFromCart(cart)}
                variant={"destructive"}
              >
                Ürünü Sil
              </Button>
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between my-5 py-5 border-t">
        <Button onClick={() => removeCart()} className="w-1/5" size={"lg"} variant={"destructive"}>Sepeti Sil</Button>
        <div className="text-lg md:text-2xl text-orange-600 font-bold">1000 ₺</div>
      </div>
    </div>
  );
};

export default CartClient;
