'use client'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'
import { MdPublic,MdDeleteOutline  } from "react-icons/md";
import { RiGitRepositoryPrivateFill } from "react-icons/ri";
import { FiEdit3 } from "react-icons/fi";
import { IoAnalyticsSharp } from "react-icons/io5";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaRegComment } from "react-icons/fa6";

const Highlights = () => {
   const articles = [
      {
        image: '/images/Thumbnail/hq720(1).jpg',
        title: 'Those who have created peace, are the world better?',
        discription: 'Ash jaguar ostrich quail one excited dear hello and bound[1] and the and bland moral misheard roadrunner flapped lynx...',
        visibility: 'Private',
        hashtags: '#News #Today News #World News #TTI #Today Indians',
        updated_date: 'Mar 24, 2025',
        date: 'Feb 16, 2025',
        views: 34,
        comments: 0,
        likes: 6,
      },
      {
        image: '/images/Thumbnail/hq720(2).jpg',
        title: 'This Concept Jet Could Get You From New York To London In Under 11 Minutes',
        discription: 'Ash jaguar ostrich quail one excited dear hello and bound[1] and the and bland moral misheard roadrunner flapped lynx...',
        visibility: 'Public',
        hashtags: '#News #Today News #World News #TTI #Today Indians',
        updated_date: 'Jul 24, 2024',
        date: 'Jan 14, 2024',
        views: 16,
        comments: 0,
        likes: 1,
      },
      {
        image: '/images/Thumbnail/hq720(3).jpg',
        title: 'Bradley Cooper’s “Twin” Causes Madness At Sundance Film Festival Opening',
        discription: 'Ash jaguar ostrich quail one excited dear hello and bound[1] and the and bland moral misheard roadrunner flapped lynx...',
        visibility: 'Public',
        hashtags: '#News #Today News #World News #TTI #Today Indians',
        updated_date: 'Aug 24, 2024',
        date: 'Dec 24, 2023',
        views: 6,
        comments: 0,
        likes: 1,
      },
    ]
    const router = useRouter()
    const handleCreateArticle = () => {
      router.push('/dashboard/articles/form')
    }
  return (
   <div className="overflow-x-auto">
          <table className="min-w-full table-auto text-sm text-left bg-white rounded-md shadow">
           <thead className="bg-[#1c1c1c] text-white ">
             <tr>
               <th className="p-3 text-sm"></th>
               <th className="p-3 text-sm">Visibility</th>
               <th className="p-3 text-sm">Date</th>
               <th className="p-3 text-sm">Updated Date</th>
               <th className="p-3 text-sm">Views</th>
               <th className="p-3">Comments</th>
               <th className="p-3 text-sm">Likes</th>
             </tr>
           </thead>
           <tbody>
             {articles.map((item, idx) => (
               <tr key={idx} className="border-b border-gray-200 hover:bg-gray-50 group/item cursor-pointer">
                 <td className="p-3 flex max-[769px]:flex-col items-center gap-3" onClick={handleCreateArticle}>
                   <Image
                     src={item.image}
                     alt="thumbnail"
                     width={120}
                     height={70}
                     className=" object-cover"
                   />
                   <div>
                     <p className="font-semibold max-[769px]:hidden text-gray-800 ">{item.title}</p>
                     <p className="hidden text-gray-800 max-[769px]:flex">{item.title.split(' ').slice(0, 4).join(' ')}...</p>
                     <p className="text-xs text-gray-500 max-[769px]:hidden ">{item.discription}</p>
                     {/* <div className='group-hover/item:flex mt-2 gap-4 text-xl hidden'>
                       <FiEdit3 className='hover:text-gray-600'/>
                       <FaRegComment className='hover:text-gray-600'/>
                       <MdDeleteOutline  className='hover:text-gray-600'/>
                       <IoAnalyticsSharp className='hover:text-gray-600'/>
                       <BsThreeDotsVertical className='hover:text-gray-600'/>
                     </div> */}
                     
                   </div>
                 </td>
                 <td className="p-3">{item.visibility === 'Private' ? <p className='flex items-center gap-2'><RiGitRepositoryPrivateFill /> Private</p> : <p className='flex items-center gap-2'><MdPublic /> Public</p>}</td>
                 <td className="p-3">{item.date}</td>
                 <td className="p-3">{item.updated_date}</td>             
                 <td className="p-3">{item.views}</td>
                 <td className="p-3">{item.comments}</td>
                 <td className="p-3 ">{item.likes} </td>
               </tr>
             ))}
           </tbody>
         </table>
       </div>
  );
};

export default Highlights;
