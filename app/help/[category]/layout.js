'use client'
import React, { useState } from 'react'
import helpCategories from '../helpCategories';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { TopHeader } from '@/components/Header/TopHeader';
import HelpSearch from '@/components/HelpSearch';
import HelpCenterHeader from '@/components/HelpCenterHeader';
import { IoArrowBack } from 'react-icons/io5';

 const Layout = ({ children }) => {
    const router = useRouter();
    const params = useParams();
    const { category } = params;
    const decodeUrlText = (text) => {
        return text
            .replace(/%20/g, ' ')
            .replace(/%21/g, '!')
            .replace(/%22/g, '"')
            .replace(/%23/g, '#')
            .replace(/%24/g, '$')
            .replace(/%25/g, '%')
            .replace(/%26/g, '&')
            .replace(/%27/g, "'")
            .replace(/%28/g, '(')
            .replace(/%29/g, ')')
            .replace(/%2A/g, '*')
            .replace(/%2B/g, '+')
            .replace(/%2C/g, ',')
            .replace(/%2D/g, '-')
            .replace(/%2E/g, '.')
            .replace(/%2F/g, '/')
            .replace(/%3A/g, ':')
            .replace(/%3B/g, ';')
            .replace(/%3C/g, '<')
            .replace(/%3D/g, '=')
            .replace(/%3E/g, '>')
            .replace(/%3F/g, '?')
            .replace(/%40/g, '@')
            .replace(/%5B/g, '[')
            .replace(/%5C/g, '\\')
            .replace(/%5D/g, ']')
            .replace(/%5E/g, '^')
            .replace(/%5F/g, '_')
            .replace(/%60/g, '`')
            .replace(/%7B/g, '{')
            .replace(/%7C/g, '|')
            .replace(/%7D/g, '}')
            .replace(/%7E/g, '~');
    }
    const categoryText = decodeUrlText(category);
    const [selectedCategory, setSelectedCategory] = useState(helpCategories.find((cat) => cat.title === categoryText) || helpCategories[0]);

    const handleOpenCategory = (cat) => {
      console.log(cat);
        router.push(`/help/${cat}`);
    };
  return (
    <div>
      <div className='max-[426px]:hidden '>
        <HelpCenterHeader />
      </div>
      <div className='hidden max-[426px]:flex w-full bg-gray-100 px-4 py-3 flex-col gap-3'>
          <div className=' w-full flex items-center text-2xl gap-4  '>
            <IoArrowBack onClick={() => window.history.back()}/>
            <h1>Help Center</h1>
                          {/* <Link href={'/setting'} className='ml-auto text-3xl'><IoSettingsOutline /></Link>           */}
          </div>
          <div className='flex  '>
            <HelpSearch />
          </div>
      </div>
      
      <div className="flex w-full max-[426px]:flex-col">
        {/* Sidebar */}
        <div className="w-1/4 max-[426px]:hidden overflow-auto text-white bg-[#18181d] p-4 shadow-md">
          {helpCategories.map((cat, index) => (
            <div
              key={index}
              onClick={() => handleOpenCategory(cat.title)}
              className={`cursor-pointer px-4 py-3 max-[426px]:px-2 max-[426px]:py-1 mb-2 transition-all flex items-center gap-2 ${
                selectedCategory.title === cat.title
                  ? "bg-gray-200 text-black font-semibold"
                  : "hover:bg-gray-200 hover:text-black"
              }`}
            >
              <p className='text-xl max-[426px]:text-sm'>
                  {cat.icon}
              </p>         
              <p>
                {cat.title}
              </p>
            </div>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="flex flex-col justify-between p-5 w-full h-[90vh]">
          
          <ul className="w-full flex flex-col justify-center">
            <div className='absolute max-[426px]:hidden top-1 left-0 w-full flex flex-col justify-center items-center'>
              <div>
                <HelpSearch /> 
              </div>                                
            </div>         
          {children}
          </ul>

          <div className="w-full mt-auto p-2 flex items-center justify-between bg-gray-100">
            <span className="text-gray-600 pl-2">Your issue not listed?</span>
            <button className="bg-black text-white px-4 py-2 hover:bg-gray-800">
              Contact Us
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Layout
