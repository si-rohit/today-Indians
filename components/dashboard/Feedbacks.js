'use client'
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { FiSend } from "react-icons/fi";
import { FaRegUser } from "react-icons/fa";
import { Trash2,Star,StarHalf  } from "lucide-react";
import UserProfile from "@/app/dashboard/feedback/UserProfile";
import { FaStar,FaStarHalf  } from "react-icons/fa";

const tempUsers = [
  {
    id: 1,
    name: "Kate Morgan",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    lastMessage: "Wow! Will take the….",
    messages: [
      { from: "Kate Morgan", text: "I’m looking for running shoes, size 13",time:"10:00am",rating:"4.5" },
      // { from: "me", text: "Check this new model",time:"10:00am" },
    ]
  },
  {
    id: 2,
    name: "John Henry",
    avatar: "https://randomuser.me/api/portraits/men/12.jpg",
    lastMessage: "Alright, let me check that...",
    messages: [
      { from: "John Henry", text: "Can I get a bulk discount?",time:"01:00pm",rating:"4" },
      { from: "me", text: "Sure, I’ll get back to you.",time:"01:02pm" }
    ]
  }
];

const Feedbacks = () => {
  const [selectedUser, setSelectedUser] = useState(tempUsers[0]);
  const [newMessage, setNewMessage] = useState("");
  const [openSidebarChatMenu, setOpenSidebarChatMenu] = useState(null);
  const [isOpenUserProfile, setIsOpenUserProfile] = useState(false);

  const sendMessage = () => {
    if (!newMessage.trim()) return;
    const updated = {
      ...selectedUser,
      messages: [...selectedUser.messages, { from: "me", text: newMessage }]
    };
    setSelectedUser(updated);
    setNewMessage("");
  };

  const handleCloseProfile = () => {
    setIsOpenUserProfile(false);
  };

  const menuRef = useRef(null);
    const userMenuRef = useRef(null);
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setOpenSidebarChatMenu(false);
            }
        };
        const handleUserChatClickOutside = (event) => {
          if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
              setOpenUserMenu(false);
          }
        };
    
        useEffect(() => {      
          if (openSidebarChatMenu ) {
            if (openSidebarChatMenu) {
                document.addEventListener('mousedown', handleClickOutside);
            } else {
                document.removeEventListener('mousedown', handleClickOutside);
            }
            return () => {
                document.removeEventListener('mousedown', handleClickOutside);
            };         
          }          
        }, [openSidebarChatMenu]);

  return (
    <div className="flex min-h-[88vh] overflow-hidden">
      {/* Sidebar */}
      <div ref={menuRef} className="w-2/5 bg-gray-100 pr-4 max-[769px]:p-2 overflow-y-auto">
        <h2 className="text-lg font-semibold mb-1">Feedback</h2>
        <hr className="mb-4 border-t border-gray-300" />
        {tempUsers.map((user) => (
          <div
            key={user.id}
            
            className={`relative flex items-center justify-between gap-3 p-3 max-[769px]:p-1 cursor-pointer hover:bg-gray-200  ${
              selectedUser.id === user.id ? "bg-white shadow" : ""
            }`}
            onClick={() => setSelectedUser(user)}
          > 
            <div className="flex items-center gap-3">
              <Image
                src={user.avatar}
                className="w-10 h-10 object-cover"
                width={40}
                height={40}
                alt={user.name}
              />
              <div>
                <p className="font-medium text-sm">{user.name}</p>
                <p className="text-xs text-gray-500 truncate max-w-[150px]">
                  {user.lastMessage}
                </p>
              </div>
            </div>
            <div onClick={(e) => { e.stopPropagation(); setOpenSidebarChatMenu(user.id); }}>
              <HiOutlineDotsVertical />
            </div>
            {openSidebarChatMenu === user.id && (
              <div className="absolute top-9 right-0 mt-2 mr-2 bg-white shadow z-10">
                <ul>
                  <li onClick={()=>setIsOpenUserProfile(true)} className="px-2 pr-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2"><FaRegUser />View Profile</li>
                  <li className="px-2 pr-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2"><Trash2  className="text-xl w-4.5"/>Delete</li>
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Chat Window */}
      <div className="relative w-full p-4 max-[425px]:p-0 flex flex-col justify-between bg-white">
        {isOpenUserProfile ? (<UserProfile selectedUser={selectedUser} close={handleCloseProfile}/>): (
          <div>
            <div className="mb-4 ">
              <div className="flex items-center justify-between border-b border-gray-200 pb-2 mb-2">
                <div className="flex items-center ">
                  <Image
                    src={selectedUser.avatar}
                    alt={selectedUser.name}
                    className="w-10 h-10 object-cover"
                    width={40}
                    height={40}
                  />
                  <span className="font-semibold ml-2">{selectedUser.name}</span>
                </div>
                <HiOutlineDotsVertical />
              </div>
              
              
              <div className="space-y-4 max-[426px]:space-y-2 max-h-[75vh] overflow-y-scroll pr-2">
                {selectedUser.messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`flex ${msg.from === "me" ? "justify-end" : "justify-start"}`}
                  >             
                      <div
                        className={`flex  max-w-[70%] text-sm shadow max-[426px]:px-2 `}
                      >
                        <div className={`flex flex-col px-4 py-2 ${
                          msg.from === "me" ? "bg-[#6c757d] text-white" : "bg-gray-200"
                        }`}>
                          {msg.from !== "me" && 
                          <p className="text-xs text-yellow-500">
                            {Array.from({ length: Math.floor(msg.rating) }).map((_, i) => (
                              <FaStar key={i} className="inline-block" />
                            ))}
                            {msg.rating % 1 !== 0 && <FaStarHalf  className="inline-block" />}
                          </p>
                          }
                          <p className="text-xs flex items-end gap-2 ">{msg.text} <span className="block text-[10px]">{msg.time}</span></p>
                        </div>
                      </div>
                  </div>
                ))}
              </div>
            </div>
            {/* Send Message */}
            {selectedUser.messages.filter((msg) => msg.from === "me").length === 0 &&(
              <div className="absolute bottom-0 left-0 w-full bg-white p-2 flex items-center gap-3">
                <input
                  type="text"
                  placeholder="Type a Reply..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                  className="w-full border border-gray-300 p-2 text-sm"
                />
                <button
                  onClick={sendMessage}
                  className="bg-[#222529] text-white px-4 py-2 text-sm hover:bg-blue-700 flex items-center gap-2"
                >
                  Reply <FiSend />
                </button>
              </div>
            )}         
          </div>
        )}
      </div>
    </div>
  );
};

export default Feedbacks;
