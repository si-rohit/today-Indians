'use client';
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import OtpInput from 'react-otp-input';
import logo from "@/public/images/logo.png"

const Page = () => {
  const [otp, setOtp] = useState("");
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    if (otp.length === 6) {
      // Do verification logic here
      console.log("OTP entered:", otp);
      // On success, redirect
      router.push("/dashboard"); // or any other page
    } else {
      alert("Please enter the complete 6-digit OTP.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col gap-8 items-center  bg-gray-100 p-4">
      <div className="flex flex-col">
          <div className="container mx-auto text-center flex items-center justify-center my-5">
            <Link href="/" className="">
              <Image className="h-20 max-[426px]:h-10 w-auto" src={logo} alt="Logo" />
              {/* <h1 className="font-bold text-2xl max-[426px]:text-lg LogoFont">The Today Indians</h1> */}
            </Link>
          </div>
        </div> 
      <div className="bg-white p-8 shadow-md max-w-sm w-full">
        <h2 className="text-2xl font-bold mb-6 text-center">OTP Verification</h2>
        <form onSubmit={handleSubmit}>
          <div className="flex justify-center mb-6">
            <OtpInput
              value={otp}
              onChange={setOtp}
              numInputs={6}
              inputStyle={{
                width: "3rem",
                height: "3rem",
                margin: "0 0.25rem",
                fontSize: "1.5rem",
                border: "1px solid #d1d5db",
              }}
              shouldAutoFocus
              isInputNum
              renderInput={(props) => <input {...props} />}
            />
              
          </div>

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
                      </div>: "Verify"
            }
        </button>
          <p className="text-sm text-gray-500 mt-4 text-center">
            Didn&apos;t receive the code? <button className="text-blue-600 font-medium hover:underline">Resend</button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Page;
