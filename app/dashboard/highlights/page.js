'use client'
import Highlights from '@/components/dashboard/Highlights'
import { useRouter } from 'next/navigation'
import React from 'react'
import { PiArticleNyTimes } from "react-icons/pi";
import { IoCreateOutline } from "react-icons/io5";
import UserArticles from '@/components/dashboard/Articles/UserArticles';

const Page = () => {
   const router = useRouter()
    const handleCreateArticle = () => {
      router.push('/dashboard/articles/form')
    }
  return (
    <div className="px-4 max-[769px]:p-0">
          <div className="flex justify-between mb-2 max-[769px]:mb-2">
            <h1 className="text-3xl font-bold ">Highlights</h1>
            
          </div>
      {/* <Highlights /> */}
      <UserArticles />
    </div>
  )
}

export default Page