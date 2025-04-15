import React from "react";
import Hero from "@/components/Home-Page/Hero";
import TrendingMovies from "@/components/Home-Page/TrendingMovies";
import TrendingTVShow from "@/components/Home-Page/TrendingTVShow";
import UpComing from "@/components/Home-Page/UpComing";
import AiringTVShow from "@/components/Home-Page/OnAirTVShows";
import FetchFavorite from "@/components/Home-Page/FetchFavorite";
import TestimonialSection from "@/components/Home-Page/testimonial-section";
import NewsletterSection from "@/components/Home-Page/newsletter-section";
const page = async () => {
  return (
    <div className="">
      <FetchFavorite />
      <Hero />
      <TrendingMovies />
      <TrendingTVShow />
      <UpComing />
      <AiringTVShow />
      <TestimonialSection/>
      <NewsletterSection/>
    </div>
  );
};

export default page;
