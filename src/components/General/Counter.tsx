import React from "react";
import { CardProductProps } from "../Detail/DetailClient";

interface CounterProps {
  cardProduct: CardProductProps;
  increaseFunc: () => void;
  decreaseFunc: () => void;
}

const Counter = ({ decreaseFunc, increaseFunc, cardProduct }: CounterProps) => {

  const buttonStyle = "w-8 h-8 rounded-md bg-black/80 text-white flex items-center justify-center text-lg cursor-pointer"

  return (
    <div className="flex items-center gap-3 mt-5">
      <div onClick={decreaseFunc} className={buttonStyle}>-</div>
      <div className="cursor-default text-lg md:text-xl text-black  ">{cardProduct?.quantity}</div>
      <div onClick={increaseFunc} className={buttonStyle}>+</div>
    </div>
  );
};

export default Counter;
