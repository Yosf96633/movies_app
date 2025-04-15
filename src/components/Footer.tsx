import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    <footer className=" py-8 border-t">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Brand */}
        <div>
         <div className=" flex space-x-2 items-center">
                   <Image src='/favicon.svg' width={35} height={20} alt="favicon"/>
                   <h1 className=" text-2xl max-md:text-xl cursor-pointer font-bold max-md:font-medium"> Movies</h1>
               </div>
          <p className="text-sm mt-2">
            Your one-stop destination for movie discoveries.
          </p>
        </div>

        {/* Navigation Links */}
        <div>
          <h2 className="text-lg font-semibold mb-3">Quick Links</h2>
          <ul className="space-y-2 text-sm">
            <li><Link href="/" className="hover:underline">Home</Link></li>
            <li><Link href="/favorite" className="hover:underline">Favorites</Link></li>
            <li><Link href="/trending" className="hover:underline">Trending</Link></li>
            <li><Link href="/search" className="hover:underline">Search</Link></li>
          </ul>
        </div>

        {/* Contact / About */}
        <div>
          <h2 className="text-lg font-semibold text-white mb-3">About</h2>
          <p className="text-sm">
            Built with ❤️ using Next js and TMDB API.
          </p>
          <p className="text-sm mt-2">
            © {new Date().getFullYear()} Movies. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
