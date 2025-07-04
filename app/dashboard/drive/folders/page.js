'use client';

import React, { useEffect, useState } from 'react';
import FetchDataAPI from '../apicall/FetchDataAPI';
import { useRouter, useSearchParams } from 'next/navigation';
import { useSelector } from 'react-redux';
import { FaEye, FaFilePdf, FaFileWord, FaFolder, FaImage, FaRegFolder, FaUserCircle, FaUsers, FaVideo } from 'react-icons/fa';
import Link from 'next/link';
import { IoIosList, IoMdGrid } from 'react-icons/io';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { MdDeleteOutline } from 'react-icons/md';
import Image from 'next/image';

const FolderManager = () => {
  const [fetchData, setFetchData] = useState([]);
  const [view, setView] = useState("grid");
  const searchParams = useSearchParams();
  const [showDropdown, setShowDropdown] = useState('');
  const id = searchParams.get("id");
  const [folderName, setFolderName] = useState("");
  const [selectFolder, setSelectFolder] = useState({
      id: '',
      type: '',
      name: ''
    });

  const router = useRouter();

  

  useEffect(()=>{
    const findFolder = async()=>{
    const response = await fetch(`/api/find-Folder-by-id`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // 'Authorization': '1',
      },
      body: JSON.stringify({ id: id }),
    });
    const data = await response.json();
    // console.log(data);
    setFolderName(data.folder.name);
    }
    findFolder();
  },[id])

  useEffect(() => {
      FetchDataAPI({folderId: id, onData: (data) => setFetchData(data)});
    },[id])

  // console.log(fetchData);

   const renderIcon = (type) => {
      switch (type) {
        case "folder": return <FaFolder className="text-gray-600 text-lg" />;
        case "image": return <FaImage className="text-red-500 text-lg" />;
        case "png": return <FaImage className="text-red-600 text-lg" />;
        case "jpg": return <FaImage className="text-red-600 text-lg" />;
        case "jpeg": return <FaImage className="text-red-600 text-lg" />;
        case "doc": return <FaFileWord className="text-blue-600 text-lg" />;
        case "pdf": return <FaFilePdf className="text-red-500 text-lg" />;
        case "shared": return <FaUsers className="text-red-500 text-lg" />;
        case "word": return <FaFileWord className="text-blue-600 text-lg" />;
        case "mp4": return <FaVideo className="text-purple-600 text-lg" />;
        default: return null;
      }
    };

      const handleOpenFolder = (id) =>{
      router.push(`/dashboard/drive/folders?id=${id}`);
    }
    const handleOpenFile = (url) =>{
      router.push(`${url}`);
    }

    // const handleRenameFolder = async()=>{
    //   try {
    //    const resp = await fetch(`/api/rename-folder`, 
    //     { method: 'PATCH',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ itemId: selectFolder.id, newName: selectFolder.name, type: selectFolder.type }) 
    //   });
    //   const data = await resp.json();
    //   if(data.error){
    //     alert(data.error);
    //     return;
    //   }
    //   // console.log(data);
    //   alert('Folder renamed successfully'); 
    //   FetchDataAPI({folderId: '', onData: (data) => setFetchData(data),folderName: user.user_id});
    //   setSelectFolder({id: '', type: '', name: ''});
    //   }catch (error) {
    //     console.log('Error renaming folder:', error);
    //     alert(error)
    //   }
    // }

    const handleDeleteFolder = async(id,type) =>{     
      try {
       const resp = await fetch(`/api/delete-folder-or-file`, 
        { method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ itemId: id, type: type }) 
      });
      const data = await resp.json();
      if(data.error){
        alert(data.error);
        return;
      }
      // console.log(data);
      alert('Folder deleted successfully'); 
      }catch (error) {
        console.log('Error deleting folder:', error);
        alert(error)
      }
      
    }

  return (
   <div className="w-full relative">
   
         {/* Filters + View Toggle */}
         <div className="flex justify-end gap-4 items-center mb-4 relative">          
           {/* View toggle and info */}
           <div className="flex items-center gap-2">
             <button onClick={() => setView("list")} className={`p-2 rounded-full hover:bg-gray-200 ${view === 'list' ? 'bg-gray-100' : ''}`}>
               <IoIosList size={20} />
             </button>
             <button onClick={() => setView("grid")} className={`p-2 rounded-full hover:bg-gray-200 ${view === 'grid' ? 'bg-gray-100' : ''}`}>
               <IoMdGrid size={20} />
             </button>
             {/* <BsInfoCircle size={20} className="ml-2 text-gray-600" /> */}
           </div>
         </div>
   
         {/* File List Header */}
         <div className={`grid grid-cols-12 ${view === 'grid' ? 'hidden' : ''}  text-sm font-medium border-b border-gray-600 pb-2 text-gray-600`}>
           <div className="col-span-5">Name</div>
         </div>
   
         
         <div className="mt-2 space-y-3">
           {/* folders */}
           <div className={`${view === 'grid' ? 'grid grid-cols-4 gap-3' : 'flex flex-col space-y-3'}`}>
              {
               fetchData?.folders?.map((folder, index) => (
                 <div
                   key={folder._id}
                   onMouseEnter={() => setShowDropdown('')}
                   onClick={()=> setSelectFolder({id: folder._id, type: 'folder', name: folder.name})}
                   onDoubleClick={() => handleOpenFolder(folder._id)}
                   onMouseLeave={() => setShowDropdown('')}
                   onContextMenu={(e) => {
                     e.preventDefault();
                     setShowDropdown(folder._id);
                     // setTimeout(() => setShowDropdown(''), 0);
                   }}
                   // ref={menuRef} 
                   className={`${selectFolder.id === folder._id ? 'bg-gray-200 border border-gray-400' : ''} relative flex justify-between items-center text-sm text-gray-700 hover:bg-gray-50 ${view === 'grid' ? ' p-3 justify-center' : `${index % 2 === 0 ? 'bg-gray-100' : ''}`} p-2 transition cursor-pointer`}
                 >
                   <div className={` ${view === 'grid' ? 'flex-col justify-center items-center' : 'gap-2'} flex `} >
                     <div className={`flex items-center justify-center  ${view === 'grid' ? 'text-9xl w-full ' : ''}`}><FaRegFolder className={`text-gray-600 `} /></div>
                     <span >{folder.name}</span>
                   </div>
                   
                   <div  className='relative'>
                   <BsThreeDotsVertical onClick={() => setShowDropdown(folder._id)} className={`${view === 'grid' ? 'hidden' : ''} cursor-pointer`}/>               
                     {
                       showDropdown === folder._id && (
                         <div className="absolute right-0 top-0 bg-white z-10 min-w-[150px] shadow-md">
                           {/* <button className="w-full px-4 py-2 text-gray-800 hover:bg-gray-100 text-start flex items-center gap-2" onClick={() => alert('download')}>Download</button> */}
                           <button className="w-full px-4 py-2 text-gray-800 hover:bg-gray-100 text-start flex items-center gap-2" onClick={() => handleOpenFolder(folder._id)}><FaEye /> View</button>
                           {/* <button className="w-full px-4 py-2 text-gray-800 hover:bg-gray-100 text-start flex items-center gap-2" onClick={() => alert('copy')}><LuCopy />Copy</button> */}
                           {/* <button className="w-full px-4 py-2 text-gray-800 hover:bg-gray-100 text-start flex items-center gap-2" onClick={() => alert('move')}><TbCut />Cut</button> */}
                           {/* <button className="w-full px-4 py-2 text-gray-800 hover:bg-gray-100 text-start flex items-center gap-2" onClick={() => setRenameItem(folder._id)}><BiRename /> Rename</button> */}
                           <button className="w-full px-4 py-2 text-gray-800 hover:bg-gray-100 text-start flex items-center gap-2" onClick={() => handleDeleteFolder(folder._id,'folder')}><MdDeleteOutline />Delete</button>
                         </div>
                       )
                     }
                   </div>
                 </div>
               ))
             }
           </div>
           
           {/* files */}
           <div className={`${view === 'grid' ? 'grid grid-cols-4 gap-3' : 'flex flex-col space-y-3'}`}>
             {
               fetchData?.files?.map((file, index) => (
                 <div
                   key={file._id}
                   onDoubleClick={()=> handleOpenFile(file.url)}
                   onMouseEnter={() => setShowDropdown('')}
                   onClick={()=> setSelectFolder({id: file._id, type: 'file', name: file.name})}
                   onContextMenu={(e) => {
                     e.preventDefault();
                     setShowDropdown(file._id);
                     // setTimeout(() => setShowDropdown(''), 0);
                   }}
                   className={`${selectFolder.id === file._id ? 'bg-gray-200 border border-gray-400' : ''} ${view === 'grid' ? 'p-3 flex flex-col' : `${index % 2 === 0 ? '' : 'bg-gray-100'}`} flex justify-between items-center text-sm text-gray-700 hover:bg-gray-50 p-2 transition cursor-pointer`}
                 >         
                     <div  className='flex flex-col items-start gap-2 truncate'>
                       <Image src={file.url} alt={file.name} width={500} height={500} className={`w-full h-[150px] mt-2 ${view === 'list' ? 'hidden' : ''}`} />
                       <div className={`flex items-center gap-2 `}>
                         <div className={`${view === 'grid' ? 'hidden' : ''}`}>{renderIcon(file.name.split('.').pop())}</div>
                         <span >{file.name}</span>
                       </div>
                     </div>
                     <div  className='relative'>
                       <BsThreeDotsVertical onClick={() => setShowDropdown(file._id)} className={`${view === 'grid' ? 'hidden' : ''} cursor-pointer`}/>               
                         {
                           showDropdown === file._id && (
                             <div className="absolute right-0 top-0 bg-white z-10 min-w-[150px] shadow-md">
                               {/* <button className="w-full px-4 py-2 text-gray-800 hover:bg-gray-100 text-start flex items-center gap-2" onClick={() => alert('download')}>Download</button> */}
                               <button className="w-full px-4 py-2 text-gray-800 hover:bg-gray-100 text-start flex items-center gap-2" onClick={() => handleOpenFile(file.url)}><FaEye /> View</button>
                               {/* <button className="w-full px-4 py-2 text-gray-800 hover:bg-gray-100 text-start flex items-center gap-2" onClick={() => alert('copy')}><LuCopy />Copy</button> */}
                               {/* <button className="w-full px-4 py-2 text-gray-800 hover:bg-gray-100 text-start flex items-center gap-2" onClick={() => alert('move')}><TbCut />Cut</button> */}
                               {/* <button className="w-full px-4 py-2 text-gray-800 hover:bg-gray-100 text-start flex items-center gap-2" onClick={() => setRenameItem(folder._id)}><BiRename /> Rename</button> */}
                               <button className="w-full px-4 py-2 text-gray-800 hover:bg-gray-100 text-start flex items-center gap-2" onClick={() => handleDeleteFolder(file._id,'folder')}><MdDeleteOutline />Delete</button>
                             </div>
                           )
                         }
                       </div>
                   
                   {/* <div className="col-span-3">{file.modified}</div> */}
                   {/* <div className="col-span-2">{file.size}</div> */}
                 </div>
               ))
             }
           </div>

           {fetchData?.folders?.length === 0 && fetchData?.files?.length === 0 && <p className="text-center text-gray-500">No files or folders found</p>}
           
         </div>
       </div>
  );
};

export default FolderManager;
