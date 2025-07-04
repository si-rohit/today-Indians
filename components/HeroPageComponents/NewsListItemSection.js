'use client'
import Image from "next/image";
import React, { useEffect, useState } from "react";
import noImage from '@/public/images/noImage.jpeg'
import { HiOutlineEye } from "react-icons/hi";
import { formatDistanceToNow } from "date-fns";
import cleanDistanceLocale from "@/utils/cleanDistanceLocale";
import Link from "next/link";

const NewsListItemSection = () => {
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
    <div className="py-5 space-y-4">
      {loading ? (
        Array(6).fill(0).map((_, index) => (
          <div key={index} className="flex gap-6 max-[426px]:gap-2 max-[769px]:flex-col max-[426px]:px-4 animate-pulse">
            <div className="bg-gray-300 w-full h-42 max-[426px]:w-full max-[426px]:h-[200px]" />
            <div className="flex flex-col gap-2 w-3/3">
              <div className="h-5 bg-gray-300 w-full"></div>
              <div className="h-5 bg-gray-300 w-2/3"></div>
              <div className="h-4 bg-gray-300 w-2/5 mt-2"></div>
              <div className="h-3 bg-gray-300 w-4/4 mt-2"></div>
              <div className="h-3 bg-gray-300 w-4/4"></div>
              <div className="h-3 bg-gray-300 w-2/3"></div>
            </div>
          </div>
        ))
      ) : (
        latestNews.slice(0, 6).map((item, index) => (
          <div key={index} className="flex gap-6 max-[426px]:gap-2 max-[769px]:flex-col max-[426px]:px-4">
            <Link href={`/article/${item.permalink}`} className="w-full">
              <Image
                src={item.image?.trimStart() || noImage}
                alt={item.title}
                className="w-full h-42 max-[426px]:h-50"
                width={160}
                height={160}
              />
            </Link>
            <div className="w-3/3 flex flex-col justify-start">
            <Link href={`/article/${item.permalink}`}>
              <h3 className="text-xl font-semibold hover:underline cursor-pointer">
                {item.title.length > 40 ? `${item.title.slice(0, 38)} ...` : item.title}
              </h3>
            </Link>
              <div className={`text-sm space-x-1 flex gap-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                <Link href={`/${item.user.username}`}>{`${item.user.firstname} ${item.user.lastname}` || item.user.username ||                     
                      `user_${item.user.user_id}`}</Link>
                <span> • </span>
                <span>{formatDistanceToNow(item.date_added, {addSuffix: true, locale: cleanDistanceLocale})}</span>
                <span className={`${item.views ? '' : 'hidden'}`}> • </span>
                <span className={`${item.views ? '' : 'hidden'} flex items-center gap-1`}><HiOutlineEye /> {item.views}</span>
              </div>
            <Link href={`/article/${item.permalink}`}>
              <p className={` mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {item.sub_descr.length > 100 ? `${item.sub_descr.slice(0, 97)} ...` : item.sub_descr}
              </p>
            </Link>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default NewsListItemSection;
