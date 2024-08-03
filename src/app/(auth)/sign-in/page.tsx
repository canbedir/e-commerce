"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { FaGoogle } from "react-icons/fa6";

interface SignInFormValues {
  email: string;
  password: string;
}

const SignInPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormValues>();

  const onSubmit: SubmitHandler<SignInFormValues> = (data) => {
    console.log(data);
  };

  return (
    <div className="p-32 w-2/3 flex flex-col gap-5">
      <div>
        <h1 className="text-white text-center font-extrabold text-3xl mb-5">Sign In</h1>
        <Input
        
          placeholder="Email"
          type="email"
          {...register("email", { required: "Email zorunlu" })}
          className={`border ${errors.email ? "border-red-500" : "border-gray-300"}`}
        />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
      </div>
      <div>
        <Input
          placeholder="Şifre"
          type="password"
          {...register("password", { required: "Şifre zorunlu" })}
          className={`border ${errors.password ? "border-red-500" : "border-gray-300"}`}
        />
        {errors.password && <p className="text-red-500">{errors.password.message}</p>}
      </div>
      <Button variant={"outline"} onClick={handleSubmit(onSubmit)}>Giriş Yap</Button>
      <span className="text-white text-center font-bold">OR</span>
      <Button className="flex gap-2 bg-[#1E2227] text-white border hover:bg-white hover:text-black">
        <FaGoogle size={20}/> <span className="text-lg">Google ile giriş yap</span>
      </Button>
      <div className="text-white">Hesabın yok mu? <Link className="text-orange-500" href={"/sign-up"}>Kayıt Ol</Link> </div>
    </div>
  );
};

export default SignInPage;
