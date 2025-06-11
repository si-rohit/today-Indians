import React from 'react'

const AnalyticsAlert = ({close}) => {
  return (
    <div className='fixed w-full h-full top-0 left-0 bg-[#000000bb] flex items-center justify-center z-40'>
        <div className='bg-white shadow-lg flex w-full max-w-lg overflow-hidden flex-col items-center justify-center p-4'>
            <p className='text-lg leading-6 mb-3 text-gray-600'>This feature is coming soon</p>
            <div className='grid grid-cols-1 items-center  gap-5'>
                <button className="bg-black hover:bg-[#222] text-white px-4 py-2 text-sm cursor-pointer w-full font-semibold" onClick={close}>Close</button>
            </div>           
        </div>
    </div>
  )
}

export default AnalyticsAlert