'use client'
import React, { useState } from 'react'
import logo from '@/public/images/logo.png'
import Link from 'next/link';
import Image from 'next/image';
import Search from '../Search';
import image2 from '@/public/images/image2.png'
import { HeaderProfileSection } from '../Profile/HeaderProfileSection';
import { Grip,Bell ,Dot } from 'lucide-react';
import { GoDotFill } from "react-icons/go";
import { TbGridDots } from "react-icons/tb";
import { FaRegBell,FaSearch  } from "react-icons/fa";

const SubHeader = () => {
  const [isOpen, setIsOpen] = useState(false);
  const HetaderItem = ({label }) => (
    <Link href={`/${label.toLowerCase()}`} className={`py-1 hover:font-semibold max-[426px]:text-[12px]`}>
      {label}
    </Link>
    );
  return (
    <header className="border-b border-gray-200 ">
      {/* Top Section */}
      
      <div className="container mx-auto flex items-center py-1 gap-4  max-[426px]:px-2" >     
        <Link href="/" className='min-h-10 min-w-70 max-[1025px]:min-w-40'>
          <Image src={logo} className="w-full h-full" alt="" width={300}/>
        </Link>  
        <div>
          </div>      
        <Search />  
        <div className='relative flex text-2xl items-center max-[426px]:text-xl gap-4'>
          <TbGridDots onClick={() => setIsOpen(!isOpen)} className='cursor-pointer'/>
          <FaRegBell /> 
          {isOpen && (
            <div className="absolute top-10 left-[calc(50% - 200px)] transform -translate-x-1/2 bg-gray-100 min-w-[206px] flex flex-wrap gap-3 shadow-lg p-4 z-50">
              <div className='bg-gray-100 absolute -top-2 rotate-45 left-1/2 transform -translate-x-1/2 w-5 h-5'></div>
              <div className='bg-red-600 min-w-[50px] min-h-[50px]'></div>
              <div className='bg-red-600 min-w-[50px] min-h-[50px]'></div>
              <div className='bg-red-600 min-w-[50px] min-h-[50px]'></div>
              <div className='bg-red-600 min-w-[50px] min-h-[50px]'></div>
              <div className='bg-red-600 min-w-[50px] min-h-[50px]'></div>
              <div className='bg-red-600 min-w-[50px] min-h-[50px]'></div>
              <div className='bg-red-600 min-w-[50px] min-h-[50px]'></div>
              <div className='bg-red-600 min-w-[50px] min-h-[50px]'></div>
              <div className='bg-red-600 min-w-[50px] min-h-[50px]'></div>
            </div>
          )}
        </div>             
        <HeaderProfileSection/>
        <Image src={image2} alt="user"  className='h-10 w-80 max-[1025px]:w-60 max-[769px]:h-8 relative max-[426px]:-left-3 max-[426px]:hidden'/>           
           
      </div>
      <hr className="border-t border-gray-200 "></hr>
      {/* Navigation Section */}
      <div className='container mx-auto flex items-center justify-between max-[426px]:px-3'>
        <nav className="flex justify-start my-2 items-center gap-4 max-[426px]:gap-2 max-[426px]:my-1 max-[426px]:max-w-[350px]">
          <HetaderItem label="Home" />
          <HetaderItem label="Article" />
          <HetaderItem label="Latest" />
          <HetaderItem label="World" />
          <HetaderItem label="Politics" />
          <HetaderItem label="Business" />
          <HetaderItem label="Tech" />
          <HetaderItem label="Jobs" />
          <HetaderItem label="Opinion" />
          <HetaderItem label="Science" />
          <HetaderItem label="Health" />
          <HetaderItem label="Style" />
          <HetaderItem label="Travel" />
          <HetaderItem label="Food" />
          <HetaderItem label="Contact" />
          <HetaderItem label="Help" />       
        </nav>
        <span className='text-red-600 font-semibold flex items-center max-[426px]:text-[12px]'> <GoDotFill className='text-lg max-[426px]:text-[10px]'/>LIVE</span>
      </div>
      
      
    </header>
  )
}

export default SubHeader
