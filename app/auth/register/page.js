'use client'
import AuthLayout from '@/components/AuthLayout';
import { set } from 'mongoose';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react'
import { FaRegEye,FaRegEyeSlash  } from "react-icons/fa";

const Page = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [username, setUsername] = useState("");
    const [fullName, setFullName] = useState("");
    const [loading, setLoading] = useState(false);
    const [invalidCredentials, setInvalidCredentials] = useState('');
    const router = useRouter();
    const turnstileRef = useRef(null);

    useEffect(() => {
          const script = document.createElement('script');
          script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js";
          script.async = true;
          document.body.appendChild(script);
        }, []);
    const turnstileToken = document.querySelector('input[name="cf-turnstile-response"]')?.value;

    const formData = new FormData();
    formData.append('sign_up_name', fullName)
    formData.append('sign_up_email', email)
    formData.append('sign_up_pass', password)
    formData.append('username', username)

    const handleRegister = async(e) => {
        e.preventDefault();
        setLoading(true);

        if (password.length < 8) {
            setInvalidCredentials("Password must be at least 8 characters long.");
            setLoading(false);
            return;
        }

        const response = await fetch('https://5341.general.pointer.8080-server.net/register?id=42', {
            method: 'POST',
            headers: {
            // 'Content-Type': 'application/json',
            'Authorization': '1',
          },
            body: formData,
        })
        const data = await response.json();
        // setLoading(false);
        if (data === null) {
            setInvalidCredentials("Email already exists.");
            setEmail("");
            setPassword("");
            setFullName("");
            setLoading(false);
          
        }
        if (data.response === "error") {
            setInvalidCredentials("Email already exists.");
            setEmail("");
            setFullName("");
            setLoading(false);
        }else{
            // console.log(data);
            if (data.user_id) {
              localStorage.setItem('email', email );
              localStorage.setItem('uid', data.user_id );
              router.push("/auth/otp-verification");
            }else{
              setInvalidCredentials("Registration failed. Please try again.");
            }           
        }
    };
  return (
    <AuthLayout title="Create Account">
    <h4 className='text-center text-gray-100'>Please register your account</h4>
    <form onSubmit={(e) => handleRegister(e)} className="space-y-4 relative flex flex-col items-center justify-center mx-auto min-w-[200px] max-w-[300px]">
      <p className='text-red-600'>{invalidCredentials}</p>
      <input
          type="text"
          placeholder="Username "
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="Input"
          required
          onClick={() => setInvalidCredentials('')}
      />
      <input
        type="text"
        placeholder="Full name"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
        className="Input"
        required
        onClick={() => setInvalidCredentials('')}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="Input"
        required
        onClick={() => setInvalidCredentials('')}
      />

      <div className='w-full relative'>
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="Input"
          required
          onClick={() => setInvalidCredentials('')}
        />
        {showPassword ? (
          <FaRegEye className={`absolute bottom-[28%] right-4 transform text-lg cursor-pointer  ${password ===''?"hidden":''}`} onClick={() => setShowPassword(false)} />
        ) : (
          <FaRegEyeSlash className={`absolute bottom-[28%] right-4 transform text-lg cursor-pointer  ${password ===''?"hidden":''}`} onClick={() => setShowPassword(true)} />
        )}
      </div>
      
      <div className='w-full flex items-center justify-center'>
        <div
          className="cf-turnstile "
          data-sitekey="0x4AAAAAABi-wbTsyIksD7gu"
          data-theme="dark" // or dark
          ref={turnstileRef}
        />
      </div>
      
      <div className='text-white text-[12px]'>
        <p>By tapping Register, you agree to create an account and to our <Link href="#" className='text-[#f5d832]'>Terms of Service</Link> and <Link href="#" className='text-[#f5d832]'>Cookies Policy </Link>. </p>
        {/* <p>The <Link href="#" className='text-[#fff]'>Privacy Policy</Link> describes the ways we can use the information we collect when you create an account. For example, we use this information to provide, personalize and improve our products, including ads.</p> */}
      </div>
      
      <button
          type="submit"
          disabled={password === '' || email === '' || turnstileToken === ''}
          className={`Button  ${password === '' || email === '' || turnstileToken === '' ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {loading ? <span className="loader"></span>: "Register"}
        </button>
      <div className="text-sm text-center text-gray-300">
        Already have an account? <Link href="/auth" className='text-[#f5d832]'>Login</Link>
      </div>
    </form>
  </AuthLayout>
  )
}

export default Page