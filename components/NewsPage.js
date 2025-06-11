'use client'
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaCaretRight } from "react-icons/fa";
import Image1 from '@/public/images/Thumbnail/hq720(1).jpg'
import Image2 from '@/public/images/Thumbnail/hq720(2).jpg'
import Image3 from '@/public/images/Thumbnail/hq720(3).jpg'
import Image4 from '@/public/images/Thumbnail/hq720(4).jpg'
import Image5 from '@/public/images/Thumbnail/hq720.jpg'
import Image6 from '@/public/images/Thumbnail/hq720(5).jpg'
import noImage from '@/public/images/noImage.jpeg'

const newsData = {
  theWorld: [
    {
      title: "Those who have created peace, are the world better?",
      image: Image1,
      author: "Ryan",
      date: "January 6, 2020",
    },
    {
      title: "Bradley Cooper’s “Twin” Causes Madness At Sundance Film Festival...",
      image: Image2,
      author: "Ryan",
      date: "July 26, 2019",
    },
    {
      title: "This Concept Jet Could Get You From New York To London In...",
      image: Image3,
      author: "Ryan",
      date: "July 26, 2019",
    },
    {
      title: "Greek Islanders are to be Nominated for Peace Prize",
      image: Image4,
      author: "Ryan",
      date: "July 25, 2019",
    },
    {
      title: "The Shy Person’s Guide to Winning Friends and Influencing People",
      image: Image5,
      author: "Ryan",
      date: "July 26, 2019",
    },
    {
      title: "30th Anniversary of the Space Shuttle Challenger Catastrophe, in...",
      image: Image6,
      author: "Ryan",
      date: "July 25, 2019",
    },
  ],
  otherNews: [
    {
      title: "Those who have created peace, are the world better?",
      date: "January 6, 2020",
      read: "3 mins read",
    },
    {
      title: "Greek Islanders are to be Nominated for Peace Prize",
      date: "July 25, 2019",
      read: "2 mins read",
    },
    {
      title: "This Concept Jet Could Get You From New York To London In Under 11...",
      date: "July 26, 2019",
      read: "3 mins read",
    },
    {
      title: "30th Anniversary of the Space Shuttle Challenger Catastrophe, in pictures",
      date: "July 25, 2019",
      read: "2 mins read",
    },
    {
      title: "The Shy Person’s Guide to Winning Friends and Influencing People",
      date: "July 26, 2019",
      read: "3 mins read",
    },
    {
      title: "Uber is Using Phone Gyrometers to Check Whether Drivers go Over Speed",
      date: "July 24, 2019",
      read: "2 mins read",
    },
    {
      title: "Bradley Cooper’s “Twin” Causes Madness At Sundance Film Festival...",
      date: "July 26, 2019",
      read: "2 mins read",
    },
    {
      title: "10 Creative Courses That Will Keep You Learning New Things Next Year",
      date: "July 24, 2019",
      read: "2 mins read",
    },
  ],
};

const NewsPage = () => {
  const [TheWorld, setTheWorld] = useState([]);
    
      const fetchData = async () => {
        try {
          const response = await fetch('https://5341.general.pointer.8080-server.net/posts?sort=x_date&channel=42', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': '1',
            },
          });
          const data = await response.json();
          // console.log(data);
          setTheWorld(data.data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
      useEffect(() => {
        fetchData();
      }, []);
      // console.log(TheWorld);
  return (
    <div className="max-w-7xl mx-auto px-4 pb-4 text-gray-800">
      {/* The World */}
      <section>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold border-b w-fit border-gray-300">The World</h2>
          <Link href="#" className="text-sm text-gray-500 hover:underline">More...</Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TheWorld.slice(0, 6).map((item, index) => (
            <div key={index} className="flex gap-4">
              <Image
                src={item.image?.trimStart()  || noImage}
                alt={item.title}
                className="min-w-1/2 h-25"
                width={120} height={10}
              />
              <div>
                <h3 className="font-semibold text-md hover:underline cursor-pointer">
                  {item.title.slice(0, 44)}
                </h3>
                <div className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                  <Image
                    src={item.user.user_image || noImage}
                    alt="author"
                    className="w-5 h-5"
                    width={20} height={20}
                  />
                  <span>{item.user.user_name || "Unknown"}</span>
                  <span>•</span>
                  <span>{new Date(item.date_modified).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* In Other News */}
      <section className="mt-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold border-b w-fit border-gray-300">In Other News</h2>
          <Link href="#" className="text-sm text-gray-500 hover:underline">More...</Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-6 gap-x-12">
          {newsData.otherNews.map((item, index) => (
            <div key={index}>
              <h3 className="flex  gap-2 text-md font-medium text-gray-800 hover:underline cursor-pointer">
                <FaCaretRight className="mt-1" />
                {item.title}
              </h3>
              <div className="pl-5 text-sm text-gray-500 mt-1">
                {item.date} • {item.read}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default NewsPage;
