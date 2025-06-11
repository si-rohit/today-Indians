'use client'
import React from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const data = [
    { date: "18 Mar", views: 0 },
    { date: "23 Mar", views: 0 },
    { date: "27 Mar", views: 0 },
    { date: "1 Apr", views: 0 },
    { date: "5 Apr", views: 0 },
    { date: "10 Apr", views: 0 },
    { date: "14 Apr", views: 0 },
  ];

const Analytics = () => {
  return (
     <main className="flex-1 p-8">
        <h1 className="text-xl font-semibold mb-6">Channel analytics</h1>
    
        <div className="flex space-x-6 border-b border-gray-700 pb-2 mb-4">
          <span className="text-gray-500">Overview</span>
          <span className="text-gray-500">Content</span>
          <span className="text-gray-500">Audience</span>
          <span className="text-gray-500">Trends</span>
        </div>
          
            <div className="grid grid-cols-3 gap-6">
              <div className=" rounded-xl p-4">
                <p className="text-sm">Views</p>
                <p className="text-xl">—</p>
              </div>
              <div className=" rounded-xl p-4">
                <p className="text-sm">Watch time (hours)</p>
                <p className="text-xl">—</p>
              </div>
              <div className=" rounded-xl p-4">
                <p className="text-sm">Subscribers</p>
                <p className="text-xl">—</p>
              </div>
            </div>
    
            <div className=" rounded-xl mt-6 p-4">
              <ResponsiveContainer width="100%" height={150}>
                <BarChart data={data}>
                  <XAxis dataKey="date" stroke="#ccc" />
                  <YAxis stroke="#ccc" />
                  <Tooltip />
                  <Bar dataKey="views" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
              <button className="mt-4 bg-[#171717] hover:bg-[#353535] text-white px-4 py-2 text-sm">
                See more
              </button>
            </div>
    
            <div className=" rounded-xl mt-6 p-4 w-80">
              <p className="font-semibold">Realtime</p>
              <p className="text-xs text-blue-400">• Updating live</p>
              <p className="text-sm mt-4">Subscribers</p>
              <button className="bg-[#171717] hover:bg-[#353535] text-white px-4 py-1 mt-2">
                See live count
              </button>
              <p className="mt-4">0 Views · Last 48 hours</p>
              <div className="h-1 w-full bg-gray-600 mt-2" />
              <button className="mt-4 bg-[#171717] hover:bg-[#353535] text-white px-4 py-2 text-sm">
                See more
              </button>
            </div>
          </main>
    // <div>Analytics component</div>
  )
}

export default Analytics