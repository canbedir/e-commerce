import Banner from "@/components/Home/Banner";
import Category from "@/components/Home/Category";
import Products from "@/components/Home/Products";
import { SessionProvider } from "next-auth/react";

export default function Home() {
  return (
      <div>
        <Category />
        <Banner />
        <Products />
      </div>
  );
}
