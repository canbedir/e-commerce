"use client"
import Image from "next/image";
import React, { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

const Banner = () => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className="h-[437px] hidden md:block">
      <div className="h-[337px] relative">
        {!imageLoaded && <Skeleton className="h-full w-full rounded-md" />}
        <Image
          src={"/banner1.jpg"}
          alt=""
          fill
          className={`object-cover transition-opacity duration-500 ${
            imageLoaded ? "opacity-100" : "opacity-0"
          }`}
          onLoadingComplete={() => setImageLoaded(true)}
        />
      </div>
    </div>
  );
};

export default Banner;
