'use client'
import React, { useEffect, useState } from 'react'
import NewsListItemSection from './HeroPageComponents/NewsListItemSection';
import Image from 'next/image';
import Image1 from '@/public/images/Thumbnail/hq720(3).jpg'
import Link from 'next/link';
import noImage from '@/public/images/noImage.jpeg'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import '@/app/style.scss'

const MainNews = () => {
  const [mainNews, setMainNews] = useState([]);
    
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
            setMainNews(data.data);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
        useEffect(() => {
          fetchData();
        }, []);
        // console.log(mainNews);
    return (
      <div className="w-2/4 max-[426px]:p-2 max-[426px]:w-full">
        {/* Main News */}
        <Swiper 
        breakpoints={{
						0: {
							slidesPerView: 1.1,
						},
						350: {
							slidesPerView: 1.2,
						},
						576: {
							slidesPerView: 1.1,
						},
						768: {
							slidesPerView: 3,
						},
						1024: {
							slidesPerView: 4,
						},
						1200: {
							slidesPerView: 1,
						},
					}} slidesPerView={1.4} navigation={true} modules={[Navigation]} className="mySwiper swiper-navigation-color custom-swiper-button" >
          {mainNews.map((item, index) => (
            <SwiperSlide key={index} className='max-[426px]:mr-2 max-[426px]:border max-[426px]:border-gray-100 max-[426px]:min-h-[280px]'>
              <Link href={`/article/${item.post_id}`}>
                <Image
                    src={item.image ? item.image.trim() : noImage}
                    alt="Main News"
                    className="w-full h-[350px] max-[426px]:h-[200px] my-2 max-[426px]:my-0 object-cover"
                    width={260}
                    height={55}
                    unoptimized // If you're not using allowed remote domains
                  /> 
                <h1 className="text-3xl font-bold max-[426px]:px-2 max-[426px]:text-[17px] max-[426px]:font-semibold max-[426px]:leading-6 max-[426px]:mt-1">
                  {item.title.length > 60 ? `${item.title.slice(0, 60)}...` : item.title}
                  </h1>
                  <p className="text-gray-500 text-sm mt-0 max-[426px]:px-2">{item.user.username || item.user.firstName ||'User'} • views {item.views}</p>
                  
                  {/* <p className="mt-1 text-gray-700 text-sm max-[426px]:px-2 max-[426px]:pb-2">
                    {item.sub_descr.length > 90 ? `${item.sub_descr.slice(0, 90)}...` : item.sub_descr}
                  </p> */}
              </Link>
            </SwiperSlide>
          ))}
          
        </Swiper>
        {/* {mainNews[0] && (
          <Link key={0} href={`/article/${mainNews[0].post_id}`}>
            <Image
              src={mainNews[0].image.trimStart() || noImage}
              alt="Main News"
              className="w-full  object-cover my-2"
              width={260} height={55}
            />    
            <h1 className="text-3xl font-bold">
            {mainNews[0].title}
            </h1>
            <p className="text-gray-500 text-sm mt-0">{mainNews[0].user.username || 'Unknown'} • {new Date(mainNews[0].date_modified).toLocaleDateString()} • views: {mainNews[0].views}</p>
            
            <p className="mt-1 text-gray-700 text-sm ">
              {mainNews[0].sub_descr}
            </p>
          </Link>
        )} */}
          
        <div className='max-[426px]:hidden'>
          <NewsListItemSection />
        </div>
        
      </div>
    );
  };

export default MainNews
