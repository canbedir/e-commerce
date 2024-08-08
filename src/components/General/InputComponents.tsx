"use client";

import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import { Input } from "../ui/input";

interface InputComponentsProps {
  id: string;
  placeholder: string;
  disabled?: boolean;
  type: string;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  adminui?: boolean;
}

const InputComponents: React.FC<InputComponentsProps> = ({
  id,
  placeholder,
  disabled,
  type,
  required,
  register,
  errors,
  adminui,
}) => {
  return (
    <Input
      className={`w-full h-12 p-3 rounded-md outline-none my-2 placeholder-white/70  ${
        errors[id] ? "border border-red-500" : "border border-slate-300"
      } ${adminui ? "border border-white text-white bg-[#121212]" : ""}`}
      id={id}
      placeholder={placeholder}
      disabled={disabled}
      type={type}
      {...register(id, { required })}
    />
  );
};

export default InputComponents;
