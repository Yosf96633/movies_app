'use client'
import React, { useEffect } from "react";

const FetchFavorite = () => {
    useEffect( ()=>{
         const fetchData = async () => {
              const response = await fetch(`/api/favorite`);
              const result = await response.json();
              console.log(result)
         }
         fetchData()
    } , [])
  return <></>;
};

export default FetchFavorite;
