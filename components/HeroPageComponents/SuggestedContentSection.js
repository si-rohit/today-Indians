import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import artImage1 from '@/public/images/Thumbnail/hq720(1).jpg';
import artImage2 from '@/public/images/Thumbnail/hq720(2).jpg';
import artImage3 from '@/public/images/Thumbnail/hq720(3).jpg';
import artImage4 from '@/public/images/Thumbnail/hq720(4).jpg';
import artImage5 from '@/public/images/Thumbnail/hq720.jpg';
import artImage6 from '@/public/images/Thumbnail/hq720(5).jpg';

const suggestions = [
  {
    img: artImage1,
    title: 'Buy Brass Idols - Handmade Brass Statues for Home & Gifting',
    sponsor: 'Luxearlantiship | Sponsored',
  },
  {
    img: artImage2,
    title: 'Many elders are abandoned by their families, you can help!',
    sponsor: 'HelpAge India | Sponsored',
  },
  {
    img: artImage3,
    title: 'Adidas Three Shorts With 60% Discount, Limited Stock Available',
    sponsor: 'Original Adidas | Sponsored',
  },
  {
    img: artImage4,
    title: 'Singhguru: Best Public Speaking Course for Children',
    sponsor: 'Planet Spark | Sponsored',
  },
  {
    img: artImage5,
    title: '2 Simple Strategies That Can Make You Six Per Day',
    sponsor: 'thefutureuniverse.in | Sponsored',
  },
  {
    img: artImage6,
    title: 'Secure Your Child’s Future with Strong English Fluency',
    sponsor: 'Planet Spark | Sponsored',
  },
];

const promos = [
  {
    img: artImage5,
    title: 'Game On Season 1 continues with Mirabai Chanu’s inspiring story. Watch...',
  },
  {
    img: artImage2,
    title: 'Reclaim Your Vitality Today',
  },
  {
    img: artImage6,
    title: 'Join the TOI Masterclass: AI for Smarter Students',
  },
];

const bottomLinks = [
  'Global Learning Starts Here!',
  'TOI unveils first-ever Power Creator Awards: Celebrating India’s Top Digital Creators',
  'Make way for TOI’s Power Creator Awards; jury to meet in Mumbai to...',
];

const SuggestedContentSection = () => {
  return (
    <div className="container mx-auto p-4">
      <h2 className="text-md font-semibold text-gray-800 mb-3">You May Like</h2>

      {/* Top Scrollable Suggestions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 overflow-x-auto gap-4 pb-3">
        {suggestions.map((item, i) => (
          <div key={i} className="">
            <Image src={item.img} alt="suggestion" width={160} height={100} className="w-full h-[110px] " />
            <p className="text-sm mt-1 font-medium">{item.title}</p>
            <p className="text-xs text-gray-500">{item.sponsor}</p>
          </div>
        ))}
      </div>

      {/* Promos Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
        {promos.map((promo, i) => (
          <div key={i} className="bg-white shadow p-2">
            <Image src={promo.img} alt="promo" width={300} height={160} className="w-full h-[220px]" />
            <p className="text-sm font-medium mt-2">{promo.title}</p>
          </div>
        ))}
      </div>

      {/* Bottom Links */}
      <div className="mt-4 p-4 bg-gray-100">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {bottomLinks.map((text, i) => (
            <p key={i} className="text-sm text-gray-800 md:max-w-[32%]">
              {text}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SuggestedContentSection;
