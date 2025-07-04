'use client';
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import OtpInput from 'react-otp-input';
import { useDispatch } from "react-redux";
import AuthLayout from "@/components/AuthLayout";
import image1 from "@/public/images/login111.png";
import { setUser, setUserFolders } from '@/app/redux/authSlice';

const Page = () => {
  const [otp, setOtp] = useState("");
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [uid, setUid] = useState('');
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [invalidCredentials, setInvalidCredentials] = useState('');

  const dispatch = useDispatch();


  useEffect(() => {
      const Email = localStorage.getItem('email');
      const Uid = localStorage.getItem('uid');
      // console.log(Email, Uid);
      if (!Email || !Uid) {
        router.push('/auth');
      }
      setEmail(Email);
      setUid(Uid);
    }, [router]);
  
  const handleSubmit = async(e) => {
    e.preventDefault();
    setLoading(true);
    if (otp.length === 4) {
      // Do verification logic here
      // console.log("OTP entered:", otp);
      const formData = new FormData();
      formData.append('utp', otp)
      formData.append('data', email)
      const response = await fetch(`https://5341.general.pointer.8080-server.net/verify_otp?uid=${uid}&channel=42`, {
        headers: {
              'Authorization': '1',
            },
        method: "POST",
        body: formData
      })
      const data = await response.json();
      console.log(data);
      if (data.response === "error") {
        setInvalidCredentials("Invalid OTP. Please try again.");
        setLoading(false);
        return;
      }
      if (data.response === "OTP not matched.") {
        setInvalidCredentials("OTP not matched. Please try again.");
        setLoading(false);
        return;
      }
      else{      
            const fetchUser = async () => {
              try {
                const response = await fetch(`https://5341.general.pointer.8080-server.net/user?id=${data.user_id}`, {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                    'Authorization': '1',
                  },
                  body: JSON.stringify({ user: data.user_id }),
                });
        
                const userdata = await response.json();
                // console.log(userdata);
        
                if (userdata[0]?.user_id) {
                  dispatch(setUser(userdata[0]));
        
                  try {
                    const res = await fetch(`/api/find-Folder-by-id`, {
                      method: "POST",
                      headers: {
                        'Content-Type': 'application/json',
                      },
                      body: JSON.stringify({ name: userdata[0].user_id }),
                    });
        
                    const APIres = await res.json();
        
                    if (APIres.error) {
                      const createRes = await fetch(`/api/create-folder`, {
                        method: "POST",
                        headers: {
                          'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ folderName: `${userdata[0].user_id}` }),
                      });
        
                      const createdFolder = await createRes.json();
                      dispatch(setUserFolders(createdFolder.folder._id));
                    } else {
                      dispatch(setUserFolders(APIres.folder._id));
                    }
        
                    router.push("/");
                  } catch (err) {
                    console.error("Error while managing folder:", err);
                  }
                } else {
                  dispatch(setUser(null));
                }
              } catch (error) {
                console.error('Error fetching user data:', error);
              }
            };
        
            if (data?.user_id) {
              fetchUser();
            }
      }
    } else {
      setInvalidCredentials("Please enter the complete 4-digit OTP.");
    }
  };

  const handleResend = async(e) => {
    e.preventDefault();
    console.log(email, uid);
    const formData = new FormData();
    formData.append('resend', 1);
    formData.append('data', email);
    const response = await fetch(`https://5341.general.pointer.8080-server.net/verify_otp?uid=${uid}&channel=42`, {
      headers: {
        'Authorization': '1',
      },
      method: "POST",
      body: formData
    })
    const data = await response.json();
    console.log(data);
  };

  return (
    <AuthLayout title="OTP Verification" image={image1}>
      <h4 className='text-center text-gray-100'>Verify your OTP</h4>
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
          <p className='text-red-500 text-[14px]'>{invalidCredentials}</p>
          <div className="flex justify-center my-4">
            <OtpInput
              value={otp}
              onChange={setOtp}
              numInputs={4}
              inputStyle={{
                width: "3rem",
                height: "3rem",
                margin: "0 0.25rem",
                fontSize: "1.5rem",
                border: "1px solid #d1d5db",
                backgroundColor: "#fff",
              }}
              shouldAutoFocus
              isInputNum
              renderInput={(props) => <input {...props} />}
            />
              
          </div>

          <button
          type="submit"
          disabled={otp === ''}
          className={`w-[250px] py-2 bg-[#222] text-white hover:bg-[#111] group/button ${otp === '' ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {loading ? <span className="loader"></span>: "Verify"}
        </button>
        
          <p className="text-sm text-gray-200 mt-4 text-center">
            Didn&apos;t received the OTP? <button onClick={(e) => handleResend(e)} className="text-[#f5d832] font-medium hover:underline">Resend</button>
          </p>
        </form>
    </AuthLayout>
  );
};

export default Page;
