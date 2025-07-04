'use client';

import React from 'react';

const DashboardScreenSkeleton = () => {
  return (
    <div className="max-w-7xl mx-auto h-full animate-pulse">

      {/* Header Skeleton */}
      <div className="flex justify-between items-center mb-6">
        <div className="h-8 w-48 bg-gray-300 rounded" />
        <div className="h-10 w-36 bg-gray-400 rounded" />
      </div>

      {/* Stats Cards Skeleton */}
      <div className="grid grid-cols-4 gap-6 mb-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="bg-white shadow p-4 rounded flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <div className="h-10 w-10 bg-gray-300 rounded" />
              <div>
                <div className="h-6 w-24 bg-gray-300 rounded mb-2" />
                <div className="h-4 w-32 bg-gray-200 rounded" />
              </div>
            </div>
            <div className="h-3 w-40 bg-gray-100 rounded" />
          </div>
        ))}
      </div>

      {/* Chart + Recent Articles */}
      <div className="grid grid-cols-3 gap-6 mb-6">
        {/* Recent Articles */}
        <div className="bg-white p-4 rounded shadow space-y-4">
          <div className="h-6 w-32 bg-gray-300 rounded" />
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gray-300 rounded" />
              <div className="flex-1 space-y-2">
                <div className="h-4 w-5/6 bg-gray-200 rounded" />
                <div className="h-3 w-1/2 bg-gray-100 rounded" />
              </div>
              <div className="text-right space-y-2">
                <div className="h-4 w-12 bg-gray-200 rounded" />
                <div className="h-3 w-8 bg-gray-100 rounded" />
              </div>
            </div>
          ))}
        </div>

        {/* Views Chart */}
        <div className="col-span-2 bg-white p-4 rounded shadow relative">
          <div className="h-6 w-32 bg-gray-300 rounded mb-2" />
          <div className="h-6 w-48 bg-gray-200 rounded mb-4" />
          <div className="absolute top-4 right-4 h-4 w-40 bg-gray-100 rounded" />
          <div className="h-[350px] bg-gray-100 rounded" />
        </div>
      </div>

      {/* Traffic + Category */}
      <div className="grid grid-cols-3 gap-6">
        {/* Traffic Sources */}
        <div className="col-span-2 bg-white p-4 rounded shadow space-y-6">
          <div className="h-6 w-32 bg-gray-300 rounded" />
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex items-center gap-4">
              <div className="h-4 w-20 bg-gray-200 rounded" />
              <div className="w-full h-4 bg-gray-100 rounded" />
              <div className="h-4 w-10 bg-gray-200 rounded" />
            </div>
          ))}
        </div>

        {/* Category Breakdown */}
        <div className="bg-white p-4 rounded shadow relative flex flex-col items-center">
          <div className="h-6 w-32 bg-gray-300 rounded mb-2" />
          <div className="h-6 w-48 bg-gray-200 rounded mb-4" />
          <div className="absolute top-4 right-4 h-6 w-20 bg-gray-100 rounded" />
          <div className="w-full h-[300px] bg-gray-100 rounded" />
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="w-3 h-3 bg-gray-300 rounded-full" />
                <div className="h-3 w-16 bg-gray-200 rounded" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardScreenSkeleton;
