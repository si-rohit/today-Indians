'use client'
import HeroSection from '@/components/HeroSection'
import NewsPage from '@/components/NewsPage'
import SubHeader from '@/components/Header/SubHeader'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import noImage from '@/public/images/noImage.jpeg'
import MobileRespFooter from '@/components/MobileComponents/MobileRespFooter'
import MobileRespHeader from '@/components/MobileComponents/MobileRespHeader'

const Page = () => {
   const [latestNews, setLatestNews] = useState([]);
  
    const fetchData = async () => {
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
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    useEffect(() => {
      fetchData();
    }, []);
  return (
    <div className='overflow-hidden'>
      {/* <TopHeader /> */}
      {/* <Header /> */}

      {/* <SubHeader /> */}
      <div className='block max-[426px]:hidden'>
          <SubHeader />
      </div>
      {/* <MobileRespHeader /> */}
      <div className='hidden max-[426px]:block'>
        <MobileRespHeader />
      </div>
      
      <div className='bg-black text-white text-center max-[426px]:text-[16px]'>
        This website is currently in beta phase. Some features may not work as expected.
      </div>
      <div className='bg-amber-100'>
        <div className='grid grid-cols-6 gap-5 px-4 py-2 max-w-[90rem] mx-auto max-[426px]:hidden'>
          {latestNews.slice(0, 6).map((news, index) => (
            <div key={index} className='flex gap-2 bg-gray-50 p-1 min-w-[200px]'>
              <Image src={news.image || noImage} alt="user" width={300} height={300} className='h-12 w-auto'/>
              <p className='text-[12px] leading-3.5'>{news.title.length > 35 ? `${news.title.slice(0, 35)} ...` : news.title}</p>
            </div>
          ))}
        </div>
      </div>
        
      <HeroSection />
      <div className='max-[426px]:hidden'>
        <NewsPage /> 
      </div>
      
      <div className='sticky bottom-0 hidden max-[426px]:block'>
        <MobileRespFooter />   
      </div> 
      
    </div>
  )
}

export default Page