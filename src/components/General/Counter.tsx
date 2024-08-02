import React from "react";
import { CardProductProps } from "../Detail/DetailClient";

interface CounterProps {
  cardProduct: CardProductProps;
  increaseFunc: () => void;
  decreaseFunc: () => void;
  btnColor?: boolean
  txtColor?: boolean
}

const Counter = ({ decreaseFunc, increaseFunc, cardProduct, btnColor, txtColor }: CounterProps) => {

  const buttonStyle = "w-8 h-8 rounded-md bg-black/80 text-white flex items-center justify-center text-lg cursor-pointer"
  const buttonStylee = "w-8 h-8 rounded-md bg-white text-black flex items-center justify-center text-lg cursor-pointer"

  return (
    <div className="flex items-center gap-3 mt-5">
      <div onClick={decreaseFunc} className={`${btnColor ? buttonStylee : buttonStyle}`}>-</div>
      <div className={txtColor ? "cursor-default text-lg md:text-xl text-white" : "cursor-default text-lg md:text-xl text-black"}>{cardProduct?.quantity}</div>
      <div onClick={increaseFunc} className={`${btnColor ? buttonStylee : buttonStyle}`}>+</div>
    </div>
  );
};

export default Counter;
