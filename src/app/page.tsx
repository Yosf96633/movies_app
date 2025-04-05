"use client";
import React from 'react'
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { signOut } from 'next-auth/react';
import { useSession } from "next-auth/react";
const page =  () => {
  const { data: session, status } = useSession();
    if (status === "loading") {
      return <p>Loading session...</p>;
    }
  
    if (!session) {
      return <p>You are not logged in.</p>;
    }
  
    return (
      <div className="p-4 border rounded">
        <h2 className="text-lg font-semibold">Welcome, {session.user?.name}</h2>
        <p>Email: {session.user?.email}</p>
        {session.user?.image && (
          <img
            src={session.user.image}
            alt="User Avatar"
            className="w-12 h-12 rounded-full mt-2"
          />
        )}
        <Button onClick={()=>{
          signOut();
        }}>Sign out</Button>
      </div>
    );
  }
  

export default page;