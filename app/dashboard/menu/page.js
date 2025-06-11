'use client'
import Link from 'next/link'
import React from 'react'
import {
  CircleFadingPlus ,
  LayoutDashboard,
  Video,
  Users,
  Files ,
  Copyright,
  DollarSign,
  User ,
  Settings,
  MessageCircle,
  // Search ,
  MessageSquareWarning ,
  HardDriveDownload ,
  Wallet ,
  Handshake ,
  ReceiptText ,
  ChartNoAxesCombined,
  CircleDollarSign 
} from "lucide-react";
import { PiArticleNyTimesDuotone, } from "react-icons/pi";
import { IoMdAdd } from "react-icons/io";
import { AiOutlineHighlight,AiOutlineFundProjectionScreen  } from "react-icons/ai";
import { GoSponsorTiers } from "react-icons/go";
import { FaCaretRight } from "react-icons/fa6";
import { BsShop } from "react-icons/bs";
import { IoLibraryOutline } from "react-icons/io5";
import { MdOutlinePublic } from "react-icons/md";
import { IoCreateOutline } from "react-icons/io5";
import { useState } from 'react';

const Page = () => {

  const SidebarItem = ({ icon: Icon, label }) => (
    <Link href={label === 'dashboard' ? `/dashboard` : `/dashboard/${label}`}>
        <div className={`relative flex items-center  space-x-3 px-4 py-2 bg-white hover:text-black cursor-pointer`}>
            <Icon className="w-5 h-5" />
            <span className=''>{label.charAt(0).toUpperCase() + label.slice(1)}</span>
        </div>
    </Link>
    );
  return (
    <div className='hidden max-[426px]:flex pb-7'>
      <div className='w-full relative'>
          <h1 className='text-xl p-3 font-bold border-b border-gray-300'>Settings</h1>
          <ul className='grid grid-cols-2 gap-2 py-2'>
            <SidebarItem icon={PiArticleNyTimesDuotone} label="articles"/>
            <SidebarItem icon={Video} label="videos"/>
            <SidebarItem icon={CircleFadingPlus } label="stories"/>
            <SidebarItem icon={AiOutlineHighlight} label="highlights"/>
            <SidebarItem icon={Files } label="pages"/>
            <SidebarItem icon={Files } label="researcher"/>
            <SidebarItem icon={AiOutlineFundProjectionScreen } label="fundraisers"/>
            <SidebarItem icon={Copyright} label="copyright"/>
            <SidebarItem icon={User } label="advertising"/>
            <SidebarItem icon={MessageSquareWarning } label="feedbacks"/>
            <SidebarItem icon={HardDriveDownload } label="drive"/>
            <SidebarItem icon={Wallet } label="wallet"/>
            <SidebarItem icon={IoLibraryOutline } label="library"/>
            <SidebarItem icon={ReceiptText } label="billing"/>
          </ul>
            <Link href="/help" className='flex items-center space-x-3 px-4 py-2 bg-white hover:text-black cursor-pointer'>
              <Settings className="w-5 h-5" />
              <span className=''>help center</span>
            </Link>
      </div>
    </div>
  )
}

export default Page