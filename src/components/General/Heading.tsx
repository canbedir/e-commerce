import React from "react";

interface HeadingProps {
  center?: boolean;
  text: string;
}

const Heading = ({ text, center }: HeadingProps) => {
  return (
    <div className={`text-white md:text-xl ${center ? "text-center" : "text-start"}`}>{text}</div>
  );
};

export default Heading;
