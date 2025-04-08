import React from "react";
interface Movie {
  backdrop_path: string;
  id: number;
  title: string;
  original_title: string;
  overview: string;
  poster_path: string;
  media_type: string;
  adult: boolean;
  original_language: string;
  genre_ids: number[];
  popularity: number;
  release_date: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

const TrendingMovies = async () => {
  const response = await fetch(
    `${process.env.TMBD_BASE_URL as string}/trending/movie/day?api_key=${
      process.env.API_KEY as string
    }&page=1`,
    {
      next: {
        revalidate: 86400,
      },
    }
  );
  const result = await response.json();
  const data: Movie[] = result?.results || null;
  return (
    <div className=" flex flex-col px-6 py-6 space-y-6">
      <h1 className=" md:text-4xl text-3xl font-extrabold">Trending Movies</h1>
      <div className=" flex overflow-x-auto w-full cursor-pointer py-4">
            {data.map((x:Movie , i:number)=><div className="w-[150px] shrink-0 mr-4 relative">
  <div className="relative rounded-md overflow-hidden shadow-md">
    <img
      src={`${process.env.IMAGE_BASE_URL as string}/w200${x.poster_path}`}
      alt="Movie Poster"
      className="w-full h-auto object-cover"
    />
    <span className="absolute bottom-2 right-2 bg-black/5 text-yellow-500 text-sm font-extrabold px-1.5 py-0.5 rounded">
      {x.vote_average}
    </span>
  </div>
  <p className="mt-2 text-xl max-md:text-lg font-bold truncate">{x.title}</p>
</div>)}
      </div>
    </div>
  );
};

export default TrendingMovies;
