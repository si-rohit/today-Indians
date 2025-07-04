'use client'
import HeroSection from '@/components/HeroSection'
import NewsPage from '@/components/NewsPage'
import SubHeader from '@/components/Header/SubHeader'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import noImage from '@/public/images/noImage.jpeg'
import MobileRespFooter from '@/components/MobileComponents/MobileRespFooter'
import MobileRespHeader from '@/components/MobileComponents/MobileRespHeader'
import Footer from '@/components/Footer'
import NewsAccToCategory from '@/components/HeroPageComponents/NewsAccToCategory'
import LatestNews from '@/components/HeroPageComponents/LatestNews'
import SuggestedContentSection from '@/components/HeroPageComponents/SuggestedContentSection'
import NewsAccToType from '@/components/HeroPageComponents/NewsAccToType'

const Page = () => {
   const [latestNews, setLatestNews] = useState([]);
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
  
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch('https://5341.general.pointer.8080-server.net/posts?sort=x_date&channel=42', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': '1',
          },
        });
        const data = await response.json();
        // console.log(data);
        setLatestNews(data.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    useEffect(() => {
      fetchData();
    }, []);
  return (
    <div className={`overflow-hidden ${isDarkMode ? 'bg-[#12110f] text-white' : ''}`}>
      {/* <TopHeader /> */}
      {/* <Header /> */}

      {/* <SubHeader /> */}
      <div className='max-[426px]:hidden'>
          <SubHeader />
      </div>
      {/* <MobileRespHeader /> */}
      <div className='hidden max-[426px]:block'>
        <MobileRespHeader />
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
      <div className={`${isDarkMode ? 'bg-[#333]' : '  bg-amber-100'}`}>
      <div className='grid grid-cols-6 gap-5 px-4 py-2 max-w-[90rem] mx-auto max-[426px]:hidden'>
        {loading
          ? Array(6).fill(0).map((_, index) => (
              <div key={index} className='flex gap-2 bg-gray-50 p-1 min-w-[200px] animate-pulse'>
                <div className='h-12 w-20 bg-gray-300 rounded' />
                <div className='flex flex-col justify-center gap-2 w-full'>
                  <div className='h-3 w-4/5 bg-gray-300 rounded' />
                  <div className='h-3 w-3/5 bg-gray-300 rounded' />
                </div>
              </div>
            ))
          : latestNews.slice(0, 6).map((news, index) => (
              <div key={index} className={`flex gap-2  p-1 min-w-[200px] ${isDarkMode ? 'bg-[#222]' : 'bg-gray-50'}`}>
                <Image
                  src={news.image || noImage}
                  alt="user"
                  width={300}
                  height={300}
                  className='h-12 w-auto object-cover'
                />
                <p className='text-[12px] leading-3.5'>
                  {news.title.length > 35 ? `${news.title.slice(0, 35)} ...` : news.title}
                </p>
              </div>
            ))}
      </div>
    </div>
        
      <HeroSection />
      <div className='max-[426px]:hidden'>
        <NewsPage /> 
      </div>
      <hr className='container mx-auto w-full h-1 border-0 bg-gray-200'></hr>
      <NewsAccToCategory/>
      <SuggestedContentSection />
      <hr className='container mx-auto w-full h-1 border-0 bg-gray-200'></hr>
      <NewsAccToType />

      {/* <div className='container mx-auto flex '>
        <div className='min-w-[75%]'>         
        </div>     
        <LatestNews />
      </div> */}
      
      
      <div className='sticky bottom-0 hidden max-[426px]:block'>
        <MobileRespFooter />   
      </div>    

      <Footer />     
    </div>
  )
}

export default Page