import getProductsId from "@/app/actions/getProductsId";
import DetailClient from "@/components/Detail/DetailClient";
import React from "react";

interface DetailProps {
  params: {
    productId: string;
  };
}

const Detail = async ({ params }: DetailProps) => {
  const { productId } = params;

  const product = await getProductsId({ productId });

  if (!product) {
    return <div>Ürün bulunamadı</div>;
  }

  return (
    <div>
      <DetailClient product={product} />
    </div>
  );
};

export default Detail;
