import React from "react";
import Avatar from "../General/Avatar";
import { RxAvatar } from "react-icons/rx";
import { Rating } from "@mui/material";

const Comment = ({ prd }: { prd: any }) => {
  return (
    <div className="border border-black/40 w-full md:w-1/2 p-2 bg-black/80 rounded-lg mt-10">
      {/* <Avatar image={prd?.user?.image} /> */}
      <div className="flex items-center gap-2">
        <RxAvatar size={45} />
        <div className="font-semibold">{prd?.user?.name}</div>
        <Rating name="read-only" value={prd?.user?.rating} readOnly />
      </div>
      <div className="">{prd.comment}</div>
    </div>
  );
};

export default Comment;
