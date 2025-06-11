'use client'
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { IoMdTrendingUp } from "react-icons/io";
import { MdAccessTime } from "react-icons/md";
import { IoCloseSharp } from "react-icons/io5";
import { FaSearch } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

const Search = () => {
    const [showSuggestions, setShowSuggestions] = useState(false);
      const [InputData , setInputData] = useState('');
      const [Data , setData] = useState(null);
      const [resentData , setresentData] = useState(null);
      const router = useRouter();
      
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

      const handleClickOutside = () => {
        setShowSuggestions(false);
      }

      const handleOpenSearchInMobile = ()=>{
        router.push('/search');
      }
  return (
    <div className=' flex items-center'>
      <div className="relative flex items-center border max-[1025px]:min-w-[400px] border-gray-300 bg-white min-w-[500px] max-[426px]:min-w-[300px] max-[426px]:w-full" 
      onBlur={() => setTimeout(handleClickOutside, 500)}
      >
        <input type="text" placeholder="What's in your mind today ?" onChange={(e) => setInputData(e.target.value)} value={InputData} onClick={() => setShowSuggestions(true)} className=" text-gray-500 w-full px-4 py-2 outline-black block max-[426px]:hidden" />
        <input type="text" placeholder="What's in your mind today ?" onClick={handleOpenSearchInMobile} className=" text-gray-500 w-full px-4 py-2 outline-none hidden max-[426px]:block"/>
        <FaSearch className="absolute right-4"/>
            {showSuggestions && (
                <div className="absolute top-9 left-0 w-full bg-white border border-gray-300 z-10 text-black">
                  <ul>
                    <li className=" flex flex-col">
                    {Data === '' ? (
                          <p className="px-4 py-2 text-gray-500">No Data Found</p>
                        ) : (
                          <div className="flex flex-col">
                            {resentData && resentData.length > 0 && (
                              <div className="flex flex-col border-b border-gray-200">
                                {resentData.map((item, index) => (
                                  <Link href={`/search/${item.query}`} key={index} className="flex items-center justify-between px-4 py-2 hover:bg-gray-200 cursor-pointer">
                                    <span className="flex items-center gap-3"><MdAccessTime />{item.query}</span>
                                    <IoCloseSharp />
                                  </Link>
                                ))}
                              </div>
                            )}

                            {Array.isArray(Data) && Data.map((item, index) => (
                              <Link href={`search/${item.query}`} key={index} className="flex items-center gap-3 px-4 py-2 hover:bg-gray-200">
                                <IoMdTrendingUp />
                                <span>{highlightKeyword(item.query)}</span>
                              </Link>
                            ))}
                          </div>
                        )}
                    </li>                   
                  </ul>
                </div>
            )}       
      </div>
    </div>
  )
}

export default Search
