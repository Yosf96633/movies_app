import Link from "next/link";
import React from "react";
interface TVShow {
    backdrop_path: string;
    id: number;
    name: string;
    original_name: string;
    overview: string;
    poster_path: string;
    media_type: "tv";
    adult: boolean;
    original_language: string;
    genre_ids: number[];
    popularity: number;
    first_air_date: string;
    vote_average: number;
    vote_count: number;
    origin_country: string[];
  }
  

const TrendingTVShow = async () => {
  const response = await fetch(
    `${process.env.TMBD_BASE_URL as string}/trending/tv/day?api_key=${
      process.env.API_KEY as string
    }&page=1`,
    {
     cache:"no-cache"
    }
  );
  const result = await response.json();
  const data: TVShow[] = result?.results || null;
  return (
    <div className=" flex flex-col md:px-6 px-2  py-6 space-y-6">
      <h1 className="  md:text-4xl text-2xl font-extrabold">Trending TV Shows</h1>
      <div className=" flex overflow-x-auto w-full cursor-pointer py-4">
            {data.map((x:TVShow , i:number)=><div  key={i} className="w-[150px] shrink-0 mr-4 relative">
           <Link href={`/tvshows/${x.id}`}><div className="relative rounded-md overflow-hidden shadow-md">
    <img
      src={`${process.env.IMAGE_BASE_URL as string}/w200${x.poster_path}`}
      alt="Movie Poster"
      className="w-full h-auto object-cover"
    />
    <span className="absolute bottom-2 right-2 bg-black/5 text-yellow-500 text-sm font-extrabold px-1.5 py-0.5 rounded">
      {x.vote_average}
    </span>
  </div></Link>
  <p className="mt-2 text-xl max-md:text-lg font-bold truncate">{x.name}</p>
</div>)}
      </div>
    </div>
  );
};

export default TrendingTVShow;
