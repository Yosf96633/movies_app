import React from "react";
import { Button } from "../ui/button";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";

const Hero = async () => {
    const session = await getServerSession(authOptions);
  return (
    <div className=" relative h-[80vh] w-full">
      <div className=" absolute z-0 w-full h-full bg-[url('/Hero_image.webp')] bg-center"
      />
      <div className="  absolute z-0 w-full h-full flex flex-col pt-32 pl-16">
           <h1 className=" text-7xl text-white font-extrabold">Hi, {session?.user.name ? session.user.name : "There" }</h1>
           <p className=" text-3xl font-light text-white w-[70%]">  Discover your next favorite <span className=" text-[#58EA80] text-5xl font-extrabold">Movies</span>. Browse trending titles, explore genres, and keep track of what you love — all in one place.           </p>
           <Button className=" w-fit bg-white p-6 text-lg cursor-pointer mt-4 text-black">Call to Action</Button>
      </div>

    </div>
  );
};

export default Hero;
