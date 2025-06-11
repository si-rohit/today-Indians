'use client'
import AuthLayout from '@/components/AuthLayout';
import Link from 'next/link';
import React, { useState } from 'react'

const Page = () => {
    const [forgot_data, setForgot_data] = useState("");
    const [loading, setLoading] = useState(false);

    const formData = new FormData();
    formData.append('forgot_data', forgot_data);

    const handleRegister = async(e) => {
        e.preventDefault();
        setLoading(true);
        const response = await fetch('https://5341.general.pointer.8080-server.net/forgot_pass?id=42', {
          method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer 1',
          },
            body: formData,
        })
        const data = await response.json();
        setLoading(false);
        console.log(data);
        // Handle registration logic here
    };
  return (
    <AuthLayout title="Forgot Password">
    <form onSubmit={handleRegister} className="space-y-6 min-h-[36vh] flex flex-col justify-center">      
      <input
        type="email"
        placeholder="Email"
        value={forgot_data}
        onChange={(e) => setForgot_data(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
        required
      />
      
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
                      </div>: "Submit"
            }
        </button>
      <div className="text-sm text-center text-gray-600">
        Remember your password? <Link href="/auth" className='text-[#222]'>Login</Link>
      </div>
    </form>
  </AuthLayout>
  )
}

export default Page