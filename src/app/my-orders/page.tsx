"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
} from "@/components/ui/pagination";
import { useRouter, useSearchParams } from "next/navigation"; // useRouter ve useSearchParams import et
import "./orders.css";

interface Order {
  id: number;
  name: string;
  quantity: number;
  price: number;
  date: string;
  image: string;
}

const Orders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const ordersPerPage = 5; // Bir sayfada gösterilecek sipariş sayısı

  const router = useRouter();
  const searchParams = useSearchParams();
  const currentPage = searchParams ? Number(searchParams.get("page")) || 1 : 1;

  useEffect(() => {
    const rawOrders = localStorage.getItem("my-orders");
    const savedOrders: Order[] = rawOrders
      ? JSON.parse(rawOrders).map((order: any) => ({
          id: order.id || Date.now(),
          name: order.name || "İsimsiz Ürün",
          quantity: order.quantity || 0,
          price: order.price || 0,
          date: order.date || new Date().toISOString(),
          image: order.image || "Ürün image",
        }))
      : [];

    savedOrders.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    setOrders(savedOrders);
  }, []);

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(orders.length / ordersPerPage); i++) {
    pageNumbers.push(i);
  }

  const handlePageChange = (pageNumber: number) => {
    router.push(`?page=${pageNumber}`);
  };

  if (orders.length === 0) {
    return <div>Sipariş bulunmuyor.</div>;
  }

  return (
    <div className="flex flex-col h-[865px] justify-between">
      <div>
        <div className="my-3 md:my-10">
          <div className="flex flex-col gap-5">
            <div className="text-white text-center text-3xl font-semibold">
              SİPARİŞLERİM
            </div>
            <div className="flex items-center text-white font-semibold gap-3 text-center border-b py-3">
              <div className="w-1/5">Ürün resmi</div>
              <div className="w-1/5">Ürün adı</div>
              <div className="w-1/5">Ürün miktarı</div>
              <div className="w-1/5">Ürün fiyatı</div>
              <div className="w-1/5">Sipariş Tarihi</div>
            </div>
          </div>

          <div className="no-scrollbar overflow-y-auto">
            {currentOrders.map((order) => (
              <div
                key={order.id}
                className="flex items-center justify-between text-white text-center my-5"
              >
                <div className="rounded-lg flex items-center w-1/5 justify-center">
                  <div className="w-[100px] h-[100px] bg-slate-200 flex items-center rounded-md">
                    <Image src={order.image} alt="" height={150} width={100} />
                  </div>
                </div>
                <div className="w-1/5">{order.name}</div>
                <div className="w-1/5 ">{order.quantity}</div>
                <div className="w-1/5 font-semibold">{order.price} ₺</div>
                <div className="w-1/5 ">{order.date}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Sayfalama Kontrolleri */}
      <div className="flex justify-center mt-4">
        <Pagination className="text-blue-500">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                className="hover:bg-blue-500 hover:text-white"
                href="#"
                onClick={() =>
                  handlePageChange(currentPage > 1 ? currentPage - 1 : 1)
                }
              />
            </PaginationItem>

            {pageNumbers.map((number) => (
              <PaginationItem key={number}>
                <PaginationLink
                  href="#"
                  onClick={() => handlePageChange(number)}
                  className={
                    currentPage === number ? "bg-indigo-600 hover:bg-indigo-800 text-white hover:text-white" : "hover:bg-blue-500 hover:text-white"
                  }
                >
                  {number}
                </PaginationLink>
              </PaginationItem>
            ))}

            <PaginationItem>
              <PaginationNext
                className="hover:bg-blue-500 hover:text-white"
                href="#"
                onClick={() =>
                  handlePageChange(
                    currentPage < pageNumbers.length
                      ? currentPage + 1
                      : pageNumbers.length
                  )
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
};

export default Orders;
