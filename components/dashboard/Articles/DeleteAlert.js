'use client'
import React, { useState } from 'react'

const DeleteAlert = ({close,title,message,uid,poid}) => {
  const [loading, setLoading] = useState(false);
  const DeletPost = async () => {
    setLoading(true);
      const res = await fetch(`https://5341.general.pointer.8080-server.net/rm_post?uid=${uid}&poid=${poid}`,{
        method:"POST",
        headers: {
          // 'Content-Type': 'application/json',
          'Authorization': '1',
        },
      });
      const data = await res.json();
      console.log(data);
      setLoading(false);
      close();
  }
  return (
    <div className='fixed w-full h-full top-0 left-0 bg-[#0000006c] flex items-center justify-center z-40'>
        <div className='bg-white shadow-lg flex w-full max-w-lg overflow-hidden flex-col items-center justify-center p-4'>
            <h1 className='text-2xl mb-2 text-gray-800'>{title}</h1>
            {/* <p>{uid}{poid}</p> */}
            <p className='text-lg leading-6 mb-3 text-gray-600'>{message}</p>
            <div className='grid grid-cols-2 items-center  gap-5'>
                <button className="bg-black hover:bg-[#222] text-white px-4 py-2 text-sm cursor-pointer w-full font-semibold" onClick={DeletPost}>{loading ? "Deleting..." : "Delete"}</button>
                <button className="bg-black hover:bg-[#222] text-white px-4 py-2 text-sm cursor-pointer w-full font-semibold" onClick={close}>Close</button>
            </div>           
        </div>
    </div>
  )
}

export default DeleteAlert