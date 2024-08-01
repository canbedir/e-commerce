import Image from "next/image";
import React from "react";

const Banner = () => {
  return (
    <div className="h-[237px]">
      <div className="h-[137px] relative">
        <Image src={"/hepsi.jpeg"} alt="" fill />
      </div>
    </div>
  );
};

export default Banner;
