import React from 'react'
import Hero from '@/components/Home-Page/Hero';
import TrendingMovies from '@/components/Home-Page/TrendingMovies';
import TrendingTVShow from '@/components/Home-Page/TrendingTVShow';
import UpComing from '@/components/Home-Page/UpComing';
import AiringTVShow from '@/components/Home-Page/OnAirTVShows';
import News from '@/components/Home-Page/News';
const page = async () => {   
    return (
      <div className="">
       <Hero/>
       <TrendingMovies/>
       <TrendingTVShow/>
       <UpComing/>
       <AiringTVShow/>
       <News/>
      </div>
    );
  }
  

export default page;