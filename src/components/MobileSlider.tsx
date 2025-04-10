"use client";

import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Menu, Home, Film, Star, Bookmark, LogOut } from "lucide-react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { ToggleMode } from "./theme";

export function MobileSidebar() {
  const { data: session, status } = useSession();
  const [open, setOpen] = useState(false); // track sheet state

  const handleNavClick = () => setOpen(false); // close sheet

  return (
    <div className="relative">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <button className="p-2">
            <Menu className="cursor-pointer mr-3" size={30} />
          </button>
        </SheetTrigger>

        <SheetContent side="left" className="p-6">
          <div className=" pt-14">

          <nav className="mt-10 flex flex-col items-center space-y-6 text-2xl font-light">
            <Link href="/" onClick={handleNavClick} className="flex items-center space-x-3 hover:text-[#58EA80] transition-colors">
              <Home size={20} />
              <span>Home</span>
            </Link>

            <Link href="/movies" onClick={handleNavClick} className="flex items-center space-x-3 hover:text-[#58EA80]  transition-colors">
              <Film size={20} />
              <span>Movies</span>
            </Link>

            <Link href="/favorites" onClick={handleNavClick} className="flex items-center space-x-3 hover:text-[#58EA80]  transition-colors">
              <Bookmark size={20} />
              <span>Favorites</span>
            </Link>

            <Link href="/top-rated" onClick={handleNavClick} className="flex items-center space-x-3 hover:text-[#58EA80]  transition-colors">
              <Star size={20} />
              <span>Top Rated</span>
            </Link>

            {status === "authenticated" && (
              <button
                onClick={() => {
                  handleNavClick();
                  signOut();
                }}
                className="flex items-center space-x-3 text-left hover:text-[#58EA80] transition-colors"
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
          {status === "authenticated" && (
            <div className="flex items-center absolute bottom-0 space-x-2 py-8">
              <Avatar className="h-10 w-10">
                <AvatarImage src={session.user.image || ""} />
                <AvatarFallback>{session.user.name?.charAt(0)}</AvatarFallback>
              </Avatar>
              <h1 className="text-lg font-medium">{session.user.email}</h1>
              <div className="md:hidden self-end">
                <ToggleMode/>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
