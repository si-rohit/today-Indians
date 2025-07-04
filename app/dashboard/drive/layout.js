"use client";
import React, { use, useEffect, useState } from "react";
import {
  FiHome,
  FiHardDrive,
  FiUsers,
  FiClock,
  FiStar,
  FiTrash,
  FiSearch,
  FiFolder,
  FiFileText,
  FiImage,
  FiVideo,
  FiFile,
  FiPlus,
} from "react-icons/fi";
import { AiOutlineCloud } from "react-icons/ai";
import { BsThreeDotsVertical } from "react-icons/bs";
import Drive from "./page";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { MdUploadFile,MdDriveFileMoveOutline  } from "react-icons/md";
import { useSelector } from "react-redux";

const Layout = ({ children }) => {
    const [search, setSearch] = useState("");
    const [showcreateModal, setShowCreateModal] = useState(false);
    const router = useRouter();
    const path = usePathname();
    const [activeTab, setActiveTab] = useState("");
    const [loading, setLoading] = useState(false);
    const [folderName, setFolderName] = useState('');
    const [inputFile, setInputFile] = useState('');
    const [showCreateInput, setShowCreateInput] = useState(false);
    const [bytes, setBytes] = useState('');

    const searchParams = useSearchParams();
    const id = searchParams.get("id");
    // console.log(id);
    const { userFolders } = useSelector(store => store.auth)

    useEffect(() => {
      switch (path) {
        case "/dashboard/drive/my-drive":
          setActiveTab("my-drive");
          break;
        case "/dashboard/drive/recent":
          setActiveTab("recent");
          break;
        case "/dashboard/drive/starred":
          setActiveTab("starred");
          break;
        case "/dashboard/drive/trash":
          setActiveTab("trash");
          break;
        case "/dashboard/drive/shared-with-me":
          setActiveTab("shared-with-me");
          break;
        default:
          setActiveTab("home");
      }
    }, [path]);

    let parentId = '';
      if (id){
        parentId = id;
      }else{
        parentId = userFolders;
      }
    
      // console.log(userFolders);

    const handleCreateFolder = async() => {
      setShowCreateInput(false);
      setLoading(true);     

       try {
        const response = await fetch('/api/create-folder', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // 'Authorization': '1',
            },
            body: JSON.stringify({ folderName: folderName, parentId: parentId }),
        })
        const res = await response.json();
        console.log(res);
        setLoading(false);
      } catch (error) {
          console.log('Error creating folder:', error);
          alert(error)
          setLoading(false);
      }
    }
    
    
    useEffect(() => {
      if (inputFile !== '') {
        const handleUploadFile = async() => {
          setLoading(true);
          const formData = new FormData();
          formData.append('file', inputFile);
          formData.append('folderId', parentId);
          const res = await fetch('/api/upload-file', {
            method: 'POST',
            body: formData
          })
          const data = await res.json();
          console.log(data);
          setLoading(false);
        }
        handleUploadFile();
      }
      // 
    }, [inputFile, parentId]);

    // console.log(userFolders);

    useEffect(() => {
      const handleMemorySize = async()=>{
        const response = await fetch(`/api/folder-size?id=${userFolders}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            // 'Authorization': '1',
          },
        })
        const res = await response.json();
        // console.log(res);
        setBytes(res.sizeInBytes);
      }
      handleMemorySize();
    }, [userFolders]);

    const humanReadableSize = () => {
      if (bytes < 1024) return `${bytes} B`;
      if (bytes < 1024 ** 2) return `${(bytes / 1024).toFixed(2)} KB`;
      if (bytes < 1024 ** 3) return `${(bytes / 1024 ** 2).toFixed(2)} MB`;
      return `${(bytes / 1024 ** 3).toFixed(2)} GB`;
    };
    const MemorySize = (humanReadableSize());

  return (
    <div className="flex h-screen bg-white">
          {/* Sidebar */}
          <aside className="relative w-64 bg-gray-100 pr-3 border-gray-300 border-r overflow-hidden">
            <button onClick={() => setShowCreateModal(!showcreateModal)} className="flex items-center gap-2 bg-black text-white px-4 py-2 w-full mb-4">
              <FiPlus /> New
            </button>
            {
              showcreateModal && (
                <div className="absolute top-10 w-[95.4%] mr-3 left-0 flex flex-col items-center justify-center text-gray-600 bg-gray-200">
                  <h2 className="text-sm font-semibold cursor-pointer hover:bg-white w-full py-2 px-3 flex items-center gap-2" onClick={() => setShowCreateInput(true)}><MdDriveFileMoveOutline className="text-xl"/> New Folder</h2>
                  <input type="file" className="hidden" onChange={(e) => setInputFile(e.target.files[0])} id="inputFile" name="inputFile"/>
                  <label htmlFor="inputFile" className="text-sm font-semibold cursor-pointer hover:bg-white w-full py-2 px-3 flex items-center gap-2"><MdUploadFile className="text-xl"/> Upload File</label>
                </div>
              )                 
            }
            <ul className="space-y-1 text-gray-700 text-sm">
              {/* <li onClick={() => router.push("/dashboard/drive")} className={`flex items-center gap-3 p-2 hover:bg-gray-200 cursor-pointer  ${activeTab === "home" ? "bg-gray-50" : ""}`}>
                <FiHome /> Home
              </li> */}
              <li onClick={() => router.push("/dashboard/drive/my-drive")} className={`flex items-center gap-3 p-2 hover:bg-gray-200 cursor-pointer  ${activeTab === "my-drive" ? "bg-gray-50" : ""}`}>
                <FiHardDrive /> My Drive
              </li>
              {/* <li onClick={() => router.push("/dashboard/drive/shared-with-me")} className={`flex items-center gap-3 p-2 hover:bg-gray-200 cursor-pointer  ${activeTab === "shared-with-me" ? "bg-gray-50" : ""}`}>
                <FiUsers /> Shared with me
              </li>
              <li onClick={() => router.push("/dashboard/drive/recent")} className={`flex items-center gap-3 p-2 hover:bg-gray-200 cursor-pointer  ${activeTab === "recent" ? "bg-gray-50" : ""}`}>
                <FiClock /> Recent
              </li>
              <li onClick={() => router.push("/dashboard/drive/starred")} className={`flex items-center gap-3 p-2 hover:bg-gray-200 cursor-pointer  ${activeTab === "starred" ? "bg-gray-50" : ""}`}>
                <FiStar /> Starred
              </li>
              <li onClick={() => router.push("/dashboard/drive/trash")} className={`flex items-center gap-3 p-2 hover:bg-gray-200 cursor-pointer  ${activeTab === "trash" ? "bg-gray-50" : ""}`}>
                <FiTrash /> Trash
              </li> */}
             <li className="flex items-center gap-3 p-2 mt-4 text-xs text-gray-500">
                <AiOutlineCloud /> Storage
              </li>
              <div className="w-full h-2 bg-gray-200 overflow-hidden">
                <div style={{width: `${Math.round((bytes / 5e+9) * 100)}%`}} className="bg-gray-700 h-2"></div>
              </div>
              <p className="text-xs mt-1">{MemorySize} of 5 GB used</p>
              {/* <button className="text-blue-600 text-xs mt-2 hover:underline">
                Get more storage
              </button> */}
            </ul>
          </aside>
    
          {/* Main Content */}
          <main className="relative flex-1 p-4 overflow-y-auto">
            {/* Search */}
            <div className="relative w-full flex items-center justify-between">
              <div className="absolute z-40 top-0 left-0 w-full max-w-md flex items-center gap-2 border border-gray-300 px-2">
                <FiSearch className=" text-gray-500" />
                <input
                  type="text"
                  placeholder="Search in Drive"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full py-2 outline-none focus:outline-none"
                />
              </div>
            </div>
            {/* <Drive /> */}
            { children }
          </main>

          {
            showCreateInput && (
              <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-[#000000bb] z-50">
                <div className="bg-white p-4 ">
                  <input
                    type="text"
                    placeholder="Enter folder name"
                    value={folderName}
                    onChange={(e) => setFolderName(e.target.value)}
                    className="w-full py-2 outline-none focus:outline-none border border-gray-300 px-2"
                  />
                  <div className="flex justify-end mt-4 gap-4">
                    <button className="text-gray-600 mr-2 cursor-pointer" onClick={() => setShowCreateInput(false)}>
                      Cancel
                    </button>
                    <button className="bg-gray-300 text-black px-4 py-2 cursor-pointer" onClick={() => handleCreateFolder()}>
                      Create
                    </button>
                  </div>
                </div>
              </div>
            )
          }

          {loading && 
            <div className="fixed bottom-7 right-10 p-2 px-4 flex  items-center justify-center bg-[#000000] z-50">
              <h1 className="text-white">Working ...</h1>
              <div className="loader">
                <div className="box-load1"></div>
                <div className="box-load2"></div>
                <div className="box-load3"></div>
              </div>
            </div>}
        </div>
  )
}

export default Layout