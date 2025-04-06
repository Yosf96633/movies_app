"use client";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { signOut } from "next-auth/react";
const SignOutButton = () => {
    const [isLoading , setIsLoading] = useState<boolean>(false)
  return(
    <Button
    className=" cursor-pointer"
    onClick={() => {
      signOut();
    }}
  >
    Sign out
  </Button>
  )
};

export default SignOutButton;
