'use client'
import Image from 'next/image';
import React, { useState } from 'react'
import verified from '@/public/images/invitation_sent.svg'

const VerifyRequest = ({handleCloseVerifyModal,name,type}) => {
    const [inviteSent, setInviteSent] = useState(false);
  return (
    <div className='flex flex-col justify-center items-center fixed w-full h-full top-0 left-0 bg-[#000000de]'>
        <div className='bg-white shadow-lg flex w-full max-w-lg overflow-hidden flex-col items-center justify-center p-4'>
            {inviteSent ? <div className='flex flex-col justify-center items-center'>
                <Image className="h-60 max-[426px]:h-10 w-auto my-3" width={100} height={100} src={verified} alt="Logo" />
                <h4 className='text-2xl text-center mb-6 text-gray-800'>{type.charAt(0).toUpperCase() + type.slice(1)} invitation has been sent to <span className='font-semibold'>{name}</span></h4>
                <button onClick={handleCloseVerifyModal} className="bg-black hover:bg-[#222] text-white px-4 py-2 text-sm cursor-pointer w-full">Close</button>
            </div> :
            <div className='flex flex-col justify-center items-center'>
                <h1 className='text-2xl text-center mb-6 text-gray-800'>
                    Are your sure your want to send {type} invitation to <span className='font-semibold'>{name}</span> ?
                </h1>
                <div className='flex items-center gap-5'>
                    <button onClick={() => setInviteSent(true)} className="bg-green-700 hover:bg-[#53a057] text-white px-4 py-2 text-sm cursor-pointer">Yes</button>
                    <button onClick={handleCloseVerifyModal} className="bg-black hover:bg-[#222] text-white px-4 py-2 text-sm cursor-pointer">Close</button>
                </div>
                
            </div>
            }
            <div className='flex items-center gap-5'>
            
            </div>
        </div>        
    </div>
  )
}

export default VerifyRequest