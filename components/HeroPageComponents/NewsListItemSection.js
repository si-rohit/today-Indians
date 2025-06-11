'use client'
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Image1 from '@/public/images/Thumbnail/hq720(1).jpg'
import Image2 from '@/public/images/Thumbnail/hq720(2).jpg'
import Image3 from '@/public/images/Thumbnail/hq720(3).jpg'
import Image4 from '@/public/images/Thumbnail/hq720(4).jpg'
import Image5 from '@/public/images/Thumbnail/hq720.jpg'
import Image6 from '@/public/images/Thumbnail/hq720(5).jpg'
import noImage from '@/public/images/noImage.jpeg'


const NewsListItemSection = () => {
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
    // console.log(latestNews);
  return (
    <div className=" py-5 space-y-4">
      {latestNews.slice(0, 6).map((item, index) => (
        <div key={index} className="flex gap-6 max-[426px]:gap-2 max-[769px]:flex-col max-[426px]:px-4">
          <Image
            src={item.image?.trimStart() || noImage}
            alt={item.title}
            className="w-full h-42 max-[426px]:h-50"
            width={160}
            height={160}
          />
          <div className="w-3/3 flex flex-col justify-start">
            <h3 className="text-xl font-semibold hover:underline cursor-pointer">
              {item.title.length > 40 ? (
                `${item.title.slice(0, 38)} ...`
              ) : (
                item.title
              )}
            </h3>
            <div className="text-sm text-gray-500 space-x-1">
              <span className="">{item.user.username || 'user'}</span>
              <span>•</span>
              <span>{new Date(item.date_added).toLocaleDateString()}</span>
              <span>•</span>
              <span>views: {item.views}</span>
            </div>
            <p className="text-gray-600 mt-1">
              {item.sub_descr.length > 100 ? (
                `${item.sub_descr.slice(0, 97)} ...`
              ) : (
                item.sub_descr
              )}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NewsListItemSection;
