"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";
import { handleGoogleSignin, handleSignOut } from "@/app/actions/authActions";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useSession } from "next-auth/react";
import { LayoutDashboard, FilePenLine } from "lucide-react";

function Navbar() {
  const { data: session } = useSession();
  const isLoggedIn = session?.user;
  console.log(session);

  const { theme, setTheme } = useTheme();

  return (
    <nav className="flex justify-between items-center md:px-12 px-6 py-4">
      <Link href="/" className="flex items-center space-x-3">
        <h1 className="text-3xl font-semibold">Welth</h1>
      </Link>
      <div className=" flex items-center gap-4">
        {isLoggedIn && (
          <div className=" flex justify-center items-center gap-2 ">
            <Link href="/dashboard">
              <Button variant="outline" size="sm">
                <LayoutDashboard size={18} />
                Dashboard
              </Button>
            </Link>
            <Link href="/transaction/add">
              <Button size="sm">
                <FilePenLine size={18} />
                Add Transaction
              </Button>
            </Link>
          </div>
        )}
        <div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all duration-300 ease-in-out dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all duration-300 ease-in-out dark:rotate-0 dark:scale-100" />
          </Button>
        </div>
        <div>
          {isLoggedIn ? (
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Image
                  src={session?.user?.image as string}
                  alt="user"
                  height={100}
                  width={100}
                  className="h-10 w-10 rounded-full"
                />
              </DropdownMenuTrigger>
              <DropdownMenuContent className=" mr-6">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Dashboard</DropdownMenuItem>
                <DropdownMenuItem>Add transictions</DropdownMenuItem>
                <DropdownMenuItem onClick={handleSignOut}>
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button
              size="sm"
              className=" font-semibold"
              onClick={handleGoogleSignin}
            >
              Join now
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
