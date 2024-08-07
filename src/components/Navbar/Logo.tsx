"use client";

import Image from "next/image";
import Link from "next/link";

const Logo = () => {
  return (
    <div>
      <Link href={"/"}>
        <div className="flex items-center -space-x-2">
          <h1 className="text-white text-2xl">hi</h1>
          <Image src={"/xlogo.png"} alt="logo" width={50} height={50} className="object-contain" />
        </div>
      </Link>
    </div>
  );
};

export default Logo;
