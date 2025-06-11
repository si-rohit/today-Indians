import Image from 'next/image'
import React from 'react'
import { RxCross2 } from "react-icons/rx";
import { IoMdDownload } from "react-icons/io";

const OpenImage = ({close,url}) => {
  return (
    <div className='fixed w-full h-full top-0 left-0 bg-[#000000cc] flex items-center justify-center'>
      <div className='absolute top-10 right-10'>
        <div onClick={close} className=' text-black cursor-pointer bg-white p-2 text-xl'><RxCross2 /></div>
        <div className='text-black cursor-pointer bg-white p-2 text-xl' onClick={() => {}}><IoMdDownload /></div>
      </div>
        
        <div className='relative shadow-lg flex w-full overflow-hidden flex-col items-center justify-center p-4'>
            {url ? <Image className='h-90 w-auto ' width={900} height={900} src={url || null} alt="image" /> : ''} 
        </div>
    </div>
  )
}

export default OpenImage