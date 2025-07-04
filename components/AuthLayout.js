import React from "react";
import Image from "next/image";
import { TopHeader } from "./Header/TopHeader";
import logo from "@/public/images/The-Today-Indians-Logo-Pack/Main-White@4x.png";
import Link from "next/link";
import authBGImage from "@/public/images/login-bg-15.jpg";

const AuthLayout = ({ children, title, image }) => {
    return (
      <div className={"min-h-screen flex flex-col items-center justify-center"}>
        <Image src={authBGImage} alt="Auth Background" className="absolute w-full h-full object-cover" />
        <div className="fixed w-full h-full top-0 left-0 bg-[#0000007c] flex items-center justify-center"></div>
        <div className="flex flex-col z-40 justify-center items-center">         
            <Link href="/" className="">
              <Image className="h-9 max-[426px]:h-10 w-auto" src={logo} alt="Logo" />
              {/* <h1 className="font-bold text-2xl max-[426px]:text-lg LogoFont">The Today Indians</h1> */}
            </Link>          
        </div>      
        <div className="flex flex-col items-center justify-center  max-w-[400px] z-40 w-full">             
            <div className="w-full p-2">              
              {children}
            </div>
        </div>
        <div className="flex flex-col items-center justify-center z-40 text-gray-400 fixed bottom-0 text-[12px]">
          <h1>Made for Information</h1>
          <p>© 2025 All rights reserved</p>
        </div>
      </div>
    );
  };
  
  export default AuthLayout;
  