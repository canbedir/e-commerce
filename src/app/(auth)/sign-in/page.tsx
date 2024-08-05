"use client";
import { getCurrentUser } from "@/app/actions/getCurrentUser";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { User } from "@prisma/client";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { FaGoogle } from "react-icons/fa6";
import { useSession } from "next-auth/react"; // next-auth session

interface SignInFormValues {
  email: string;
  password: string;
}

const SignInPage = () => {
  const { data: session } = useSession();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormValues>();

  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.push("/");
    }
  }, [session, router]);

  const onSubmit: SubmitHandler<SignInFormValues> = (data) => {
    signIn("credentials", {
      ...data,
      redirect: false,
    }).then((callback) => {
      if (callback?.ok) {
        router.push("/");
        router.refresh();
        return toast({
          title: "Giriş işlemi başarılı",
          variant: "active",
        });
      }
      if (callback?.error) {
        toast({
          title: callback.error,
          variant: "destructive",
        });
      }
    });
  };

  return (
    <div className="p-32 w-2/3 flex flex-col gap-5">
      <div>
        <h1 className="text-white text-center font-extrabold text-3xl mb-5">
          Sign In
        </h1>
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
        {errors.password && (
          <p className="text-red-500">{errors.password.message}</p>
        )}
      </div>
      <Button variant={"outline"} onClick={handleSubmit(onSubmit)}>
        Giriş Yap
      </Button>
      <span className="text-white text-center font-bold">OR</span>
      <Button className="flex gap-2 bg-[#1E2227] text-white border hover:bg-white hover:text-black">
        <FaGoogle size={20} />{" "}
        <span className="text-lg">Google ile giriş yap</span>
      </Button>
      <div className="text-white">
        Hesabın yok mu?{" "}
        <Link className="text-orange-500" href={"/sign-up"}>
          Kayıt Ol
        </Link>{" "}
      </div>
    </div>
  );
};

export default SignInPage;
