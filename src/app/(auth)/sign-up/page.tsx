"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import React, { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { FaGoogle } from "react-icons/fa6";
import axios from "axios";
import { toast, useToast } from "@/components/ui/use-toast";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { getCurrentUser } from "@/app/actions/getCurrentUser";
import { useSession } from "next-auth/react"; // next-auth session

interface SignUpFormValues {
  email: string;
  password: string;
}

const SignUpPage = () => {
  const { data: session } = useSession();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormValues>();

  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.push("/");
      router.refresh();
    }
  }, [session, router]);

  const onSubmit: SubmitHandler<SignUpFormValues> = (data) => {
    axios.post("/api/register", data).then(() => {
      toast({
        title: "Kullanıcı oluşturuldu",
        variant: "active",
      });
      signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      }).then((callback) => {
        if (callback?.ok) {
          return (
            toast({
              title: "Giriş işlemi başarılı",
              variant: "active",
            }),
            router.push("/"),
            router.refresh()
          );
        }
        if (callback?.error) {
          toast({
            title: callback.error,
            variant: "destructive",
          });
        }
      });
    });
  };

  return (
    <div className="p-24 lg:w-3/5 flex flex-col gap-5 bg-white rounded-2xl">
      <div>
        <h1 className="text-center font-extrabold text-3xl mb-5">Kayıt ol</h1>
        <Input
          placeholder="Email"
          type="email"
          {...register("email", { required: "Email zorunlu" })}
          className={`border ${
            errors.email ? "border-red-600" : "border-gray-300"
          }`}
        />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
      </div>
      <div>
        <Input
          placeholder="Şifre"
          type="password"
          {...register("password", { required: "Şifre zorunlu" })}
          className={`border ${
            errors.password ? "border-red-600" : "border-gray-300"
          }`}
        />
        {errors.password && (
          <p className="text-red-500">{errors.password.message}</p>
        )}
      </div>
      <Button
        className="bg-black text-white hover:bg-black/80 text-lg transition-all"
        onClick={handleSubmit(onSubmit)}
      >
        Kayıt ol
      </Button>
      <span className=" text-center font-bold">YA DA</span>
      <Button
        onClick={() => signIn("google", { callbackUrl: "/" })}
        className="relative flex gap-2 text-white border overflow-hidden transition-all duration-500 bg-gradient-to-r from-cyan-500 to-blue-500"
      >
        <span className="absolute inset-0 transition-transform duration-500 transform hover:translate-x-full bg-gradient-to-r from-cyan-500 to-blue-500"></span>
        <span className="absolute inset-0 transition-transform duration-500 transform -translate-x-full hover:translate-x-0 bg-gradient-to-r from-black to-cyan-500"></span>
        <span className="relative z-10 flex items-center gap-2">
          <FaGoogle size={20} />
          <span className="text-lg">Google ile kayıt ol</span>
        </span>
      </Button>

      <div>
        <Link href={"/sign-in"}>
          <span>Hesabın var ise</span>
          <span className="font-bold"> Giriş yap</span>
        </Link>
      </div>
    </div>
  );
};

export default SignUpPage;
