import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { FavButton } from "@/components/FavButton";
import { getServerSession } from "next-auth";
import Link from "next/link";
import React from "react";
interface Movie {
  adult: boolean;
  backdrop_path: string | null;
  belongs_to_collection: any | null;
  budget: number;
  genres: { id: number; name: string }[];
  homepage: string;
  id: number;
  imdb_id: string;
  origin_country: string[];
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  production_companies: {
    id: number;
    logo_path: string | null;
    name: string;
    origin_country: string;
  }[];
  production_countries: {
    iso_3166_1: string;
    name: string;
  }[];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: {
    english_name: string;
    iso_639_1: string;
    name: string;
  }[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const session = await getServerSession(authOptions);
  const response = await fetch(
    `${process.env.TMBD_BASE_URL as string}/movie/${id}?api_key=${
      process.env.API_KEY
    }`

  );
  const data: Movie = await response.json();
  return (
    <div className="relative h-[100vh] max-md:h-[85vh] md:p-12 p-4 z-0">
      <div
        className="absolute inset-0 h-full z-10 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${process.env.IMAGE_BASE_URL}/w1280/${data.backdrop_path})`,
        }}
      />
      <div className=" bg-black/65 h-full absolute inset-0 z-[15]" />
      <div className="relative flex flex-col top-24 z-20 text-white gap-6">
        {/* Title */}
        <h1 className="text-5xl md:text-6xl font-extrabold drop-shadow-md">
          {data.title}
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
            <strong>Release:</strong> {data.release_date}
          </span>
          <span>
            <strong>Runtime:</strong> {data.runtime} min
          </span>
          <span>
            <strong>Rating:</strong> ⭐ {data.vote_average} / 10 (
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
          {data.genres?.map((genre) => (
            <span
              key={genre.id}
              className="bg-white/10 border border-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm text-white"
            >
              {genre.name}
            </span>
          ))}
        </div>

        {/* Production Companies */}
        <div className="flex items-center gap-4 flex-wrap text-sm text-gray-400">
          <strong>Studios:</strong>
          {data.production_companies?.slice(0, 3).map((company) => (
            <span key={company.id} className="italic">
              {company.name}
            </span>
          ))}
        </div>

        {/* Action Button */}
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
              mediaType="movie"
              title={data.title}
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
