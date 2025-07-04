'use client'
import Header from '@/components/Header'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import SubHeader from '@/components/Header/SubHeader'
import RightSide from '@/components/HeroPageComponents/RightSide'
import Image4 from '@/public/images/image4.png'
import userIcon from '@/public/images/User_icon_2.svg.png'
import { useParams } from 'next/navigation'
import noImage from '@/public/images/noImage.jpeg'


const Page = () => {
  const { qurey } = useParams();
  const [newsList, setNewsList] = useState([]);
  // console.log(qurey);

  
  useEffect(()=>{

    const fetchData = async()=>{
      const res = await fetch(`https://5341.general.pointer.8080-server.net/posts?sort=x_date&search=${qurey}&channel=42`,{
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': '1',
        },
      })
      const data = await res.json();
      // console.log(data);
      if (data.response === 'error') {
        setNewsList([]);
      }else{
        setNewsList(data.data);
      }
    }

    fetchData();
  },[qurey])
  return (
    <div>
      <SubHeader />
      <div className='flex py-6 max-[426px]:flex-col'>
        <div className="max-w-3xl min-w-3xl ml-7 max-[426px]:ml-0 min-h-screen px-6 space-y-6">
        {newsList.length === 0 ? <p className='text-center text-2xl'>No news found</p>:<div>
          {newsList.map((news, index) => (
              <div key={index} className="flex max-[426px]:flex-col-reverse items-start justify-between gap-4 border-b border-gray-200 pb-4">
                <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Image src={news.user.user_image || userIcon} alt={news.user.username} width={18} height={18} className="rounded-sm" />
                      <p className="text-[12px] font-medium">{news.user.username || 'User'}</p>
                    </div>
                    <h2 className="text-black text-lg font-semibold hover:underline cursor-pointer">
                      {news.title}
                    </h2>
                    <p className="text-gray-500 text-sm mt-1">{news.sub_descr}</p>
                    <p className="text-gray-500 text-xs mt-1">{new Date(news.date_added).toDateString()}</p>
                </div>
                <div className="w-53 h-30 relative max-[426px]:w-full max-[426px]:h-50">
                    <Image src={news.image || noImage} alt="Thumbnail" fill className="" />
                </div>
              </div>
          ))}
        </div>}
        </div>
        <RightSide />
        <div className='max-[426px]:hidden'>
          <Image src={Image4} alt="image"></Image>
        </div>
      </div>
      
    </div>
  )
}

export default Page
