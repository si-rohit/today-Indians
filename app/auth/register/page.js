'use client'
import AuthLayout from '@/components/AuthLayout';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

const Page = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [fullName, setFullName] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const formData = new FormData();
    formData.append('sign_up_name', fullName)
    formData.append('sign_up_email', email)
    formData.append('sign_up_pass', password)

    const handleRegister = async(e) => {
        e.preventDefault();
        setLoading(true);
        if (password !== confirmPassword) {
            alert("Passwords do not match.");
            setLoading(false);
            return;
        }else if (password.length < 8) {
            alert("Password must be at least 8 characters long.");
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
        if (data.response === "error") {
            alert("Email already exists.");
            setEmail("");
            setPassword("");
            setConfirmPassword("");
            setFullName("");
            setLoading(false);
        }else{
            // console.log(data);
            if (data.user_id) {
              const createFolder = async () => {
                try {
                  // console.log(data.user_id);
                  const folderName = String(`${data.user_id}`);
                  const response = await fetch(`http://localhost:3000/api/create-folder`, {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                      // 'Authorization': '1',
                    },
                    body: JSON.stringify({ folderName: folderName }),
                  })
                  const res = await response.json();
                  console.log(res);
                  alert("Registration successful!");
                  setEmail("");
                  setPassword("");
                  setConfirmPassword("");
                  setFullName("");
                  router.push("/auth");
                } catch (error) {
                  console.error('Error creating folder:', error);
                }
              }
              await createFolder();
            }else{
              alert("Registration failed. Please try again.");
            }
            
        }
    };
  return (
    <AuthLayout title="Create Account">
    <form onSubmit={(e) => handleRegister(e)} className="space-y-4">
      <input
          type="text"
          placeholder="Full name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
          required
        />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
        required
      />
      <input
        type="password"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
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
        Already have an account? <Link href="/auth" className='text-[#222]'>Login</Link>
      </div>
    </form>
  </AuthLayout>
  )
}

export default Page