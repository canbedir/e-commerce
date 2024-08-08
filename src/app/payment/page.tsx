import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const PaymentPage = () => {
  return (
    <div className="h-[700px] w-full">
      <div className="h-full w-full flex flex-col items-center justify-center text-center">
        <div className="flex items-center -space-x-5">
          <h1 className="text-white text-7xl">hi</h1>
          <Image
            src={"/xlogo.png"}
            alt="logo"
            width={100}
            height={100}
            className="object-contain"
          />
        </div>
        <div className="flex flex-col gap-5">
          <div>
            <h1 className="text-white text-3xl font-bold flex items-center gap-3">
              Siparişiniz başarıyla oluşturulmuştur
              <Check className="text-green-500" size={50} />
            </h1>
            <h2 className="text-white/80 text-lg">
              Bizi tercih ettiğiniz için teşekkürler...
            </h2>
          </div>
          <div>
            <Link href={"/"}>
              <Button variant={"outline"}>Anasayfaya geri dön</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
