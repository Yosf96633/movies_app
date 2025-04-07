'use client'
import React, { useState } from 'react'
import { Input } from './ui/input'

const NavInput = () => {
    const [input , setInput] = useState<string>()
  return (
    <Input type="search" value={input} onChange={(e)=>setInput(e.target.value)} placeholder="Search movies/ TV Shows" />
  )
}

export default NavInput