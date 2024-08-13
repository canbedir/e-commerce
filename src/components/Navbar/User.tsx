"use client";

import { type User } from "@prisma/client";
import { User2 } from "lucide-react";
import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { useToast } from "../ui/use-toast";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

interface UserProps {
  currentUser: User | null | undefined;
}

const UserComponent = ({ currentUser }: UserProps) => {
  const router = useRouter();
  const { toast } = useToast();

  const [email, setEmail] = useState(currentUser?.email || "");
  const [password, setPassword] = useState("");

  const logoutFunc = () => {
    return signOut({ callbackUrl: "/" }), router.refresh();
  };

  const handleProfileUpdate = async () => {
    try {
      const response = await fetch("/api/user/update", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        toast({
          title: "Profil güncellendi",
          description: "Profiliniz başarıyla güncellendi.",
        });
        router.refresh();
      } else {
        toast({
          title: "Hata",
          description: "Profil güncellenirken bir hata oluştu.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Profil güncellenirken hata oluştu:", error);
      toast({
        title: "Hata",
        description: "Profil güncellenirken bir hata oluştu.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="relative hidden md:flex items-center">
      {currentUser ? (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <User2 className="cursor-pointer" size={25} />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-white rounded-md shadow-lg z-50">
            <DropdownMenuLabel>{currentUser.email}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <Link href={"/admin"}>
              <DropdownMenuItem>Admin</DropdownMenuItem>
            </Link>
            <DropdownMenuSeparator />
            <Link href={"/my-orders"}>
              <DropdownMenuItem>Siparişlerim</DropdownMenuItem>
            </Link>
            <DropdownMenuItem onClick={logoutFunc}>Çıkış yap</DropdownMenuItem>
            <DropdownMenuSeparator />
            <Sheet>
              <SheetTrigger className="w-full" asChild>
                <Button variant="dropdown" size={"sm"}>
                  Profil
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Profili düzenle</SheetTitle>
                  <SheetDescription>
                    Profilinizi burada düzenleyebilirsiniz. Bitirdiğinizde
                    kaydet&apos;e tıklayın.
                  </SheetDescription>
                </SheetHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="email" className="text-right">
                      Email
                    </Label>
                    <Input
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="password" className="text-right">
                      Şifre
                    </Label>
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="col-span-3"
                    />
                  </div>
                </div>
                <SheetFooter>
                  <SheetClose asChild>
                    <Button type="submit" onClick={handleProfileUpdate}>
                      Değişiklikleri kaydet
                    </Button>
                  </SheetClose>
                </SheetFooter>
              </SheetContent>
            </Sheet>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <div>
          <Link href={"/sign-in"}>
            <Button variant={"secondary"}>Giriş yap</Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default UserComponent;
