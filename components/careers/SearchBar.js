'use client'
import React, { useEffect, useState } from 'react'
import { FaSearch } from 'react-icons/fa';
import helpCategories from '@/app/help/helpCategories';
import jobData from './jobData';  
import { useRouter } from 'next/navigation';


const SearchBar = () => {
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

    const filteredData = jobData.filter((item) => item.title.toLowerCase().includes(InputData.toLowerCase()));
    // console.log(filteredData);
    const handleOpenJob = ({job}) => {
      router.push(`/career/${job.title.replace(/\s+/g, '-')}?id=${job.id}`);
    };
  return (
    <div className='w-full flex items-center '>
      <div className="relative flex items-center border border-gray-300 bg-white min-w-[500px] max-[426px]:min-w-[300px] max-[426px]:w-full" 
      onBlur={() => setTimeout(() => setShowSuggestions(false), 500)}
      >
        <input type="text" placeholder="Search your jobs here" onChange={(e) => setInputData(e.target.value)} value={InputData} onClick={() => setShowSuggestions(true)} className=" text-gray-500 w-full px-4 py-2 outline-black" />
        <FaSearch className="absolute right-4"/>
         {showSuggestions && (
           <div className="absolute top-10 left-0 w-full overflow-y-scroll max-h-64 bg-white border border-gray-300 z-50">
             {filteredData.map((item , index) => (
                <div key={index} className=''>
                    <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer w-full flex items-start" onClick={() => handleOpenJob({job:item})}>{highlightKeyword(item.title)}</div>
                </div>
             ))}
            </div>
         )}
      </div>
    </div>
  )
}

export default SearchBar