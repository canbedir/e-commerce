import React from 'react'
import { RxAvatar } from 'react-icons/rx';

interface AvatarProps{
    image?: string;

}

const Avatar = ({image}:AvatarProps) => {
  if(image) return <img src={image} alt="" />
  return <div> <RxAvatar size={25}/> </div>
}

export default Avatar