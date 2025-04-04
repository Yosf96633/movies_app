import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import { ToggleMode } from "./theme";
const Navbar = () => {
  return (
    <header className=" flex justify-between items-center px-8 border-b py-5 bg-transparent">
       <h1 className=" text-3xl cursor-pointer font-bold"> Movies</h1>
      <nav className=" flex space-x-8 text-lg ">
        <Link href={"/"}>Link1</Link>
        <Link href={"/"}>Link1</Link>
        <Link href={"/"}>Link1</Link>
        <Link href={"/"}>Link1</Link>
        <Link href={"/"}>Link1</Link>
      </nav>
      <div className=" flex space-x-3.5">
      <div className=" flex space-x-4 items-center">
      <ToggleMode/>
      </div>
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
      </div>
    </header>
  );
};

export default Navbar;
