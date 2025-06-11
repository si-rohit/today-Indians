'use client';
import React, { useState } from "react";
import { BookOpen, Video, FileText } from "lucide-react";

const libraryData = [
  { type: "Article", icon: <FileText className="text-blue-600 w-5 h-5" />, title: "Breaking News: Covering Tragedy Responsibly", updated: "1 day ago" },
  { type: "Video", icon: <Video className="text-green-600 w-5 h-5" />, title: "How to Create Viral News Videos", updated: "3 days ago" },
  { type: "Guide", icon: <BookOpen className="text-purple-600 w-5 h-5" />, title: "Ethics in Journalism - Complete Guide", updated: "5 days ago" },
  { type: "Article", icon: <FileText className="text-blue-600 w-5 h-5" />, title: "Political Bias & Fact Checking", updated: "2 days ago" },
  { type: "Video", icon: <Video className="text-green-600 w-5 h-5" />, title: "News Anchoring Techniques", updated: "4 hours ago" },
  { type: "Article", icon: <FileText className="text-blue-600 w-5 h-5" />, title: "Elections 2025: Reporting Guidelines", updated: "3 days ago" },
  { type: "Guide", icon: <BookOpen className="text-purple-600 w-5 h-5" />, title: "SEO Tips for News Websites", updated: "6 days ago" },
  { type: "Article", icon: <FileText className="text-blue-600 w-5 h-5" />, title: "Covering Protests and Civil Unrest", updated: "2 weeks ago" },
  { type: "Video", icon: <Video className="text-green-600 w-5 h-5" />, title: "Documentary Editing in Premiere Pro", updated: "1 month ago" },
  { type: "Guide", icon: <BookOpen className="text-purple-600 w-5 h-5" />, title: "Using AI in Journalism: Tools & Ethics", updated: "4 weeks ago" },
  { type: "Article", icon: <FileText className="text-blue-600 w-5 h-5" />, title: "Fake News Detection Techniques", updated: "6 days ago" },
  { type: "Video", icon: <Video className="text-green-600 w-5 h-5" />, title: "Live Streaming News Coverage", updated: "2 days ago" },
  { type: "Guide", icon: <BookOpen className="text-purple-600 w-5 h-5" />, title: "Press Law & Media Freedom in India", updated: "1 week ago" },
  { type: "Article", icon: <FileText className="text-blue-600 w-5 h-5" />, title: "How to Conduct Interviews", updated: "10 days ago" },
  { type: "Video", icon: <Video className="text-green-600 w-5 h-5" />, title: "Mobile Journalism Tutorial", updated: "3 hours ago" },
  { type: "Article", icon: <FileText className="text-blue-600 w-5 h-5" />, title: "Investigative Reporting Framework", updated: "5 days ago" },
  { type: "Guide", icon: <BookOpen className="text-purple-600 w-5 h-5" />, title: "Building a News Newsletter Strategy", updated: "2 weeks ago" },
  { type: "Video", icon: <Video className="text-green-600 w-5 h-5" />, title: "Shortform News Video Editing", updated: "2 months ago" },
  { type: "Guide", icon: <BookOpen className="text-purple-600 w-5 h-5" />, title: "Using Data Visualization in Articles", updated: "1 week ago" },
  { type: "Article", icon: <FileText className="text-blue-600 w-5 h-5" />, title: "Tech Reporting: Covering Startups", updated: "8 days ago" },
  { type: "Video", icon: <Video className="text-green-600 w-5 h-5" />, title: "Reporting from Conflict Zones", updated: "6 weeks ago" },
  { type: "Article", icon: <FileText className="text-blue-600 w-5 h-5" />, title: "Weather Reporting Guide", updated: "3 days ago" },
  { type: "Guide", icon: <BookOpen className="text-purple-600 w-5 h-5" />, title: "Newsroom Productivity Tools", updated: "1 month ago" },
  { type: "Video", icon: <Video className="text-green-600 w-5 h-5" />, title: "AI Scriptwriting Tools for Reporters", updated: "2 months ago" },
  { type: "Guide", icon: <BookOpen className="text-purple-600 w-5 h-5" />, title: "Journalist Toolkit Essentials", updated: "2 weeks ago" },
];

const Library = () => {
  const [activeTab, setActiveTab] = useState("All");

  const filteredData =
    activeTab === "All" ? libraryData : libraryData.filter((item) => item.type === activeTab);

  return (
    <div className="h-full max-h-screen overflow-y-auto max-[769px]:p-0">
      <div className="text-3xl font-bold mb-6 max-[769px]:mb-2">Library</div>
      <hr className="border-t border-gray-300 mb-5"></hr>

      <div className="flex space-x-2 mb-4">
        {['All', 'Article', 'Video', 'Guide'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-3 py-1 text-sm border ${
              activeTab === tab
                ? 'bg-black text-white border-black'
                : 'text-gray-600 border-gray-300'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <ul className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-[769px]:gap-2 max-[769px]:space-y-2">
        {filteredData.map((item, index) => (
          <li key={index} className="flex flex-col items-center justify-center space-x-4 cursor-pointer bg-white p-5 py-10">
            <div className="w-8 h-8 flex items-center justify-center">{item.icon}</div>
            <div className="text-center">
              <div className="font-medium">{item.title}</div>
              <div className="text-xs text-gray-500">
                {item.type} • Updated {item.updated}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Library;
