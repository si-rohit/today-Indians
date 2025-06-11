import React from 'react'
import { IoClose } from "react-icons/io5";

const ProfilePageCom = ({close}) => {
  return (
    <div className='fixed flex min-w-screen h-screen bg-[#0000009c] z-40'>
        <div className='absolute right-4 py-6 max-w-[400px] overflow-y-scroll bg-white max-h-screen flex flex-col items-center'>
            <IoClose className='text-2xl cursor-pointer absolute top-2 right-10' onClick={close}/>
            <div className='flex flex-col gap-2 w-full px-8 pb-4 border-b border-gray-400'>
                <h1 className='text-4xl font-semibold '>Profile</h1>
                <div className='flex flex-col mt-8 border-b border-gray-200'>
                    <h2 className='text-lg font-semibold'>username</h2>
                    <h2 className='text-lg font-semibold text-gray-600'>John Doe</h2>
                </div>
                <div className='flex flex-col border-b border-gray-200'>
                    <h2 className='text-lg font-semibold'>Email</h2>
                    <h2 className='text-lg font-semibold text-gray-600'>jw9eD@example.com</h2>
                </div>
                <div className='flex flex-col'>
                    <h2 className='text-lg font-semibold'>Phone Number</h2>
                    <h2 className='text-lg font-semibold text-gray-600'>+91 1234567890</h2>
                </div>
            </div>
            <div className='flex flex-col gap-2 w-full px-8 pb-4 border-b border-gray-400'>
                <h1 className='text-3xl font-semibold mt-8'>Your content</h1>
                <div className='flex flex-col  border-b border-gray-200 cursor-pointer'>
                    <h2 className='text-lg font-semibold'>Create Article</h2>
                    <h2 className='text-sm text-gray-600'>Create a new article and share it with the world on our apps and website </h2>
                </div>
                <div className='flex flex-col cursor-pointer '>
                    <h2 className='text-lg font-semibold'>Saved articles</h2>
                    <h2 className='text-sm text-gray-600'>Save articles that you want to read later. Saved articles are accessible in our apps</h2>
                </div>
            </div>
            <div className='flex flex-col gap-2 w-full px-8 pb-4 border-b border-gray-400'>
                <div className='flex flex-col gap-2 mt-8 border-b border-gray-200'>
                    <h2 className='text-3xl font-semibold'>Privacy</h2>
                    <h2 className='text-sm text-gray-600'>The New York Times takes your <span className='underline text-blue-600 cursor-pointer'>privacy seriously</span>. Visit our privacy policy to learn more.</h2>
                </div>
                <div className='flex flex-col'>
                    <h2 className='text-lg font-semibold'>Delete your account</h2>
                    <h2 className='text-sm text-gray-600'>You will lose access to all history associated with this account.</h2>
                </div>
            </div>
            
        </div>
    </div>
  )
}

export default ProfilePageCom
