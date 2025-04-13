"use client";
import { useFavoriteStore } from "@/store/favorite.store";
import { X } from "lucide-react";
import React, { useEffect } from "react";
import { toast } from "sonner";

const FetchFavorite = () => {
  const { setFavorites } = useFavoriteStore();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/favorite`);
        const result = await response.json();
        console.log(result)
           setFavorites(result.data)
        console.log(result);
      } catch (error) {
        console.log(error)
        toast(`Error while fetching favorites`, {
          action: {
            label: <X className=" bg-transparent" />,
            onClick: () => toast.dismiss(),
          },
        });
      }
    };
    fetchData();
  }, []);
  return <></>;
};

export default FetchFavorite;
