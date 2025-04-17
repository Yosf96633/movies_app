"use client";
import { Favorite } from "./Carousel";
import React, { useEffect, useState } from "react";

interface Data {
  title: string;
  mediaType: "movie" | "tv";
  posterPath: string;
  tmdbID: string;
}

const page = () => {
  const [data, setData] = useState<Data[]>();
  useEffect(() => {
    const fetchData = async () => {
      const resposne = await fetch(`/api/favorite`);
      const result = await resposne.json();
      const x = result?.data;
      setData(x);
    };
    fetchData();
  }, []);
  return (
    <div className=" min-h-screen flex flex-col items-center py-14 px-4">
      {data?.length === 0 ? (
        <p>No favorite found!</p>
      ) : (
        <>
          <h1 className="text-center font-bold text-4xl">
            Your Favorites
          </h1>
          <Favorite items={data ?? []} />
        </>
      )}
    </div>
  );
};

export default page;
