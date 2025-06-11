'use client'
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import Image3 from '@/public/images/Thumbnail/hq720(5).jpg'
import noImage from '@/public/images/noImage.jpeg'
import Link from 'next/link';

const MostPopular = () => {
  const [mostPopularNews, setMostPopularNews] = useState([]);
    
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
          setMostPopularNews(data.data);
        } catch (error) {
          console.error('Error fetching data:', error);
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
          {mostPopularNews.map((news, index) => (
            <Link href={`/article/${news?.post_id}`} className="" key={index}>
              <Image
                src={news?.image.trimStart() || noImage}
                alt="Popular News"
                className="w-full "
                width={260} height={55}
              />
              <h3 className="text-[15px] leading-5 font-semibold mt-2">
                {news?.title}
              </h3>
              <p className="text-gray-500 text-sm">{news?.user.username || "Unknown User"} • {new Date(news?.date_modified).toLocaleDateString()} • views {news?.views}</p>
              {/* <p className="mt-2 text-gray-700">
                Uninhibited carnally hired played in whimpered deer gorilla koala depending and
                much...
              </p> */}
            </Link>
          ))}
        </div>
        
        
      </div>
    );
  };

export default MostPopular
