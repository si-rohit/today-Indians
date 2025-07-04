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
import { IoMdAdd,IoMdHelpCircleOutline,IoMdMenu  } from "react-icons/io";
import { AiOutlineHighlight,AiOutlineFundProjectionScreen  } from "react-icons/ai";
import { GoSponsorTiers } from "react-icons/go";
import { FaCaretRight } from "react-icons/fa6";
import { BsShop } from "react-icons/bs";
import { IoLibraryOutline } from "react-icons/io5";
import { MdOutlinePublic,MdOutlineInfo} from "react-icons/md";
import { IoCreateOutline } from "react-icons/io5";
import { useEffect, useRef, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';
import logo from "@/public/images/The-Today-Indians-Logo-Pack/Editor-Black@4x.png"
import logo2 from "@/public/images/The-Today-Indians-Logo-Pack/Editor-Black@4x.png"
import { VscListFlat } from "react-icons/vsc";
import { FaSearch } from 'react-icons/fa';
import { FaRegMoon,FaSun } from "react-icons/fa";
import { FiSun } from "react-icons/fi";
import { RiAlertLine } from "react-icons/ri";
import { RxCrossCircled } from "react-icons/rx";
import { CiLock } from "react-icons/ci";
import { GoBold } from "react-icons/go";


export default function DashboardLayout({ children }) {
    const pathname = usePathname();
    const router = useRouter();
    const [activeTab, setActiveTab] = useState('dashboard');
    // setActiveTab(pathname);
    const [showNotifications, setShowNotifications] = useState(false);
    const [selectedItem, setSelectedItem] = useState(false);
    const [selectedMonetization, setSelectedMonetization] = useState(false);
    const [InputData, setInputData] = useState('');
    const [showSuggestions, setShowSuggestions] = useState(false);
    const menuRef = useRef(null);
    const [isDarkMode, setIsDarkMode] = useState(true);
    const [isOpenMenu, setIsOpenMenu] = useState(true);

    useEffect(() => {
        const Theam = localStorage.getItem('theam');
        if (Theam === 'dark') {          
            setIsDarkMode(true);
        }
        else {          
            setIsDarkMode(false);
        }
    }, []);

    const changeTheam = (theam) => {       
        localStorage.setItem('theam', theam);
        window.location.reload();
        if (theam === 'dark') {
            setIsDarkMode(true);
        }
        else {
            setIsDarkMode(false);
        }
    }

    const suggesionData = [
        {icon: LayoutDashboard, label: 'dashboard',des:'Dashboard Overview Page'},
        // {icon: ChartNoAxesCombined, label: 'analytics',des:'Data Analytics Page'},
        {icon: MessageCircle, label: 'messages',des:'Inbox Messages List'},
        {icon: PiArticleNyTimesDuotone, label: 'articles',des:'Article List Page'},
        {icon: Video, label: 'videos',des:'Video List Page'},
        {icon: CircleFadingPlus, label: 'storys',des:'Story List Page'},
        {icon: AiOutlineHighlight, label: 'highlights',des:'Highlight List Page'},
        {icon: Files, label: 'pages',des:'Page List Page'},
        {icon: Files, label: 'researcher',des:'Researcher List Page'},
        {icon: AiOutlineFundProjectionScreen, label: 'fundraisers',des:'Fundraiser List Page'},
        {icon: Copyright, label: 'copyright',des:'Copyright List Page'},
        {icon: User, label: 'advertising',des:'Advertising List Page'},
        {icon: MessageSquareWarning, label: 'feedbacks',des:'Feedback List Page'},
        {icon: HardDriveDownload, label: 'drive',des:'Drive Overview Page'},
        {icon: Wallet, label: 'wallet',des:'Wallet Overview Page'},
        {icon: IoLibraryOutline, label: 'library',des:'Library Overview Page'},
        {icon: ReceiptText, label: 'billing',des:'Billing List Page'},
        {icon: Handshake, label: 'partners',des:'Partner List Page'},
        {icon: GoSponsorTiers, label: 'sponsorships',des:'Sponsorship List Page'},
        {icon: BsShop, label: 'shop',des:'Shop Overview Page'},
        {icon:Settings, label:"payout",des:'Payout Overview Page'},
        {icon:Settings, label:"settings",des:'Settings Overview Page'},       
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
        <div onClick={() => setActiveTab(label)} className={`relative flex items-center max-[426px]:justify-center  ${isOpenMenu ? 'space-x-3 px-4 py-2':'px-3 py-2 space-x-0'} hover:bg-[#cac9c9] hover:text-black cursor-pointer ${activeTab === label? ` text-white font-semibold ${isDarkMode ? 'bg-[#333]' : 'bg-black'}` : ''}`}>
            <Icon className="w-5 h-5" />
            <span className={`max-[426px]:hidden ${!isOpenMenu && 'hidden'}`}>{label.charAt(0).toUpperCase() + label.slice(1)}</span>
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

        {/* header */}
      <div className={` ${isDarkMode ? 'bg-black text-white border-gray-600' : 'bg-white text-black border-gray-200'} flex justify-between border-b  items-center px-4 py-2 sticky top-0 z-50`}>
        <div className='flex items-center justify-between'>
            <Link href="/" >
                <Image className="h-8 max-[426px]:h-5 w-auto fill-current relative left-10" src={isDarkMode ? logo2 : logo} alt="Logo"  />
            </Link>
            <IoMdMenu className='cursor-pointer relative -left-22 text-xl' onClick={()=> setIsOpenMenu(!isOpenMenu)}/>
        </div>
        

        {/* search section */}
        <div className='relative flex items-center justify-center gap-2'>
            <ArrowLeft onClick={() => {
                router.back();
                document.querySelector('.arrow-left').classList.add('scale-75');
                setTimeout(() => document.querySelector('.arrow-left').classList.remove('scale-75'), 500);
            }} className={`cursor-pointer transition-transform duration-200 arrow-left border   hover:bg-black hover:text-white ${isDarkMode ? 'bg-[#333] border-gray-600 text-gray-300' : 'border-gray-300 text-gray-500'} w-8 h-8 flex items-center justify-center p-2`}/>
            <ArrowRight onClick={() => {router.forward(); document.querySelector('.arrow-right').classList.add('scale-75');
                setTimeout(() => document.querySelector('.arrow-right').classList.remove('scale-75'), 500);}} className={`cursor-pointer transition-transform duration-200 arrow-right border   hover:bg-black hover:text-white ${isDarkMode ? 'bg-[#333] border-gray-600 text-gray-300' : 'border-gray-300 text-gray-500'} w-8 h-8 flex items-center justify-center p-2`}/>
            <div
                onBlur={() =>
                    setTimeout(() => setShowSuggestions(false), 500)
                }
                className={`relative flex items-center border min-w-[500px] max-[426px]:min-w-[300px] max-[426px]:w-full ${isDarkMode ? 'bg-[#333] border-gray-600 ' : 'bg-white border-gray-300  '} `}
            >
                <input type="text" placeholder="Search" onChange={(e) => setInputData(e.target.value)} value={InputData} onClick={() => setShowSuggestions(true)} className={`text-gray-500 w-full px-2 py-1 outline-none ${isDarkMode ? 'bg-[#333] placeholder:text-gray-400' : ''}`} />
                {showSuggestions && (
                    <div className=''> 
                        <div className={`absolute top-8 left-0 right-0  ${isDarkMode ? 'bg-[#333] text-white border-gray-600' : 'bg-white text-black border-gray-300'} border   z-40 max-h-[500px] overflow-y-scroll`}>
                            {suggesionData.filter((item) => item.label.toLowerCase().includes(InputData.toLowerCase())).map((item, index) => (
                                <div key={index} onClick={() => handleSearchRedirect(item.label)} className={`flex items-center space-x-3 px-4 py-2 hover:bg-[#f7f6f6] hover:text-black cursor-pointer`}>
                                    <item.icon className="w-5 h-5" />
                                    <div>
                                        <span>{highlightKeyword(item.label.charAt(0).toUpperCase() + item.label.slice(1))}</span>
                                        <p className='text-xs text-gray-400'>{highlightKeyword(item.des)}</p>
                                    </div>
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
                className={` cursor-pointer rotate border   hover:bg-black hover:text-white ${isDarkMode ? 'bg-[#333] border-gray-600 text-gray-300' : 'border-gray-300 text-gray-500'} w-8 h-8 flex items-center justify-center p-2`}
            />
        </div>
        
        <ul ref={menuRef} className="flex items-center space-x-8 justify-center">
            {
                isDarkMode ? <FaSun className='cursor-pointer text-xl' onClick={() => changeTheam('light')}/> : <FaRegMoon className='cursor-pointer text-xl' onClick={() => changeTheam('dark')}/>
            }
            <HeaderProfileSection />           
            <button onClick={() => setShowNotifications(!showNotifications)} className="relative cursor-pointer text-sm ">
                <Bell />
            </button>
            <MdOutlineInfo className='cursor-pointer text-2xl text-gray-600'/>
                         
        </ul>
        {showNotifications && (
                <div className={`absolute top-12 justify-start items-start overflow-hidden right-10 w-60  ${isDarkMode ? 'bg-[#333] border-gray-600' : 'bg-white border-gray-300'} border  z-40`}>
                    <ul className="flex flex-col space-x-3 items-start">
                        {notificationsData.map((notification) => (
                            <div key={notification.id} className="flex flex-col justify-between space-x-3 w-full px-4 py-2 hover:bg-[#f7f6f6]  cursor-pointer border-b border-gray-300">
                                <span className='text-sm'>{notification.title.length > 25 ? notification.title.slice(0, 25) + '...' : notification.title}</span>
                                <span className="text-xs text-gray-500">{notification.time}</span>
                            </div>
                        ))}
                        <Link href={'/dashboard/notification'} onClick={() => setShowNotifications(false)} className="flex justify-between space-x-3 w-full px-4 py-2 hover:bg-[#f7f6f6] text-blue-600 cursor-pointer">
                            <span>see all notifications</span>
                        </Link>
                    </ul>
                </div>
            )}
      </div>

        <div className='relative flex min-h-[96vh]'>

            <nav className={`${isOpenMenu ? 'min-w-60 max-[769px]:min-w-40' : 'max-w-12 overflow-hidden'}  max-[426px]:hidden  ${isDarkMode ? 'bg-[#12110f] text-white border-gray-600' : 'bg-[#f7f6f6] text-black border-gray-200'} border-r   space-y-2 text-sm overflow-y-scroll max-h-[98vh] scrollbar-none`}>
                <div className=" space-y-2">
                    <SidebarItem icon={LayoutDashboard} label="dashboard" />
                    {/* <SidebarItem icon={ChartNoAxesCombined } label="analytics" /> */}
                    <SidebarItem icon={Bell  } label="notification" />
                    <SidebarItem icon={MessageCircle} label="messages" />
                    <SidebarItem icon={VscListFlat } label="topics" />

                    <div onClick={() => (setSelectedItem(!selectedItem), setActiveTab('publisher'))} className={`flex items-center ${isOpenMenu ? 'space-x-3 px-4 py-2':'px-3 py-2 space-x-0'} hover:bg-[#cac9c9] hover:text-black cursor-pointer ${activeTab === 'publisher' ? 'bg-black text-white' : `${selectedItem ? 'bg-black text-white' : ''}`}`}>
                        <MdOutlinePublic className={`w-5 h-5 `} />
                        <span className={`${!isOpenMenu && 'hidden'}`}>Publisher</span>               
                    </div>
                    {selectedItem && (
                    <div className={`relative  ${isDarkMode ? 'bg-[#444] text-white' : 'bg-[#e7e6e6] text-black'}  space-y-2`}>
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
                <div className={`mt-4 space-y-2 border-t ${isDarkMode ? 'border-gray-600':'border-gray-200'} pt-4`}>
                    <SidebarItem icon={MessageSquareWarning } label="feedback"/>
                    <SidebarItem icon={HardDriveDownload } label="drive"/>
                    <SidebarItem icon={Wallet } label="wallet"/>
                </div>
                <div className={`mt-4 space-y-2 border-t ${isDarkMode ? 'border-gray-600':'border-gray-200'} pt-4`}>
                    <div onClick={() => (setSelectedMonetization(!selectedMonetization), setActiveTab('Monetization'))} className={`flex items-center ${isOpenMenu ? 'space-x-3 px-4 py-2':'px-3 py-2 space-x-0'} hover:bg-[#cac9c9] hover:text-black cursor-pointer ${activeTab === 'Monetization' ? 'bg-black text-white' : `${selectedMonetization ? 'bg-black text-white' : ''}`}`}>
                    <CircleDollarSign  className={`w-5 h-5 `} />
                    <span className={`${!isOpenMenu && 'hidden'}`}>Monetization</span>
                    
                    </div>
                    {selectedMonetization && (
                        <div className={`relative  text-black space-y-2 ${isDarkMode ? 'bg-[#444]':'bg-[#e7e6e6]'}`}>
                        <SidebarItem icon={Handshake } label="partners"/>
                        <SidebarItem icon={GoSponsorTiers } label="sponsors"/>
                        <SidebarItem icon={Settings} label="payout"/>
                        <SidebarItem icon={BsShop } label="shop"/>
                        </div>
                    )}

                    
                </div>
                <div className={`mt-4 space-y-2 border-t ${isDarkMode ? 'border-gray-600':'border-gray-200'} pt-4 `}>
                    <SidebarItem icon={IoLibraryOutline } label="library"/>
                    <SidebarItem icon={User} label="profile"/>
                    <SidebarItem icon={ReceiptText } label="billing"/>
                    <SidebarItem icon={Settings} label="settings"/>
                    {/* <SidebarItem icon={IoMdHelpCircleOutline } label="help"/> */}
                    <Link href={'/help'}>
                        <div className={`relative flex items-center max-[426px]:justify-center ${isOpenMenu ? 'space-x-3 px-4 py-2':'px-3 py-2 space-x-0'} hover:bg-[#f7f6f6] hover:text-black cursor-pointer `}>
                            <IoMdHelpCircleOutline className="w-5 h-5" />
                            <span className={`max-[426px]:hidden ${!isOpenMenu && 'hidden'}`}>{'help'.charAt(0).toUpperCase() + 'help'.slice(1)}</span>
                        </div>
                    </Link>
                </div>
                {/* Add more links as needed */}
                
                <div className={` px-4 py-2 pt-5 ${!isOpenMenu && 'hidden'}`}>
                    <div className='flex items-end space-x-3 '>
                        <Image src={logo} width={100} height={100} alt="logo" />
                        <p className='-mb-1'>v1.0</p>
                    </div>
                    <p className='text-gray-400 '>Made in Swiss</p>
                    <p className='text-gray-400'>© 2025 all rights reserved</p>
                </div>
                
            </nav>
             <main className={`p-4 w-full max-[426px]:p-0 ${isDarkMode ? 'bg-[#12110f]' : 'bg-[#f7f6f6]'} max-h-[98vh] overflow-x-scroll `}>
                {children}
            </main>          
        </div>   
        
        {/* Footer */}
        <div className={`border-t ${isDarkMode ? 'bg-[#12110f] border-gray-600' : 'bg-[#f7f6f6] border-gray-200'} flex items-center justify-between px-2 sticky bottom-0 z-50`}>
            <p className={`p-1 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-800 '} flex items-center gap-1`}><GoBold />Online <RxCrossCircled className='text-[16px]'/> 0 <RiAlertLine className='text-[16px]'/> 0</p>
            <p className=' text-sm text-green-400 flex items-center gap-1'><CiLock /> Secured Connection</p>
        </div>     
    </div>
  );
}
