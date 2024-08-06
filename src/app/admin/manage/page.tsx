import { getCurrentUser } from "@/app/actions/getCurrentUser";
import getProducts from "@/app/actions/getProducts";
import AdminManage from "@/components/Admin/AdminManage";
import WarningText from "@/components/WarningText";
import React from "react";

const AdminManagePage = async () => {
  const products = await getProducts({ category: null });
  const currentUser = await getCurrentUser();

  if (!currentUser || currentUser.role !== "ADMIN") {
    return <WarningText text="Giriş izniniz yok" />;
  }
  return (
    <div className="flex w-full justify-center mt-5">
      <AdminManage products={products} />
    </div>
  );
};

export default AdminManagePage;
