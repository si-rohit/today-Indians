import React from 'react'
import Image from 'next/image'
import noImage from '@/public/images/noImage.jpeg'
import artImage1 from '@/public/images/Thumbnail/hq720(1).jpg';
import artImage2 from '@/public/images/Thumbnail/hq720(2).jpg';
import artImage3 from '@/public/images/Thumbnail/hq720(3).jpg';
import artImage4 from '@/public/images/Thumbnail/hq720(4).jpg';
import artImage5 from '@/public/images/Thumbnail/hq720.jpg';
import artImage6 from '@/public/images/Thumbnail/hq720(5).jpg';

const NewsAccToType = () => {
    const mainNews = {
        thumbnail: artImage1,
        time: '04:19',
        title: "MLC: Unmukt Chand is LAKR's lone bright spot, but will USA Cricket notice?"
    };

    const subNews = [
        { img: artImage2, title: "Rohit on Pant's 'fake injury' during T20 WC final: 'Genuine...'" },
        { img: artImage3, title: "'The King': Parag hails Kohli as his inspiration; all-..." },
        { img: artImage4, title: "Watch: 'Who broke my bat?' - Siraj fumes during..." },
        { img: artImage5, title: "'Far too defensive' - Ex-India cricketer urges captain Gill to..." },
    ];

    const sideList = [
    "Gully To Glory: Ramandeep Singh's journey...",
    "Jos Buttler Exclusive Interview: I owe J...",
    "ZIM vs SA, 1st Test: Brian Bennett rule...",
    "Fined! England slapped with heavy pen...",
    "CSK star batter creates history, smashe...",
    "'Will I play again?: Rishabh Pant's painf...",
    "IND vs ENG: 'We never gave India...' - ...",
    "'Heart in my mouth': Rohit on Surya's jo...",
    "'Lords is great but...': Ravi Shastri mak...",
    "'Most people don't even have a 13-year...",
    "'Even Virat was thinking ... ': Rohit on ...",
    "Wimbledon 2025 Live Streaming: Where..."
    ];

    const esports = [
    'How to build a spider farm in Minecraft',
    'EA FC Mobile leak hints at the upcomi...',
    'Ann Takamaki in Persona 5...',
    'Who is the best character in...',
    'How to get Lava Chicken Music Disc in...',
    'Is the Joker worth pulling in Persona ...',
    'How to charge your vehicles in...',
    'How to get Hunting Badge in 99...',
    'All Environmental Hazards an...'
    ];
  return (
    <div className="container mx-auto px-4 py-6 grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Sports Left Column */}
      <div className="">
        <h2 className="text-xl font-bold mb-4">Sports &rsaquo;</h2>
        <div className="flex flex-col gap-4">
          {/* Featured */}
          <div className="relative">
            <Image
              src={mainNews.thumbnail}
              alt="Main news"
              className="w-full h-[180px]"
            />
            <div className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded">
              ⏺ {mainNews.time}
            </div>
            <h3 className="mt-2 text-md font-semibold leading-tight">
              {mainNews.title}
            </h3>
          </div>

          {/* Thumbnails List */}
          <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
            {subNews.map((news, i) => (
              <div key={i} className="flex gap-2">
                <Image src={news.img} alt="" className="w-20 h-16" />
                <p className="text-sm font-medium">{news.title}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* medle */}
        <ul className="space-y-1.5 border-r border-gray-200 text-sm">
          {sideList.map((item, i) => (
            <li key={i} className="border-l-2 pl-2 border-gray-300 hover:text-blue-500 cursor-pointer">
              {item}
            </li>
          ))}
        </ul>
      {/* Right Column */}
      <div>       
        {/* Esports Section */}
        <h3 className="mt-4 font-semibold text-lg">Esports</h3>
        <div className="grid grid-cols-3 gap-2 mt-2">
          {esports.map((text, i) => (
            <div key={i} className="text-xs text-center">
              <Image
                src={artImage6}
                alt="Esport"
                className="w-full h-16 mb-1"
              />
              <p>{text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default NewsAccToType