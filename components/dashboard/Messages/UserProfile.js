'use client'
import Image from 'next/image';
import React from 'react'
import { FaRegUser,FaChevronLeft ,FaCheckCircle,FaChevronDown   } from "react-icons/fa";
import { Bell,Images ,BookUser,HeartPlus,ThumbsDown ,Heart,Phone,Mail ,Globe,Link2    } from 'lucide-react';
import { MdBlock } from "react-icons/md";
import Link from 'next/link';
import { HiOutlineDotsVertical } from "react-icons/hi";
import TempImage from '@/public/images/Thumbnail/hq720.jpg'
import BlockAlert from './BlockAlert';
import OpenImage from './OpenImage';

const UserProfile = ({selectedUser , close}) => {
    const [openAlert, setOpenAlert] = React.useState({
        title: "",
        message: "",
    });
    const [openImage, setOpenImage] = React.useState('');
    const [openMute, setOpenMute] = React.useState(false);
    const [UserMuteed, setUserMuteed] = React.useState(false);

    const handleAlertClose = () => {
        setOpenAlert({
            title: "",
            message: "",
        });
    };

    const handleImageClose = () => {
        setOpenImage('');
    };


  return (
    <div>      
        <div className='w-full flex justify-between gap-4'>
            <div className='max-w-[400px] min-w-[400px] flex flex-col gap-2'>
                <div className='flex items-center gap-3 border-b border-gray-300 p-2 '>
                    <FaChevronLeft onClick={close} className='cursor-pointer'/>
                    <h4 className='text-lg'>Profile</h4>
                    {/* <FaChevronLeft /> */}
                </div>
                <div className='flex flex-col items-center gap-3'>
                    {selectedUser.avatar ? <Image className='h-20 w-20 cursor-pointer' width={100} height={100} src={selectedUser.avatar || null} onClick={() => setOpenImage(selectedUser.avatar)} alt="" /> : <FaRegUser className='h-20 w-20 ' />}
                    <div className='flex flex-col'>
                        <h4 className='text-lg font-semibold flex items-center gap-2'>{selectedUser.name}  {selectedUser.verified && <FaCheckCircle className='text-blue-500' />}</h4>
                        <p className='text-sm text-gray-500'>{selectedUser.username || `@${selectedUser.name}`}</p>
                    </div>
                </div>
                <div className='bg-gray-100 p-3'>
                    <p className='text-sm text-gray-700'>{selectedUser.description || 'Hey there! I am using Today Indians'}</p>
                </div>
                <div className='bg-gray-100 p-3'>
                    <a href='tel:+91 123456789' className='text-sm text-gray-700 flex items-center gap-2'><Phone className='w-4.5'/>{selectedUser.Phone || '+91 123456789'}</a>
                </div>
                <div className='bg-gray-100 p-3'>
                    <a href={`mailto:${selectedUser.Mail || 'IjI6r@example.com'}`} className='text-sm text-gray-700 flex items-center gap-2'><Mail  className='w-4.5'/>{selectedUser.Mail || 'IjI6r@example.com'}</a>
                </div>
                <div className='bg-gray-100 p-3'>
                    <a href={`https://${selectedUser.Website || 'www.Example.com'}`} className='text-sm text-gray-700 flex items-center gap-2'><Globe  className='w-4.5'/>{selectedUser.Phone || 'www.Example.com'}</a>
                </div>
                <div className='bg-gray-100 p-3 flex flex-col '>
                    <Link href={''} className='text-sm text-gray-700 flex items-center gap-2'> <Link2  className='w-4.5' />Links</Link>
                    <ul className='pl-6.5'>
                        <a href='https://www.Example.com' className='text-sm text-gray-700 flex items-center gap-2'>https://www.Example.com</a>
                        <a href='https://www.Example2.com' className='text-sm text-gray-700 flex items-center gap-2'>https://www.Example2.com</a>
                        <a href='https://www.Example3.com' className='text-sm text-gray-700 flex items-center gap-2'>https://www.Example3.com</a>
                    </ul>
                </div>
                <div className='bg-gray-100 p-3 flex flex-col gap-2 relative'>
                    <Link href={'/'} className='text-sm text-gray-700 flex items-center gap-2'> Mute Notifications</Link>
                    <button onClick={() => setOpenMute(!openMute)} className='text-sm text-gray-700 flex items-center gap-2 cursor-pointer'> <Bell className='w-4.5' />{UserMuteed ? 'Unmute' : 'Mute'} <FaChevronDown /></button>
                    {openMute && (
                        <div className='absolute top-16 left-3 bg-white shadow-lg flex flex-col'>
                            <p onClick={() => setUserMuteed(!UserMuteed)} className='text-sm text-gray-700 flex items-center gap-2 cursor-pointer hover:bg-gray-200 py-1 px-2'>For 8 hours</p>
                            <p onClick={() => setUserMuteed(!UserMuteed)} className='text-sm text-gray-700 flex items-center gap-2 cursor-pointer hover:bg-gray-200 py-1 px-2'>For 1 week</p>
                            <p onClick={() => setUserMuteed(!UserMuteed)} className='text-sm text-gray-700 flex items-center gap-2 cursor-pointer hover:bg-gray-200 py-1 px-2'>Always</p>
                        </div>
                    )}
                </div>
                <div className='bg-gray-100 p-3 flex flex-col gap-2'>
                    <p className='text-sm text-gray-700 flex items-center gap-2'> <Heart  className='w-4.5' /> Add to Favorites</p>
                    <p className='text-sm text-gray-700 flex items-center gap-2'> <BookUser  className='w-4.5' /> Add to list</p>
                    <p onClick={()=>{setOpenAlert({title:`Block ${selectedUser.name} ?`,message:`This person won't be able to message or call you. They won't know you blocked or reported them`})}} className='text-sm text-red-500 flex items-center gap-2 cursor-pointer'> <MdBlock   className='text-xl' /> Block {selectedUser.name}</p>
                    <p onClick={()=>{setOpenAlert({title:`Report to Today Indians ?`,message:`The last 5 messages in this chat will be sent to Today Indians. This person won't know you reported them`})}} className='text-sm text-red-500 flex items-center gap-2 cursor-pointer'> <ThumbsDown  className='w-4.5'  /> Report {selectedUser.name} </p>
                </div>           
            </div>
            <div className='bg-gray-100 w-full max-h-full min-h-full overflow-y-scroll p-2'>
                <h1 className='text-lg border-b border-gray-300'>Media</h1>
                <div className='grid grid-cols-4 gap-2 mt-2'>
                    <Image className='w-auto h-20 object-cover' onClick={() => setOpenImage(TempImage)}  width={600} height={600} src={TempImage || null} alt="" />
                    <Image className='w-auto h-20 object-cover' onClick={() => setOpenImage(TempImage)}  width={600} height={600} src={TempImage || null} alt="" />
                    <Image className='w-auto h-20 object-cover' onClick={() => setOpenImage(selectedUser.avatar)}  width={600} height={600} src={selectedUser.avatar || null} alt="" />
                    <Image className='w-auto h-20 object-cover' onClick={() => setOpenImage(TempImage)}  width={600} height={600} src={TempImage || null} alt="" />
                    <Image className='w-auto h-20 object-cover' onClick={() => setOpenImage(TempImage)}  width={600} height={600} src={TempImage || null} alt="" />
                    <Image className='w-auto h-20 object-cover' onClick={() => setOpenImage(TempImage)}  width={600} height={600} src={TempImage || null} alt="" />
                    <Image className='w-auto h-20 object-cover' onClick={() => setOpenImage(TempImage)}  width={600} height={600} src={TempImage || null} alt="" />
                    <Image className='w-auto h-20 object-cover' onClick={() => setOpenImage(TempImage)}  width={600} height={600} src={TempImage || null} alt="" />
                    <Image className='w-auto h-20 object-cover' onClick={() => setOpenImage(TempImage)}  width={600} height={600} src={TempImage || null} alt="" />
                    <Image className='w-auto h-20 object-cover' onClick={() => setOpenImage(selectedUser.avatar)}  width={600} height={600} src={selectedUser.avatar || null} alt="" />
                    <Image className='w-auto h-20 object-cover' onClick={() => setOpenImage(TempImage)}  width={600} height={600} src={TempImage || null} alt="" />
                    <Image className='w-auto h-20 object-cover' onClick={() => setOpenImage(TempImage)}  width={600} height={600} src={TempImage || null} alt="" />
                    <Image className='w-auto h-20 object-cover' onClick={() => setOpenImage(TempImage)}  width={600} height={600} src={TempImage || null} alt="" />

                </div>
            </div>
        </div>
        {
            openAlert.title !== '' && <BlockAlert close={handleAlertClose} title={openAlert.title} message={openAlert.message} />
        }
        {
            openImage !== '' && <OpenImage close={handleImageClose} url={openImage} />
        }
    </div>
  )
}

export default UserProfile