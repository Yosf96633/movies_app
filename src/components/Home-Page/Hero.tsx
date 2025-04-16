import React from "react";
import { Button } from "../ui/button";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import Link from "next/link";

const Hero = async () => {
  const session = await getServerSession(authOptions);
  return (
    <div className=" relative h-[80vh] w-full">
      <div className=" absolute z-0 w-full h-full bg-[url('/Hero_image.webp')] bg-center" />
      <div className="  absolute z-0 w-full h-full flex flex-col pt-40 space-y-5 md:pl-16 pl-6">
        <h1 className=" text-7xl text-white max-md:text-5xl font-extrabold">
          Hi, {session?.user.name ? session.user.name : "There"}
        </h1>
        <p className=" text-3xl max-md:text-2xl font-light text-white md:w-[70%] w-[90%]">
          {" "}
          Discover your next favorite{" "}
          <span className=" text-[#58EA80] text-5xl max-md:text-3xl font-extrabold">
            Movies
          </span>
          . Browse trending titles, explore genres, and keep track of what you
          love — all in one place.{" "}
        </p>
         <Link href={'/movies'}>
         <Button className=" w-fit bg-white p-6 max-md:p-3 text-lg max-md:text-sm cursor-pointer mt-4 text-black">
          Browser movies
        </Button>
         </Link>
      </div>
    </div>
  );
};

export default Hero;
