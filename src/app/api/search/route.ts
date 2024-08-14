import { NextResponse } from 'next/server';
import prisma from '@/lib/prismadb';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('query');
  const category = searchParams.get('category');

  // Filtreleme için whereClause'u dinamik olarak oluşturuyoruz
  const whereClause: any = {};

  if (query) {
    whereClause.name = {
      contains: query,
      mode: 'insensitive',
    };
  }

  if (category) {
    whereClause.category = {
      equals: category,
    };
  }

  const products = await prisma.product.findMany({
    where: whereClause,
  });

  return NextResponse.json(products);
}
