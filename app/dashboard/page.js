'use client'
import React, { useEffect, useState } from "react";

import Image1 from '@/public/images/Thumbnail/hq720(1).jpg'
import Image2 from '@/public/images/Thumbnail/hq720(2).jpg'
import Image3 from '@/public/images/Thumbnail/hq720(3).jpg'
import Image4 from '@/public/images/Thumbnail/hq720(4).jpg'
import Image5 from '@/public/images/Thumbnail/hq720.jpg'
import Image6 from '@/public/images/Thumbnail/hq720(5).jpg'
import DashboardScreen from "@/components/dashboard/DashboardScreen";
import DashboardScreenSkeleton from "@/components/dashboard/DashboardScreenSkeleton";

const Page = () => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);
  
  const sampleMessages = [
    {
      senderName: "John Doe",
      text: "Hey, just checking in!",
      timestamp: "2025-04-16T12:45:00Z",
    },
    {
      senderName: "Jane Smith",
      text: "Don’t forget the meeting at 3 PM.",
      timestamp: "2025-04-16T10:30:00Z",
    },
  ];
  const fakeUserData = {
    articles: [
      {
        title: "Those who have created peace, are the world better?",
        date: "January 6, 2020",
        read: "3 mins read",
        author: "Ryan",
        description:
          "Ash jaguar ostrich quail one excited dear hello and bound[1] and the and bland moral misheard roadrunner flapped lynx...",
        image: Image1,
      },
      {
        title: "This Concept Jet Could Get You From New York To London In Under 11 Minutes",
        date: "July 26, 2019",
        read: "3 mins read",
        author: "Ryan",
        description:
          "Ash jaguar ostrich quail one excited dear hello and bound[1] and the and bland moral misheard roadrunner flapped lynx...",
        image: Image2,
      },
      {
        title: "Bradley Cooper’s “Twin” Causes Madness At Sundance Film Festival Opening",
        date: "July 26, 2019",
        read: "2 mins read",
        author: "Ryan",
        description:
          "Uninhibited carnally hired played in whimpered dear gorilla koala depending and much yikes off far quetzal goodness...",
        image: Image3,
      },
      {
        title: "Greek Islanders are to be Nominated for Peace Prize",
        date: "July 25, 2019",
        read: "2 mins read",
        author: "Ryan",
        description:
          "Submissive much less between in and the by wow cutely versus vitally much by alas when on far that koala fought...",
        image: Image4,
      },
      {
        title: "30th Anniversary of the Space Shuttle Challenger Catastrophe, in pictures",
        date: "July 25, 2019",
        read: "2 mins read",
        author: "Ryan",
        description:
          "More accommodatingly anticipatively because until frog attractively and ludicrously that the re-laid sociable...",
        image: Image5,
      },
      {
        title: "Uber is Using Phone Gyrometers to Check Whether Drivers go Over Speed",
        date: "July 24, 2019",
        read: "2 mins read",
        author: "Ryan",
        description:
          "Some snug a some far a much sociably hence and where justly considering one preparatory up this less and crud had wow...",
        image: Image6,
      },
    ],
    videos: [{ title: 'Intro Video', url: '/videos/sample.mp4' },{ title: 'Intro Video', url: '/videos/sample.mp4' },{ title: 'Intro Video', url: '/videos/sample.mp4' },
      { title: 'Intro Video', url: '/videos/sample.mp4' },{ title: 'Intro Video', url: '/videos/sample.mp4' },{ title: 'Intro Video', url: '/videos/sample.mp4' }
    ],
    copyrights: [{ title: 'My Copyright Claim', claimStatus: 'Pending' }],
  };
  return (
    <div className="w-full">
      {loading ? <DashboardScreenSkeleton /> : <DashboardScreen />}
      
      </div>
  )
}

export default Page