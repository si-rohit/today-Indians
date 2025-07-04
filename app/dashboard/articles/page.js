'use client'
import UserArticles from '@/components/dashboard/Articles/UserArticles'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { PiArticleNyTimes } from "react-icons/pi";
import { IoCreateOutline } from "react-icons/io5";

const Page = () => {
  const router = useRouter()
  const handleCreateArticle = () => {
    router.push('/dashboard/articles/form')
  }

   const [isDarkMode, setIsDarkMode] = useState(true);
      
    useEffect(() => {
      const Theam = localStorage.getItem('theam');
      if (Theam === 'dark') {          
        setIsDarkMode(true);
      }
      else {          
        setIsDarkMode(false);
      }
    }, []);
  return (
    <div className={`px-4 max-[769px]:p-0 ${isDarkMode ? 'text-white' : ''}`}>
      <div className="flex justify-between mb-2 max-[769px]:mb-2">
        <h1 className="text-3xl font-bold ">Articles</h1>
        <button onClick={handleCreateArticle} className="flex gap-2 items-center py-2 cursor-pointer px-4 bg-[#171717] hover:bg-[#353535] text-white font-semibold transition">
          <IoCreateOutline /> <p>Create</p>
        </button>
      </div>
      <UserArticles />
    </div>
  )
}

export default Page
