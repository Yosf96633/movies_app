import Image from 'next/image';
import React from 'react'

const page = () => {
  return (
    <div className=' h-screen'>
          <Image className=' absolute' src={'/Hero_image.webp'} height={720} width={1560} alt='background-photo'/>
    </div>
  )
}

export default page;