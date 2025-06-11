'use client'
import SubHeader from '@/components/Header/SubHeader';
import React, { use, useEffect, useState } from 'react'
import Image1 from '@/public/images/Thumbnail/hq720(1).jpg'
import Image2 from '@/public/images/Thumbnail/hq720(2).jpg'
import Image3 from '@/public/images/Thumbnail/hq720(3).jpg'
import Image4 from '@/public/images/Thumbnail/hq720(4).jpg'
import Image5 from '@/public/images/Thumbnail/hq720.jpg'
import Image6 from '@/public/images/Thumbnail/hq720(5).jpg'
import noImage from '@/public/images/noImage.jpeg'
import Image from 'next/image';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import userIcon from '@/public/images/userIcon.png'
import MobileRespHeader from '../MobileComponents/MobileRespHeader';
import { IoArrowBack } from 'react-icons/io5';
import MobileRespFooter from '../MobileComponents/MobileRespFooter';
import { IoMdSettings } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";

const ProfilePageComp = () => {
  // const user = {
  //   name: 'Ashish Chaudhary',
  //   bio: 'Journalist | Storyteller | Truth Seeker',
  //   email: 'ashish123@gmail.com',
  //   joined: 'Joined July 2019',
  //   profileImage: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D',
  // };
     const { user } = useSelector(store => store.auth);
     const [userCreatedArticles, setUserCreatedArticles] = useState([]);
     
    
    useEffect(() => {
      const fetchcreatedArticles = async () => {
        try {
          const response = await fetch(`https://5341.general.pointer.8080-server.net/posts?uid=${user.user_id}&sort=x_date&channel=42`);
          const data = await response.json();
          // console.log(data);
          setUserCreatedArticles(data.data);
        } catch (error) {
          console.log(error);
        }
      };

      fetchcreatedArticles();
    }, [user.user_id]);

     
  return (
    <div>
      {/* <MobileRespHeader /> */}
      <div className='max-[426px]:hidden'>
        <SubHeader />
      </div>
      <div className='hidden max-[426px]:block'>
        <div className=' w-full flex items-center bg-gray-100 text-2xl gap-4 py-3 px-4'>
          <IoArrowBack onClick={() => window.history.back()}/>
          <h1>Profile</h1>
          <Link href={'/setting'} className='ml-auto text-3xl'><IoSettingsOutline /></Link>          
        </div>
      </div>

      {/* Profile Section */}
      <div className="max-w-6xl mx-auto p-6 relative">
        {/* Profile Header */}
        <div className="flex items-center gap-6 mb-5">
          {user.pass_photo ? 
            <Image
              src={user.pass_photo}
              alt={user.name}
              className="w-24 h-24 rounded-full object-cover border-4 border-gray-200"
            /> 
          : <Image src={user.pass_photo || userIcon} alt='user Profile' className="w-24 h-24 rounded-full bg-gray-300" />}
          
          <div>
            <h1 className="text-3xl font-semibold">{user.firstname} {user.lastname}</h1>
            <p className="text-gray-600">{user.bio || 'Journalist | Storyteller | Truth Seeker'}</p>
            <p className="text-sm text-gray-400">{user.email} • {new Date(user.date_added).toLocaleDateString()}</p>
          </div>
        </div>
        <div className='absolute max-[426px]:hidden max-[426px]:-top-3 top-4 right-4 gap-3 flex'>
          <Link href={`dashboard/profile`} className=" bg-[#171717] hover:bg-[#353535] text-white py-2 px-4 rounded">Edit Profile</Link>
          <Link href="dashboard/articles/form" className=" bg-[#171717] hover:bg-[#353535] text-white py-2 px-4 rounded">Create Article</Link>
        </div>
      
        {/* Articles by User */}
        <div>
          {/* <h2 className="text-2xl font-semibold mb-4">Articles by {user.name}</h2> */}
          <hr className="border-t border-gray-300 mb-5"></hr>
          <div className="grid md:grid-cols-3  gap-6">
            {userCreatedArticles.map((article, index) => (
              <div key={index} className="bg-white overflow-hidden">
                <Image src={article.image || noImage} alt="News" width={500} height={500} className="w-full object-cover" />
                <div className="py-2">
                  <h3 className="text-lg font-semibold">{article.title.split(' ').slice(0, 8).join(' ')}</h3>
                  {/* <p className=' text-sm text-gray-500'>{article.subTitle}</p> */}
                  <p className="text-sm text-gray-500">
                    {new Date(article.date_added).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className='sticky bottom-0 hidden max-[426px]:block mt-18'>
        <MobileRespFooter />   
      </div> 
    </div>
  )
}

export default ProfilePageComp
