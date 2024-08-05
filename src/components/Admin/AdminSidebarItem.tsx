import Link from "next/link";
import React from "react";
import { IconType } from "react-icons";

interface AdminSidebarItemProps {
  selected?: boolean;
  name: string;
  icon: IconType;
  url: string;
}

const AdminSidebarItem = ({
  icon: Icon,
  name,
  url,
  selected,
}: AdminSidebarItemProps) => {
  return (
    <Link
      href={url}
      className={`cursor-pointer flex items-center gap-2 ${
        selected ? "text-white" : "text-white/50"
      }`}
    >
        <Icon size={25} />
        <div>{name}</div>
    </Link>
  );
};

export default AdminSidebarItem;
