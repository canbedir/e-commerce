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
    <div className="p-32 w-2/3 flex flex-col gap-5">
      <div>
        <h1 className="text-white text-center font-extrabold text-3xl mb-5">
          Sign Up
        </h1>
        <Input
          placeholder="Email"
          type="email"
          {...register("email", { required: "Email zorunlu" })}
          className={`border ${
            errors.email ? "border-red-500" : "border-gray-300"
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
            errors.password ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.password && (
          <p className="text-red-500">{errors.password.message}</p>
        )}
      </div>
      <Button variant={"outline"} onClick={handleSubmit(onSubmit)}>
        Kayıt Ol
      </Button>
      <span className="text-white text-center font-bold">OR</span>
      <Button
        onClick={() => signIn("google")}
        className="flex gap-2 bg-[#1E2227] text-white border hover:bg-white hover:text-black"
      >
        <FaGoogle size={20} />
        <span className="text-lg">Google ile kayıt ol</span>
      </Button>
      <div className="text-white">
        Hesabın var ise
        <Link className="text-orange-500" href={"/sign-in"}>
          Giriş Yap
        </Link>
      </div>
    </div>
  );
};

export default SignUpPage;
