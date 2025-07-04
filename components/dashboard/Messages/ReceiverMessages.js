'use client'
import Image from "next/image";
import React, { use, useEffect, useRef, useState } from "react";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { FiSend } from "react-icons/fi";
import { MdAttachFile } from "react-icons/md";
import { MdOutlineArchive ,MdBlock,MdOutlineUnarchive  } from "react-icons/md";
import { Pin,BellOff ,Trash2 ,PinOff,Bell   } from 'lucide-react';
import { FaRegUser,FaChevronLeft ,FaCheckCircle  } from "react-icons/fa";
import { BsCheck2All } from "react-icons/bs";
import UserProfile from "./UserProfile";

const tempUsers = [
  {
    id: 1,
    name: "Kate Morgan",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    lastMessage: "Wow! Will take the….",
    pin: true,
    block: false,
    archive: false,
    mute: false,
    verified: false,
    last_seen: '01:00 pm',
    messages: [
      { from: "Kate Morgan", text: "I’m looking for running shoes, size 13",time:"10:00am" },
      { from: "me", text: "Check this new model",time:"10:00am" },
      { from: "Kate Morgan", text: "It looks great on you!",time:"11:00am" },
      { from: "Kate Morgan", text: "Wow! Will take them 🙊",time:"11:01am" }
    ]
  },
  {
    id: 2,
    name: "John Henry",
    avatar: "https://randomuser.me/api/portraits/men/12.jpg",
    lastMessage: "Alright, let me check that...",
    pin: false,
    block: false,
    archive: false,
    mute: true,
    verified: true,
    last_seen: '10:00 am',
    messages: [
      { from: "John Henry", text: "Can I get a bulk discount?",time:"01:00pm" },
      { from: "me", text: "Sure, I’ll get back to you.",time:"01:02pm" }
    ]
  },
  {
    id: 3,
    name: "Amit singh",
    avatar: "https://randomuser.me/api/portraits/men/13.jpg",
    lastMessage: "Wow! Will take them 🙊",
    pin: false,
    block: true,
    archive: false,
    mute: false,
    verified: false,
    last_seen: '04:00 am',
    messages: [
      { from: "John Henry", text: "Can I get a bulk discount?",time:"01:00pm" },
      { from: "me", text: "Sure, I’ll get back to you.",time:"01:02pm" }
    ]
  },
  {
    id: 4,
    name: "suman Rani",
    avatar: "https://randomuser.me/api/portraits/women/12.jpg",
    lastMessage: "It looks great on you!",
    pin: false,
    block: false,
    archive: true,
    mute: false,
    verified: true,
    last_seen: '10:00 am',
    messages: [
      { from: "John Henry", text: "Can I get a bulk discount?",time:"01:00pm" },
      { from: "me", text: "Sure, I’ll get back to you.",time:"01:02pm" }
    ]
  },
  {
    id: 5,
    name: "alexa Dube",
    avatar: "https://randomuser.me/api/portraits/women/14.jpg",
    lastMessage: "Alright, let me check that...",
    pin: false,
    block: false,
    archive: true,
    mute: false,
    verified: false,
    last_seen: '10:00 am',
    messages: [
      { from: "John Henry", text: "Can I get a bulk discount?",time:"01:00pm" },
      { from: "me", text: "Sure, I’ll get back to you.",time:"01:02pm" }
    ]
  },
  {
    id: 6,
    name: "Priya Malik",
    avatar: "https://randomuser.me/api/portraits/women/13.jpg",
    lastMessage: "Alright, let me check that...",
    pin: false,
    block: true,
    archive: false,
    mute: false,
    verified: true,
    last_seen: '10:00 am',
    messages: [
      { from: "John Henry", text: "Can I get a bulk discount?",time:"01:00pm" },
      { from: "me", text: "Sure, I’ll get back to you.",time:"01:02pm" }
    ]
  },
  {
    id: 7,
    name: "Harsh Sharma",
    avatar: "https://randomuser.me/api/portraits/men/17.jpg",
    lastMessage: "Alright, let me check that...",
    pin: false,
    block: false,
    archive: false,
    mute: true,
    verified: false,
    last_seen: '10:00 am',
    messages: [
      { from: "John Henry", text: "Can I get a bulk discount?",time:"01:00pm" },
      { from: "me", text: "Sure, I’ll get back to you.",time:"01:02pm" }
    ]
  }
];

const ReceiverMessages = () => {
  const [selectedUser, setSelectedUser] = useState(tempUsers[0]);
  const [newMessage, setNewMessage] = useState("");
  const [openSidebarChatMenu, setOpenSidebarChatMenu] = useState('');
  const [openUserMenu, setOpenUserMenu] = useState('');
  const [inputFiles , setInputFiles] = useState([]);
  const [isOpenArchive, setIsOpenArchive ] = useState(false);
  const [updatedUsers, setUpdatedUsers] = useState(tempUsers);
  const [isOpenUserProfile, setIsOpenUserProfile] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
    
  useEffect(() => {
    const Theam = localStorage.getItem('theam');
    if (Theam === 'dark') {          
      setIsDarkMode(true);
    }
    else {          
      setIsDarkMode(false);
    }
  }, []);

  // console.log(inputFiles);

  const sendMessage = () => {
    // if (!newMessage.trim()) return;
    const updated = {
      ...selectedUser,
      messages: [...selectedUser.messages, { from: "me", text: newMessage }]
    };
    setInputFiles([]);
    setSelectedUser(updated);
    setNewMessage("");
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setInputFiles([...inputFiles, file]);
    }
  };

   const handlePin = (userId) => {
    console.log(userId);
    setUpdatedUsers(prevUsers => 
      prevUsers.map(user => 
        user.id === userId ? { ...user, pin: !user.pin } : user
      )
    );
  };

  const handleBlock = (userId) => {
    console.log(userId);
    setUpdatedUsers(prevUsers => 
      prevUsers.map(user => 
        user.id === userId ? { ...user, block: !user.block } : user
      )
    );
  };

  const handleArchive = (userId) => {
    console.log(userId);
    setUpdatedUsers(prevUsers => 
      prevUsers.map(user => 
        user.id === userId ? { ...user, archive: !user.archive } : user
      )
    );
  };

  const handleMute = (userId) => {
    console.log(userId);
    setUpdatedUsers(prevUsers => 
      prevUsers.map(user => 
        user.id === userId ? { ...user, mute: !user.mute } : user
      )
    );
  };

  const handleCloseProfile = () => {
    setIsOpenUserProfile(false);
  };  

  const menuRef = useRef(null);
  const userMenuRef = useRef(null);
      const handleClickOutside = (event) => {
          if (menuRef.current && !menuRef.current.contains(event.target)) {
              setOpenSidebarChatMenu(false);
              setOpenUserMenu(false);
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
        }else{
          if (openUserMenu) {
            document.addEventListener('mousedown', handleUserChatClickOutside);
        } else {
            document.removeEventListener('mousedown', handleUserChatClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleUserChatClickOutside);
        };  
        }
          
      }, [openSidebarChatMenu,openUserMenu]);
  

  return (
    <div className="flex min-h-[88vh] overflow-hidden">
      {/* Sidebar */}
      <div className={`w-2/5  ${isDarkMode ? 'bg-[#3330] text-white' : 'bg-gray-100'} pr-4 max-[769px]:p-2 overflow-y-auto`}>
        <h2 className="text-2xl font-semibold mb-1 flex items-center gap-4">{isOpenArchive ? <FaChevronLeft onClick={() => setIsOpenArchive(false)}/> : ''}{isOpenArchive ? 'Archive' : 'Messages'}</h2>
        <hr className="mb-4 border-t border-gray-300" />

        <div className={`${isOpenArchive ? 'hidden' : ''}`}>
          {updatedUsers.filter((user) => user.archive).length > 0 && (
            <button
              className={`  ${isDarkMode ? 'hover:bg-[#444]' : 'hover:bg-gray-200'}  w-full py-2 px-4 flex items-center gap-2`}
              onClick={() => setIsOpenArchive(true)}
            >
             <MdOutlineArchive/> Archive
            </button>
          )}         
        </div>
        {
          isOpenArchive ? (
            <div ref={menuRef} >
              {updatedUsers.filter((user) => user.archive).map((user,index) => (
                <div
                key={index}
                >
                  <div           
                    className={`relative flex items-center ${index === 0 ? 'border-none' : `border-t  ${isDarkMode ? 'border-gray-600':'border-gray-300'} `} justify-between gap-3 p-3 max-[769px]:p-1 cursor-pointer ${isDarkMode ? "hover:bg-[#444]" : "hover:bg-gray-200"}${
                      selectedUser.id === user.id ? ` shadow ${isDarkMode ? "text-white bg-[#333]" : "bg-white"}` : ""
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
                        <p className="font-medium text-sm flex items-center gap-2">{user.name} {user.verified && <FaCheckCircle className="text-blue-500"/>}</p>
                        <p className="text-xs text-gray-500 truncate max-w-[150px]">
                          {user.block ? "You blocked this contact" : `${user.lastMessage}`}               
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {user.pin && <div className="flex items-center gap-1"><Pin className="text-sm w-4.5" /></div>}
                      {user.mute && <div className="flex items-center gap-1"><BellOff className="text-sm w-4.5" /></div>}
                      <div onClick={(e) => { e.stopPropagation(); setOpenSidebarChatMenu(user.id); }} className="text-gray-600">
                        <HiOutlineDotsVertical />
                      </div>
                    </div>
                    
                    {openSidebarChatMenu === user.id && (
                      <div className={`absolute top-9 right-0 mt-2 mr-2 ${isDarkMode ? 'bg-[#333]' : 'bg-white '} shadow z-10 `}>
                        <ul>
                          <li onClick={()=>setIsOpenUserProfile(true)} className="px-2 pr-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2"><FaRegUser />View Profile</li>
                          <li onClick={() => handlePin(user.id)} className="px-2 pr-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2">{user.pin ? <div className="flex items-center gap-2"><PinOff className="text-xl w-4.5"/>Unpin</div> : <div className="flex items-center gap-2"><Pin className="text-xl w-4.5" />Pin</div>}</li>
                          <li onClick={() => handleMute(user.id)} className="px-2 pr-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2">{user.mute ? <div className="flex items-center gap-2"><Bell  className="text-xl w-4.5"/>Unmute</div> : <div className="flex items-center gap-2"><BellOff className="text-xl w-4.5" />Mute</div>}</li>
                          <li className="px-2 pr-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2"><Trash2  className="text-xl w-4.5"/>Delete</li>
                          <li onClick={() => handleArchive(user.id)} className="px-2 pr-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2">{user.archive ? <div className="flex items-center gap-2"><MdOutlineUnarchive />Unarchive</div> : <div className="flex items-center gap-2"><MdOutlineArchive/>Archive</div>}</li>
                          <li onClick={() => handleBlock(user.id)} className="px-2 pr-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2">{user.block ? <div className="flex items-center gap-2"><MdBlock/>Unblock</div> : <div className="flex items-center gap-2"><MdBlock/>Block</div>}</li>
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ):(
            <div ref={menuRef} >
              {[...updatedUsers.filter((user) => user.pin)].concat([...updatedUsers.filter((user) => !user.pin && !user.archive)]).map((user,index) => (
                <div
                key={user.id}
                >
                  <div           
                    className={`relative ${index === 0 ? 'border-none' : `border-t  ${isDarkMode ? 'border-gray-600':'border-gray-300'} `} flex items-center justify-between gap-3 p-3 max-[769px]:p-1 cursor-pointer  ${isDarkMode ? "hover:bg-[#444]" : "hover:bg-gray-200"} ${
                      selectedUser.id === user.id ? ` shadow ${isDarkMode ? "text-white bg-[#333]" : "bg-white"}` : ""
                    }`}
                    onClick={() => setSelectedUser(user)}
                    
                  > 
                    <div className="flex items-center gap-3">
                      <Image
                        width={40}
                        height={40}
                        src={user.avatar}
                        className="w-10 h-10 object-cover"
                        alt={user.name}
                      />
                      <div>
                        <p className="font-medium text-sm flex items-center gap-2">{user.name} {user.verified && <FaCheckCircle className="text-blue-500"/>}</p>
                        <p className={`text-xs  ${isDarkMode ? "text-gray-400" : "text-gray-500"} truncate max-w-[150px]`}>
                          {user.block ? "You blocked this contact" : `${user.lastMessage}`}               
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {user.pin && <div className="flex items-center gap-1"><Pin className="text-sm w-4.5" /></div>}
                      {user.mute && <div className="flex items-center gap-1"><BellOff className="text-sm w-4.5" /></div>}
                      <div onClick={(e) => { e.stopPropagation(); setOpenSidebarChatMenu(user.id); }} className="text-gray-600">
                        <HiOutlineDotsVertical />
                      </div>
                    </div>
                    
                    {openSidebarChatMenu === user.id && (
                      <div className={`absolute top-9 right-0 mt-2 mr-2 ${isDarkMode ? "bg-[#222]" : "bg-white"} shadow z-10`}>
                        <ul>
                          <li onClick={()=>setIsOpenUserProfile(true)} className="px-2 pr-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2"><FaRegUser />View Profile</li>
                          <li onClick={() => handlePin(user.id)} className="px-2 pr-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2">{user.pin ? <div className="flex items-center gap-2"><PinOff className="text-xl w-4.5"/>Unpin</div> : <div className="flex items-center gap-2"><Pin className="text-xl w-4.5" />Pin</div>}</li>
                          <li onClick={() => handleMute(user.id)} className="px-2 pr-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2">{user.mute ? <div className="flex items-center gap-2"><Bell  className="text-xl w-4.5"/>Unmute</div> : <div className="flex items-center gap-2"><BellOff className="text-xl w-4.5" />Mute</div>}</li>
                          <li className="px-2 pr-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2"><Trash2  className="text-xl w-4.5"/>Delete</li>
                          <li onClick={() => handleArchive(user.id)} className="px-2 pr-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2">{user.archive ? <div className="flex items-center gap-2"><MdOutlineUnarchive />Unarchive</div> : <div className="flex items-center gap-2"><MdOutlineArchive/>Archive</div>}</li>
                          <li onClick={() => handleBlock(user.id)} className="px-2 pr-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2">{user.block ? <div className="flex items-center gap-2"><MdBlock/>Unblock</div> : <div className="flex items-center gap-2"><MdBlock/>Block</div>}</li>
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )            
        }
        
      </div>

      {/* Chat Window */}

      <div className={`relative w-full p-4 max-[425px]:p-0 flex flex-col justify-between ${isDarkMode ? "bg-[#222]" : "bg-white"}`}>
        
        {isOpenUserProfile ? (
          <UserProfile selectedUser={selectedUser} close={handleCloseProfile}/>
        ) : (
        <div>
          <div className="mb-4 ">
            <div ref={userMenuRef} className="relative flex items-center justify-between border-b border-gray-200 pb-2 mb-2">
              <div onClick={()=>setIsOpenUserProfile(true)} className="flex items-center cursor-pointer">
                <Image
                  src={selectedUser.avatar}
                  alt={selectedUser.name}
                  className="w-10 h-10 object-cover"
                  width={40}
                  height={40}
                />
                <div className="ml-2">
                  <p className="font-semibold flex items-center gap-4">{selectedUser.name} {selectedUser.verified && <FaCheckCircle className="text-blue-500"/>}</p>
                  <p className="text-xs text-gray-500 truncate max-w-[150px]">
                    last seen: {selectedUser.last_seen}
                  </p>
                </div>
                {/* <span className="font-semibold ml-2">{selectedUser.name}</span> */}
              </div>
              <HiOutlineDotsVertical className="cursor-pointer" onClick={(e) => { e.stopPropagation(); setOpenUserMenu(true); }}/>
              {openUserMenu && (
                <div className="absolute top-9 right-0 mt-2 mr-2 bg-white shadow z-10">
                  <ul>
                    <li onClick={(e) => { console.log("View Profile")}} className="px-2 pr-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2"><FaRegUser />View Profile</li>
                    <li onClick={(e) => { e.stopPropagation(); alert("Pin Chat")}} className="px-2 pr-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2"><Pin className="text-xl w-4.5"/>Pin</li>
                    <li onClick={(e) => { e.stopPropagation(); alert("Mute")}} className="px-2 pr-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2"><BellOff  className="text-xl w-4.5"/>Mute</li>
                    <li onClick={(e) => { e.stopPropagation(); alert("Delete Chat")}} className="px-2 pr-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2"><Trash2  className="text-xl w-4.5"/>Delete</li>
                    <li onClick={(e) => { e.stopPropagation(); alert("Archive Chat")}} className="px-2 pr-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2"><MdOutlineArchive  />Archive</li>
                    <li onClick={(e) => { e.stopPropagation(); alert("Block")}} className="px-2 pr-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2"><MdBlock  />Block</li>
                  </ul>
                </div>
              )}
            </div>
            
            {/* Messages */}
            <div className="space-y-4 max-[426px]:space-y-2 max-h-[75vh] overflow-y-scroll pr-2">
              {selectedUser.messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${msg.from === "me" ? "justify-end" : "justify-start"}`}
                >             
                    <div
                      className={`px-4 py-2 flex items-end gap-2 max-w-[70%] text-sm shadow max-[426px]:px-2 ${
                        msg.from === "me" ? "bg-gray-200" : "bg-[#adadadc5]"
                      }`}
                    >
                      {msg.text} <span className="block text-[10px]">{msg.time} </span>{msg.from === "me" && <div className=""><BsCheck2All className="text-green-500"/></div>}
                    </div>
                </div>
              ))}
            </div>
          </div>
          {/* Attachments */}
          <div className="absolute bottom-12 px-5 left-0 w-full flex flex-wrap gap-3">
          {inputFiles.map((file, index) => (
            <div key={index} className="flex flex-col bg-gray-200  mb-2">
              {file ?
              <div className="flex"><Image src={URL.createObjectURL(file) } alt={'file.name'} width={100} height={100} className="w-20 h-15 object-cover" /></div>:<p className="text-xs text-gray-500">{file.name}</p>}
              <button
                      type="button"
                      className="text-red-500 hover:text-red-700 text-2xl"
                      onClick={() => setInputFiles(inputFiles.filter((f, i) => i !== index))}                  
                    >
                      ×
              </button>
            </div>
          ))}
          </div>
          {/* Send Message */}       
          {!selectedUser.block ? (
            <div className="flex gap-2 absolute bottom-1 left-0 w-full bg-white p-2">
              <input type="file" className="hidden" id="fileInput" onChange={handleFileChange} />
              <label htmlFor="fileInput" className="text-gray-700 text-2xl flex items-center cursor-pointer">
                <MdAttachFile />
              </label>
              <input
                type="text"
                placeholder="Type a message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                className="w-full border border-gray-300 p-2 text-sm"
              />
              <button
                onClick={sendMessage}
                className="bg-[#222529] text-white px-4 py-2 text-sm hover:bg-[#222] cursor-pointer flex items-center gap-2"
              >
                Send <FiSend />
              </button>
            </div>
          ) : (
            <div className="flex flex-col justify-center gap-4 items-center absolute  bottom-1 left-0 w-full bg-white p-2 text-center">
              <p className="text-sm text-gray-500">This user has been blocked. To send a message, unblock the user</p>
              <div className="bg-black text-white px-4 py-2 text-sm flex items-center gap-2"><MdBlock className="text-xl w-4.5"/>Unblock</div>
            </div>
          )}
        </div> 
        )}
      </div>
    </div>
  );
};

export default ReceiverMessages;
