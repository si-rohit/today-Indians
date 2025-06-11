'use client'
import Image from 'next/image';
import React, { useState, useEffect, useRef } from 'react';
import userIcon from '@/public/images/User_icon_2.svg.png';
import { CiUser, CiSettings, CiWallet } from "react-icons/ci";
import { LuLayoutDashboard } from "react-icons/lu";
import { PiSignOut, PiArticleMediumThin,PiSignIn  } from "react-icons/pi";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '@/app/redux/authSlice';
import userIcon2 from '@/public/images/userIcon.png'
import { RxCross2 } from "react-icons/rx";

export const HeaderProfileSection = () => {
    const [showUserMenu, setShowUserMenu] = useState(false);
    const router = useRouter();
    const menuRef = useRef(null);

    const { user } = useSelector(store => store.auth)
    const { userFolders } = useSelector(store => store.auth)
    // console.log(userFolders);

    const dispatch = useDispatch();

    const handleClickOutside = (event) => {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
            setShowUserMenu(false);
        }
    };

    const handleLogout = () => {
        console.log('logout');
        dispatch(setUser(null));
        router.push('/auth');
    }

    useEffect(() => {
        if (showUserMenu) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showUserMenu]);

    const username2 = `${user?.firstname} ${user?.lastname}` || "Username";

    return (
        <div className="relative" ref={menuRef} >
            {user ? (         
            <div               
                className="relative flex items-center cursor-pointer"  
                onClick={() => setShowUserMenu(!showUserMenu)}
            >
                <Image 
                    src={user?.image || userIcon2} 
                    className="bg-gray-200 min-w-8 max-w-8 h-8 rounded-full p-1" 
                    height={82} 
                    width={82} 
                    alt="User" 
                />

                {showUserMenu && (
                    <div className="absolute left-1/2 transform -translate-x-1/2 z-50 top-12 bg-gray-100 border border-gray-200 w-full text-black min-w-48 ">
                        <div className='bg-[#fdac42] absolute -top-2 rotate-45 left-1/2 transform -translate-x-1/2 w-5 h-5 max-[426px]:hidden'></div>
                        <ul className="flex flex-col">
                            <li className="flex items-center gap-1 text-sm px-2 py-2 relative border-b bg-[#fdac42] border-gray-200">
                                <Image src={user?.image || userIcon2} className="bg-gray-200 rounded-full p-1" height={42} width={42} alt="User" />
                                <p className="text-[14px] font-semibold flex flex-col">
                                    {username2}
                                    <span className="text-xs text-gray-700">{user?.username ? user?.username : user?.user_id} </span>
                                </p>    
                                <span className='text-[20px] cursor-pointer absolute right-4' onClick={() => setShowUserMenu(false)}><RxCross2 /></span>                           
                            </li>
                            <li>
                                <Link href="/dashboard" className="flex items-center gap-1 text-sm px-2 py-2 hover:bg-gray-200 border-b border-gray-200">
                                    <LuLayoutDashboard className="text-lg" /> Dashboard
                                </Link>
                            </li>
                            <li>
                                <Link href="/profile" className="flex items-center gap-1 text-sm px-2 py-2 hover:bg-gray-200 border-b border-gray-200">
                                    <CiUser className="text-lg" /> Profile
                                </Link>
                            </li>
                            <li>
                                <Link href="/article" className="flex items-center gap-1 text-sm px-2 py-2 hover:bg-gray-200 border-b border-gray-200">
                                    <PiArticleMediumThin className="text-lg" /> Articles
                                </Link>
                            </li>
                            <li >
                                <Link href="/dashboard/wallet" className="flex items-center gap-1 text-sm px-2 py-2 hover:bg-gray-200 border-b border-gray-200 cursor-pointer">
                                    <CiWallet className="text-lg" /> Wallet
                                </Link>
                            </li>
                            <li>
                                <Link href="/dashboard/settings" className="flex items-center gap-1 text-sm px-2 py-2 hover:bg-gray-200 border-b border-gray-200 cursor-pointer">
                                    <CiSettings className="text-lg" /> Settings
                                </Link>
                            </li>
                            {
                                user === null ?(
                                  <Link href="/auth" className="flex items-center gap-1 text-sm px-2 py-2 hover:bg-gray-200 text-red-600 cursor-pointer">
                                    <PiSignIn className="text-lg text-black" /> Login
                                </Link>  
                                ): (
                                    <li className="flex items-center gap-1 text-sm px-2 py-2 hover:bg-gray-200 text-red-600 cursor-pointer" onClick={()=>handleLogout()}>
                                        <PiSignOut  className="text-lg text-black" /> Signout
                                    </li>
                                )
                            }                       
                        </ul>
                    </div>
                )}
            </div> ):(             
                <Link href="/auth" className="flex items-center gap-1 min-w-[65px] text-center text-sm border border-gray-300 px-2 py-1 cursor-pointer">
                    Sign In
                </Link>
            )}
        </div>
    );
}
