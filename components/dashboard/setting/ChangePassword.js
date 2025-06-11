'use client'
import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { ChevronLeft } from 'lucide-react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const ChangePassword = ({onClose}) => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);


    const [loading, setLoading] = useState(false);

    const { user } = useSelector(store => store.auth);

    const handleSubmit = async(e) => {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData();
        formData.append('cpassword', currentPassword);
        formData.append('npassword', password);
        formData.append('repassword', confirmPassword);
        formData.append('uid',user.user_id)
        // API call
        const reso = await fetch(`https://5341.general.pointer.8080-server.net/update`, {
            method: 'POST',
            headers: {
                // 'Content-Type': 'application/json',
                'Authorization': '1',
            },
            body: formData
        })
        const data = await reso.json();
        console.log(data);
        setLoading(false);
        alert('Profile updated successfully!');
    };

  return (
    <div className=" flex w-full p-4 h-full min-h-[85vh] flex-col bg-white">
        <div className="flex gap-2 mb-4">
            <button onClick={onClose} className=" text-gray-600">
                <ChevronLeft />
            </button>
             <h2 className="text-xl font-bold">Change Password</h2>
        </div>    
        <div>          
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block font-medium">Current Password</label>
                    <input
                        type={showCurrentPassword ? 'text' : 'password'}
                        placeholder="Current Password"
                        className="border border-gray-300 p-2 w-full"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                    />
                    <button
                        type="button"
                        onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                        className="absolute right-15 z-50 top-29.5 cursor-pointer"
                    >
                        {showCurrentPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                </div>
                <div className="mb-4">
                    <label className="block font-medium">New Password</label>
                    <input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="New Password"
                        className="border border-gray-300 p-2 w-full"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-15 top-[calc(50%-104px)]"
                    >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                </div>
                <div className="mb-4">
                    <label className="block font-medium">Confirm Password</label>
                    <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        placeholder="Confirm Password"
                        className="border border-gray-300 p-2 w-full"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-15 top-[calc(50%-20px)] "
                    >
                        {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                </div>
                <button
                    type="submit"                
                    // onClick={(e) =>{handleSubmit(e)}}
                    className=" py-1 px-3 bg-[#222] text-white hover:bg-[#111] group/button"
                    >
                    {loading ? <div className='flex items-center justify-center py-1 border border-[#222] group-hover/button:border-[#111]'>
                                <div className="loader">
                                    <div className="box-load1"></div>
                                    <div className="box-load2"></div>
                                    <div className="box-load3"></div>
                                </div>
                                </div>: <div>Change Password</div>
                    }
                </button> 
            </form>
        </div>
    </div>
  )
}

export default ChangePassword