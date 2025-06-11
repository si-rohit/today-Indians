'use client'
import React, { useEffect, useState } from 'react'
import noImage from '@/public/images/noImage.jpeg'
import Image from 'next/image'

const Page = () => {
    const [allTopics , setAllTopics] = useState([])

    const fetchAllTopics = async () => {
        const res = await fetch(`https://5341.general.pointer.8080-server.net/topic?channel=42`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': '1',
          },
        })
        const data = await res.json();
        // console.log(data);
        setAllTopics(data.data);
      }  
      useEffect(() => {
        fetchAllTopics();
      }, []);
    
      console.log(allTopics);
  return (
    <div className="px-4 max-[769px]:p-0">
      <div className="flex justify-between mb-2 max-[769px]:mb-2">
        <h1 className="text-3xl font-bold ">Topics</h1>       
      </div>
      <div>
        <table className="min-w-full table-auto text-sm text-left bg-white rounded-md shadow">
        <thead className="bg-gray-300 text-[#222] ">
          <tr>
            <th className="p-3 text-sm">Topic</th>
          </tr>
        </thead>
        <tbody>
          {allTopics?.map((item, idx) => (
            <tr key={idx} className="border-b border-gray-200 hover:bg-gray-50 group/item cursor-pointer">
              <td className="p-3 flex max-[769px]:flex-col items-center gap-3">
                <Image
                  src={item.image || noImage}
                  alt="thumbnail"
                  width={120}
                  height={70}
                  className=" object-cover"
                />
                <div className='relative'>
                  <p className="font-semibold max-[769px]:hidden text-gray-800 ">{item.name}</p>
                  <p className="text-xs text-gray-500 max-[769px]:hidden group-hover/item:hidden">{item.description.split(' ').slice(0, 4).join(' ')}</p>
                  
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  )
}

export default Page