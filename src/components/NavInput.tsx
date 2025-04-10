'use client'
import React, { useState } from 'react'
import { Input } from './ui/input'
import { Search } from 'lucide-react'
import Link from 'next/link'

const NavInput = () => {
    const [input , setInput] = useState<string>()
  return (
   <div className=' flex items-center'>
    <Input type="search" value={input} onChange={(e)=>setInput(e.target.value)} placeholder="Search movies/ TV Shows" />
     <Link href={`search?q=${input}`}><Search className=' ml-2 cursor-pointer'/></Link>
   </div>
  )
}

export default NavInput