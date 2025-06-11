'use client'
import React from 'react'
import LatestNews from './LatestNews'
import Image from 'next/image'
import image3 from '../../public/images/image3.png'

const LeftSide = () => {
  return (
    <div className="w-1/4 px-4 max-[426px]:w-full">
      <LatestNews />
      <Image src={image3} width={300} height={300} className='w-full h-auto max-[426px]:hidden' alt="Adertisment" />
    </div>
  )
}

export default LeftSide
