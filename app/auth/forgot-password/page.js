'use client'
import AuthLayout from '@/components/AuthLayout';
import { ro } from 'date-fns/locale';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react'

const Page = () => {
    const [forgot_data, setForgot_data] = useState("");
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
    formData.append('forgot_data', forgot_data);

    const handleRegister = async(e) => {
        e.preventDefault();
        setLoading(true);
        
        const response = await fetch('https://5341.general.pointer.8080-server.net/forgot_pass?id=42', {
          method: 'POST',
            headers: {
            'Authorization': '1',
          },
            body: formData,
        })
        const data = await response.json();
        if (data.response === "error") {
          setInvalidCredentials("Email not found. Please try again.");      
          setLoading(false);
        }
        else{
          localStorage.setItem('email', forgot_data );   
          router.push("/auth/reset-password");
        }
       
        // console.log(data);
        // Handle registration logic here
    };
  return (
    <AuthLayout title="Forgot Password">
      <h4 className='text-center text-gray-100'>Get an OTP to reset your password</h4>
    <form onSubmit={handleRegister} className="space-y-3 min-h-[26vh]  flex flex-col items-center justify-center mx-auto min-w-[200px] max-w-[300px]">      
       <p className='text-red-500 '>{invalidCredentials}</p>
      <input
        type="email"
        placeholder="Email"
        value={forgot_data}
        onChange={(e) => setForgot_data(e.target.value)}
        className="Input"
        required
      />

      <div className='w-full flex items-center justify-center'>
        <div
          className="cf-turnstile"
          data-sitekey="0x4AAAAAABi-wbTsyIksD7gu"
          data-theme="dark" // or dark
          ref={turnstileRef}
        />
      </div>
      
      
      <button
          type="submit"
          disabled={forgot_data === '' || turnstileToken === ''}
          className={`Button ${forgot_data === '' || turnstileToken === '' ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {loading ? <span className="loader"></span>: "Continue"
            }
        </button>
      <div className="text-sm text-center text-gray-300">
        Remember your password? <Link href="/auth" className='text-[#f5d832] hover:underline'>Login</Link>
      </div>
    </form>
  </AuthLayout>
  )
}

export default Page