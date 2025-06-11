'use client'
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Mail,CircleCheck ,ChevronRight ,UserRoundPlus   } from 'lucide-react';
import { useSelector } from "react-redux";
import userIcon from '@/public/images/userIcon.png'
import ChangePassword from "@/components/dashboard/setting/ChangePassword";

const settingsTabs = [
  "General",
  "Privacy & Security",
  "Notifications",
  "Comments",
  "Account Info", 
];

const Page = () => {
  const [activeTab, setActiveTab] = useState("Privacy & Security");
  const [enabled, setEnabled] = useState(false);
  const [enablePrivateProfile, setEnablePrivateProfile] = useState(false);
  const [enable2FA, setEnable2FA] = useState(true);
  const [enableHideEmail, setEnableHideEmail] = useState(true);
  const [enableHidePhone, setEnableHidePhone] = useState(true);
  const [enableComments, setEnableComments] = useState(true);
  const [ShowChangePassword, setShowChangePassword] = useState(false);
  const router = useRouter()

  const { user } = useSelector(store => store.auth);
  // console.log(user);

  const handleCloseChangePassword = () => {
    setShowChangePassword(false);
  };

  const renderContent = () => {
    switch (activeTab) {
      case "General":
        return (
          <div>
            <h2 className="text-xl font-semibold mb-4">General Settings</h2>
            <div className="mb-4">
              <label className="block font-medium">Full Name</label>
              <input type="text" placeholder="John Doe" className="border border-gray-300 p-2 w-full" />
            </div>
            <div className="mb-4">
              <label className="block font-medium">Email Address</label>
              <input type="email" placeholder="john@example.com" className="border border-gray-300 p-2 w-full" />
            </div>
            <div className="mb-4">
              <h2 className=" font-medium">Language Preferences</h2>
              <select className="border border-gray-300 p-2 w-full">
                <option>English</option>
                <option>Hindi</option>
                <option>Spanish</option>
                <option>French</option>
              </select>
            </div>
            
            <button className="bg-black text-white px-4 py-2">Save Changes</button>
          </div>
        );

      case "Privacy & Security":
        return (
        <div>
          {
            ShowChangePassword ? (
              <ChangePassword onClose={handleCloseChangePassword}/>
            ):(
              <div>
                <h2 className="text-xl font-semibold mb-4">Privacy & Security</h2>
        
                <div className="flex items-center justify-between bg-white px-2 py-1">
                  <div >
                    <h1 className=" text-[16px]">Make Profile Private</h1>
                  </div>
                  <button
                    onClick={() => setEnablePrivateProfile(!enablePrivateProfile)}
                    className={`w-12 h-6 rounded-full p-1 flex items-center transition-colors duration-300 ${
                      enablePrivateProfile ? 'bg-blue-500' : 'bg-gray-300'
                    }`}
                  >
                    <div
                      className={`bg-white w-5 h-5 rounded-full shadow-md transform transition-transform duration-300 ${
                        enablePrivateProfile ? 'translate-x-5.5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>
                <div className="text-gray-600 text-[12px] mt-1 ">
                  When your account is public, your profile and posts can be seen by anyone, on or off, even if they don&apos;t have a account. <br/>
                <p className="text-gray-600 mt-2 text-[12px]">When your account is private, only the followers you approve can see what you share, including your articles or videos. your followers and following lists. Certain info on your profile, like your profile picture and username, is visible to everyone on and off</p> 
                </div>
                <div className="flex items-center justify-between bg-white px-2 py-1 mt-4">
                  <div >
                    <h1 className=" text-[16px]">Hide email from public</h1>
                  </div>
                  <button
                    onClick={() => setEnableHideEmail(!enableHideEmail)}
                    className={`w-12 h-6 rounded-full p-1 flex items-center transition-colors duration-300 ${
                      enableHideEmail ? 'bg-blue-500' : 'bg-gray-300'
                    }`}
                  >
                    <div
                      className={`bg-white w-5 h-5 rounded-full shadow-md transform transition-transform duration-300 ${
                        enableHideEmail ? 'translate-x-5.5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>
                <p className="text-gray-600 mt-1 text-[12px]">You will start recieving notification about alerts, updates and more</p>
                
                <div className="flex items-center justify-between bg-white px-2 py-1 mt-4">
                  <div >
                    <h1 className=" text-[16px]">Hide mobile number from public</h1>
                  </div>
                  <button
                    onClick={() => setEnableHidePhone(!enableHidePhone)}
                    className={`w-12 h-6 rounded-full p-1 flex items-center transition-colors duration-300 ${
                      enableHidePhone ? 'bg-blue-500' : 'bg-gray-300'
                    }`}
                  >
                    <div
                      className={`bg-white w-5 h-5 rounded-full shadow-md transform transition-transform duration-300 ${
                        enableHidePhone ? 'translate-x-5.5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>
                <p className="text-gray-600 mt-1 text-[12px]">You will start recieving notification about alerts, updates and more</p>

                <div className="flex items-center justify-between bg-white px-2 py-1 mt-4">
                  <div >
                    <h1 className=" text-[16px]">Two-Factor Authentication</h1>
                  </div>
                  <button
                    onClick={() => setEnable2FA(!enable2FA)}
                    className={`w-12 h-6 rounded-full p-1 flex items-center transition-colors duration-300 ${
                      enable2FA ? 'bg-blue-500' : 'bg-gray-300'
                    }`}
                  >
                    <div
                      className={`bg-white w-5 h-5 rounded-full shadow-md transform transition-transform duration-300 ${
                        enable2FA ? 'translate-x-5.5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>
                <p className="text-gray-600 pr-5 mt-1 text-[12px]">
                  Two-factor authentication adds an extra layer of security to your account by requiring you to enter a verification code sent to your phone or email in addition to your password when you sign in.
                </p>
                <div className="flex items-center justify-between bg-white px-2 py-1 mt-4 cursor-pointer" onClick={()=> setShowChangePassword(true)}>                 
                  <h1 className=" text-[16px]">Change Password</h1>     
                  <ChevronRight className="w-5 h-5"/>
                </div>

                
                {/* <div>             
                  <div className="my-4">
                    <label className="block text-[16px] mb-2">Two-Factor Authentication</label>

                    <Link href={'/auth/otp-verification'} className="bg-gray-300 px-3 py-2 font-semibold cursor-pointer">Enable</Link>
                  </div>
                </div> */}
              </div>
            )
          }
        </div>
          
        );

      case "Notifications":
        return (
          <div>
            <h2 className="text-xl font-semibold mb-4">Notification Settings</h2>
           
            <div className="flex items-center justify-between bg-white px-2 py-1">
              <div >
                <h1 className="font-semibold text-xl">Turn on Notifications</h1>
                <p className="text-gray-600">You will start recieving notification about alerts, updates and more</p>
              </div>
              <button
                onClick={() => setEnabled(!enabled)}
                className={`w-12 h-6 rounded-full p-1 flex items-center transition-colors duration-300 ${
                  enabled ? 'bg-blue-500' : 'bg-gray-300'
                }`}
              >
                <div
                  className={`bg-white w-5 h-5 rounded-full shadow-md transform transition-transform duration-300 ${
                    enabled ? 'translate-x-5.5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>
        );
        case "Comments":
          return (
            <div>
              <h2 className="text-xl font-semibold mb-4">Comments</h2>
             
              <div className="flex items-center justify-between bg-white px-2 py-1">
                <div >
                  <h1 className="font-semibold text-xl">Turn on Comments</h1>
                  <p className="text-gray-600">People will be able to comment on your posts and reels.</p>
                </div>
                <button
                  onClick={() => setEnableComments(!enableComments)}
                  className={`w-12 h-6 rounded-full p-1 flex items-center transition-colors duration-300 ${
                    enableComments ? 'bg-blue-500' : 'bg-gray-300'
                  }`}
                >
                  <div
                    className={`bg-white w-5 h-5 rounded-full shadow-md transform transition-transform duration-300 ${
                      enableComments ? 'translate-x-5.5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            </div>
          );
      case "Account Info":
        return (
          <div>
            <h2 className="text-xl font-semibold mb-4">Account Info</h2>
            <div className="bg-white p-2 w-full flex gap-4">
              <Image src={user.pass_photo || userIcon} alt="Profile" width={100} height={100} className="w-14 h-14" />
              <div>
                <h1 className="font-semibold text-xl">{user.username || user.firstname + " " + user.lastname}</h1>
                <p className="text-gray-600">{user.email}</p>
              </div>
            </div>
            <p className="mt-2 max-w-2xl">See any actions Instagram has taken when your account or content don&apos;t follow our standards. <Link href="/help" className="text-blue-600 underline">Learn more about Account Info</Link></p>
            <div className="mt-4 font-semibold flex items-center justify-between"> <p className="flex gap-2"><Mail /> Email Verified</p> <p className="flex gap-2"><CircleCheck className="text-green-600" />  <ChevronRight  /></p></div>
            <p className="mt-4 font-semibold flex items-center gap-2"> <UserRoundPlus  />Account Created: {new Date(user.date_added).toDateString()}</p>
            <button className="bg-red-600 mt-4 text-white px-4 py-2 cursor-pointer">Delete Account</button>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="min-h-[85vh] flex bg-[#f1f1f1]">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 py-1 ">
        <h1 className="text-2xl font-bold mb-6 pl-2">Settings</h1>
        <ul className="space-y-1">
          {settingsTabs.map((tab) => (
            <li
              key={tab}
              className={`cursor-pointer p-2 ${
                activeTab === tab ? "bg-[#dfdede] font-semibold text-[#222]" : "hover:bg-gray-100"
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </li>
          ))}
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 px-4 py-1">{renderContent()}</div>
    </div>
  );
};

export default Page;
