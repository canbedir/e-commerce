"use client";

import { Rating } from "@mui/material";
import Image from "next/image";
import Counter from "../General/Counter";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { useToast } from "../ui/use-toast";
import CommentForm from "./Comment";
import useCart from "@/hooks/useCart";
import { StarIcon } from "lucide-react";

export type CardProductProps = {
  id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  image: string;
  inStock: boolean;
};

interface Order {
  id: string;
  name: string;
  quantity: number;
  price: number;
  date: string;
  image: string;
}

const DetailClient = ({ product }: { product: any }) => {
  const { productCartQty, addToBasket, cartPrdcts } = useCart();
  const [displayButton, setDisplayButton] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState<number>(0);
  const [cardProduct, setCardProduct] = useState<CardProductProps>({
    id: product.id,
    name: product.name,
    description: product.description,
    price: product.price,
    quantity: 1,
    image: product.image,
    inStock: product.inStock,
  });

  const fetchReviews = async () => {
    const response = await fetch(`/api/review?productId=${product.id}`);
    const data = await response.json();
    setReviews(data);
    calculateAverageRating(data);
  };

  useEffect(() => {
    setDisplayButton(false);
    let controlDisplay: any = cartPrdcts?.findIndex(
      (cart) => cart.id == product.id
    );
    if (controlDisplay > -1) {
      setDisplayButton(true);
    }
  }, [cartPrdcts, product.id]);

  useEffect(() => {
    fetchReviews();
  }, [product.id]);

  const calculateAverageRating = (reviews: any[]) => {
    if (reviews.length === 0) {
      setAverageRating(0);
    } else {
      const totalRating = reviews.reduce(
        (acc, review) => acc + review.rating,
        0
      );
      const average = totalRating / reviews.length;
      setAverageRating(average);
      console.log(averageRating, "sasdasdsad");
    }
  };

  const [canComment, setCanComment] = useState(false);

  useEffect(() => {
    const rawOrders = localStorage.getItem("my-orders");
    const savedOrders = rawOrders ? JSON.parse(rawOrders) : [];

    const productPurchased = savedOrders.some(
      (order: Order) => order.id === product.id
    );

    setCanComment(productPurchased);
  }, [product.id]);

  const { toast } = useToast();

  const increaseFunc = () => {
    if (cardProduct.quantity == 10) return;
    setCardProduct((prev) => ({ ...prev, quantity: prev.quantity + 1 }));
  };

  const decreaseFunc = () => {
    if (cardProduct.quantity == 1) return;
    setCardProduct((prev) => ({ ...prev, quantity: prev.quantity - 1 }));
  };

  const addToBasketFnc = () => {
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
  };

  const handleCommentAdded = () => {
    fetchReviews();
  };

  useEffect(() => {
    const fetchReviews = async () => {
      const response = await fetch(`/api/review?productId=${product.id}`);
      const data = await response.json();
      setReviews(data);
    };
    fetchReviews();
  }, [product.id]);

  return (
    <div className="my-10">
      <div className="md:flex block justify-center md:border">
        <div className="relative md:h-[700px] md:w-[400px] sm:w-[570px] h-[600px] w-[420px] flex-1 bg-zinc-800">
          <Image src={product?.image} alt="" fill className="object-contain" />
        </div>
        <div className="md:w-1/2 bg-gray-200 p-10 w-[420px] sm:w-[570px] ">
          <div className="flex items-center justify-between">
            <div className="text-xl md:text-2xl space-y-3 text-black font-semibold">
              {product.name}
            </div>
            <div className="text-black text-start">
              <div className="font-bold">STOK DURUMU: </div>
              {product.inStock ? (
                <div className="text-sm text-green-500">Ürün stokta mevcut</div>
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
              <Rating name="read-only" value={averageRating} readOnly />
              <span className="text-black text-xs">
                ({reviews.length}) Değerlendirme
              </span>
            </div>
          </div>
          <div className="text-black text-sm max-w-[450px] mt-2">
            {product.description}
          </div>
          {displayButton ? (
            <>
              <div className="mt-10">
                <Button size={"lg"} variant={"active"}>
                  Ürün Sepette
                </Button>
              </div>
            </>
          ) : (
            <>
              <div className="flex flex-col gap-5">
                <div>
                  <Counter
                    cardProduct={cardProduct}
                    increaseFunc={increaseFunc}
                    decreaseFunc={decreaseFunc}
                  />
                </div>
                <div>
                  {product.inStock ? (
                    <Button
                      size={"lg"}
                      variant={"mycolor"}
                      onClick={handleCombinedClick}
                    >
                      Sepete Ekle
                    </Button>
                  ) : (
                    <Button
                      size={"lg"}
                      variant={"mycolor"}
                      disabled
                      onClick={handleCombinedClick}
                    >
                      Ürün stokta bulunmamaktadır
                    </Button>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Yorumlar kısmı */}
      <div className="mt-40 text-white border p-5">
        <h2 className="text-3xl font-bold text-center">Yorumlar</h2>
        {reviews.length > 0 ? (
          reviews.map((review: any) => (
            <div key={review.id} className="my-4 flex items-center gap-5">
              <p>
                <div className="flex items-center gap-3">
                  <strong>{review.user.email}</strong>
                  <div>
                    <Rating
                      value={review.rating}
                      readOnly
                      emptyIcon={<StarIcon style={{ color: "#b6b6b6" }} />}
                    />
                  </div>
                </div>
                <p className="text-sm break-words max-w-[700px]">
                  {review.comment}
                </p>
              </p>
            </div>
          ))
        ) : (
          <p>Bu ürün için henüz yorum yapılmamış.</p>
        )}
        {canComment ? (
          <CommentForm
            productId={product.id}
            onCommentAdded={handleCommentAdded}
          />
        ) : (
          <p className="mt-10 text-lg">
            Bu ürüne yorum yapmak için önce satın almalısınız.
          </p>
        )}
      </div>
    </div>
  );
};

export default DetailClient;
