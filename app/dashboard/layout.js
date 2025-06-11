'use client'
// app/dashboard/layout.tsx
import Link from 'next/link';
import Search from '@/components/Search';
import { HeaderProfileSection } from '@/components/Profile/HeaderProfileSection';
import {
    CircleFadingPlus ,
    LayoutDashboard,
    Video,
    Users,
    Files ,
    Copyright,
    DollarSign,
    User ,
    Settings,
    MessageCircle,
    // Search ,
    MessageSquareWarning ,
    HardDriveDownload ,
    Wallet ,
    Handshake ,
    ReceiptText ,
    ChartNoAxesCombined,
    CircleDollarSign ,
    Bell,
    ArrowLeft,
    ArrowRight ,
    RefreshCcw ,
  } from "lucide-react";
import { PiArticleNyTimesDuotone, } from "react-icons/pi";
import { IoMdAdd,IoMdHelpCircleOutline  } from "react-icons/io";
import { AiOutlineHighlight,AiOutlineFundProjectionScreen  } from "react-icons/ai";
import { GoSponsorTiers } from "react-icons/go";
import { FaCaretRight } from "react-icons/fa6";
import { BsShop } from "react-icons/bs";
import { IoLibraryOutline } from "react-icons/io5";
import { MdOutlinePublic } from "react-icons/md";
import { IoCreateOutline } from "react-icons/io5";
import { useEffect, useRef, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';
import logo from "@/public/images/editor_logo.png"
import { VscListFlat } from "react-icons/vsc";
import { FaSearch } from 'react-icons/fa';

export default function DashboardLayout({ children }) {
    const pathname = usePathname();
    const router = useRouter();
    const [activeTab, setActiveTab] = useState('Dashboard');
    // setActiveTab(pathname);
    const [showNotifications, setShowNotifications] = useState(false);
    const [selectedItem, setSelectedItem] = useState(false);
    const [selectedMonetization, setSelectedMonetization] = useState(false);
    const [InputData, setInputData] = useState('');
    const [showSuggestions, setShowSuggestions] = useState(false);
    const menuRef = useRef(null);

    const suggesionData = [
        {icon: LayoutDashboard, label: 'dashboard'},
        // {icon: ChartNoAxesCombined, label: 'analytics'},
        {icon: MessageCircle, label: 'messages'},
        {icon: PiArticleNyTimesDuotone, label: 'articles'},
        {icon: Video, label: 'videos'},
        {icon: CircleFadingPlus, label: 'storys'},
        {icon: AiOutlineHighlight, label: 'highlights'},
        {icon: Files, label: 'pages'},
        {icon: Files, label: 'researcher'},
        {icon: AiOutlineFundProjectionScreen, label: 'fundraisers'},
        {icon: Copyright, label: 'copyright'},
        {icon: User, label: 'advertising'},
        {icon: MessageSquareWarning, label: 'feedbacks'},
        {icon: HardDriveDownload, label: 'drive'},
        {icon: Wallet, label: 'wallet'},
        {icon: IoLibraryOutline, label: 'library'},
        {icon: ReceiptText, label: 'billing'},
        {icon: Handshake, label: 'partners'},
        {icon: GoSponsorTiers, label: 'sponsorships'},
        {icon: BsShop, label: 'shop'},
        {icon:Settings, label:"payout"},
        {icon:Settings, label:"settings"},
       
    ];
    const notificationsData = [
        {
          id: 1,
          title: "New Article Published",
          description: "A new article on AI Trends 2025 has been published.",
          time: "2h ago",
          read: false,
        },
        {
          id: 2,
          title: "Subscription Renewed",
          description: "Your premium subscription was successfully renewed.",
          time: "1d ago",
          read: true,
        },
        {
          id: 3,
          title: "New Comment on Your Post",
          description: "Someone commented on your recent article.",
          time: "3d ago",
          read: false,
        },
        {
          id: 4,
          title: "Security Alert",
          description: "We noticed a new login to your account.",
          time: "5d ago",
          read: true,
        },
      ];

    const SidebarItem = ({ icon: Icon, label }) => (
    <Link href={label === 'dashboard' ? `/dashboard` : `/dashboard/${label}`}>
        <div className={`relative flex items-center max-[426px]:justify-center space-x-3 px-4 py-2 hover:bg-[#f7f6f6] hover:text-black cursor-pointer ${pathname === `/dashboard/${label}` ? 'bg-[#f7f6f6] text-black font-semibold' : ''}`}>
            <Icon className="w-5 h-5" />
            <span className='max-[426px]:hidden'>{label.charAt(0).toUpperCase() + label.slice(1)}</span>
        </div>
    </Link>
    );
    
    const highlightKeyword = (text) => {
        if (!InputData) return text;
        const parts = text.split(new RegExp(`(${InputData})`, 'gi'));
      return parts.map((part, index) =>
        part.toLowerCase() === InputData.toLowerCase() ? (
          <span key={index} className="font-bold text-black">{part}</span>
        ) : (
          <span key={index}>{part}</span>
        )
      );
      };

    const handleSearchRedirect = (label) => {
        if (label === 'dashboard') {
            router.push(`/dashboard`);
            setShowSuggestions(false);
        }
        else{
            router.push(`/dashboard/${label}`);
            setShowSuggestions(false);
        }
    }

    const handleClickOutside = (event) => {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
            setShowNotifications(false);
        }
    }
    useEffect(() => {
        if (showNotifications) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showNotifications]);
  return (
    <div className='relative max-[426px]:hidden'>
      <div className="bg-[#18181d] text-white flex justify-between items-center px-4 py-2">
        <Link href="/" >
          <Image className="h-10 max-[426px]:h-5 w-auto fill-current relative left-10" src={logo} alt="Logo"  />
        </Link>

        <div className='relative flex items-center justify-center gap-2'>
            <ArrowLeft onClick={() => {
                router.back();
                document.querySelector('.arrow-left').classList.add('scale-75');
                setTimeout(() => document.querySelector('.arrow-left').classList.remove('scale-75'), 500);
            }} className='cursor-pointer transition-transform duration-200 arrow-left'/>
            <ArrowRight onClick={() => {router.forward(); document.querySelector('.arrow-right').classList.add('scale-75');
                setTimeout(() => document.querySelector('.arrow-right').classList.remove('scale-75'), 500);}} className='cursor-pointer transition-transform duration-200 arrow-right'/>
            <div
                onBlur={() =>
                    setTimeout(() => setShowSuggestions(false), 500)
                }
                className='relative flex items-center border border-gray-300 bg-white min-w-[500px] max-[426px]:min-w-[300px] max-[426px]:w-full'
            >
                <input type="text" placeholder="Search" onChange={(e) => setInputData(e.target.value)} value={InputData} onClick={() => setShowSuggestions(true)} className="text-gray-500 w-full px-4 py-2 outline-black" />
                {showSuggestions && (
                    <div className=''> 
                        <div className="absolute top-10 left-0 right-0 bg-white border text-black border-gray-300 z-40 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                            {suggesionData.filter((item) => item.label.toLowerCase().includes(InputData.toLowerCase())).map((item, index) => (
                                <div key={index} onClick={() => handleSearchRedirect(item.label)} className="flex items-center space-x-3 px-4 py-2 hover:bg-[#f7f6f6] hover:text-black cursor-pointer">
                                    <item.icon className="w-5 h-5" />
                                    <span>{highlightKeyword(item.label.charAt(0).toUpperCase() + item.label.slice(1))}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
            <RefreshCcw
                onClick={() => {
                    window.location.reload();
                    const interval = setInterval(() => {
                        document.querySelector('.rotate').style.transform = `rotate(${-Date.now() % 360 / 2}deg)`;
                    }, 16);
                    window.addEventListener('load', () => clearInterval(interval));
                }}
                className='cursor-pointer rotate'
            />
        </div>
        
        <ul ref={menuRef} className="flex items-center space-x-8 justify-center">
            <div>
                <button onClick={() => setShowNotifications(!showNotifications)} className="relative top-1 cursor-pointer text-sm text-white">
                    <Bell />
                </button>
            </div>
            {showNotifications && (
                <div className="absolute top-12 justify-start items-start overflow-hidden right-15 w-60 bg-white border border-gray-300 z-40">
                    <ul className="flex flex-col space-x-3 items-start">
                        {notificationsData.map((notification) => (
                            <div key={notification.id} className="flex flex-col justify-between space-x-3 w-full px-4 py-2 hover:bg-[#f7f6f6] text-black cursor-pointer border-b border-gray-300">
                                <span>{notification.title.slice(0, 20)} ...</span>
                                <span className="text-xs text-gray-500">{notification.time}</span>
                            </div>
                        ))}
                        <Link href={'/dashboard/notification'} onClick={() => setShowNotifications(false)} className="flex justify-between space-x-3 w-full px-4 py-2 hover:bg-[#f7f6f6] text-blue-600 cursor-pointer">
                            <span>see all notifications</span>
                        </Link>
                    </ul>
                </div>
            )}
            <HeaderProfileSection />
        </ul>
      </div>

        <div className='relative flex min-h-[92vh]'>
            <nav className=" min-w-60 max-[769px]:min-w-40 max-[426px]:hidden bg-[#18181d] text-white  pl-2 space-y-2 text-sm overflow-y-scroll max-h-[98vh] scrollbar-none">
                <div className=" space-y-2">
                    <SidebarItem icon={LayoutDashboard} label="dashboard" />
                    {/* <SidebarItem icon={ChartNoAxesCombined } label="analytics" /> */}
                    <SidebarItem icon={Bell  } label="notification" />
                    <SidebarItem icon={MessageCircle} label="messages" />
                    <SidebarItem icon={VscListFlat } label="topics" />

                    <div onClick={() => (setSelectedItem(!selectedItem), setActiveTab('publisher'))} className={`flex items-center space-x-3 px-4 py-2 hover:bg-[#f7f6f6] hover:text-black cursor-pointer ${activeTab === 'publisher' ? 'bg-[#f7f6f6] text-black' : ''}`}>
                        <MdOutlinePublic className={`w-5 h-5 `} />
                        <span>Publisher</span>               
                    </div>
                    {selectedItem && (
                    <div className="relative bg-[#2b2b2e]">
                        <SidebarItem icon={PiArticleNyTimesDuotone} label="articles"/>
                        <SidebarItem icon={Video} label="videos"/>
                        <SidebarItem icon={CircleFadingPlus } label="stories"/>
                        <SidebarItem icon={AiOutlineHighlight} label="highlights"/>
                        <SidebarItem icon={Files } label="pages"/>
                        <SidebarItem icon={Files } label="researcher"/>
                        <SidebarItem icon={AiOutlineFundProjectionScreen } label="fundraisers"/>
                        <SidebarItem icon={Copyright} label="copyright"/>
                        <SidebarItem icon={User } label="advertising"/>
                    </div>
                    )}
                </div>
                <div className="mt-4 space-y-2 border-t border-gray-700 pt-4">
                    <SidebarItem icon={MessageSquareWarning } label="feedback"/>
                    <SidebarItem icon={HardDriveDownload } label="drive"/>
                    <SidebarItem icon={Wallet } label="wallet"/>
                </div>

                <div className="mt-4 space-y-2 border-t border-gray-700 pt-4">
                    <div onClick={() => (setSelectedMonetization(!selectedMonetization), setActiveTab('Monetization'))} className={`flex items-center space-x-3 px-4 py-2 hover:bg-[#f7f6f6] hover:text-black cursor-pointer ${activeTab === 'Monetization' ? 'bg-[#f7f6f6] text-black' : ''}`}>
                    <CircleDollarSign  className={`w-5 h-5 `} />
                    <span>Monetization</span>
                    
                    </div>
                    {selectedMonetization && (
                        <div className="relative bg-[#2b2b2e]">
                        <SidebarItem icon={Handshake } label="partners"/>
                        <SidebarItem icon={GoSponsorTiers } label="sponsors"/>
                        <SidebarItem icon={Settings} label="payout"/>
                        <SidebarItem icon={BsShop } label="shop"/>
                        </div>
                    )}

                    
                </div>
                <div className="mt-4 space-y-2 border-t border-gray-700 pt-4">
                    <SidebarItem icon={IoLibraryOutline } label="library"/>
                    <SidebarItem icon={User} label="profile"/>
                    <SidebarItem icon={ReceiptText } label="billing"/>
                    <SidebarItem icon={Settings} label="settings"/>
                    {/* <SidebarItem icon={IoMdHelpCircleOutline } label="help"/> */}
                    <Link href={'/help'}>
                        <div className={`relative flex items-center max-[426px]:justify-center space-x-3 px-4 py-2 hover:bg-[#f7f6f6] hover:text-black cursor-pointer `}>
                            <IoMdHelpCircleOutline className="w-5 h-5" />
                            <span className='max-[426px]:hidden'>{'help'.charAt(0).toUpperCase() + 'help'.slice(1)}</span>
                        </div>
                    </Link>
                </div>
                {/* Add more links as needed */}
            </nav>
             <main className="p-4 pb-0 w-full max-[426px]:p-0 bg-[#f7f6f6] max-h-[97vh] overflow-x-scroll">
                {children}
            </main>          
        </div>        
    </div>
  );
}
