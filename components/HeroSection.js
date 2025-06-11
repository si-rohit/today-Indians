'use client'
import React, { useEffect, useState } from 'react'
import MainNews from './MainNews';
import LeftSide from './HeroPageComponents/LeftSide';
import RightSide from './HeroPageComponents/RightSide';
import NewsPage from './NewsPage';
import noImage from '@/public/images/noImage.jpeg'
import Image from 'next/image';

const HeroSection = () => {
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
      <div className="container mx-auto flex max-[426px]:mt-0 mt-3 max-[426px]:flex-col">
        
        <MainNews />
        {/* news page for mobile */}
        <div className='hidden max-[426px]:block mt-4'>
          <NewsPage />
        </div>
        {/*for mobile  */}
        <div className='bg-amber-100 hidden max-[426px]:block'>
          <div className='flex gap-5 px-4 py-2 max-w-[90rem] mx-auto overflow-x-scroll'>
            {latestNews.slice(0, 6).map((news, index) => (
              <div key={index} className='flex gap-2 bg-gray-50 p-1 min-w-[330px]'>
                <Image src={news.image || noImage} alt="user" width={300} height={300} className='h-25 w-auto'/>
                <p className='text-[12px] leading-3.5'>{news.title.length > 35 ? `${news.title.slice(0, 35)} ...` : news.title}</p>
              </div>
            ))}
          </div>
        </div>
        {/* right side for mobile */}
        <div className='hidden max-[426px]:block'>
          <RightSide />
        </div>
        <LeftSide />
        <div className='block max-[426px]:hidden w-1/4'>
          <RightSide />
        </div>
        
      </div>
    );
  };
  
  export default HeroSection;
