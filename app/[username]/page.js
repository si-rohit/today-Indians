'use client'
import SubHeader from '@/components/Header/SubHeader';
import React, { use, useEffect, useState } from 'react'
import noImage from '@/public/images/noImage.jpeg'
import Image from 'next/image';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import userIcon from '@/public/images/userIcon.png'
import { IoArrowBack } from 'react-icons/io5';
import MobileRespFooter from '@/components/MobileComponents/MobileRespFooter';
import { IoMdSettings } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";
import { useParams } from 'next/navigation';
import { HiOutlineEye } from 'react-icons/hi';
import { formatDistanceToNow } from 'date-fns'
import cleanDistanceLocale from '@/utils/cleanDistanceLocale';

const Page = () => {
    const { username } = useParams();
    const [userData, setUserData] = useState({});
    const [userCreatedArticles, setUserCreatedArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isDarkMode, setIsDarkMode] = useState(true);

    // console.log(username);

    useEffect(() => {
        setLoading(true);
      const fetchUser = async () => {
        try {
          const response = await fetch(`https://5341.general.pointer.8080-server.net/${username}`, {
            method: 'POST',
            headers: {
              'Authorization': '1',
            },
          });         
          const userdata = await response.json();
          console.log(userdata);
          setUserData(userdata[0]);                   
            try {
              const response = await fetch(`https://5341.general.pointer.8080-server.net/posts?uid=${userdata[0]?.user_id}&sort=x_date&channel=42`);
              const data = await response.json();
              console.log(data);
              if (data.response === 'error') {
                setUserCreatedArticles([]);
                setLoading(false);
                return;
              }
              setUserCreatedArticles(data.data);
              setLoading(false);
            } catch (error) {
              console.log(error);
            }
        } catch (error) {
          console.log(error);
        }
      };
      fetchUser();

    }, [username]);

    useEffect(() => {
        const Theam = localStorage.getItem('theam');
        if (Theam === 'dark') {
            setIsDarkMode(true);
        }
        else {
            setIsDarkMode(false);
        }
    }, []);
    
  return (
    <div className={`${isDarkMode ? 'text-white bg-[#12110f]' : 'text-black bg-white'} min-h-screen`}>
      
      <div className='max-[426px]:hidden'>
        <SubHeader />
      </div>

      {/* <MobileRespHeader /> */}
      <div className='hidden max-[426px]:block'>
        <div className=' w-full flex items-center bg-gray-100 text-2xl gap-4 py-3 px-4'>
          <IoArrowBack onClick={() => window.history.back()}/>
          <h1>Profile</h1>
          <Link href={'/setting'} className='ml-auto text-3xl'><IoSettingsOutline /></Link>          
        </div>
      </div>

      {/* Profile Section */}
      {
        loading ? (
          <div className="max-w-6xl mx-auto p-6 relative animate-pulse">

            {/* Profile Header Skeleton */}
            <div className="flex items-center gap-6 mb-5">
              {/* Avatar */}
              <div className="w-24 h-24 rounded-full bg-gray-300 border-4 border-gray-200" />

              {/* User Info */}
              <div className="flex flex-col gap-2">
                <div className="h-6 w-48 bg-gray-300 rounded" />
                <div className="h-4 w-64 bg-gray-200 rounded" />
                <div className="h-3 w-40 bg-gray-100 rounded" />
              </div>
            </div>

            {/* Action Buttons Skeleton */}
            <div className='absolute max-[426px]:hidden max-[426px]:-top-3 top-4 right-4 gap-3 flex'>
              <div className="h-10 w-28 bg-gray-300 rounded" />
              <div className="h-10 w-32 bg-gray-300 rounded" />
            </div>

            {/* Divider */}
            <hr className="border-t border-gray-300 mb-5" />

            {/* Articles Skeleton Grid */}
            <div className="grid md:grid-cols-3 gap-6">
              {Array.from({ length: 6}).map((_, index) => (
                <div key={index} className="bg-white flex flex-col">
                  {/* <div className="w-1/2 h-40 bg-gray-300 "></div> */}
                  <div className="h-40 bg-gray-300 rounded w-full" />
                  <div className="py-2 px-1 flex flex-col gap-2">
                    <div className="h-4 w-5/6 bg-gray-200 rounded" />
                    <div className="h-3 w-1/2 bg-gray-100 rounded" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ):(       
          <div className="max-w-6xl mx-auto p-6 relative mt-25">
            {/* Profile Header */}
            <div className="flex items-center gap-6 mb-5">
              {userData.pass_photo ? 
                <Image
                  src={userData.pass_photo}
                  alt={userData.name}
                  className="w-24 h-24 rounded-full object-cover border-4 border-gray-200"
                /> 
              : <Image src={userData.pass_photo || userIcon} alt='user Profile' className="w-24 h-24 rounded-full bg-gray-300" />}
              
              <div>
                <h1 className="text-3xl font-semibold">{userData.firstname} {userData.lastname}</h1>
                <p className={` ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{userData.user_group || 'User Groups' }</p>
                <p className={` ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{userData.bio || 'bio'}</p>
                <p className={`text-sm text-gray-400 hidden`}>{userData.email} • {new Date(userData.date_added).toLocaleDateString()}</p>
              </div>
            </div>
            <div className={`absolute max-[426px]:hidden max-[426px]:-top-3 top-4 right-4 gap-3 hidden`}>
              <Link href={`dashboard/profile`} className=" bg-[#171717] hover:bg-[#353535] text-white py-2 px-4 rounded">Edit Profile</Link>
              <Link href="dashboard/articles/form" className=" bg-[#171717] hover:bg-[#353535] text-white py-2 px-4 rounded">Create Article</Link>
            </div>
          
            {/* Articles by User */}
            <div>
              {/* <h2 className="text-2xl font-semibold mb-4">Articles by {user.name}</h2> */}
              <hr className={`border-t mb-5 ${isDarkMode ? 'border-gray-600' : 'border-gray-300'}`}></hr>
              <div className="grid md:grid-cols-4  gap-6">
                {userCreatedArticles.length === 0 && (
                  <p className="text-gray-500">No articles found.</p>
                )}
                {userCreatedArticles.map((article, index) => (
                  <div key={index} className=" overflow-hidden">
                    <Link href={`/article/${article.permalink}`}>
                        <Image src={article.image || noImage} alt="News" width={500} height={500} className="w-full h-36" />
                    </Link>
                    <div className="py-2">
                      <Link href={`/article/${article.permalink}`} className="text-lg font-semibold leading-5">{article.title.slice(0, 50)}...</Link>
                      {/* <p className=' text-sm text-gray-500'>{article.subTitle}</p> */}
                      <div className={`text-sm flex items-center gap-1 ${isDarkMode ? 'text-gray-400':'text-gray-500'}`}>
                        <Link href={`/${article.user.username !== '' ? `${article.user.username}` : `${article.user.user_id}`}`}>{`${article.user.firstname} ${article.user.lastname}` || article.user.username || `user- ${article.user.user_id}`}</Link>
                        • {formatDistanceToNow(article.date_added, {addSuffix: true, locale: cleanDistanceLocale})} {article.views ? "•" : ''} {article.views ? <HiOutlineEye /> : ''} {article.views ? `${article.views} ` : ''} 
                      </div>
                      <Link href={`/article/${article.permalink}`} className="text-sm">{article.meta_description.length > 80 ? article.meta_description.slice(0, 80) + '...' : article.meta_description}</Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
      )}
      <div className='sticky bottom-0 hidden max-[426px]:block mt-18'>
        <MobileRespFooter />   
      </div> 
    </div>
  )
}

export default Page