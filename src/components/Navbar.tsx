import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import { ToggleMode } from "./theme";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { signOut } from "next-auth/react";
import SignOutButton from "./SignOutButton";
import { Menu } from "lucide-react";
import { MobileSidebar } from "./MobileSlider";
const Navbar = async () => {
  const session = await getServerSession(authOptions);
  return (
    <header className=" flex justify-between items-center px-8 border-b py-4 bg-transparent">
      <h1 className=" text-3xl cursor-pointer font-bold"> Movies</h1>
      <nav className=" flex space-x-8 text-sm max-md:hidden">
        <Link href={"/"}>Link1</Link>
        <Link href={"/"}>Link1</Link>
        <Link href={"/"}>Link1</Link>
        <Link href={"/"}>Link1</Link>
        <Link href={"/"}>Link1</Link>
      </nav>
      <div className=" flex space-x-3.5 items-center max-md:hidden">
        <div className=" flex space-x-4 items-center">
          <ToggleMode />
        </div>
        {!session ? (
          <div className=" flex space-x-2">
            <Link href={"/sign-up"}>
              {" "}
              <Button className=" cursor-pointer">Sign up</Button>
            </Link>
            <Link href={"/login"}>
              {" "}
              <Button className=" cursor-pointer">Login</Button>
            </Link>
          </div>
        ) : (
          <div className=" flex space-x-4 items-center">
            <Avatar>
              <AvatarImage src={session.user?.image} />
              <AvatarFallback>{session.user?.name?.at(0)}</AvatarFallback>
            </Avatar>
            <SignOutButton />
          </div>
        )}
      </div>
      <div className=" md:hidden">
       <MobileSidebar/>
      </div>
    </header>
  );
};

export default Navbar;
