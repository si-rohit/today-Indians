'use client'
import React, { useEffect, useState } from 'react'
import { IoMdTrendingUp } from "react-icons/io";
import { MdAccessTime } from "react-icons/md";
import { IoCloseSharp } from "react-icons/io5";
import { FaSearch,FaArrowLeft  } from 'react-icons/fa';
import Link from 'next/link';
import MobileRespFooter from './MobileRespFooter';

const SearchComp = () => {
        const [InputData , setInputData] = useState('');
        const [Data , setData] = useState(null);
        const [resentData , setresentData] = useState(null);
      
        
        useEffect(() => {
  
          const fetchData = async () => {
            try {
              const response = await fetch(`https://5341.general.pointer.8080-server.net/recent_q?uid=196863&channel=32`, {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': 'Bearer 1',
                },
                
              });
              const data = await response.json();
              // console.log(data);
              setresentData(data[0].recent);
              setData(data[0].trending);
            } catch (error) {
              console.error('Error fetching data:', error);
            }
          };
        
          const fetchSearchData = async () => {
            try {
              const response = await fetch(`https://5341.general.pointer.8080-server.net/q_search?q=${InputData}&status=1&channel=32`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': '1',
                },
                
              });
              const data = await response.json();
              // console.log(data);
              if(data.response === 'error'){
                setData('');
                setresentData('');
              }
              else{
                setData(data);
                setresentData('');
              }
              
            }catch (error) {
              console.error('Error fetching data:', error);
              setData('');
            }
          }
  
          if (InputData === '') {
            fetchData();
          }else{
            fetchSearchData();
          }  
        }, [InputData]);

        
      const highlightKeyword = (text) => {
        if (!InputData) return text;
        const parts = text.split(new RegExp(`(${InputData})`, 'gi'));
      return parts.map((part, index) =>
        part.toLowerCase() === InputData.toLowerCase() ? (
          <span key={index} className="font-bold text-black">{part}</span>
        ) : (
          <span key={index}>{part}</span>
        )
      );
      };
  return (
    <div className=' flex items-center flex-col'>
        <div className="relative flex gap-4 items-center bg-gray-200 px-4 pt-4 pb-2 w-full" 
          > 
            <FaArrowLeft onClick={()=> window.history.back()} className='text-gray-500 text-2xl'/>
            <input type="text" placeholder="What's in your mind today ?" onChange={(e) => setInputData(e.target.value)} value={InputData} className=" text-gray-500 w-full px-4 py-2 outline-black border border-gray-300 bg-white" />
            <FaSearch className="absolute right-9 text-gray-400"/>            
                   
        </div>
        <div className="w-full bg-white  z-10 text-black">
          <ul>
                  <li className=" flex flex-col">
                    {Data === '' ? (
                              <p className="px-4 py-2 text-gray-500">No Data Found</p>
                      ) : (
                      <div className="flex flex-col">
                        {resentData && resentData.length > 0 && (
                          <div className="flex flex-col border-b border-gray-200">
                            <p className="px-4 py-2 text-gray-500">Recent Search</p>
                            {resentData.map((item, index) => (
                              <Link href={`/search/${item.query}`} key={index} className="flex items-center text-xl text-gray-600 justify-between px-4 py-2 hover:bg-gray-200 cursor-pointer">
                                <span className="flex items-center gap-3"><MdAccessTime />{item.query}</span>
                                <IoCloseSharp />
                              </Link>
                            ))}
                          </div>
                        )}   
                        <p className="px-4 py-2 text-gray-500">Trending Search</p>
                        {Array.isArray(Data) && Data.map((item, index) => (
                          <Link href={`search/${item.query}`} key={index} className="flex text-xl text-gray-600 items-center gap-3 px-4 py-2 hover:bg-gray-200">
                            <IoMdTrendingUp />
                            <span>{highlightKeyword(item.query)}</span>
                          </Link>
                        ))}
                      </div>
                      )}
                    </li>                   
                  </ul>
        </div>
       
        <div className='sticky w-full bottom-0 block'>
          <MobileRespFooter />   
        </div> 
    </div>
  )
}

export default SearchComp