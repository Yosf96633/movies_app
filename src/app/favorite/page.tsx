"use client";
import { Favorite } from "./Carousel";
import React, { useEffect, useState } from "react";
import { Loader } from "lucide-react";
import Link from "next/link";
interface Data {
  title: string;
  mediaType: "movie" | "tv";
  posterPath: string;
  tmdbID: string;
}

const page = () => {
  const [data, setData] = useState<Data[]>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  useEffect(() => {
    const fetchData = async () => {
      const resposne = await fetch(`/api/favorite`);
      const result = await resposne.json();
      const x = result?.data || [];
      setData(x);
      setIsLoading(false);
    };
    fetchData();
  }, []);
  console.log(data);
  return (
    <div className=" min-h-screen flex flex-col items-center py-14 px-4">
      {isLoading ? (
        <div className=" h-full pt-36">
          {" "}
          <Loader className=" animate-spin" />
        </div>
      ) : data?.length === 0 ? (
        <div className=" h-full pt-36 space-y-3">
          <p className="text-center font-bold text-4xl max-md:text-3xl">No favorite found!</p>
           <p className=" text-xl">Visit <Link className=" text-blue-400" href={'/'}>Home page</Link> and add your favorite movies</p>
        </div>
      ) : (
        <>
          <h1 className="text-center font-bold text-4xl max-md:text-3xl">Your Favorites</h1>
          <Favorite items={data ?? []} />
        </>
      )}
    </div>
  );
};

export default page;
