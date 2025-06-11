import React from "react";
import Image from "next/image";
import { TopHeader } from "./Header/TopHeader";
import logo from "@/public/images/logo.png"
import Link from "next/link";
import image1 from "@/public/images/login111.png";
import loginImg from "@/public/images/Log-in.svg";

const AuthLayout = ({ children, title, image }) => {
    return (
      <div className="min-h-screen bg-gray-200">
        <div className="flex flex-col">
          <div className="container mx-auto text-center flex items-center justify-center my-5">
            <Link href="/" className="">
              <Image className="h-20 max-[426px]:h-10 w-auto" src={logo} alt="Logo" />
              {/* <h1 className="font-bold text-2xl max-[426px]:text-lg LogoFont">The Today Indians</h1> */}
            </Link>
          </div>
        </div>      
        <div className="flex flex-col items-center justify-center p-4">
          <div className="bg-white shadow-lg flex w-full max-w-4xl overflow-hidden">
            <div className="hidden md:flex items-center justify-center w-1/2 bg-gray-100">
              <Image
                src={loginImg || image1}
                alt="reset password Illustration"
                className="w-90 h-64 object-contain"
              />
            </div>
            <div className="w-full md:w-1/2 p-8">
              <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
                {title}
              </h2>
              {children}
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default AuthLayout;
  