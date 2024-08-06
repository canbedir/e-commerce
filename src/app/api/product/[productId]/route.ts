import prisma from "@/lib/prismadb"
import { getCurrentUser } from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";

export async function DELETE(request: Request, { params }: { params: { productId: string } }) {
    const currentUser = await getCurrentUser()

    if (!currentUser || currentUser.role !== "ADMIN") {
        return NextResponse.error()
    }

    try {
        const product = await prisma.product.delete({
            where: {
                id: params.productId,
            },
        });
        return NextResponse.json(product);
    } catch (error) {
        console.error("Error deleting product: ", error);
        return NextResponse.error();
    }
}
