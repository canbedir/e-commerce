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
    <div className="w-full h-24 border-t border-gray-700 flex flex-col gap-5 items-center justify-center mt-3 md:mt-10">
      <div className="flex items-center justify-center gap-10">
        <FaInstagram size={30}/>
        <FaX size={30}/>
        <FaTiktok size={30}/>
        <FaLinkedin size={30}/>
      </div>
    </div>
  );
};

export default Footer;
