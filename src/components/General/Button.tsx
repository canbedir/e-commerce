import React from 'react'
import { IconType } from 'react-icons';

interface ButtonProps{
    text: string;
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
    small?: boolean;
    active?: boolean;
    icon?: IconType;
    disabled?: boolean;
}

const Button = ({onClick,text,disabled,active,small, icon:Icon}:ButtonProps) => {
  return (
    <button onClick={onClick} disabled={disabled} className={`rounded-lg p-3 ${small ? "w-[250px]" : "w-full"} ${active ? "bg-green-600 text-white" : "bg-black/80 text-white"}`}>
        {Icon && <Icon/>}
        {text}
    </button>
  )
}

export default Button