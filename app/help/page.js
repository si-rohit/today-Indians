'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import helpCategories from './helpCategories';
import HelpCenterHeader from '@/components/HelpCenterHeader';
import HelpSearch from '@/components/HelpSearch';
import { IoArrowBack } from 'react-icons/io5';
import MobileRespFooter from '@/components/MobileComponents/MobileRespFooter';


const Page = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    }, []);

    const handleOpenCategory = (category) => {
        router.push(`/help/${category}`);
    }
  return (
      loading ? (
        <div className="min-h-screen bg-gray-100">
          {/* Mobile Header Skeleton */}
          <div className='hidden max-[426px]:flex w-full bg-gray-100 px-4 py-3 flex-col gap-3 animate-pulse'>
            <div className='w-full flex items-center text-2xl gap-4'>
              <div className="w-6 h-6 bg-gray-300 rounded" />
              <div className="h-6 w-32 bg-gray-300 rounded" />
            </div>
            <div className='w-full h-10 bg-gray-200 rounded' />
          </div>

          {/* Desktop Header Skeleton */}
          <div className='max-[426px]:hidden w-full'>
            <div className="w-full bg-white py-10 flex flex-col justify-center items-center animate-pulse">
              <div className="h-8 w-1/2 bg-gray-200 mb-2" />
              <div className="h-5 w-56 bg-gray-100 mb-4" />
              <div className="w-1/2 h-10 bg-gray-200" />
            </div>
          </div>

          {/* Help Categories Skeleton */}
          <div className="max-w-6xl mx-auto mt-10 max-[426px]:pb-0 animate-pulse">
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 max-[426px]:gap-0">
              {Array.from({ length: 9 }).map((_, index) => (
                <div
                  key={index}
                  className="bg-white shadow-md p-6 flex items-start space-x-4"
                >
                  <div className="w-10 h-10 bg-gray-300 rounded-full" />
                  <div className="flex flex-col gap-2">
                    <div className="h-4 w-32 bg-gray-200 rounded" />
                    <div className="h-3 w-48 bg-gray-100 rounded" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile Footer Skeleton */}
          <div className='sticky bottom-0 hidden max-[426px]:block mt-18 animate-pulse'>
            <div className="h-16 w-full bg-gray-200 rounded-t-lg" />
          </div>
        </div>
      ):(
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
  )
}

export default Page