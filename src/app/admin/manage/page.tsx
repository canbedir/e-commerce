import { getCurrentUser } from "@/app/actions/getCurrentUser";
import getProducts from "@/app/actions/getProducts";
import AdminManage from "@/components/Admin/AdminManage";
import WarningText from "@/components/WarningText";
import Link from "next/link";
import React from "react";
import { FaArrowLeft } from "react-icons/fa6";

const AdminManagePage = async () => {
  const products = await getProducts({ category: null });
  const currentUser = await getCurrentUser();

  if (!currentUser || currentUser.role !== "ADMIN") {
    return <WarningText text="Giriş izniniz yok" />;
  }
  return (
    <div className="flex w-full justify-center mt-5">
      <span className="absolute left-10 text-white">
        <Link href={"/admin"}>
          <FaArrowLeft size={30} />
        </Link>
      </span>
      <AdminManage products={products} />
    </div>
  );
};

export default AdminManagePage;
