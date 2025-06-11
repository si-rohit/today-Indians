'use client'
import Link from 'next/link';
import React from 'react'
import { CiUser} from "react-icons/ci";
import { LuLayoutDashboard } from "react-icons/lu";
import { PiSignOut, PiArticleMediumDuotone ,PiSignIn  } from "react-icons/pi";
import { IoHomeOutline } from "react-icons/io5";
import { MdTravelExplore } from "react-icons/md";
import { FaRegUser,FaRegCompass  } from "react-icons/fa";
import { FaSearch } from 'react-icons/fa';
import { FiMessageCircle } from "react-icons/fi";
import { AiOutlineHome } from "react-icons/ai";
import { IoSearch,IoCompassOutline  } from "react-icons/io5";


const MobileRespFooter = () => {
  return (
    <div className='fixed w-full h-16 flex justify-around items-center text-3xl bottom-0 bg-gray-100 text-gray-800'>
        <Link href={'/home'}><AiOutlineHome /></Link>
        <Link href={'/article'}><IoCompassOutline  /></Link>
        <Link href={'/search'}><IoSearch   /></Link>
        <Link href={'/dashboard/messages'}><FiMessageCircle /></Link>
        <Link href={'/profile'}><FaRegUser  /></Link>
    </div>
  )
}

export default MobileRespFooter