'use client'
import React, { useEffect, useRef, useState } from 'react'
import logoWhite from "@/public/images/The-Today-Indians-Logo-Pack/Main-White@4x.png";
import Image from 'next/image';
import { IoGlobeOutline } from "react-icons/io5";
import { FaCaretDown } from "react-icons/fa";

const HelpCenterHeader = ({title}) => {
    const [selectLanguage, setSelectLanguage] = useState('English');
    const [openLanguageSelection, setOpenLanguageSelection] = useState(false);
    const menuRef = useRef(null);

    const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setOpenLanguageSelection(false);
            }
        };
    
        useEffect(() => {
            if (openLanguageSelection) {
                document.addEventListener('mousedown', handleClickOutside);
            } else {
                document.removeEventListener('mousedown', handleClickOutside);
            }
            return () => {
                document.removeEventListener('mousedown', handleClickOutside);
            };
        }, [openLanguageSelection]);
    
    
  return (
    <div>
        <div ref={menuRef}  className='flex justify-between items-center bg-black text-white py-3 px-10'>
            <div className='flex items-center'>
              <Image src={logoWhite} onClick={() => {window.location.href = '/'}} alt="logo" className='h-7 w-auto cursor-pointer' />
              <div className='text-white border-l border-white pl-2 ml-2 font-semibold relative top-1'>
                {title}
              </div>
            </div>
            <div  className='flex items-center gap-1 cursor-pointer' onClick={() => setOpenLanguageSelection(!openLanguageSelection)}>
                <IoGlobeOutline className='text-xl' />
                <h1 className='text-sm font-bold'>{selectLanguage}</h1>
                <FaCaretDown />
            </div>
            {openLanguageSelection && (
                <div className='absolute top-10 right-10 bg-gray-200 shadow-md text-black flex flex-col z-40'>
                    <div className='px-4 py-2 hover:bg-gray-300 cursor-pointer' onClick={() => setSelectLanguage('English')}>English</div>
                    <div className='px-4 py-2 hover:bg-gray-300 cursor-pointer' onClick={() => setSelectLanguage('Hindi')}>Hindi</div>
                    <div className='px-4 py-2 hover:bg-gray-300 cursor-pointer' onClick={() => setSelectLanguage('Gujarati')}>Gujarati</div>
                </div>
            )}
        </div> 
    </div>
  )
}

export default HelpCenterHeader