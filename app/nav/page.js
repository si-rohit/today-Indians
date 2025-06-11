'use client'
import Link from 'next/link';
import React from 'react'
import { FaAngleRight } from 'react-icons/fa';
import { RxCross2 } from "react-icons/rx";
import { IoArrowBack } from "react-icons/io5";
import { FaSearch } from 'react-icons/fa';

const page = () => {
    const HetaderItem = ({label }) => (
        <Link href={`/${label.toLowerCase()}`} className={`py-3 border-b text-gray-800  border-gray-100 hover:font-semibold text-lg tracking-widest w-full flex items-center gap- justify-between`}>
            {label}
            <FaAngleRight className='text-gray-400'/>
        </Link>
      );
  return (
    <div>
        <div className={`relative w-full min-h-full bg-white z-50 ease-in-out duration-300 `}>
            <div className=' w-full flex items-center bg-gray-100 text-2xl gap-4 px-4 py-3'>
                <IoArrowBack onClick={() => window.history.back()}/>
                <h1>Categories</h1>
            </div>
        
            <nav className="flex flex-col justify-start items-start px-4">
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
        </div>
    </div>
  )
}

export default page