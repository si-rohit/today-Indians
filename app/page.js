'use client'
import Header from '@/components/Header'
import { TopHeader } from '@/components/Header/TopHeader'
import HeroSection from '@/components/HeroSection'
import NewsPage from '@/components/NewsPage'
import React, { useEffect } from 'react'
import logo from "@/public/images/logo.png"
import Image from 'next/image'
import Link from 'next/link'
import { FaSearch } from 'react-icons/fa'
import Search from '@/components/Search'
import { HeaderProfileSection } from '@/components/Profile/HeaderProfileSection'
import { useRouter } from 'next/navigation'
import Page from '@/app/home/page'

const page = () => {
  const PageComponent = () => {
    const router = useRouter();
    useEffect(() => {
      router.push('/home');
    }, [router]);
    return null;
  };
  return (
    // <div className='overflow-hidden'>
    //   {/* <TopHeader /> */}
    //   <div className='flex flex-col items-end justify-end my-2'>
    //     <HeaderProfileSection/>
    //   </div>
    //   <div className="min-h-[82vh] max-[426px]:min-h-[86vh] flex flex-col items-center relative top-13 max-[426px]:pt-24">
    //   {/* Logo */}
    //   <Image src={logo} alt="Logo" width={500} height={100} className='my-6 max-[426px]:w-60 '></Image>

    //   {/* Search Bar */}
    //   <div className=''>
    //     <Search />
        
    //   </div>
      
    //   {/* Buttons */}
    //   <div className="mt-8 space-x-4">
    //     <button className="bg-[#e0e0e0] text-sm text-black px-4 py-2 rounded hover:border hover:border-gray-500">
    //        Search
    //     </button>
    //     <Link href={'/home'} className="bg-[#e0e0e0] text-sm text-black px-4 py-2.5 rounded hover:border hover:border-gray-500">
    //       Go to Home
    //     </Link >
    //   </div>
    //   </div>
    //   {/* footer */}
    //   {/* <div className='sticky bottom-0 max-[426px]:flex-col flex items-center justify-between py-4 bg-black px-8 max-[426px]:px-2'>
    //     <ul className='flex justify-center space-x-4 max-[426px]:border-b border-white max-[426px]:mb-2 max-[426px]:w-full max-[426px]:pb-2 '>
    //       <li className='text-white text-sm cursor-pointer'>Advertising</li>
    //       <li className='text-white text-sm cursor-pointer'>Business</li>
    //       <li className='text-white text-sm cursor-pointer'>Article</li>
    //     </ul>
    //     <ul className='flex justify-center space-x-4 max-[426px]:w-full border-white'>
    //       <li className='text-white text-sm cursor-pointer'>About</li>
    //       <li className='text-white text-sm cursor-pointer'>Contact</li>
    //       <li className='text-white text-sm cursor-pointer'>Privacy Policy</li>
    //       <li className='text-white text-sm cursor-pointer'>Terms and Conditions</li>
    //     </ul>
    //   </div> */}
    // </div>
    <Page />
  )
}

export default page
