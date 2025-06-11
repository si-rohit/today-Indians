"use client";
import React, { useEffect, useState } from "react";
import {
 
  FiFolder,
  FiFileText,
  FiImage,
  FiVideo,
  FiFile,
  FiArrowDown,
} from "react-icons/fi";
import { FaAngleDown } from "react-icons/fa";
import { AiOutlineCloud } from "react-icons/ai";
import { BsThreeDotsVertical } from "react-icons/bs";
import FetchDataAPI from "./apicall/FetchDataAPI";
import { useSelector } from "react-redux";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Paage from './my-drive/page'

const files = [
  { name: "Resume", type: "doc", reason: "You edited • Apr 29, 2025", owner: "me", location: "My Drive" },
  { name: "Resume", type: "doc", reason: "You edited • Apr 21, 2025", owner: "me", location: "My Drive" },
  { name: "Rohit Resume", type: "doc", reason: "You edited • Apr 20, 2025", owner: "me", location: "My Drive" },
  { name: "Untitled document", type: "doc", reason: "You opened • Apr 29, 2025", owner: "me", location: "My Drive" },
  { name: "Resume.pdf", type: "pdf", reason: "You created • Apr 21, 2025", owner: "me", location: "My Drive" },
];

const getFileIcon = (type) => {
  switch (type) {
    case "doc":
      return <FiFileText className="text-blue-500 text-xl" />;
    case "pdf":
      return <FiFile className="text-red-500 text-xl" />;
    case "image":
      return <FiImage className="text-green-500 text-xl" />;
    case "video":
      return <FiVideo className="text-purple-500 text-xl" />;
    default:
      return <FiFileText className="text-gray-400 text-xl" />;
  }
};

const Page = ()=> {
  const [search, setSearch] = useState("");
  const [fetchData, setFetchData] = useState([]);
  const router = useRouter();
  useEffect(() => {
    router.push('/dashboard/drive/my-drive');
  }, [router]);

  const { user } = useSelector(store => store.auth);

  const directory = String(`users/${user.user_id}`);
    useEffect(() => {
      FetchDataAPI({directory: directory, onData: (data) => setFetchData(data)});
    },[directory])

    // console.log(fetchData);

  return (
    // <div className="flex w-full bg-white">

    //   {/* Main Content */}
    //   <main className=" w-full overflow-y-auto">
    //     {/* Welcome Section */}
    //     <h2 className="text-2xl font-bold mb-2">Drive</h2>

    //     {/* Suggested Folders */}
    //     <div className="mb-6">
    //       <h3 className="text-gray-700 text-md font-semibold mb-2 flex items-center">Suggested folders <FaAngleDown /></h3>
    //       <div className="grid grid-cols-1 md:grid-cols-3 gap-4 overflow-x-auto">

    //         {fetchData?.folders?.map((folder, index) => (
    //           <div
    //             key={index}
    //             className="p-3 bg-[#f3f4f6] flex items-center gap-3 shadow-sm"
    //           >
    //             <FiFolder className="text-gray-700 text-2xl" />
    //             <div>
    //               <p className="text-sm font-medium">{folder}</p>
    //               {/* <p className="text-xs text-gray-500">{folder.location}</p> */}
    //             </div>
    //             <BsThreeDotsVertical className="ml-auto text-gray-400 cursor-pointer" />
    //           </div>
    //         ))}
    //       </div>
    //     </div>

    //     {/* Suggested Files */}
    //     <div>
    //       <h3 className="text-gray-700 text-md font-semibold mb-2 flex items-center">Suggested files <FaAngleDown /></h3>
    //       <div className=" overflow-hidden">
    //         <table className="w-full text-sm text-left">
    //           <thead className="bg-gray-100 border-b border-gray-300">
    //             <tr>
    //               <th className="px-4 py-2">Name</th>
    //             </tr>
    //           </thead>
    //           <tbody>
    //             {fetchData?.files?.map((file, index) => (
    //                 <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
    //                   <Link href={file.url} target="_blank" className="cursor-pointer px-4 py-2 flex items-center gap-2">                    
    //                       {getFileIcon(file.type)}
    //                       {file.name}
    //                   </Link>
    //                 </tr>
    //               ))}
    //           </tbody>
    //         </table>
    //         {files.filter((f) => f.name.toLowerCase().includes(search.toLowerCase())).length === 0 && (
    //           <p className="text-center py-4 text-gray-500">No files found.</p>
    //         )}
    //       </div>
    //     </div>
    //   </main>
    // </div>

    <Paage />
  );
}

export default Page;