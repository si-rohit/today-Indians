'use client'
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { FaCaretRight } from "react-icons/fa";

const LatestNews = () => {
  const [latestNews, setLatestNews] = useState([]);
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
      setLatestNews(data.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="w-full">
      <h2 className={`text-[15px] leading-5 font-semibold border-b  pb-2 ${isDarkMode ? 'border-gray-600 ' : 'border-gray-200'}`}>
        Latest News
      </h2>
      <ul className="space-y-2 mt-2">
        {loading
          ? Array(6).fill(0).map((_, index) => (
              <li key={index} className="border-b border-gray-200 pb-2 flex items-center animate-pulse">
                <div className="mr-2 mt-1 text-gray-400">
                  <FaCaretRight />
                </div>
                <div className='w-full flex flex-col gap-2'>
                  <div className="h-4 bg-gray-300 w-full"></div>
                  <div className="h-4 bg-gray-300 w-5/6"></div>
                </div>
                
              </li>
            ))
          : latestNews.map((news, index) => (
              <li key={index} className={`border-b  pb-2 flex ${isDarkMode ? 'border-gray-600 text-gray-200' : 'border-gray-200'}`}>
                <FaCaretRight className="mr-2 mt-1" />
                <Link href={`/article/${news.permalink}`} className={` hover:underline`}>
                  {news.title}
                </Link>
              </li>
            ))}
      </ul>
    </div>
  );
};

export default LatestNews;
