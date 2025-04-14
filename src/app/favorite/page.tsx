import { cookies } from "next/headers";
import { Favorite } from "./Carousel"; 
import React from "react";

interface Data {
  title: string;
  mediaType: "movie" | "tv";
  posterPath: string;
  tmdbID: string;
}

const page = async () => {
  const response = await fetch(`${process.env.BASE_URL as string}/api/favorite`, {
    headers: {
      Cookie: cookies().toString(),
    },
    cache: "no-store",
  });

  const result = await response.json();
  const data: Data[] = result?.data ?? [];

  return (
    <div className=" flex flex-col items-center py-14 px-4">
      <h1 className="text-center font-bold text-4xl mb-10">Your Favorites</h1>
      <Favorite items={data} />
    </div>
  );
};

export default page;
