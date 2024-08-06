"use client";
import React from "react";
import AdminSidebarItem from "./AdminSidebarItem";
import { TbLayoutDashboardFilled } from "react-icons/tb";
import { BsCardChecklist } from "react-icons/bs";
import { IoCreateOutline } from "react-icons/io5";
import { usePathname } from "next/navigation";
import { FaEdit } from "react-icons/fa";

const AdminSidebar = () => {
  const pathname = usePathname();
  const adminPanel = [
    {
      name: "Özetler",
      icon: TbLayoutDashboardFilled,
      url: "/admin",
    },
    {
      name: "Ürün oluştur",
      icon: IoCreateOutline,
      url: "/admin/create",
    },
    {
      name: "Ürünleri yönet",
      icon: FaEdit,
      url: "/admin/manage",
    },
    {
      name: "Siparişler",
      icon: BsCardChecklist,
      url: "/admin/order",
    },
  ];

  return (
    <div className="w-1/5 border-r h-screen">
      <div className="flex flex-col gap-3">
        {adminPanel.map((admin, index) => (
          <AdminSidebarItem
            key={index}
            selected={pathname == admin.url}
            icon={admin.icon}
            name={admin.name}
            url={admin.url}
          />
        ))}
      </div>
    </div>
  );
};

export default AdminSidebar;
