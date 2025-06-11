'use client'
import Link from 'next/link'
import React from 'react'
import { FaFacebookF,FaTwitter ,FaPinterest,FaInstagram,FaYoutube,FaRegCalendarAlt,FaSearch    } from "react-icons/fa";

export const TopHeader = () => {
  return (
    <div>
        <div className="bg-black text-white text-[11px] py-2 max-[426px]:hidden">
          <div className="container mx-auto flex justify-between items-center px-4">
            <div className="flex items-center space-x-2">
            <FaRegCalendarAlt  />
              <span>{new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
            </div>
            <div className="flex space-x-6">
              <Link href="/" className="hover:underline">About</Link>
              <Link href="/contact" className="hover:underline">Contact</Link>
              <Link href="/article" className="hover:underline">Article</Link>
              {/* <Link href="/" className="hover:underline font-semibold">Buy Now</Link> */}
            </div>
            <div className="flex space-x-3">
              <Link href="/" className="hover:text-gray-400"><FaFacebookF /></Link>
              <Link href="/" className="hover:text-gray-400"><FaTwitter /></Link>
              <Link href="/" className="hover:text-gray-400"><FaPinterest /></Link>
              <Link href="/" className="hover:text-gray-400"><FaInstagram /></Link>
              <Link href="/" className="hover:text-gray-400"><FaYoutube /></Link>
            </div>
          </div>
        </div>
    </div>
  )
}
