'use client'
import React from 'react'
import { useState } from "react";
import {
  FaUserCircle,
  FaFileWord,
  FaVideo
} from "react-icons/fa";
import { FaFilePdf, FaImage, FaFolder, FaUsers } from "react-icons/fa";
import { BsInfoCircle } from "react-icons/bs";
import { IoIosList, IoMdGrid } from "react-icons/io";
import { MdArrowDropDown } from "react-icons/md";

const Page = () => {
  const allFiles = [
    { name: "Document", type: "folder", modified: "Mar 24, 2023", size: "—" },
    { name: "top 10", type: "folder", modified: "Sep 1, 2024", size: "—" },
    { name: "10th dmc.jpg", type: "image", modified: "May 25, 2022", size: "171 KB" },
    { name: "video_tutorial.mp4", type: "video", modified: "May 2, 2022", size: "20 MB" },
    { name: "project_doc.docx", type: "word", modified: "Apr 6, 2022", size: "200 KB" },
    { name: "file.pdf", type: "pdf", modified: "Mar 5, 2022", size: "350 KB" },
    { name: "CORS blog.olakrutrim.asf", type: "shared", modified: "Sep 9, 2024", size: "30.6 MB" },
  ];
  const typeOptions = ["All", "PDF", "Word", "Image", "Video", "Folder", "Shared"];

  const [view, setView] = useState("list");
  const [selectedType, setSelectedType] = useState("All");
  const [showTypeDropdown, setShowTypeDropdown] = useState(false);

  const renderIcon = (type) => {
    switch (type) {
      case "folder": return <FaFolder className="text-gray-600 text-lg" />;
      case "image": return <FaImage className="text-red-500 text-lg" />;
      case "pdf": return <FaFilePdf className="text-red-500 text-lg" />;
      case "shared": return <FaUsers className="text-red-500 text-lg" />;
      case "word": return <FaFileWord className="text-blue-600 text-lg" />;
      case "video": return <FaVideo className="text-purple-600 text-lg" />;
      default: return null;
    }
  };
  const filteredFiles =
  selectedType === "All"
    ? allFiles
    : allFiles.filter((file) => file.type.toLowerCase() === selectedType.toLowerCase());

  return (
    <div className="w-full relative">
      <h2 className="text-2xl font-semibold mb-4">Shared with me</h2>

      {/* Filters + View Toggle */}
      <div className="flex justify-between items-center mb-4 relative">
        <div className="flex gap-3 relative">
          {/* Type Filter Button */}
          <button
            onClick={() => setShowTypeDropdown(!showTypeDropdown)}
            className="border px-3 py-1 bg-[#f3f4f6] text-sm text-gray-700 hover:bg-gray-100 flex items-center"
          >
            Type <MdArrowDropDown className="ml-1" />
          </button>

          {/* Type Dropdown */}
          {showTypeDropdown && (
            <div className="absolute z-10 mt-10 bg-white shadow-md w-40">
              {typeOptions.map((type) => (
                <div
                  key={type}
                  onClick={() => {
                    setSelectedType(type);
                    setShowTypeDropdown(false);
                  }}
                  className="px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer"
                >
                  {type}
                </div>
              ))}
            </div>
          )}

          {/* Placeholder for other filters */}
          {["People", "Modified", "Source"].map((item) => (
            <button
              key={item}
              className="border px-3 py-1 bg-[#f3f4f6] text-sm text-gray-700 hover:bg-gray-100"
            >
              {item}
            </button>
          ))}
        </div>

        {/* View toggle and info */}
        <div className="flex items-center gap-2">
          <button onClick={() => setView("list")} className={`p-2 rounded-full hover:bg-gray-200 ${view === 'list' ? 'bg-gray-100' : ''}`}>
            <IoIosList size={20} />
          </button>
          <button onClick={() => setView("grid")} className={`p-2 rounded-full hover:bg-gray-200 ${view === 'grid' ? 'bg-gray-100' : ''}`}>
            <IoMdGrid size={20} />
          </button>
          <BsInfoCircle size={20} className="ml-2 text-gray-600" />
        </div>
      </div>

      {/* File List Header */}
      <div className="grid grid-cols-12 text-sm font-medium border-b pb-2 text-gray-600">
        <div className="col-span-5">Name</div>
        <div className="col-span-2">Owner</div>
        <div className="col-span-3">Last modified</div>
        <div className="col-span-2">File size</div>
      </div>

      {/* File Rows */}
      <div className="mt-2 space-y-3">
        {filteredFiles.length > 0 ? (
          filteredFiles.map((file, idx) => (
            <div
              key={idx}
              className="grid grid-cols-12 items-center text-sm text-gray-700 hover:bg-gray-50 p-2 rounded-lg transition"
            >
              <div className="col-span-5 flex items-center gap-2 truncate">
                {renderIcon(file.type)}
                <span className="truncate">{file.name}</span>
              </div>
              <div className="col-span-2 flex items-center gap-1">
                <FaUserCircle className="text-lg text-blue-500" />
                <span>me</span>
              </div>
              <div className="col-span-3">{file.modified}</div>
              <div className="col-span-2">{file.size}</div>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500 py-10">No files found for selected type.</div>
        )}
      </div>
    </div>
  )
}

export default Page