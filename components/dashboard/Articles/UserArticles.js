'use client'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react'
import { MdPublic,MdDeleteOutline  } from "react-icons/md";
import { RiGitRepositoryPrivateFill } from "react-icons/ri";
import { FiEdit3 } from "react-icons/fi";
import { IoAnalyticsSharp } from "react-icons/io5";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaRegComment } from "react-icons/fa6";
import BlockAlert from '../Messages/BlockAlert';
import DeleteAlert from './DeleteAlert';
import AnalyticsAlert from './AnalyticsAlert';
import { useSelector } from 'react-redux';
import noImage from '@/public/images/noImage.jpeg'

const UserArticles = () => {
  const [showMenu, setShowMenu] = useState('1');
  const [showAnalyticsAlert, setShowAnalyticsAlert] = useState('');
  const [showDeleteAlert, setShowDeleteAlert] = useState('');
  const [showComments, setShowComments] = useState('');
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

    // console.log(userCreatedArticles);

  
  const router = useRouter()
  const handleUpdateArticle = (post_id) => {
    router.push(`/dashboard/articles/form?id=${post_id}`)
  }


  const handleCloseDeleteAlert = () => {
    setShowDeleteAlert('');
  }
  const handleCloseAnalyticsAlert = () => {
    setShowAnalyticsAlert('');
  }

  const menuRef = useRef(null);
  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu('');
    }
  };
  useEffect(() => {      
    if ( showMenu) {
      if (showMenu) {
        document.addEventListener('mousedown', handleClickOutside);
      } else {
        document.removeEventListener('mousedown', handleClickOutside);
      }
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };         
    }           
  }, [showMenu]);
  
  return (
    <div className="">
      <table className="min-w-full table-auto text-sm text-left bg-white rounded-md shadow">
        <thead className="bg-gray-300 text-[#222] ">
          <tr>
            <th className="p-3 text-sm">Post</th>
            <th className="p-3 text-sm">Visibility</th>
            <th className="p-3 text-sm">Date</th>
            <th className="p-3 text-sm min-w-[130px]">Updated Date</th>
            <th className="p-3 text-sm">Views</th>
            <th className="p-3">Comments</th>
            <th className="p-3 text-sm">Likes</th>
          </tr>
        </thead>
        <tbody>
          {userCreatedArticles?.map((item, idx) => (
            <tr key={idx} className="border-b border-gray-200 hover:bg-gray-50 group/item cursor-pointer">
              <td className="p-3 flex max-[769px]:flex-col items-center gap-3" onClick={()=>handleUpdateArticle(item.post_id)}>
                <Image
                  src={ item.image?.trimStart() || noImage}
                  alt="thumbnail"
                  width={120}
                  height={70}
                  className=" object-cover"
                />
                <div className='relative' ref={menuRef}>
                  <p className="font-semibold max-[769px]:hidden text-gray-800 ">{item.title}</p>
                  <p className="hidden text-gray-800 max-[769px]:flex">{item.title.split(' ').slice(0, 4).join(' ')}...</p>
                  <p className="text-xs text-gray-500 max-[769px]:hidden group-hover/item:hidden">{item.sub_descr}</p>
                  <div className='group-hover/item:flex mt-2 gap-4 text-xl hidden'>
                    <FiEdit3 className='hover:text-gray-600'/>
                    <FaRegComment onClick={(e)=>{e.stopPropagation(),setShowComments(item.post_id)}} className='hover:text-gray-600'/>
                    <MdDeleteOutline onClick={(e)=>{e.stopPropagation(),setShowDeleteAlert(item.post_id)}} className='hover:text-gray-600'/>
                    <IoAnalyticsSharp onClick={(e)=>{e.stopPropagation(),setShowAnalyticsAlert(item.post_id)}} className='hover:text-gray-600'/>
                    <BsThreeDotsVertical onClick={(e)=>{e.stopPropagation(),setShowMenu(item.post_id)}} className='hover:text-gray-600'/>
                  </div>
                  {showMenu === item.post_id && <div>
                    <div className="absolute top-13 right-40 bg-gray-100 flex flex-col z-30">
                      <div className="text-black cursor-pointer px-2 py-1 hover:bg-white text-lg" >Share</div>
                      <div className="text-black cursor-pointer px-2 py-1 hover:bg-white text-lg">Download</div>
                    </div>
                  </div>}
                  {showAnalyticsAlert === item.post_id && <AnalyticsAlert close={handleCloseAnalyticsAlert} />}
                  {showDeleteAlert === item.post_id && <DeleteAlert close={handleCloseDeleteAlert} poid={item.post_id} uid={user.user_id} title='Delete Post' message='Are you sure you want to delete this post?' />}                 
                </div>
              </td>
              <td className="p-3">{item.visibility === 'Private' ? <p className='flex items-center gap-2'><RiGitRepositoryPrivateFill /> Private</p> : <p className='flex items-center gap-2'><MdPublic /> Public</p>}</td>
              <td className="p-3 min-w-[120px]">{new Date(item.date_added).toDateString()}</td>
              <td className="p-3">{new Date(item.date_modified).toDateString()}</td>             
              <td className="p-3">{item.views}</td>
              <td className="p-3">{item.total_comments}</td>
              <td className="p-3 ">{item.total_likes} </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default UserArticles

