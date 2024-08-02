"use client";

import useCart from "@/hooks/useCart";
import Image from "next/image";

const CartClient = () => {
  const { cartPrdcts } = useCart();

  if (!cartPrdcts || cartPrdcts.length === 0) {
    return <div>Sepetinizde ürün bulunmamaktadır</div>;
  }

  return (
    <div className="my-3 md:my-10">
      <div className="flex items-center gap-3 text-center border-b py-3">
        <div className="w-1/4">Ürün resmi</div>
        <div className="w-1/4">Ürün adı</div>
        <div className="w-1/4">Ürün miktarı</div>
        <div className="w-1/4">Ürün fiyatı</div>
      </div>
      <div>
        {cartPrdcts.map((cart) => (
          <div
            key={cart.id}
            className="flex items-center justify-between text-center my-5"
          >
            <div className="rounded-lg flex items-center w-1/4 justify-center">
              <div className="w-[100px] h-[100px] bg-slate-200 flex items-center rounded-md">
                <Image src={cart.image} alt="" height={150} width={100} />
              </div>
            </div>
            <div className="w-1/4">{cart.name}</div>
            <div className="w-1/4">{cart.quantity}</div>
            <div className="w-1/4 font-semibold">{cart.price} ₺</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CartClient;
