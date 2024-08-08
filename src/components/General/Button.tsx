import React from 'react'
import { IconType } from 'react-icons';

interface ButtonProps{
    text: string;
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
    small?: boolean;
    active?: boolean;
    error?: boolean
    icon?: IconType;
    disabled?: boolean;
    whiteColor?: boolean
}

const Button = ({onClick,whiteColor,text,disabled,active,small,error, icon:Icon}:ButtonProps) => {
  return (
    <button onClick={onClick} disabled={disabled} className={`rounded-lg p-3 ${small ? "w-[250px]" : "w-full"} ${active ? "bg-green-600 text-white" : "bg-black/80 text-white"} ${error ? "bg-red-700 text-white" : ""} ${whiteColor ? "bg-white hover:bg-white/85 transition" : ""}`}>
        {Icon && <Icon/>}
        <span className={`${whiteColor ? "text-black" : ""}`}>{text}</span>
    </button>
  )
}

export default Button