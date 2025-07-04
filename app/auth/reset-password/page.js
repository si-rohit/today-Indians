'use client'
import AuthLayout from '@/components/AuthLayout';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react'
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import OtpInput from 'react-otp-input';

const Page = () => {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [otp, setOtp] = useState('');
    const [loading, setLoading] = useState(false);
    const [invalidCredentials, setInvalidCredentials] = useState('');
    const router = useRouter();

    const email = localStorage.getItem('email');
    const turnstileRef = useRef(null);

    useEffect(() => {
      const script = document.createElement('script');
      script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js";
      script.async = true;
      document.body.appendChild(script);
    }, []);

    const formData = new FormData();
    formData.append('utp', otp)
    formData.append('password', password)
    formData.append('confirm', confirmPassword)
    formData.append('forgot_data', email)

    const handleRegister = async(e) => {
        e.preventDefault();
        setLoading(true);
        if (password !== confirmPassword) {
          setInvalidCredentials("Passwords do not match. Please try again.");
          setLoading(false);
          return;
        }
        if (password.length < 8) {
          setInvalidCredentials("Password must be at least 8 characters long.");
          setLoading(false);
          return;
        }
        if (otp.length !== 4) {
          setInvalidCredentials("Please enter a valid OTP.");
          setLoading(false);
          return;
        }

        const turnstileToken = document.querySelector('input[name="cf-turnstile-response"]')?.value;
        if (!turnstileToken) {
          setInvalidCredentials("Turnstile verification failed. Please try again.");
          setLoading(false);
          return;
        }

        try {
          const response = await fetch('https://5341.general.pointer.8080-server.net/reset_pass?id=42', {
            method: 'POST',
            headers: {
              'Authorization': '1',
            },
            body: formData,
          });
          const data = await response.json();
          if (data.response === "error") {
            setInvalidCredentials("Invalid OTP. Please try again.");
            setLoading(false);
            password('');
            confirmPassword('');
            setOtp('');
            return;
          }
          else{
            localStorage.removeItem('email');
            localStorage.setItem('reserRespo', data.response);
            router.push("/auth");
          }
        } catch (error) {
          console.log(error);
        }
    };
    const handleToggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleResendOTP = async () => {
        try {
          const response = await fetch('https://5341.general.pointer.8080-server.net/verify_otp?uid=202098&channel=42', {
            method: 'POST',
            headers: {
              'Authorization': '1',
            },
            body: formData,
          });
          const data = await response.json();
          if (data.response === "error") {
            setInvalidCredentials("Email not found. Please try again.");
            setLoading(false);
          }
        } catch (error) {
          console.log(error);
        }
    };
  return (
    <AuthLayout title="Reset Password">
      <h4 className='text-center text-gray-100'>Reset your password</h4>
    <form onSubmit={(e)=>handleRegister(e)} className="space-y-4 relative flex flex-col items-center justify-center mx-auto min-w-[200px] max-w-[300px]">
       <p className='text-red-500 '>{invalidCredentials}</p>
      <div className='w-full'>
        <input
          type="text"
          placeholder="OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="Input"
          required
        />
      </div>
      
      <div className='relative w-full'>
        <input
          type={showPassword ? "text" : "password"}
          placeholder="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="Input"
          required
        />
        <span className={`absolute right-3 top-[50%] transform -translate-y-1/2 cursor-pointer ${password === ""? 'hidden':''}`} onClick={handleToggleShowPassword}>
          {showPassword ? <FaEye /> : <FaEyeSlash />}
        </span>
      </div>

      <div className='relative w-full'>
        <input
          type={showConfirmPassword ? "text" : "password"}
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="Input"
          required
        />
        <span className={`absolute right-3 top-[50%] transform -translate-y-1/2 cursor-pointer ${confirmPassword === ""? 'hidden':''}`} onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
          {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
        </span>
      </div>

      <div
          className="cf-turnstile"
          data-sitekey="0x4AAAAAABi-wbTsyIksD7gu"
          data-theme="light" // or dark
          ref={turnstileRef}
        />
         
      <button
          type="submit"
          className="Button"
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
      <span className='text-gray-100 flex items-center gap-1'>
        Didn&apos;t received the OTP? <p className=' hover:underline text-center text-[#f5d832] cursor-pointer'>Resend</p>
      </span>
      
      
    </form>
  </AuthLayout>
  )
}

export default Page
