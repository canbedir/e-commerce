import prisma from "@/lib/prismadb";

export interface IProductParams {
  category?: string | null;
  search?: string | null;
}

export default async function getProducts(params: IProductParams) {
  try {
    const { category, search } = params;
    
    let query: any = {};

    if (category) {
      query.category = category;
    }

    if (search) {
      query.OR = [
        {
          name: {
            contains: search,
            mode: "insensitive",
          },
        },
        {
          description: {
            contains: search,
            mode: "insensitive",
          },
        },
      ];
    }

    const products = await prisma.product.findMany({
      where: query,
      include: {
        reviews: {
          include: {
            user: true,
          },
          orderBy: {
            createdDate: "desc",
          },
        },
      },
    });

    return products;
  } catch (error: any) {
    throw new Error(error);
  }
}
