"use client";
import { type User } from "@prisma/client";
import { User2 } from "lucide-react";
import React from "react";
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

interface UserProps {
  currentUser: User | null | undefined;
}

const UserComponent = ({ currentUser }: UserProps) => {
  const router = useRouter();

  const logoutFunc = () => {
    signOut({redirect:false});
    router.push("/");
  };

  return (
    <div className="relative hidden md:flex items-center">
      {currentUser ? (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <User2 className="cursor-pointer" size={25} />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="absolute right-0 bg-white rounded-md shadow-lg z-50">
            <DropdownMenuLabel>{currentUser.email}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <Link href={"/admin"}>
              <DropdownMenuItem>Admin</DropdownMenuItem>
            </Link>
            <DropdownMenuItem onClick={logoutFunc}>Çıkış yap</DropdownMenuItem>
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
