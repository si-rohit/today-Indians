'use client'
import AuthLayout from '@/components/AuthLayout';
import Link from 'next/link';
import React, { useState } from 'react'
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import OtpInput from 'react-otp-input';

const Page = () => {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [otp, setOtp] = useState('');
    const [loading, setLoading] = useState(false);

    const formData = new FormData();
    formData.append('utp', otp)
    formData.append('password', password)
    formData.append('confirm', confirmPassword)
    formData.append('forgot_data', 'token')

    const handleRegister = async(e) => {
        e.preventDefault();
        setLoading(true);
        const response = await fetch('https://5341.general.pointer.8080-server.net/reset_pass?id=42', {
          method: 'POST',
            headers: {
            // 'Content-Type': 'application/json',
            'Authorization': 'Bearer 1',
          },
            body: formData,          
        })
        const data = await response.json();
        setLoading(false);
        console.log(data);
        setPassword("");
        setConfirmPassword("");
        setOtp("");      
        // Handle registration logic here
    };
    const handleToggleShowPassword = () => {
        setShowPassword(!showPassword);
    };
  return (
    <AuthLayout title="Reset Password">
    <form onSubmit={(e)=>handleRegister(e)} className="space-y-4 relative">
      
        <OtpInput
        value={otp}
        onChange={setOtp}
        numInputs={5}
        // separator={<span >-</span>}
        inputStyle={{width: "60px", border: "1px solid gray", padding: "5px",margin: "0 20px 0 0"}}
        renderInput={(props) => <input {...props} />}
        />
      <p className='text-sm underline text-gray-600 cursor-pointer'>Resend otp</p>
      <input
        type={showPassword ? "text" : "password"}
        placeholder="New Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
        required
      />
      <span className="absolute right-3 top-[108px] transform -translate-y-1/2 cursor-pointer" onClick={handleToggleShowPassword}>
        {showPassword ? <FaEyeSlash /> : <FaEye />}
      </span>
      <input
        type={showConfirmPassword ? "text" : "password"}
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
        required
      />
      <span className="absolute right-3 bottom-11 transform -translate-y-1/2 cursor-pointer" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
        {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
      </span>
      <button
          type="submit"
          className="w-full py-2 bg-[#222] text-white hover:bg-[#111] group/button"
        >
          {loading ? <div className='flex items-center justify-center py-1 border border-[#222] group-hover/button:border-[#111]'>
                        <div className="loader">
                          <div className="box-load1"></div>
                          <div className="box-load2"></div>
                          <div className="box-load3"></div>
                        </div>
                      </div>: "Reset Password"
            }
        </button>
      
    </form>
  </AuthLayout>
  )
}

export default Page
