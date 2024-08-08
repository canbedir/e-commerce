"use client";

import { CardProductProps } from "@/components/Detail/DetailClient";
import { toast, useToast } from "@/components/ui/use-toast";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

interface CartContextProps {
  productCartQty: number;
  cartPrdcts: CardProductProps[] | null;
  addToBasket: (product: CardProductProps) => void;
  addToBasketIncrease: (product: CardProductProps) => void;
  addToBasketDecrease: (product: CardProductProps) => void;
  removeFromCart: (product: CardProductProps) => void;
  removeCart: () => void;
  checkoutCart: () => void;
}

const CartContext = createContext<CartContextProps | null>(null);

interface Props {
  [propName: string]: any;
}

export const CartContextProvider = (props: Props) => {
  const [productCartQty, setProductCartQty] = useState(0);
  const [cartPrdcts, setCartPrdcts] = useState<CardProductProps[] | null>(null);

  useEffect(() => {
    let getItem: any = localStorage.getItem("cart");
    let getItemParse: CardProductProps[] | null = JSON.parse(getItem);
    setCartPrdcts(getItemParse);
  }, []);

  const { toast } = useToast();

  const addToBasketIncrease = useCallback(
    (product: CardProductProps) => {
      let updatedCart;
      if (product.quantity == 10) {
        return toast({
          title: "Daha fazla ekleyemezsin",
          variant: "destructive",
        });
      }
      if (cartPrdcts) {
        updatedCart = [...cartPrdcts];
        const existingItem = cartPrdcts.findIndex(
          (item) => item.id === product.id
        );
  
        if (existingItem > -1) {
          updatedCart[existingItem].quantity = ++updatedCart[existingItem]
            .quantity;
        }
        setCartPrdcts(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
      }
    },
    [cartPrdcts, toast] 
  );

  const addToBasketDecrease = useCallback(
    (product: CardProductProps) => {
      let updatedCart;
      if (product.quantity == 1) {
        return toast({
          title: "Daha fazla silemezsin",
          variant: "destructive",
        });
      }
      if (cartPrdcts) {
        updatedCart = [...cartPrdcts];
        const existingItem = cartPrdcts.findIndex(
          (item) => item.id === product.id
        );
  
        if (existingItem > -1) {
          updatedCart[existingItem].quantity = --updatedCart[existingItem]
            .quantity;
        }
        setCartPrdcts(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
      }
    },
    [cartPrdcts, toast] 
  );

  const removeCart = useCallback(() => {
    setCartPrdcts(null);
    localStorage.setItem("cart", JSON.stringify(null));
    return toast({
      title: "Sepet silindi",
      variant: "active",
    });
  }, []);

  const checkoutCart = useCallback(() => {
    setCartPrdcts(null);
    localStorage.setItem("cart", JSON.stringify(null));
    return toast({
      title: "Başarıyla sipariş verildi.",
      variant: "active",
    });
  }, []);

  const addToBasket = useCallback(
    (product: CardProductProps) => {
      setCartPrdcts((prev) => {
        let updatedCart;
        if (prev) {
          updatedCart = [...prev, product];
        } else {
          updatedCart = [product];
        }
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        return updatedCart;
      });
    },
    [cartPrdcts, toast]
  );

  const removeFromCart = useCallback(
    (product: CardProductProps) => {
      if (cartPrdcts) {
        const filteredProducts = cartPrdcts.filter(
          (cart) => cart.id !== product.id
        );
        setCartPrdcts(filteredProducts);
        localStorage.setItem("cart", JSON.stringify(filteredProducts));
        return toast({
          title: "Ürün sepetten silindi",
          variant: "active",
        });
      }
    },
    [cartPrdcts, toast]
  );

  let value = {
    productCartQty,
    addToBasket,
    addToBasketIncrease,
    removeFromCart,
    addToBasketDecrease,
    removeCart,
    checkoutCart,
    cartPrdcts,
  };
  return <CartContext.Provider value={value} {...props} />;
};

const useCart = () => {
  const context = useContext(CartContext);
  if (context == null) {
    throw new Error("Bir hata durumu mevcut");
  }
  return context;
};

export default useCart;
