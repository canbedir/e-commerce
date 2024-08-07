import Image from "next/image";
import React from "react";
import { RxAvatar } from "react-icons/rx";

interface AvatarProps {
  image?: string;
}

const Avatar = ({ image }: AvatarProps) => {
  if (image) return <Image src={image} alt="" width={25} height={25} />;
  return (
    <div>
      <RxAvatar size={25} />
    </div>
  );
};

export default Avatar;
