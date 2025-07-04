'use client'
import UserArticles from '@/components/dashboard/Articles/UserArticles'
import React, { useEffect, useState } from 'react'
import Image1 from '@/public/images/Thumbnail/hq720(1).jpg'
import Image2 from '@/public/images/Thumbnail/hq720(2).jpg'
import Image3 from '@/public/images/Thumbnail/hq720(3).jpg'
import Image4 from '@/public/images/Thumbnail/hq720(4).jpg'
import Image5 from '@/public/images/Thumbnail/hq720.jpg'
import Image6 from '@/public/images/Thumbnail/hq720(5).jpg'
import noImage from '@/public/images/noImage.jpeg'
import Image from 'next/image'
import SubHeader from '@/components/Header/SubHeader'
import Link from 'next/link'
import Header from '@/components/Header'
import MobileRespHeader from '@/components/MobileComponents/MobileRespHeader'
import MobileRespFooter from '@/components/MobileComponents/MobileRespFooter'
import { HiOutlineEye } from 'react-icons/hi'
import cleanDistanceLocale from '@/utils/cleanDistanceLocale'
import { formatDistanceToNow } from 'date-fns'

const Page = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
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

  const AllArticles = async()=>{
    setLoading(true);
    const res = await fetch(`https://5341.general.pointer.8080-server.net/posts?sort=x_date&channel=42`,{
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': '1',
      },
    })
    const data = await res.json();
    // console.log(data);
    setArticles(data.data);
    setLoading(false);
  }
  useEffect(()=>{
    AllArticles();
  },[])

  console.log(articles);
  return (
    <div className={isDarkMode ? 'bg-[#12110f] text-white' : ''}>
      {/* <SubHeader/> */}
      <div className='block max-[426px]:hidden'>
        {/* <Header/> */}
        <SubHeader/>
      </div>
      <div className=" bg-[#f8b841] text-black overflow-hidden flex items-center mt-25">
        <div className='bg-red-500 text-white px-2 font-bold'>
          Breaking
        </div>
        <marquee className="bg-[#f8b841] text-black h-full flex items-center justify-start " onMouseEnter={(e)=>e.target.setAttribute("scrollamount",0)} onMouseLeave={(e)=>e.target.setAttribute("scrollamount",6)}>
          {[...Array(30).keys()].map((i) => (
            <span key={i} className="px-5 hover:underline cursor-pointer ">
              This website is currently in beta phase. Some features may not work as expected.
            </span>
          ))}
        </marquee>
      </div>
      <div className='hidden max-[426px]:block'>
        <MobileRespHeader/>
      </div>
      
       <div className="p-4">
        <div className="container mx-auto grid md:grid-cols-4 gap-6">
          {loading
            ? Array(6).fill(0).map((_, index) => (
                <div key={index} className="animate-pulse">
                  <div className="w-full h-48 bg-gray-300" />
                  <div className="pt-2 space-y-2">
                    <div className="h-4 w-3/4 bg-gray-300" />
                    <div className="h-3 w-full bg-gray-300" />
                    <div className="h-3 w-1/2 bg-gray-300" />
                  </div>
                </div>
              ))
            : articles.map((article, index) => (
              <div key={index} className='overflow-hidden cursor-pointer'>
                <Link href={`/article/${article.permalink}`} className="">
                  <Image
                    src={article.image?.trimStart() || noImage}
                    alt="News"
                    width={300}
                    height={300}
                    className="w-full h-40"
                  />
                </Link>
                  <div className="pt-2">
                    <Link href={`/article/${article.permalink}`} className="text-lg font-semibold leading-5">{article.title.slice(0, 50)}...</Link>
                    <div className={`text-sm flex items-center gap-1 ${isDarkMode ? 'text-gray-400':'text-gray-500'}`}>
                      <Link href={`/${article.user.username !== '' ? `${article.user.username}` : `${article.user.user_id}`}`}>{`${article.user.firstname} ${article.user.lastname}` || article.user.username || `user- ${article.user.user_id}`}</Link>
                     • {formatDistanceToNow(article.date_added, {addSuffix: true, locale: cleanDistanceLocale})} {article.views ? "•" : ''} {article.views ? <HiOutlineEye /> : ''} {article.views ? `${article.views} ` : ''} 
                    </div>
                    <Link href={`/article/${article.permalink}`} className={`text-sm ${isDarkMode ? 'text-gray-400':'text-gray-500'}`}>{article.meta_description.length > 80 ? article.meta_description.slice(0, 80) + '...' : article.meta_description}</Link>                    
                  </div>
              </div> 
              ))}
        </div>
      </div>
      <div className='sticky mt-18 w-full bottom-0 hidden max-[426px]:block'>
          <MobileRespFooter />   
      </div> 
    </div>
  )
}

export default Page