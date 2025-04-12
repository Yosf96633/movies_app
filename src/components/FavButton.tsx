"use client";
import React, { useState } from "react";
import { Heart, HeartOff } from "lucide-react";
import { Button } from "@/components/ui/button";
interface Props {
  tmdbID:string,
  posterPath:string | null,
  mediaType: "movie" | "tv",
  title:string
}
export const FavButton = ({title , tmdbID , mediaType , posterPath}:Props) => {
  const [isFavorite, setIsFavorite] = useState<boolean>(false); 
  return (
    <Button
      className=" mt-4 w-fit bg-white text-black cursor-pointer font-semibold px-3 py-2 rounded-xl hover:bg-gray-200 transition"
      onClick={() => {
        setIsFavorite(!isFavorite);
      }}
    >
      {isFavorite ? <HeartOff/> : <Heart/>}
    </Button>
  );
};
