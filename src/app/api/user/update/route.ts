import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import prisma from "@/lib/prismadb";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import type { Session } from "next-auth";

export async function PATCH(req: Request) {
  const session: Session | null = await getServerSession(authOptions);

  if (!session || !session.user || !session.user.email) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { email, password } = await req.json();

  try {
    const updatedData: any = { email };
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      updatedData.hashedPassword = hashedPassword;
    }

    await prisma.user.update({
      where: { email: session.user.email as string },
      data: updatedData,
    });

    return NextResponse.json({ message: "Profil başarıyla güncellendi" });
  } catch (error) {
    console.error("Profil güncellenirken hata oluştu:", error);
    return NextResponse.json({ message: "Sunucu hatası" }, { status: 500 });
  }
}
