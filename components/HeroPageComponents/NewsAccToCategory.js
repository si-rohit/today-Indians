import React from 'react'
import Image from 'next/image'
import noImage from '@/public/images/noImage.jpeg'

const NewsAccToCategory = () => {
    const newsData = [
        {
            title: "Chief Justice John Roberts Urges Political Leaders to Tone Down Rhetoric",
            desc: "At a conference with federal judges, he did not mention the court’s decision sharply limiting their power, focusing instead on threats to the judiciary.",
            time: "3 MIN READ",
        },
        {
            title: "Chess Lover Brings the Game to Malawi’s Prisons, Schools and Kids",
            desc: "Susan Namangale fell in love with the game at age 9 in her small village, and she’s now on a mission to deliver a message: Chess is good for everyone.",
            time: "5 MIN READ",
        },
        {
            title: "Mikayla Raines, Who Rescued Foxes and Other Animals, Is Dead at 30",
            desc: "She founded Save a Fox Rescue to care for foxes that had been abandoned or bred for their pelts, gaining millions of social media followers along the way.",
            time: "4 MIN READ",
        },
        {
            title: "Chief Justice John Roberts Urges Political Leaders to Tone Down Rhetoric",
            desc: "At a conference with federal judges, he did not mention the court’s decision sharply limiting their power, focusing instead on threats to the judiciary.",
            time: "3 MIN READ",
        },
        ];
  return (
    <div className="container mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Left News List */}
      <div className="">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Sports</h2>
        {newsData.map((item, index) => (
          <div key={index} className="border-b border-gray-200 pb-4">
            <h3 className="text-md font-semibold text-black hover:underline cursor-pointer">
              {item.title}
            </h3>
            <p className="text-sm text-gray-600 ">{item.desc}</p>
            <p className="text-xs text-gray-400 mt-1">{item.time}</p>
          </div>
        ))}
      </div>

      {/* Right Image + Featured News */}
      <div>
        <Image
          src={noImage} 
          alt="Squid Game Crowd"
          className="w-full h-auto "
        />
        <p className="text-xs text-gray-500 mt-1">Jun Michael Park for The New York Times</p>
        <h3 className="text-lg font-semibold text-black mt-2">
          For South Koreans, ‘Squid Game’ Was More Than Just Entertainment
        </h3>
        <p className="text-sm text-gray-600 mt-1">
          The Netflix hit has left a lasting legacy as a major cultural export, but also one that
          exposed some unsettling aspects of Korean society.
        </p>
        <p className="text-xs text-gray-400 mt-1">3 MIN READ</p>
      </div>
    </div>
  )
}

export default NewsAccToCategory