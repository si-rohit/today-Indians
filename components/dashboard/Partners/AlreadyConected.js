import Image from 'next/image'
import React from 'react'
import verified from '@/public/images/Partner.svg'

const AlreadyConected = ({handleCloseVerifyModal,name ,type}) => {
  return (
    <div className='flex flex-col justify-center items-center fixed w-full h-full top-0 left-0 bg-[#000000bb]'>
        <div className='bg-white shadow-lg flex w-full max-w-lg overflow-hidden flex-col items-center justify-center p-4'>
            <Image className="h-60 max-[426px]:h-10 w-auto my-3" width={100} height={100} src={verified} alt="Logo" />
            <h1 className='text-2xl text-center mb-6 text-gray-800'>
               You are already {type} with <span className='font-semibold'>{name}</span> 
            </h1>
            <button onClick={handleCloseVerifyModal} className="bg-black hover:bg-[#222] text-white px-4 py-2 text-sm cursor-pointer w-full">Close</button>
        </div>        
    </div>
  )
}

export default AlreadyConected