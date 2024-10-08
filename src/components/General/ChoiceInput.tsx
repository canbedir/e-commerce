import React from "react";
import { IconType } from "react-icons";

interface ChoiceInputProps {
  text: string;
  onClick: (value: string) => void;
  icon: IconType;
  selected?: boolean;
}

const ChoiceInput = ({
  icon: Icon,
  selected,
  text,
  onClick,
}: ChoiceInputProps) => {
  return (
    <div
      onClick={() => onClick(text)}
      className={`flex items-center cursor-pointer gap-2 justify-center h-16 text-white border ${
        selected ? "border-red-600 border-4" : "border-gray-200"
      }`}
    >
      <Icon size={25} />
      <span className="font-semibold text-lg">{text}</span>
    </div>
  );
};

export default ChoiceInput;
