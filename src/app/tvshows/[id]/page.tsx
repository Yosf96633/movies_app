import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { FavButton } from "@/components/FavButton";
import { getServerSession } from "next-auth";
import Link from "next/link";
import React from "react";
interface Creator {
  id: number;
  credit_id: string;
  name: string;
  original_name: string;
  gender: number;
  profile_path: string | null;
}

interface Genre {
  id: number;
  name: string;
}

interface Network {
  id: number;
  logo_path: string | null;
  name: string;
  origin_country: string;
}

interface ProductionCompany {
  id: number;
  logo_path: string | null;
  name: string;
  origin_country: string;
}

interface ProductionCountry {
  iso_3166_1: string;
  name: string;
}

interface Season {
  air_date: string;
  episode_count: number;
  id: number;
  name: string;
  overview: string;
  poster_path: string | null;
  season_number: number;
  vote_average: number;
}

interface Episode {
  id: number;
  name: string;
  overview: string;
  vote_average: number;
  vote_count: number;
  air_date: string;
  episode_number: number;
  episode_type: string;
  production_code: string;
  runtime: number;
  season_number: number;
  show_id: number;
  still_path: string | null;
}

interface TVShow {
  adult: boolean;
  backdrop_path: string | null;
  created_by: Creator[];
  episode_run_time: number[];
  first_air_date: string;
  genres: Genre[];
  homepage: string;
  tagline: string;
  id: number;
  in_production: boolean;
  languages: string[];
  last_air_date: string;
  last_episode_to_air: Episode;
  name: string;
  next_episode_to_air: Episode | null;
  networks: Network[];
  number_of_episodes: number;
  number_of_seasons: number;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  seasons: Season[];
  vote_average: number;
  vote_count: number;
  status: string;
  spoken_languages: {
    english_name: string;
    iso_639_1: string;
    name: string;
  }[];
}

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const session = await getServerSession(authOptions)
  const { id } =  await params;
  const response = await fetch(
    `${process.env.TMBD_BASE_URL as string}/tv/${id}?api_key=${
      process.env.API_KEY
    }&language=en-US`
  );
  const data: TVShow = await response.json();
  return (
    <div className="relative min-h-[100vh] md:p-12 p-4 z-0">
      <div
        className="absolute inset-0 h-full z-10 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${process.env.IMAGE_BASE_URL}/w1280/${data.backdrop_path})`,
        }}
      />
      <div className=" bg-black/65 h-full absolute inset-0 z-[15]" />
      <div className="relative flex flex-col top-24 max-md:top-14 z-20 text-white gap-6">
        {/* Title */}
        <h1 className="text-5xl md:text-6xl font-extrabold drop-shadow-md">
          {data.name}
        </h1>

        {/* Tagline */}
        {data.tagline && (
          <p className="text-lg italic text-gray-300 max-w-2xl drop-shadow-sm">
            "{data.tagline}"
          </p>
        )}

        {/* Overview */}
        <p className="text-base md:text-lg text-gray-200 md:max-w-[70%] drop-shadow-sm">
          {data.overview}
        </p>

        {/* Meta Info */}
        <div className="flex items-center gap-4 flex-wrap text-sm text-gray-300">
          <span>
            <strong>First Air Date:</strong> {data.first_air_date}
          </span>
          <span>
            <strong>Last Air Date:</strong> {data.last_air_date}
          </span>
          <span>
            <strong>Seasons:</strong> {data.number_of_seasons}
          </span>
          <span>
            <strong>Episodes:</strong> {data.number_of_episodes}
          </span>
          <span>
            <strong>Rating:</strong> ⭐ {data.vote_count} / 10 (
            {data.vote_count} votes)
          </span>
          <span>
            <strong>Status:</strong> {data.status}
          </span>
          <span>
            <strong>Language:</strong>{" "}
            {data.spoken_languages?.[0]?.english_name}
          </span>
          <span>
            <strong>Country:</strong> {data.production_countries?.[0]?.name}
          </span>
        </div>

        {/* Genres */}
        <div className="flex flex-wrap gap-2">
          {data.genres.map((genre) => (
            <span
              key={genre.id}
              className="bg-white/10 border border-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm text-white"
            >
              {genre.name}
            </span>
          ))}
        </div>

        {/* Networks */}
        {data.networks?.length > 0 && (
          <div className="flex items-center gap-4 flex-wrap text-sm text-gray-400">
            <strong>Networks:</strong>
            {data.networks.map((network) => (
              <span key={network.id} className="italic">
                {network.name}
              </span>
            ))}
          </div>
        )}

        {/* Production Companies */}
        <div className="flex items-center gap-4 flex-wrap text-sm text-gray-400">
          <strong>Studios:</strong>
          {data.production_companies?.slice(0, 3).map((company) => (
            <span key={company.id} className="italic">
              {company.name}
            </span>
          ))}
        </div>

        {/* Official Website */}
        <div className=" flex space-x-4 items-center">
          {data.homepage && (
            <a
              href={data.homepage}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 w-fit bg-white text-black font-semibold px-3 py-2 rounded-2xl hover:bg-gray-200 transition"
            >
              Visit Official Page
            </a>
          )}
          {session?.user ? (
            <FavButton
              tmdbID={data.id.toString()}
              mediaType="tv"
              title={data.name}
              posterPath={data.poster_path}
            />
          ) : (
            <Link className=" underline px-3 py-2" href={"/login"}>
              Login to add movies in favorite list
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default page;
