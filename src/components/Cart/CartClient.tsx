// cartclient.tsx
"use client";

import useCart from "@/hooks/useCart";
import Image from "next/image";
import { Button } from "../ui/button";
import { CardProductProps } from "../Detail/DetailClient";
import Counter from "../General/Counter";
import { Trash } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation"; // next/router yerine next/navigation
import { useEffect, useState } from "react";
import { getCurrentUser } from "@/app/actions/getCurrentUser"; // getCurrentUser fonksiyonunu import et
import { User } from "@prisma/client";

const CartClient = () => {
  const {
    cartPrdcts,
    removeFromCart,
    removeCart,
    addToBasketIncrease,
    addToBasketDecrease,
  } = useCart();
  const router = useRouter(); // useRouter hook'u ile router'ı al
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    async function checkUser() {
      const currentUser = await getCurrentUser();
      setUser(currentUser);
    }

    checkUser();
  }, []);

  const checkoutCart = () => {
    if (!user) {
      // Eğer kullanıcı giriş yapmamışsa
      alert("Lütfen sipariş vermek için giriş yapın.");
      router.push("/login"); // Giriş yap sayfasına yönlendir
      return;
    }

    if (!cartPrdcts) {
      return null;
    }
    const currentCart = cartPrdcts.map((product) => ({
      ...product,
      date: new Date().toISOString(),
    }));
    const previousOrders = JSON.parse(
      localStorage.getItem("my-orders") || "[]"
    );

    const updatedOrders = [...previousOrders, ...currentCart];
    localStorage.setItem("my-orders", JSON.stringify(updatedOrders));
    removeCart();
  };

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
        <h2 className="text-white/80 text-lg">
          Beğendiğin ürünü seçip sepete ekle!
        </h2>
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
        {user ? (
          <Link href={"/payment"}>
            <Button
              onClick={checkoutCart}
              disabled={!user}
              variant={"active"}
              size={"lg"}
            >
              Sipariş Ver
            </Button>
          </Link>
        ) : (
          <Button disabled={!user} variant={"active"} size={"lg"}>
            Sipariş vermek için giriş yap
          </Button>
        )}
      </div>
    </div>
  );
};

export default CartClient;
