'use client'
import React, { useEffect, useState } from 'react';
import NewsListItemSection from './HeroPageComponents/NewsListItemSection';
import Image from 'next/image';
import Link from 'next/link';
import noImage from '@/public/images/noImage.jpeg';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import '@/app/style.scss';
import { HiOutlineEye } from 'react-icons/hi';
import { formatDistanceToNow } from 'date-fns';
import cleanDistanceLocale from '@/utils/cleanDistanceLocale';

const MainNews = () => {
  const [mainNews, setMainNews] = useState([]);
  const [loading, setLoading] = useState(false);

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
      setMainNews(data.data);
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
    <div className="w-2/4 max-[426px]:p-2 max-[426px]:w-full">
      <Swiper
        breakpoints={{
          0: { slidesPerView: 1.1 },
          350: { slidesPerView: 1.2 },
          576: { slidesPerView: 1.1 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
          1200: { slidesPerView: 1 },
        }}
        slidesPerView={1.4}
        navigation={true}
        modules={[Navigation]}
        className="mySwiper swiper-navigation-color custom-swiper-button"
      >
        {loading
          ? Array(3).fill(0).map((_, index) => (
              <SwiperSlide
                key={index}
                className="animate-pulse max-[426px]:mr-2 max-[426px]:border max-[426px]:border-gray-100 max-[426px]:min-h-[280px]"
              >
                <div className="w-full h-[350px] max-[426px]:h-[200px] bg-gray-300 rounded" />
                <div className="mt-2 px-2">
                  <div className="h-5 bg-gray-300 rounded w-4/5 mb-2" />
                  <div className="h-5 bg-gray-300 rounded w-3/5 mb-3" />
                  <div className="h-3 bg-gray-300 rounded w-3/8" />
                </div>
              </SwiperSlide>
            ))
          : mainNews.map((item, index) => (
              <SwiperSlide
                key={index}
                className="max-[426px]:mr-2 max-[426px]:border max-[426px]:border-gray-100 max-[426px]:min-h-[280px]"
              >
                <Link href={`/article/${item.permalink}`}>
                  <Image
                    src={item.image ? item.image.trim() : noImage}
                    alt="Main News"
                    className="w-full h-[350px] max-[426px]:h-[200px] my-2 max-[426px]:my-0 object-cover"
                    width={260}
                    height={55}
                    unoptimized
                  />
                </Link>  
                <Link href={`/article/${item.permalink}`}>
                  <h1 className="text-3xl font-bold max-[426px]:px-2 max-[426px]:text-[17px] max-[426px]:font-semibold max-[426px]:leading-6 max-[426px]:mt-1">
                      {item.title.length > 60 ? `${item.title.slice(0, 60)}...` : item.title}
                  </h1>
                </Link>                 
                  <p className="text-gray-500 text-sm mt-0 max-[426px]:px-2 flex gap-2">
                    <Link href={`/${item.user.username}`}>
                      {`${item.user.firstname} ${item.user.lastname}` || item.user.username ||                     
                      `user_${item.user.user_id}`} 
                    </Link>
                     • {' '}
                    {formatDistanceToNow(item.date_added, {addSuffix: true, locale: cleanDistanceLocale})} {item.views? '•':''} {' '}
                    <span className={`flex gap-1 items-center ${item.views ? '' : 'hidden' }`}>
                      <HiOutlineEye /> {item.views}
                    </span>
                  </p>
                
              </SwiperSlide>
            ))}
      </Swiper>

      <div className="max-[426px]:hidden">
        <NewsListItemSection />
      </div>
    </div>
  );
};

export default MainNews;
