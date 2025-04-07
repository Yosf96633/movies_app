"use client";

import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Menu, Home, Film, Star, Bookmark, LogOut } from "lucide-react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";

export function MobileSidebar() {
  const { data: session, status } = useSession();
  const [open, setOpen] = useState(false); // track sheet state

  const handleNavClick = () => setOpen(false); // close sheet

  return (
    <div className="md:hidden">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <button className="p-2">
            <Menu className="cursor-pointer" size={30} />
          </button>
        </SheetTrigger>

        <SheetContent side="right" className="p-6">
          <div className=" pt-14">
          {status === "authenticated" && (
            <div className="flex flex-col items-center space-y-2 pt-8">
              <Avatar className="h-20 w-20">
                <AvatarImage src={session.user.image || ""} />
                <AvatarFallback>{session.user.name?.charAt(0)}</AvatarFallback>
              </Avatar>
              <h1 className="text-xl font-semibold">{session.user.name}</h1>
            </div>
          )}

          <nav className="mt-10 flex flex-col space-y-6 text-lg font-light">
            <Link href="/" onClick={handleNavClick} className="flex items-center space-x-3 hover:text-red-500 transition-colors">
              <Home size={20} />
              <span>Home</span>
            </Link>

            <Link href="/movies" onClick={handleNavClick} className="flex items-center space-x-3 hover:text-red-500 transition-colors">
              <Film size={20} />
              <span>Movies</span>
            </Link>

            <Link href="/favorites" onClick={handleNavClick} className="flex items-center space-x-3 hover:text-red-500 transition-colors">
              <Bookmark size={20} />
              <span>Favorites</span>
            </Link>

            <Link href="/top-rated" onClick={handleNavClick} className="flex items-center space-x-3 hover:text-red-500 transition-colors">
              <Star size={20} />
              <span>Top Rated</span>
            </Link>

            {status === "authenticated" && (
              <button
                onClick={() => {
                  handleNavClick();
                  signOut();
                }}
                className="flex items-center space-x-3 text-left hover:text-red-500 transition-colors"
              >
                <LogOut size={20} />
                <span>Sign Out</span>
              </button>
            )}
          </nav>
          {status === "unauthenticated" && <div className="pt-5 space-y-4">
              <Link href="/login" onClick={handleNavClick}>
                <button className="w-full py-2 px-4 rounded-md border mt-3 border-white text-white hover:bg-neutral-800 transition">
                  Login
                </button>
              </Link>
              <Link href="/register" onClick={handleNavClick}>
                <button className="w-full py-2 px-4 rounded-md border mt-3 border-white hover:bg-black hover:text-white transition">
                  Sign Up
                </button>
              </Link>
            </div>}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
