"use client";
import React, { useEffect, useState } from "react";
import { Heart, HeartOff, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useFavoriteStore } from "@/store/favorite.store";
interface Props {
  tmdbID: string;
  posterPath: string | null;
  mediaType: "movie" | "tv";
  title: string;
}
export const FavButton = ({ title, tmdbID, mediaType, posterPath }: Props) => {
  const { addFavorite, removeFavorite, checkFavorite } = useFavoriteStore();
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const setFavorite = async () => {
    try {
      setIsFavorite(true);
      toast("Added in favourite list", {
        action: {
          label: <X className=" bg-transparent" />,
          onClick: () => toast.dismiss(),
        },
      });
      const resposne = await fetch(`/api/favorite`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        
        body: JSON.stringify({
          title,
          tmdbID,
          posterPath,
          mediaType,
        }),
      });
      const result = await resposne.json();
      if (result?.success) {
        addFavorite({ tmdbID, title, mediaType, posterPath });
      } else {
        setIsFavorite(false);
      }
    } catch (error) {
      toast(`Something went wrong` , {action:{
        label: <X className=" bg-transparent" />,
        onClick: () => toast.dismiss(),
      }})
      console.log(`Error at setFavorite Function ${error}`);
    }
  };
  const setUnFavorite = async () => {
    try {
      setIsFavorite(false);
      toast(`Remove from favourite list`, {
        action: {
          label: <X className=" bg-transparent" />,
          onClick: () => toast.dismiss(),
        },
      });
      const resposne = await fetch(`/api/favorite`, {
        method: "DELETE",
        headers: {
          "Conetent-Type": "application/json",
        },
        body: JSON.stringify({
          tmdbID,
        }),
      });
      const result = await resposne.json();
      if (result?.success) {
        removeFavorite(tmdbID, mediaType);
      } else {
        setIsFavorite(true);
      }
    } catch (error) {
      toast(`Something went wrong` ,  {
        action: {
          
          label: <X className=" bg-transparent" />,
          onClick: () => toast.dismiss(),
        },
      });
      console.log(`Error at setUnFavorite Function ${error}`);
    }
  };
  useEffect(()=>{
    setIsFavorite(checkFavorite(tmdbID, mediaType))
  },[])
  return (
    <Button
      className=" mt-4 w-fit bg-white text-black cursor-pointer font-semibold px-3 py-2 rounded-xl hover:bg-gray-200 transition"
      onClick={() => {
        if (isFavorite) {
          setUnFavorite();
        } else {
          setFavorite();
        }
      }}
    >
      {isFavorite ? <HeartOff /> : <Heart />}
    </Button>
  );
};
