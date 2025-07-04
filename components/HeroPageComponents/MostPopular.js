'use client'
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import Image3 from '@/public/images/Thumbnail/hq720(5).jpg'
import noImage from '@/public/images/noImage.jpeg'
import Link from 'next/link';
import { HiOutlineEye } from "react-icons/hi";
import { formatDistanceToNow } from 'date-fns';
import cleanDistanceLocale from '@/utils/cleanDistanceLocale';

const MostPopular = () => {
  const [mostPopularNews, setMostPopularNews] = useState([]);
  const [loading, setLoading] = useState(false);
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
          setMostPopularNews(data.data);
        } catch (error) {
          console.error('Error fetching data:', error);
        } finally {
          setLoading(false);
        }
      };

      useEffect(() => {
        fetchData();
      }, []);
      // console.log(mostPopularNews);

      
    return (
      <div >
        <h2 className="text-[15px] leading-5 font-semibold border-b border-gray-200 pb-2">Most Popular</h2>
        <div className='grid grid-cols-1 gap-4'>
          {loading ? (
            Array(4).fill(0).map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="w-full h-[150px] bg-gray-200 rounded-md"></div>
                <div className="h-4 bg-gray-200 rounded mt-2 w-3/4"></div>
                <div className="h-3 bg-gray-200 rounded mt-1 w-1/2"></div>
              </div>
            ))
          ) : (
            mostPopularNews.map((news, index) => (
              <div key={index}>
                <Link href={`/article/${news?.permalink}`} className="" >
                  <Image
                    src={news?.image.trimStart() || noImage}
                    alt="Popular News"
                    className="w-full"
                    width={260} height={55}
                  />
                </Link>
                <Link href={`/article/${news?.permalink}`} className="text-[15px] leading-5 font-semibold mt-2">
                  {news?.title}
                </Link>
                <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500 '} text-sm flex items-center gap-1`}>
                  <Link href={`/${news?.user.username}`} className="text-sm flex items-center gap-1">
                    { `${news?.user.firstname} ${news?.user.lastname}` || news?.user.username || `user_${news?.user.user_id}`} 
                  </Link>
                  
                  • {formatDistanceToNow(news.date_added, {addSuffix: true, locale: cleanDistanceLocale})} {news.views ? ` • ` : ''} {news.views ? <HiOutlineEye /> : ''} {news.views ? `${news.views} ` : ''} 
                </p>
              
              </div>
            ))
          )}
        </div>       
      </div>
    );
  };

export default MostPopular
