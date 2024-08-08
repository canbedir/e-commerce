import Link from "next/link";
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
    <div className="w-full border-white/20 border-t mt-40">
      <div className="py-10 px-20 text-white md:flex md:items-center md:justify-between">
        <div className="text-center md:text-left">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} All Rights Reserved
          </p>
        </div>

        <div className="mt-4 flex items-center justify-center md:mt-0">
          <div className="flex space-x-8">
            <Link
              href="#"
              className="text-sm  hover:text-white/60"
            >
              Terms
            </Link>
            <Link
              href="#"
              className="text-sm hover:text-white/60"
            >
              Privacy Policy
            </Link>
            <Link
              href="#"
              className="text-sm hover:text-white/60"
            >
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
