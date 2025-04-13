import { cookies } from "next/headers";
import React from "react";
interface Data {
  title: string;
  mediaType: "movie" | "tv";
  posterPath: string;
  tmdbID: string;
}
const page = async () => {
  const response = await fetch(`${process.env.BASE_URL as string}/api/favorite` , {method:"GET" , headers:{
    Cookie : (await cookies()).toString()
  }});
  const result = await response.json();
  const data: Data[] = result?.data;

  return (
    <div className=" h-screen py-14 text-center font-bold text-5xl">
      Favorite
    </div>
  );
};

export default page;
