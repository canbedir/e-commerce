"use client";
import Image from "next/image";
import React, { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css"; // Swiper CSS dosyasını dahil etmeyi unutmayın.

const Banner = () => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className="h-[500px] hidden md:block">
        {!imageLoaded && <Skeleton className="h-full w-full rounded-md" />}
        <Swiper
          spaceBetween={50}
          slidesPerView={1} // Slayt başına gösterilecek resim sayısını 1 yaparak, her slaytın tamamını gösterebilirsiniz.
          onSlideChange={() => console.log("slide change")}
          onSwiper={(swiper) => console.log(swiper)}
          className="h-[400px] relative"
        >
          <SwiperSlide>
            <Image
              src={"/banner1.jpg"}
              alt=""
              fill
              className={`object-cover transition-opacity duration-500 ${
                imageLoaded ? "opacity-100" : "opacity-0"
              }`}
              onLoadingComplete={() => setImageLoaded(true)}
            />
          </SwiperSlide>
          <SwiperSlide>
            <Image
              src={"/banner2.jpg"}
              alt=""
              fill
              className={`object-cover transition-opacity duration-500 ${
                imageLoaded ? "opacity-100" : "opacity-0"
              }`}
              onLoadingComplete={() => setImageLoaded(true)}
            />
          </SwiperSlide>
          <SwiperSlide>
            <Image
              src={"/banner3.jpg"}
              alt=""
              fill
              className={`object-cover transition-opacity duration-500 ${
                imageLoaded ? "opacity-100" : "opacity-0"
              }`}
              onLoadingComplete={() => setImageLoaded(true)}
            />
          </SwiperSlide>
        </Swiper>
    </div>
  );
};

export default Banner;
