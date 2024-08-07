import React from "react";
import {
  FaInstagram,
  FaLinkedin,
  FaTiktok,
  FaTwitter,
  FaX,
} from "react-icons/fa6";

const Footer = () => {
  return (
    <div className="w-full h-24 text-white border-t border-gray-700 flex flex-col gap-5 items-center justify-center mt-3 md:mt-10">
      <div className="flex items-center justify-center gap-10">
        <FaInstagram className="cursor-pointer" size={30}/>
        <FaX className="cursor-pointer" size={30}/>
        <FaTiktok className="cursor-pointer" size={30}/>
        <FaLinkedin className="cursor-pointer" size={30}/>
      </div>
    </div>
  );
};

export default Footer;
