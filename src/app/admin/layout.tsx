import AdminSidebar from "@/components/Admin/AdminSidebar";
import React from "react";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex gap-3 mt-4">
      <AdminSidebar/>
      {children}
    </div>
  );
};

export default AdminLayout;
