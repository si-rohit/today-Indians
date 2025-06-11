'use client'
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { FaCaretRight } from "react-icons/fa";
 
const LatestNews = () => {
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
      <div className="w-full">
        <h2 className="text-[15px] leading-5 font-semibold  border-b border-gray-200 pb-2">Latest News</h2>
        <ul className="space-y-2 mt-2">
          {latestNews.map((news, index) => (
            <li key={index} className="border-b border-gray-200 pb-2 flex">
              <FaCaretRight className=" mr-2 mt-1" />
              <Link href={`/article/${news.post_id}`} className=" hover:text-blue-900">
                {news.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    );
  };

export default LatestNews
