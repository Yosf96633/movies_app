import Link from 'next/link';
import React from 'react'
import { Pagination, PaginationContent, PaginationItem, PaginationLink } from "@/components/ui/pagination";

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
  const PAGE_SIZE = 20;

const page = async ({searchParams}:{
    searchParams : Promise<{page?:string}>
}) => {
    const {page="1"} = await searchParams;
    const response = await fetch (`${process.env.TMBD_BASE_URL}/movie/popular?api_key=${process.env.API_KEY}&page=${page}`)
    const result = await response.json();
    const data:Movie[] = result?.results;
    const currentPage = parseInt(page);
    const totalPages = result.total_pages;
  
  return (
    <div className=' py-12 max-md:py-6 flex flex-col items-center-safe'>
        <div className=" grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-16 max-md:gap-6 px-1 md:px-4">
        {data.map((x: Movie, i: number) => (
          <div key={i} className="md:w-[250px] w-[150px] shrink-0 relative">
            <Link href={`/movies/${x.id}`}>
              <div className="relative rounded-md overflow-hidden shadow-md">
                <img
                  src={ x.poster_path ? `${process.env.IMAGE_BASE_URL}/w200${x.poster_path}` : `https://dummyjson.com/image/200x300/282828/ffffff?text=Poster+not+available`}
                  alt="Movie Poster"
                  className="w-full h-auto object-cover"
                />
              </div>
            </Link>
            <p className="mt-2 text-xl max-md:text-lg font-bold truncate">
              {x.title}
            </p>
          </div>
        ))}
      </div>
       <Pagination className="mt-10">
              <PaginationContent>
                {currentPage > 1 && (
                  <PaginationItem>
                    <PaginationLink href={`?&page=${currentPage - 1}`}>Previous</PaginationLink>
                  </PaginationItem>
                )}
      
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  const pageNum = i + Math.max(1, currentPage - 2);
                  if (pageNum > totalPages) return null;
                  return (
                    <PaginationItem key={pageNum}>
                      <PaginationLink
                        href={`?&page=${pageNum}`}
                        isActive={pageNum === currentPage}
                      >
                        {pageNum}
                      </PaginationLink>
                    </PaginationItem>
                  );
                })}
      
                {currentPage < totalPages && (
                  <PaginationItem>
                    <PaginationLink href={`?&page=${currentPage + 1}`}>Next</PaginationLink>
                  </PaginationItem>
                )}
              </PaginationContent>
            </Pagination>
    </div>
  )
}

export default page