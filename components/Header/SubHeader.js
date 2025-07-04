'use client'
import React, { useEffect, useState } from 'react';
import logo from '@/public/images/The-Today-Indians-Logo-Pack/Main-Black@4x.png';
import logoWhite from '@/public/images/The-Today-Indians-Logo-Pack/Main-White@4x.png';
import Link from 'next/link';
import Image from 'next/image';
import Search from '../Search';
import image2 from '@/public/images/image2.png';
import { HeaderProfileSection } from '../Profile/HeaderProfileSection';
import { TbGridDots } from "react-icons/tb";
import { FaRegBell, FaSun, FaRegMoon } from "react-icons/fa";
import { GoDotFill } from "react-icons/go";

// ✅ FIXED: Moved outside component to avoid hook order issues
const HetaderItem = ({ label, isDarkMode }) => (
  <Link
    href={`/${label.toLowerCase()}`}
    className={`py-1 hover:font-semibold max-[426px]:text-[12px] ${isDarkMode ? 'text-gray-300' : 'text-black'}`}
  >
    {label}
  </Link>
);

const SubHeader = () => {
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [topics, setTopics] = useState([]);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const response = await fetch('https://5341.general.pointer.8080-server.net/topic?channel=42', {
          method: 'GET',
          headers: { 'Authorization': '1' }
        });
        const data = await response.json();
        setTopics(data.data);
      } catch (error) {
        console.error('Error fetching topics:', error);
      }
    };
    fetchTopics();
  }, []);

  useEffect(() => {
    const Theam = localStorage.getItem('theam');
    setIsDarkMode(Theam === 'dark');
  }, []);

  const changeTheam = (theam) => {
    localStorage.setItem('theam', theam);
    window.location.reload(); // Simple reload works here
  };

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
      const handleScroll = () => {
        const currentScrollY = window.scrollY;
    
        if (currentScrollY > lastScrollY) {
            // Scrolling down
          setIsNavbarVisible(false);
        } else {
            // Scrolling up
          setIsNavbarVisible(true);
        }   
          setLastScrollY(currentScrollY);
      };
    
      window.addEventListener("scroll", handleScroll);
    
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
  }, [lastScrollY]);

  if (loading) {
    return (
      <header className="border-b border-gray-200 animate-pulse">
        <div className="container mx-auto flex items-center py-2 gap-4 max-[426px]:px-2">
          <div className="h-10 w-52 bg-gray-200 " />
          <div className="flex-1 h-10 bg-gray-200 " />
          <div className="h-8 w-8 bg-gray-200 " />
          <div className="h-8 w-8 bg-gray-200 rounded-full" />
          <div className="h-8 w-8 bg-gray-200 rounded-full" />
          <div className="h-10 w-52 bg-gray-200 " />
        </div>

        <div className="container mx-auto flex justify-between items-center py-2 max-[426px]:px-3">
          <div className="flex flex-wrap gap-4">
            {Array.from({ length: 15 }).map((_, i) => (
              <div key={i} className="h-4 w-14 bg-gray-200 " />
            ))}
          </div>
          <div className="h-4 w-12 bg-gray-200 " />
        </div>
      </header>
    );
  }

  return (
    <header className={`border-b fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ${isDarkMode ? 'bg-[#12110f]' : 'bg-white'} ${isDarkMode ? 'border-gray-600' : 'border-gray-200 '} ${isNavbarVisible ? "translate-y-0" : "-translate-y-[117%]"}`}>
      {/* Top Section */}
      <div className="container mx-auto flex items-center py-1 gap-4 max-[426px]:px-2">
        <Link href="/" className="min-h-10 min-w-70 max-[1025px]:min-w-40">
          <Image src={isDarkMode ? logoWhite : logo} className="w-full h-full" alt="logo" width={300} />
        </Link>
        <Search />
        <div className="relative flex text-2xl items-center max-[426px]:text-xl gap-4">
          <TbGridDots onClick={() => setIsOpen(!isOpen)} className="cursor-pointer" />
          <FaRegBell />
          {isOpen && (
            <div className="absolute top-10 left-[calc(50%-200px)] transform -translate-x-1/2 bg-gray-100 min-w-[206px] flex flex-wrap gap-3 shadow-lg p-4 z-50">
              <div className="bg-gray-100 absolute -top-2 rotate-45 left-1/2 transform -translate-x-1/2 w-5 h-5"></div>
              {Array.from({ length: 10 }).map((_, i) => (
                <div key={i} className="bg-red-600 min-w-[50px] min-h-[50px]" />
              ))}
            </div>
          )}
        </div>
        <HeaderProfileSection />
        <Image
          src={image2}
          alt="user"
          className="h-10 w-80 max-[1025px]:w-60 max-[769px]:h-8 relative max-[426px]:-left-3 max-[426px]:hidden"
        />
      </div>

      <hr className={`border-t ${isDarkMode ? 'border-gray-600' : 'border-gray-200 '}`} />

      {/* Navigation Section */}
      <div className="container mx-auto flex items-center justify-between max-[426px]:px-3">
        <nav className="flex justify-start my-2 items-center gap-4 max-[426px]:gap-2 max-[426px]:my-1 max-[426px]:max-w-[350px] flex-wrap">
          {topics.map((label) => (
            <HetaderItem key={label.id} label={label.name} isDarkMode={isDarkMode} />
          ))}
        </nav>

        <div className='flex items-center gap-2'>
          <button
            onClick={() => changeTheam(isDarkMode ? 'light' : 'dark')}
            className="bg-[#444] w-9 h-5 rounded-full cursor-pointer flex items-center transition-colors duration-300"
          >
            <div
              className={`bg-white text-black w-5 h-5 flex items-center justify-center rounded-full shadow-md transform transition-transform duration-300 ${
                isDarkMode ? 'translate-x-3.5' : 'translate-x-0'
              }`}
            >
              {isDarkMode ? <FaSun /> : <FaRegMoon />}
            </div>
          </button>
          <span className="text-red-600 font-semibold flex items-center max-[426px]:text-[12px]">
            <GoDotFill className="text-lg max-[426px]:text-[10px]" />LIVE
          </span>
        </div>
      </div>
    </header>
  );
};

export default SubHeader;
