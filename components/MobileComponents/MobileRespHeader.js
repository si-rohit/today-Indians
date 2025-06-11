'use client'
import React, { useState } from 'react'
import logo from '@/public/images/logo.png'
import Link from 'next/link';
import Image from 'next/image';
import Search from '../Search';
import { GoDotFill } from "react-icons/go";
import { IoMenuSharp } from "react-icons/io5";
import { TbGridDots } from "react-icons/tb";
import { RxCross2 } from "react-icons/rx";
import { FaAngleRight } from "react-icons/fa";
import { FaRegBell } from "react-icons/fa";

const MobileRespHeader = () => {
    const [isOpen, setIsOpen] = useState(false);
      
  return (
    <header className="border-b max-[426px]:pb-2 border-gray-200 px-5">
      {/* Top Section */}
      
      <div className="flex items-center py-1 gap-6 border-t border-gray-200 justify-center " >     
        <Link href="/nav" className=''>
          <IoMenuSharp className='cursor-pointer text-3xl'/>
        </Link>      
        <Link href="/" className=''>
          <Image src={logo} className="w-auto my-2 mx-auto h-11" alt="" width={300}/>
        </Link> 
        <FaRegBell className='cursor-pointer text-3xl'/>                    
      </div>
      <Search />  
      {/* <hr className="border-t border-gray-200 my-2"></hr> */}
      {/* Navigation Section */}
      
            
    </header>
  )
}

export default MobileRespHeader