'use client'
import React, { useState } from 'react'
import logoWhite from "@/public/images/logoWhite.png"
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import helpCategories from './helpCategories';
import HelpCenterHeader from '@/components/HelpCenterHeader';
import HelpSearch from '@/components/HelpSearch';
import { IoArrowBack } from 'react-icons/io5';
import MobileRespFooter from '@/components/MobileComponents/MobileRespFooter';


const Page = () => {
    const router = useRouter();

    const handleOpenCategory = (category) => {
        router.push(`/help/${category}`);
    }
  return (
    <div className="min-h-screen bg-gray-100 ">

        {/* Mobile header */}
        <div className='hidden max-[426px]:flex w-full bg-gray-100 px-4 py-3 flex-col gap-3'>
          <div className=' w-full flex items-center text-2xl gap-4  '>
            <IoArrowBack onClick={() => window.history.back()}/>
            <h1>Help Center</h1>
                    {/* <Link href={'/setting'} className='ml-auto text-3xl'><IoSettingsOutline /></Link>           */}
          </div>
          <div className='flex  '>
            <HelpSearch />
          </div>
        </div>

        {/* Desktop header */}
        <div className='max-[426px]:hidden w-full'>
          <HelpCenterHeader title={"Help Center"}/>
        </div>      
        <div className="relative max-[426px]:hidden bg-white py-10 w-full text-center mb-10 flex justify-center items-center flex-col">
          <h1 className='text-5xl font-bold'>How can we help you?</h1>
          <h3 className='py-2'>Find information here about your queries</h3>
          <div className='flex  '>
            <HelpSearch />
          </div>
        </div>

        {/* container */}
        <div className="max-w-6xl mx-auto pb-5 max-[426px]:pb-0">
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 max-[426px]:gap-0">
            {helpCategories.map((category, index) => (
              <div
                key={index} onClick={() => {handleOpenCategory(category.title)}}
                className="bg-white cursor-pointer shadow-md p-6 flex items-start space-x-4 hover:shadow-lg transition"
              >
                <div className="w-10 h-10 flex items-center justify-center">{category.icon}</div>
                <div>
                  <h2 className="text-xl font-semibold">{category.title}</h2>
                  <p className="text-sm text-gray-600">{category.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      <div className='sticky bottom-0 hidden max-[426px]:block mt-18'>
        <MobileRespFooter />   
      </div> 
    </div>
  )
}

export default Page