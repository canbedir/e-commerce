"use client";
import AdminSidebarItem from "@/components/Admin/AdminSidebarItem";
import { usePathname } from "next/navigation";
import React from "react";
import { FaRegEdit } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";

const AdminPage = () => {
  const pathname = usePathname();
  const adminPanel = [
    /*     {
      name: "Özetler",
      icon: TbLayoutDashboardFilled,
      url: "/admin",
    }, */
    {
      name: "Ürün oluştur",
      icon: IoMdAdd,
      url: "/admin/create",
    },
    {
      name: "Ürünleri yönet",
      icon: FaRegEdit,
      url: "/admin/manage",
    },
    /*     {
      name: "Siparişler",
      icon: BsCardChecklist,
      url: "/admin/order",
    }, */
  ];

  return (
    <div className="h-[740px] w-full">
      <div className="flex flex-col items-center justify-center h-full">
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

export default AdminPage;
