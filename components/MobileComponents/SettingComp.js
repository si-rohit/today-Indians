'use client'
import React, { useState } from 'react'
import MobileRespFooter from './MobileRespFooter'
import { useDispatch, useSelector } from 'react-redux';
import Image from 'next/image';
import Link from 'next/link';
import userIcon from '@/public/images/userIcon.png'
import { PiArticleNyTimes } from "react-icons/pi";
import { MdLogout } from "react-icons/md";
import { GrShieldSecurity } from "react-icons/gr";
import { LuHardDriveDownload } from "react-icons/lu";
import { IoMdSettings } from "react-icons/io";
import { MdDashboard ,MdMobileOff } from "react-icons/md";
import { FaBoxOpen, FaHeart, FaRedo, FaMapMarkerAlt,FaAngleRight , FaUser, FaBell, FaCreditCard, FaClipboardList, FaFileInvoice, FaPhoneAlt, FaQuestionCircle } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import { setUser } from '@/app/redux/authSlice';
import { IoArrowBack } from 'react-icons/io5';

const SettingComp = () => {
     const { user } = useSelector(store => store.auth);
     const router = useRouter();
     const dispatch = useDispatch();
     const [isOpenAlert, setIsOpenAlert] = useState(false);

     const MenuButton = ({ icon, label }) => (
        <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-center bg-white shadow-sm">
            <div className="text-gray-700 text-[20px] mb-1">{icon}</div>
            <span className="text-lg font-medium">{label}</span>
        </button>
        );

    const MenuItem = ({ icon, label, subLabel,icon2,action }) => (
        <div className="flex items-center gap-3 p-4" onClick={action}>
            <div className="text-gray-700 text-xl">{icon}</div>
            <div className="flex-1">
                <div className="font-medium text-lg">{label}</div>
                {subLabel && <div className="text-xs text-gray-500">{subLabel}</div>}
            </div>
            {icon2 && <div className="text-gray-700 text-xl">{icon2}</div>}
        </div>
    );

    const SectionTitle = ({ title }) => (
        <div className="text-xl font-semibold text-gray-600 uppercase tracking-wide">{title}</div>
    );

    const HandleLogout = () => {
        // console.log('logout');
        dispatch(setUser(null))
        router.push('/auth')
    }
  return (
    <div>
        <div className=' w-full flex items-center bg-gray-100 text-2xl gap-4 py-3 px-4'>
            <IoArrowBack onClick={() => window.history.back()}/>
            <h1>Settings</h1>
        </div>
        <div className='flex flex-col px-4 py-2'>            
           
            <MenuItem icon={<MdDashboard  />} label="Dashboard" subLabel={'View your dashboard'} action={() => setIsOpenAlert(true)}/>          

            {/* <div className="grid grid-cols-2 gap-4 my-4">
                <MenuButton icon={<MdDashboard  />} label="Dashboard" />
                <MenuButton icon={<FaHeart />} label="Save" />
                <MenuButton icon={<LuHardDriveDownload  />} label="Drive" />
                <MenuButton icon={<IoMdSettings  />} label="Settings" />
            </div>

            <hr className='border-t-2 border-gray-300 mb-4'></hr> */}

            {/* Account Settings */}
            <SectionTitle title="Account Settings" />
            <div className="bg-white">
                <Link href="/profile/edit"><MenuItem icon={<FaUser />} icon2={<FaAngleRight />} label="Edit Profile" subLabel="Edit your profile" /></Link>
                <MenuItem icon={<FaBell />} icon2={<FaAngleRight />} label="Notifications & Alerts" action={() => setIsOpenAlert(true)}/>
                <MenuItem icon={<FaCreditCard />} icon2={<FaAngleRight />} label="Payment Methods" action={() => setIsOpenAlert(true)}/>
                {/* <MenuItem icon={<FaClipboardList />} icon2={<FaAngleRight />} label="Track Orders" action={() => setIsOpenAlert(true)}/> */}
                {/* <MenuItem icon={<FaFileInvoice />} icon2={<FaAngleRight />} label="Your Invoices" action={() => setIsOpenAlert(true)}/> */}
            </div>

            <hr className='border-t-2 border-gray-300 mb-4'></hr>

            {/* Help and Support */}
            <SectionTitle title="Help and Support" />
            <div className="bg-white">
                <Link href="/contact"><MenuItem icon={<FaPhoneAlt />} label="Contact us" subLabel="Chat and Call Customers" /></Link>
                <Link href="/help"><MenuItem icon={<FaQuestionCircle />} label="FAQs" subLabel={'Answers of common questions'} /></Link>
                <Link href="#"><MenuItem icon={<FaFileInvoice />} label="Terms & Conditions" subLabel={'View our terms and conditions'} action={() => setIsOpenAlert(true)} /></Link>             
                <Link href="/help/Privacy & Security"><MenuItem icon={<GrShieldSecurity  />} label="Privacy Policy" subLabel={'View our privacy policy'} /></Link>                
                <MenuItem icon={<MdLogout />} label="Logout" subLabel={'Log out of your account'} action={HandleLogout} />
            </div>
        </div>
         
        <div className='sticky bottom-0 hidden max-[426px]:block mt-18'>
            <MobileRespFooter />   
        </div> 

        {/* Mobile Alert */}
        <div className={`fixed bottom-0 flex-col justify-end w-full z-40 h-screen bg-[#000000bb] ${isOpenAlert ? 'translate-y-0' : 'translate-y-full'} transition-transform duration-300 ease-in-out`} onClick={() => setIsOpenAlert(false)}>
            <div className={`bg-gray-100 fixed bottom-0 w-full text-gray-800 p-8 flex flex-col gap-5 justify-center items-center h-78 ${isOpenAlert ? 'translate-y-0' : 'translate-y-full'} transition-transform duration-300 ease-in-out`}>
                <button onClick={() => setIsOpenAlert(false)} className='absolute top-6 right-6 rotate-45 text-5xl'>+</button>
                <MdMobileOff className='text-6xl'/>
                <p className='text-center text-2xl'>
                This feature is not available on mobile devices please use a desktop device 
                </p>
            </div>
            
        </div>
    </div>
  )
}

export default SettingComp