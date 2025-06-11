'use client';
import React from 'react'
import { useState } from 'react';

import Image1 from '@/public/images/Thumbnail/hq720(1).jpg'
import Image2 from '@/public/images/Thumbnail/hq720(2).jpg'
import Image3 from '@/public/images/Thumbnail/hq720(3).jpg'
import Image4 from '@/public/images/Thumbnail/hq720(4).jpg'
import Image5 from '@/public/images/Thumbnail/hq720.jpg'
import Image6 from '@/public/images/Thumbnail/hq720(5).jpg'
import Image from 'next/image';

const dummyArticles = [
    {
      title: 'Trump Introduces New Tariff Policy',
      content: 'President Donald Trump announced a new tariff policy...',
      image: Image1,
    },
    {
      title: 'Global Markets React to U.S. Policy',
      content: 'Markets worldwide experienced a dip following the news...',
      image: Image2,
    },
    {
      title: 'Experts Warn of Economic Ripple Effects',
      content: 'Economists believe this could lead to price hikes...',
      image: Image3,
    },
    {
      title: 'China Retaliates With Counter Tariffs',
      content: 'In response, China announced tariffs on U.S. goods...',
      image: Image4,
    },
    {
      title: 'European Union Plans Legal Action',
      content: 'EU considers filing a complaint to WTO...',
      image: Image5,
    },
    {
      title: 'Small Businesses Caught in the Crossfire',
      content: 'Local businesses fear supply chain disruptions...',
      image: Image6,
    },
    {
      title: 'Trade Deficit Debate Resurfaces',
      content: 'Some argue the new policy is overdue, others disagree...',
      image: Image1,
    },
    {
      title: 'Impact on Auto Industry',
      content: 'Automobile companies assess their global strategies...',
      image: Image2,
    },
    {
      title: 'India Requests Tariff Exemption',
      content: 'India urges reconsideration of tariffs...',
      image: Image3,
    },
  ];
export const MoreArticle = () => {
    const [visibleCount, setVisibleCount] = useState(3);

    const showMore = () => {
      setVisibleCount((prev) => prev + 3);
    };
  
    const isAllVisible = visibleCount >= dummyArticles.length;
  return (
    <div className="container mx-auto px-4 py-8 ">
      <h1 className="text-3xl font-bold mb-6 text-center">More Articles</h1>

      <div className="grid md:grid-cols-3 gap-6">
        {dummyArticles.slice(0, visibleCount).map((article, idx) => (
          <div key={idx} className="bg-white p-4">
            <Image src={article.image} alt={article.title} className=" mb-3" />
            <h2 className="text-xl font-semibold">{article.title}</h2>
            <p className="text-gray-700 mt-2">{article.content}</p>
          </div>
        ))}
      </div>

      {!isAllVisible && (
        <div className="text-center mt-8">
          <button
            onClick={showMore}
            className="px-6 py-2 bg-[#171717] hover:bg-[#353535] text-white rounded transition"
          >
            Show More
          </button>
        </div>
      )}
    </div>
  )
}
