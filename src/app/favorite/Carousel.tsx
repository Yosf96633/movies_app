"use client"

import Image from "next/image"
import Link from "next/link"
import { Heart, Star, PlayCircle, Tv2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface Data {
  title: string
  mediaType: "movie" | "tv"
  posterPath: string
  tmdbID: string
}

export const Favorite = ({ items }: { items: Data[] }) => {
  return (
    <div className="container mx-auto py-12 px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {items.map((item) => {
          return (
            <div
              key={item.tmdbID}
              className="group relative rounded-xl overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800 shadow-xl"
            >
              {/* Card background with gradient overlay */}
              <div className="absolute inset-0 bg-black opacity-20 group-hover:opacity-10 transition-opacity duration-300"></div>

              {/* Poster image */}
              <div className="relative aspect-[2/3] w-full overflow-hidden">
                <Image
                   src={`https://image.tmdb.org/t/p/original${item.posterPath}` || `https://dummyjson.com/image/200x300/282828/ffffff?text=Poster+not+available`}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>

                {/* Media type icon */}
                <div className="absolute top-3 left-3 backdrop-blur-md bg-black/30 p-1.5 rounded-full">
                  {item.mediaType === "movie" ? (
                    <PlayCircle className="w-5 h-5 text-rose-500" />
                  ) : (
                    <Tv2 className="w-5 h-5 text-cyan-500" />
                  )}
                </div>

                {/* Favorite button */}
                <Button
                  size="icon"
                  variant="ghost"
                  className="absolute bottom-3 right-3 w-8 h-8 rounded-full bg-black/40 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-white/20"
                  onClick={(e) => {
                    e.preventDefault()
                    // Add favorite functionality here
                  }}
                >
                  <Heart className="w-4 h-4 text-rose-500" />
                  <span className="sr-only">Add to favorites</span>
                </Button>
              </div>

              {/* Content area */}
              <div className="p-4">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-bold text-base line-clamp-1 group-hover:text-rose-400 transition-colors duration-300">
                    {item.title}
                  </h3>
                  <Badge variant={item.mediaType === "movie" ? "destructive" : "secondary"} className="ml-2 shrink-0">
                    {item.mediaType === "movie" ? "Movie" : "Series"}
                  </Badge>
                </div>
              </div>

              {/* Hover overlay with action button */}
              <Link
                href={`/movies/${item.tmdbID}`}
                className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-300"
              >
                <Button className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                       View Details
                </Button>
              </Link>
            </div>
          )
        })}
      </div>
    </div>
  )
}
