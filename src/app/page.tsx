
import React from 'react'
import Hero from '@/components/Home-Page/Hero';
import { getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]/authOptions';
import TrendingMovies from '@/components/Home-Page/TrendingMovies';
const page = async () => {
   const session = await getServerSession(authOptions)
     if(!session){
      return <p>Login </p>
     }
    return (
      <div className="">
       <Hero/>
       <TrendingMovies/>
      </div>
    );
  }
  

export default page;