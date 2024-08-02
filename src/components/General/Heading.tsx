import React from "react";

interface HeadingProps {
  center?: boolean;
  color?: boolean;
  text: string;
  bold?: boolean;
}

const Heading = ({ text, center, color, bold }: HeadingProps) => {
  return (
    <div className={`md:text-xl ${center ? "text-center" : "text-start"} ${bold ? "font-bold" : ""} ${color ? "text-black" : "text-white"}`}>{text}</div>
  );
};

export default Heading;
