import Link from "next/link";
import React from "react";
import { IconType } from "react-icons";
import { Button } from "../ui/button";

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
      className={`cursor-pointer mt-5 text-white`}
    >
      <Button className="p-8 flex gap-2" variant={"secondary"}>
        <Icon size={25} />
        <div>{name}</div>
      </Button>
    </Link>
  );
};

export default AdminSidebarItem;
