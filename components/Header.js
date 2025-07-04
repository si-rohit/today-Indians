'use client'
import logo from "@/public/images/The-Today-Indians-Logo-Pack/Main-Black@4x.png";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import Search from "./Search";
import { HeaderProfileSection } from "./Profile/HeaderProfileSection";

const Header = () => {
    return (
      <header>
        {/* Main Header */}
        <div className="container mx-auto text-center flex items-center justify-center">
          <Link href="/" className="">
            <Image className="h-16 max-[426px]:h-10 w-auto" src={logo} alt="Logo" />
            {/* <h1 className="font-bold text-2xl max-[426px]:text-lg LogoFont">The Today Indians</h1> */}
          </Link>
        </div>
  
        {/* Navigation Bar */}
        <nav className="border-y border-gray-200 py-2 w-full">
          <div className="relative container mx-auto flex max-[426px]:flex-col justify-center items-center px-4 gap-2">
              <div className="absolute  max-[426px]:relative right-14 max-[426px]:w-full flex justify-end">
                <HeaderProfileSection />
              </div>
              <div className="flex items-center">
                <Search />
              </div>   
              
                             
          </div>
        </nav>
      </header>
    );
  };
  
  export default Header;
  