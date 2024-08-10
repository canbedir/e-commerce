// src/app/api/review/route.ts

import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";
import { getCurrentUser } from "@/app/actions/getCurrentUser";

export async function POST(req: Request) {
  const { productId, rating, comment } = await req.json();

  const user = await getCurrentUser();

  if (!user) {
    return NextResponse.json({ error: "Lütfen giriş yapın" }, { status: 401 });
  }

  const review = await prisma.review.create({
    data: {
      productId,
      userId: user.id,
      rating,
      comment,
    },
  });

  return NextResponse.json(review);
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const productId = searchParams.get("productId");

  if (!productId) {
    return NextResponse.json({ error: "Geçersiz ürün ID" }, { status: 400 });
  }

  const reviews = await prisma.review.findMany({
    where: { productId },
    include: {
      user: true, 
    },
  });

  return NextResponse.json(reviews);
}
