"use client";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";

export function MobileSidebar() {
  return (
    <div className="md:hidden"> {/* Hidden on medium and above */}
      <Sheet>
        <SheetTrigger asChild>
          <button className="p-2">
          <Menu className=" cursor-pointer" size={30}/>
          </button>
        </SheetTrigger>
        <SheetContent side="right">
          {/* Sidebar content here */}
          <div className="space-y-4 pt-12 flex flex-col text-4xl font-bold">
            <a href="/">Home</a>
            <a href="/login">Login</a>
            <a href="/settings">Settings</a>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
