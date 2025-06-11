'use client'
import Link from "next/link";
import { FaFacebookF,FaTwitter ,FaPinterest,FaInstagram,FaYoutube,FaRegCalendarAlt,FaSearch,FaCaretRight    } from "react-icons/fa";

const Footer = () => {
    return (
      <footer className="sticky bottom-0 bg-gray-100 text-gray-800">
        <div className="container mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Us */}
          <div>
            <h2 className="font-semibold text-lg">About Us</h2>
            <div className="border-t w-10 my-2 border-gray-400"></div>
            <p className="font-bold">Address</p>
            <p>71-75 Shelton St</p>
            <p>London, United Kingdom</p>
            <p>WC2H 9JQ</p>
            <p className="font-bold mt-4">Hours</p>
            <p>Monday—Friday: 9:00AM–5:00PM</p>
            <p>Saturday & Sunday: 11:00AM–3:00PM</p>
          </div>
  
          {/* From Blog */}
          <div>
            <h2 className="font-semibold text-lg">From Blog</h2>
            <div className="border-t w-10 my-2 border-gray-400"></div>
            <ul className="space-y-2">
              <li className="flex ">
                <FaCaretRight className="mt-1 mr-1"/>
                <Link href="#" className="hover:underline">
                  Those who have created peace, are the world better?
                </Link>
              </li>
              <li className="flex items-center">
                <FaCaretRight className="mt-1 mr-1"/>
                <Link href="#" className="hover:underline">
                  This Concept Jet Could Get You From New York To London In Under 11 Minutes
                </Link>
              </li>
              <li className="flex items-center">
                <FaCaretRight className="mt-1 mr-1"/>
                <Link href="#" className="hover:underline">
                  The Shy Person’s Guide to Winning Friends and Influencing People
                </Link>
              </li>
            </ul>
          </div>
  
          {/* Latest Tweets */}
          <div>
            <h2 className="font-semibold text-lg">Latest Tweets</h2>
            <div className="border-t w-10 my-2 border-gray-400"></div>
            <p>Twitter said: &quot;Could not authenticate you.&quot;</p>
          </div>
  
          {/* Popular Tags */}
          <div>
            <h2 className="font-semibold text-lg">Popular Tags</h2>
            <div className="border-t w-10 my-2 border-gray-400"></div>
            <div className="flex flex-wrap gap-2 mt-2">
              {["beautiful", "couple", "Destructively", "droll", "fashion", "in love", "intimate", "life", "lifestyle", "loving", "men", "travel"].map(
                (tag) => (
                  <span key={tag} className="px-3 py-1 bg-gray-200 rounded-md text-sm">
                    {tag}
                  </span>
                )
              )}
            </div>
          </div>
        </div>
  
        {/* Bottom Footer */}
        <div className="bg-black text-white py-4 text-center">
          <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-6">
            <p className="text-[12px] text-gray-400">Copyright © Svayam Incarnation Limited.</p>
            <h1 className="font-black text-xl">EmBe</h1>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-400 hover:text-white">
              <FaFacebookF />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white">
              <FaTwitter />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white">
              <FaPinterest />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white">
              <FaInstagram />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white">
              <FaYoutube />
              </Link>
            </div>
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;
  