'use client'
import React, { useEffect, useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import Image from 'next/image'
import { PieChart, Pie, Cell } from 'recharts'
import { GrArticle } from "react-icons/gr";
import search from "../../public/images/icons/search.png"
import drive from "../../public/images/icons/drive.png"
import article from "../../public/images/icons/article.png"
import analyses from "../../public/images/icons/analyses.png"

const StatsCards = ({isDarkMode}) => {
    return (
        <div className="grid grid-cols-4 gap-6 mb-6">
      {[
        { label: "Articles Published", value: "1645", sub: "are in  the Technology category",color: "text-green-500", icon: article,subValue:"36%" },
        { label: "Total Views", value: "145,894", sub: "17% up vs last 30 days", color: "text-green-500", icon: analyses, subValue:"+2.5k" },
        { label: "New Submissions", value: "14", sub: "12% down", color: "text-red-500", icon: drive, subValue:"-50%" },
        { label: "In Review", value: "21", sub: "Pending Approval", color: "text-red-500", icon: search, subValue:"" },
      ].map((card, i) => (
        <div key={i} className={` ${isDarkMode ? 'text-white bg-[#333]' : 'text-black bg-white'} shadow p-4 rounded`}>
            <div className='flex items-center gap-4'>
                <div>
                    <Image src={card.icon} alt={card.label} className='w-auto  h-10' width={24} height={24} />
                </div>
                <div>
                    <h3 className="text-xl font-bold">{card.value}</h3>
                    <p className={` text-lg font-light ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{card.label}</p>
                </div>  
            </div>
                
          <p className={`text-[12px] text-gray-500 mt-2`}><span className={`${card.color} `}>{card.subValue} </span> {card.sub}</p>
        </div>
      ))}
    </div>
    )
}

const ViewsOverview = ({isDarkMode}) => {
    const data = [
        { name: 'Aug', views: 6000 },
        { name: 'Sep', views: 9000 },
        { name: 'Oct', views: 4000 },
        { name: 'Nov', views: 7000 },
        { name: 'Dec', views: 16000 },
        { name: 'Jan', views: 3000 },
        { name: 'Feb', views: 5000 },
        { name: 'Mar', views: 2000 },
        { name: 'Apr', views: 7000 },
        { name: 'May', views: 8000 },
        { name: 'Jun', views: 11000 },
    ];
    return (
        <div className={` ${isDarkMode ? 'text-white bg-[#333]' : 'text-black bg-white'}  p-4 rounded shadow mb-6 h-full relative`}>
            <h2 className="text-lg">Views</h2>
            <p className="text-xl font-semibold mb-6">Overview</p>
            <p className={`absolute top-5 right-4 text-sm  ${isDarkMode ? 'text-gray-400' : 'text-gray-800'} mb-4 `}>Most Views: <br/> 7.3K - December, 2024</p>
            <ResponsiveContainer width="100%" height={350} className={' h-full'}>
                <BarChart data={data}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="views" fill={isDarkMode ? '#999' : '#000'} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}

const TrafficSources = ({isDarkMode}) => {
    const sources = [
    { label: 'Search', value: 45.6 },
    { label: 'Direct', value: 21.0 },
    { label: 'Email', value: 17.6 },
    { label: 'Referrals', value: 10.8 },
    { label: 'Others', value: 6.2 },
  ];

  return (
    <div className={` ${isDarkMode ? 'text-white bg-[#333]' : 'text-black bg-white'} p-4 rounded shadow h-full`}>
      <h2 className="text-lg">Traffic</h2>
      <p className='text-xl font-semibold mb-6'>Sources</p>
      {sources.map((src, i) => (
        <div key={i} className="mb-8 flex items-center gap-3">        
          <span className='w-20'>{src.label}</span>
          <div className={`w-full h-10  ${isDarkMode ? 'bg-[#444]' : 'bg-gray-200'} `}>
            <div className={`h-10 ${isDarkMode ? 'bg-[#999]' : 'bg-[#000]' }`} style={{ width: `${src.value}%` }} />
          </div>
          <span className='w-14'>{src.value}%</span>
        </div>
      ))}
    </div>
  );
}

const RecentArticles =({isDarkMode})=>{
    const articles = [
      {
        title: 'Alternative proteins gain traction in the US',
        date: '15th Dec, 2024',
        views: '1.6K',
        thumbnail: '/article-thumb.jpg', // Replace with actual images
      },
      {
        title: 'AI Chatbots are now replacing human agents',
        date: '12th Dec, 2024',
        views: '1.6K',
        thumbnail: '/article-thumb.jpg',
      },
      {
        title: 'India’s EV market growth in Q4 2024',
        date: '10th Dec, 2024',
        views: '1.6K',
        thumbnail: '/article-thumb.jpg',
      },
      {
        title: 'Alternative proteins gain traction in the US',
        date: '15th Dec, 2024',
        views: '1.6K',
        thumbnail: '/article-thumb.jpg', // Replace with actual images
      },
      {
        title: 'AI Chatbots are now replacing human agents',
        date: '12th Dec, 2024',
        views: '1.6K',
        thumbnail: '/article-thumb.jpg',
      },
      {
        title: 'India’s EV market growth in Q4 2024',
        date: '10th Dec, 2024',
        views: '1.6K',
        thumbnail: '/article-thumb.jpg',
      },
    ];
     return (
        <div className={` ${isDarkMode ? 'text-white bg-[#333]' : 'text-black bg-white'} p-4 rounded shadow h-full`}>
          <h2 className="text-lg">Recent </h2>
          <p className='text-xl font-semibold mb-4'>Articles Performance</p>
          <div className="space-y-4">
            {articles.slice(0, 5).map((article, i) => (
              <div key={i} className="flex items-center gap-4">
                <Image
                  src={article.thumbnail}
                  alt={article.title}
                  width={64}
                  height={64}
                  className="w-16 h-16 object-cover rounded"
                />
                <div className="flex-1">
                  <h3 className="font-medium text-sm">{article.title}</h3>
                  <p className="text-xs text-gray-500">{article.date}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold">{article.views}</p>
                  <p className="text-xs text-gray-400">Views</p>
                </div>
              </div>
            ))}
          </div>
        </div>
    );
}

const CategoryBreakdown = ({isDarkMode}) => {
    const data = [
      { name: 'Technology', value: 36 },
      { name: 'Lifestyle', value: 24 },
      { name: 'Health', value: 15 },
      { name: 'Education', value: 13 },
      { name: 'Entertainment', value: 12 },
    ];
    const COLORS = ['#000', '#4B5563', '#9CA3AF', '#D1D5DB', '#E5E7EB'];
    return (
        <div className={` ${isDarkMode ? 'text-white bg-[#333]' : 'text-black bg-white'} p-4 rounded relative shadow h-full `}>            
            <h2 className="text-lg">Category </h2>
            <p className='text-xl font-semibold mb-6'>Breakdown</p>
            <p className="text-xs text-gray-500 border absolute top-4 right-4 px-2 py-1">Last Month</p>
              <div className="flex flex-col items-center relative">
                <PieChart width={400} height={300} className='w-full h-auto'>
                  <Pie
                    data={data}
                    dataKey="value"
                    cx="50%"
                    cy="50%"
                    outerRadius={150}
                    // label
                  >
                    {data.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
                <div className={`text-sm w-[250px] h-[250px] absolute top-6.5 left-1/2 transform -translate-x-1/2 ${isDarkMode ? 'bg-[#333]' : 'bg-white'} rounded-full flex flex-col items-center justify-center`}>
                    <p className='text-center text-lg text-gray-500'>
                      Top Category
                    </p>
                    <p className='text-center text-2xl font-semibold'>Technology - 36%</p>
                </div>
                <div className="flex gap-2 mt-2 flex-wrap justify-center">
                  {data.map((cat, index) => (
                    <div key={cat.name} className="flex items-center text-xs text-gray-600">
                      <div
                        className="w-3 h-3 rounded-full mr-1"
                        style={{ backgroundColor: COLORS[index % COLORS.length] }}
                      />
                      {cat.name}
                    </div>
                  ))}
                </div>
              </div>
            </div>
    )
}

const DashboardScreen = () => {
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
  return (
    <div className="max-w-7xl mx-auto h-full">
          <div className="flex justify-between items-center mb-6">
            <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-black'}`}>Dashboard</h1>
            <button className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800">
              + New Article
            </button>
          </div>
    
          <StatsCards isDarkMode={isDarkMode}/>
    
          <div className="grid grid-cols-3 gap-6 mb-6">
            <RecentArticles isDarkMode={isDarkMode}/>
            <div className="col-span-2">
              <ViewsOverview isDarkMode={isDarkMode}/>
            </div>
            
          </div>
    
          <div className="grid grid-cols-3 gap-6">
            
            <div className='col-span-2'>
                <TrafficSources isDarkMode={isDarkMode}/>
            </div>
            <CategoryBreakdown isDarkMode={isDarkMode}/>
          </div>
        </div>
  )
}

export default DashboardScreen