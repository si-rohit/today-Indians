'use client'
import React, { useState } from 'react'
import { FaArrowLeft } from 'react-icons/fa'

const Page = () => {
    const [username, setProfile] = useState('');
  return (
    <div>
        <div className="flex flex-col min-h-screen ">
            <div className="bg-gray-200 text-black text-2xl px-4 py-4 flex items-start justify-start gap-4">
                <FaArrowLeft onClick={()=>window.history.back()} className='mt-1'/>
                <h1 className="">Username</h1>
                {/* <FaShareAlt className=" ml-auto" /> */}
            </div>
            <div className='p-4'>
                <label className="block text-lg text-gray-700 mb-1">username</label>
                <input
                    type={"text"}
                    name="firstname"
                    value={username}
                    onChange={(e) => {
                        const regex = e.target.value.replace(/[^a-zA-Z0-9-_]/g, '');
                        setProfile(regex);}}
                    className="w-full border border-gray-300 text-lg rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                />
            </div>
            <p className='px-4 text-gray-700'>Note:</p>
            <ul className='list-inside px-4 list-disc text-sm text-gray-600'>
                <li>Only letters (a-z, A-Z), numbers(0-9), and underscores are allowed</li>
                <li>Must be between 5 and 20 characters long</li>
                <li>Must be unique</li>
                <li>Case-insensitive (eg. &quot;User123&quot; and &quot;user123&quot; are considered the same)</li>
            </ul>

            <div className='flex justify-between gap-4 mt-auto p-4'>
                <button
                    type="button"
                    className="w-full border py-2 font-semibold mt-4"
                    onClick={()=>window.history.back()}
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    className="w-full border bg-black text-white py-2 font-semibold mt-4"
                >
                    Save
                </button>
            </div>
        </div>
    </div>
  )
}

export default Page