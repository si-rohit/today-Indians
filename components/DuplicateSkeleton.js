import React from 'react'

const DuplicateSkeleton = () => {
  return (
    <div className="px-4 mt-4 animate-pulse">
      {/* Title */}
      <div className="h-10 w-3/4 bg-gray-300 mb-4 max-[426px]:w-full" />
      
      {/* Sub Description */}
      <div className="h-6 w-2/3 bg-gray-300 mb-6 max-[426px]:w-full" />

      {/* Image and Meta Description */}
      <div className="w-full mb-2">
        <div className="w-full h-[300px] bg-gray-300" />
        <div className="h-4 w-1/3 bg-gray-300 mt-2" />
      </div>

      {/* Headings */}
      <div className="space-y-3 mb-6">
        <div className="h-8 w-1/2 bg-gray-300" />
        <div className="h-6 w-2/5 bg-gray-300" />
        <div className="h-6 w-1/3 bg-gray-300" />
        <div className="h-5 w-1/4 bg-gray-300" />
        <div className="h-5 w-1/5 bg-gray-300" />
        <div className="h-4 w-1/6 bg-gray-300" />
      </div>

      {/* Paragraph */}
      <div className="space-y-3 mb-6">
        <div className="h-4 w-full bg-gray-300" />
        <div className="h-4 w-[80%] bg-gray-300" />
        <div className="h-4 w-[90%] bg-gray-300" />
      </div>

      {/* Blockquote */}
      <div className="h-5 w-[70%] bg-gray-300 border-l-4 border-blue-500 mb-6 pl-4" />

      {/* Link text */}
      <div className="h-4 w-[50%] bg-gray-300 mb-6" />

      {/* Notes */}
      <div className="h-4 w-[60%] bg-gray-300 mb-6" />

      {/* Details/Disclosure section */}
      <div className="space-y-2 mb-6">
        <div className="h-5 w-[40%] bg-gray-300" />
        <div className="h-4 w-[30%] bg-gray-300 ml-4" />
        <div className="h-4 w-[30%] bg-gray-300 ml-4" />
        <div className="h-4 w-[30%] bg-gray-300 ml-4" />
        <div className="h-4 w-[30%] bg-gray-300 ml-4" />
      </div>

      {/* Form Fields */}
      <div className="border border-gray-300 p-4 mb-6 space-y-4">
        <div className="h-4 w-1/4 bg-gray-300" />
        <div className="h-10 w-full bg-gray-300" />
        <div className="h-4 w-1/4 bg-gray-300" />
        <div className="h-20 w-full bg-gray-300" />
        <div className="h-4 w-1/4 bg-gray-300" />
        <div className="h-10 w-full bg-gray-300" />
        <div className="h-10 w-40 bg-gray-400" />
      </div>

      {/* Code Example */}
      <div className="h-24 w-full bg-gray-200 mb-6" />

      {/* Ordered List */}
      <div className="space-y-2 mb-4">
        <div className="h-4 w-[40%] bg-gray-300" />
        <div className="h-4 w-[30%] bg-gray-300" />
        <div className="h-4 w-[35%] bg-gray-300" />
      </div>

      {/* Unordered List */}
      <div className="space-y-2 mb-4">
        <div className="h-4 w-[40%] bg-gray-300" />
        <div className="h-4 w-[30%] bg-gray-300" />
        <div className="h-4 w-[50%] bg-gray-300" />
      </div>

      {/* Table */}
      <div className="w-full mb-6">
        <div className="flex bg-gray-100">
          <div className="h-8 w-1/2 bg-gray-300 border border-gray-300" />
          <div className="h-8 w-1/2 bg-gray-300 border border-gray-300" />
        </div>
        <div className="flex">
          <div className="h-8 w-1/2 bg-gray-200 border border-gray-300" />
          <div className="h-8 w-1/2 bg-gray-200 border border-gray-300" />
        </div>
        <div className="flex">
          <div className="h-8 w-1/2 bg-gray-200 border border-gray-300" />
          <div className="h-8 w-1/2 bg-gray-200 border border-gray-300" />
        </div>
      </div>

      {/* Footer Note */}
      <div className="h-4 w-[70%] bg-gray-300 mb-4" />
      <div className="h-4 w-[60%] bg-gray-300 mb-4" />

      {/* Author Credits */}
      <div className="space-y-4 mb-4">
        <div className="h-4 w-[80%] bg-gray-300" />
        <div className="h-4 w-[85%] bg-gray-300" />
        <div className="h-4 w-[60%] bg-gray-300" />
      </div>

      {/* Publish Note */}
      <div className="h-4 w-[90%] bg-gray-300 mb-4" />

      {/* Button */}
      <div className="h-10 w-full bg-gray-400" />
    </div>
  )
}

export default DuplicateSkeleton;
