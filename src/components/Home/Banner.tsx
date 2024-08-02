import Image from "next/image";
import React from "react";

const Banner = () => {
  return (
    <div className="h-[437px]  hidden md:block">
      <div className="h-[337px] relative">
        <Image src={"/banner1.jpg"} alt="" fill className="object-cover"/>
      </div>
    </div>
  );
};

export default Banner;
