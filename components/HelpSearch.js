'use client'
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { IoMdTrendingUp } from "react-icons/io";
import { MdAccessTime } from "react-icons/md";
import { IoCloseSharp } from "react-icons/io5";
import { FaSearch } from 'react-icons/fa';
import helpCategories from '@/app/help/helpCategories';
import { useRouter } from 'next/navigation';


const HelpSearch = () => {
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [InputData , setInputData] = useState('');
    const router = useRouter();
        
        
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

    const filteredData = helpCategories.filter((item) => item.faqs.some((faq) => faq.question?.toLowerCase().includes(InputData.toLowerCase())));
    // console.log(filteredData);
  return (
    <div className='w-full flex items-center '>
      <div className="relative flex items-center border border-gray-300 bg-white min-w-[500px] max-[426px]:min-w-[300px] max-[426px]:w-full" 
      onBlur={() => setTimeout(() => setShowSuggestions(false), 500)}
      >
        <input type="text" placeholder="Search your issue here" onChange={(e) => setInputData(e.target.value)} value={InputData} onClick={() => setShowSuggestions(true)} className=" text-gray-500 w-full px-4 py-2 outline-black" />
        <FaSearch className="absolute right-4"/>
         {showSuggestions && (
           <div className="absolute top-10 left-0 w-full overflow-y-scroll max-h-64 bg-white border border-gray-300 z-50">
             {filteredData.map((item , index) => (
                   <div key={index} className=''>
                     <div className='flex flex-col'>
                       {item.faqs.map((faq,index) => (
                         <div key={index} onClick={() => router.push(`/help/${item.title}/${faq.question}`)} className="leading-6 hover:bg-gray-100 cursor-pointer px-2 py-1">
                            {highlightKeyword(faq.question)}
                         </div>
                       ))}
                     </div>
                   </div>
             ))}
            </div>
         )}
      </div>
    </div>
  )
}

export default HelpSearch