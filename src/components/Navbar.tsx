import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import { ToggleMode } from "./theme";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import SignOutButton from "./SignOutButton";
import { MobileSidebar } from "./MobileSlider";
import Image from "next/image";
import { Input } from "./ui/input";
import NavInput from "./NavInput";
const Navbar = async () => {
  const session = await getServerSession(authOptions);
  return (
    <header className=" flex justify-between items-center px-5 max-md:px-3 border-b py-2 backdrop-blur-2xl">
      <div className=" flex space-x-2 items-center">
      <MobileSidebar/>
          <Image src='/favicon.svg' width={35} height={20} alt="favicon"/>
          <h1 className=" text-2xl max-md:text-xl cursor-pointer font-bold max-md:font-medium"> Movies</h1>
      </div>
       <div className=" w-[50%]">
           <NavInput/>
       </div>
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
    </header>
  );
};

export default Navbar;
