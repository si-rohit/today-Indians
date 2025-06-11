'use client'
import Link from 'next/link';
import React, { useState } from 'react'
import { IoCreateOutline, IoSearch } from 'react-icons/io5';
import unnamed from '@/public/images/unnamed.jpg'
import AlreadyConected from '@/components/dashboard/Partners/AlreadyConected';
import VerifyRequest from '@/components/dashboard/Partners/verifyRequest';
import Image from 'next/image';

const partnersData = [
  {
    id: 1,
    name: "Global Media Group",
    description: "Leading provider of global news and media partnerships.",
    logo: "",
    website: "https://globalmediagroup.com",
    request:true,
  },
  {
    id: 2,
    name: "Innovate News",
    description: "Innovative news solutions for modern journalism.",
    logo: "",
    website: "https://innovatenews.com",
    request:false,
  },
  {
    id: 3,
    name: "BrightFuture Agency",
    description: "Empowering media collaborations for a brighter future.",
    logo: "",
    website: "https://brightfutureagency.com",
    request:false,
  },
];
const LargePartners = [
  {
    name: "TechCrunch",
    description: "Leading source for tech industry news.",
    logo: "https://via.placeholder.com/100x100?text=TC",
    request: true,
  },
  {
    name: "BBC News",
    description: "Global breaking news and current affairs.",
    logo: "https://via.placeholder.com/100x100?text=BBC",
    request: false,
  },
  {
    name: "Reuters",
    description: "Trusted financial market news and updates.",
    logo: "https://via.placeholder.com/100x100?text=Reuters",
    request: true,
  },
  {
    name: "NDTV",
    description: "Top India-based news and analysis channel.",
    logo: "https://via.placeholder.com/100x100?text=NDTV",
    request: false,
  },
  {
    name: "CNBC",
    description: "Financial news and market data updates.",
    logo: "https://via.placeholder.com/100x100?text=CNBC",
    request: true,
  },
  {
    name: "The Hindu",
    description: "Indian English-language daily newspaper.",
    logo: "https://via.placeholder.com/100x100?text=Hindu",
    request: false,
  },
  {
    name: "Times Now",
    description: "Fastest growing news channel in India.",
    logo: "https://via.placeholder.com/100x100?text=TimesNow",
    request: true,
  },
  {
    name: "Economic Times",
    description: "Business and economic news insights.",
    logo: "https://via.placeholder.com/100x100?text=ET",
    request: false,
  },
  {
    name: "Al Jazeera",
    description: "Middle East’s leading news broadcaster.",
    logo: "https://via.placeholder.com/100x100?text=AJ",
    request: false,
  },
  {
    name: "Mashable",
    description: "Tech, digital culture, and entertainment.",
    logo: "https://via.placeholder.com/100x100?text=Mash",
    request: true,
  },
  {
    name: "India Today",
    description: "Breaking news, politics and analysis.",
    logo: "https://via.placeholder.com/100x100?text=IT",
    request: false,
  },
  {
    name: "Quartz",
    description: "News for the new global economy.",
    logo: "https://via.placeholder.com/100x100?text=Quartz",
    request: true,
  },
  {
    name: "Wired",
    description: "Technology and future innovation news.",
    logo: "https://via.placeholder.com/100x100?text=Wired",
    request: false,
  },
  {
    name: "The Print",
    description: "India's independent journalism platform.",
    logo: "https://via.placeholder.com/100x100?text=Print",
    request: false,
  },
  {
    name: "Scroll.in",
    description: "Digital media for Indian stories.",
    logo: "https://via.placeholder.com/100x100?text=Scroll",
    request: true,
  },
  {
    name: "LiveMint",
    description: "Latest business and financial news.",
    logo: "https://via.placeholder.com/100x100?text=Mint",
    request: false,
  },
  {
    name: "News18",
    description: "India’s leading news portal.",
    logo: "https://via.placeholder.com/100x100?text=N18",
    request: false,
  },
  {
    name: "Firstpost",
    description: "Analytical and opinionated digital news.",
    logo: "https://via.placeholder.com/100x100?text=FP",
    request: true,
  },
  {
    name: "InShorts",
    description: "News in 60 words - short and crisp.",
    logo: "https://via.placeholder.com/100x100?text=IS",
    request: true,
  },
  {
    name: "Hindustan Times",
    description: "India's popular English daily.",
    logo: "https://via.placeholder.com/100x100?text=HT",
    request: false,
  },
  {
    name: "Bloomberg",
    description: "Global financial news giant.",
    logo: "https://via.placeholder.com/100x100?text=BBG",
    request: true,
  },
  {
    name: "Forbes",
    description: "Business, investing, and tech news.",
    logo: "https://via.placeholder.com/100x100?text=Forbes",
    request: false,
  },
  {
    name: "YourStory",
    description: "Startups and entrepreneurial stories.",
    logo: "https://via.placeholder.com/100x100?text=YS",
    request: false,
  },
  {
    name: "TechRadar",
    description: "Tech reviews and gadget news.",
    logo: "https://via.placeholder.com/100x100?text=TR",
    request: true,
  },
  {
    name: "DNA India",
    description: "Daily News and Analysis.",
    logo: "https://via.placeholder.com/100x100?text=DNA",
    request: false,
  },
  {
    name: "Zee News",
    description: "India’s leading news network.",
    logo: "https://via.placeholder.com/100x100?text=Zee",
    request: true,
  },
  {
    name: "OneIndia",
    description: "Multi-language news platform.",
    logo: "https://via.placeholder.com/100x100?text=OI",
    request: false,
  },
  {
    name: "Yahoo News",
    description: "Global breaking and trending stories.",
    logo: "https://via.placeholder.com/100x100?text=Yahoo",
    request: false,
  },
  {
    name: "Business Insider",
    description: "Tech, finance, and market insights.",
    logo: "https://via.placeholder.com/100x100?text=BI",
    request: true,
  },
  {
    name: "Gizmodo",
    description: "Tech and gadget culture.",
    logo: "https://via.placeholder.com/100x100?text=Giz",
    request: false,
  },
  {
    name: "NewsWeek",
    description: "News, politics and world stories.",
    logo: "https://via.placeholder.com/100x100?text=NW",
    request: true,
  },
  {
    name: "Business Today",
    description: "India’s leading business magazine.",
    logo: "https://via.placeholder.com/100x100?text=BT",
    request: false,
  },
  {
    name: "BuzzFeed News",
    description: "Viral stories and investigations.",
    logo: "https://via.placeholder.com/100x100?text=Buzz",
    request: true,
  },
  {
    name: "Financial Express",
    description: "Finance, economy, and stock news.",
    logo: "https://via.placeholder.com/100x100?text=FE",
    request: false,
  },
  {
    name: "The Wire",
    description: "Independent Indian digital news.",
    logo: "https://via.placeholder.com/100x100?text=Wire",
    request: false,
  },
  {
    name: "Mint Lounge",
    description: "Lifestyle and weekend reading.",
    logo: "https://via.placeholder.com/100x100?text=ML",
    request: true,
  },
  {
    name: "Fox News",
    description: "Conservative news and US politics.",
    logo: "https://via.placeholder.com/100x100?text=Fox",
    request: false,
  },
  {
    name: "CNN",
    description: "US and world breaking news source.",
    logo: "https://via.placeholder.com/100x100?text=CNN",
    request: false,
  },
  {
    name: "Deccan Herald",
    description: "South India’s trusted newspaper.",
    logo: "https://via.placeholder.com/100x100?text=DH",
    request: true,
  },
  {
    name: "Outlook India",
    description: "News magazine with unique insights.",
    logo: "https://via.placeholder.com/100x100?text=Outlook",
    request: false,
  },
  {
    name: "The Ken",
    description: "In-depth business journalism.",
    logo: "https://via.placeholder.com/100x100?text=Ken",
    request: true,
  },
  {
    name: "The Quint",
    description: "Bold and interactive news platform.",
    logo: "https://via.placeholder.com/100x100?text=Quint",
    request: false,
  },
  {
    name: "Rediff",
    description: "Online news, shopping & more.",
    logo: "https://via.placeholder.com/100x100?text=Rediff",
    request: true,
  },
  {
    name: "ET Now",
    description: "Business news from Economic Times.",
    logo: "https://via.placeholder.com/100x100?text=ETN",
    request: false,
  },
  {
    name: "IndiaSpend",
    description: "Data journalism in India.",
    logo: "https://via.placeholder.com/100x100?text=ISpend",
    request: false,
  },
  {
    name: "Factly",
    description: "Indian public data journalism.",
    logo: "https://via.placeholder.com/100x100?text=Factly",
    request: true,
  },
  {
    name: "Newslaundry",
    description: "Media critique and investigative stories.",
    logo: "https://via.placeholder.com/100x100?text=NL",
    request: true,
  },
  {
    name: "Open Magazine",
    description: "Indian current affairs and opinion.",
    logo: "https://via.placeholder.com/100x100?text=Open",
    request: false,
  },
  {
    name: "ScoopWhoop",
    description: "Trending Indian stories and satire.",
    logo: "https://via.placeholder.com/100x100?text=SW",
    request: true,
  },
  {
    name: "Digit",
    description: "India’s top tech media brand.",
    logo: "https://via.placeholder.com/100x100?text=Digit",
    request: false,
  }
];
const Page = () => {
  const [partners] = useState(partnersData);
  const [searchOpen, setSearchOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [selectInvite, setSelectInvite] = useState(null);

  const  filteredPartners = LargePartners.filter((partner) => partner.name.toLowerCase().includes(inputValue.toLowerCase()));

  const handleCloseVerifyModal = () => {
    setSelectInvite(null);
  }
  return (
    <div className="">
      {/* Page Title */}
      <div className='flex justify-between items-center mb-6'>
        <div className="text-3xl font-bold">Partners</div>
        <button onClick={() => setSearchOpen(true)} className="bg-black hover:bg-[#222] text-white px-4 py-2 text-sm">Invite</button>
      </div>     
      <hr className="border-t border-gray-300 mb-5"></hr>

      {/* Partners List */}
      {searchOpen ? (
        <div>
          <div className={`p-6 min-h-[60vh] flex flex-col  mb-10 ${inputValue ? 'items-center justify-start' : 'items-center justify-center'}`}>
            <form className=''>
              <div className="mb-4 flex flex-col justify-center items-center">
                <h2 className=" text-black font-bold mb-2 text-4xl" htmlFor="name">
                  Find Your Partner
                </h2>
                <div className='flex items-center justify-between shadow appearance-none border min-w-[500px] w-full'>
                  <input
                  className="w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="name"
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Enter partner name"
                  />
                  <div className='px-4 py-1 cursor-pointer border-l text-white bg-[#111]'>
                    <IoSearch className='text-3xl '/>
                  </div>
                  
                </div>              
              </div>
            </form>
            <div className={`flex flex-col w-full bg-white pt-4 ${inputValue ? 'block' : 'hidden'}`}>
              {filteredPartners.length === 0 ? (
                <h1 className='text-2xl text-gray-400 font-bold w-full min-h-[50vh] flex items-center justify-center'>No Partners Found</h1>
              ) : (
                filteredPartners.map((partner, index) => (
                  <div className='w-full flex flex-col ' key={index}>
                    <div className='flex justify-between w-full items-center px-4'>
                      <div className='flex items-center'>
                        <Image className='w-12 h-12 ' width={48} height={48} src={unnamed} alt={partner.name} />
                        <div className='ml-4'>
                          <h1 className='text-2xl font-bold'>{partner.name}</h1>
                          <p className='text-gray-600'>{partner.description}</p>
                        </div>
                      </div>
                      <div>
                        <button onClick={() => setSelectInvite(partner.name)} className='flex gap-2 items-center py-2 cursor-pointer px-4 bg-[#171717] hover:bg-[#353535] text-white font-semibold transition'>
                          <IoCreateOutline /> <p>Invite</p>
                        </button>
                      </div>
                    </div>
                    <hr className='border-t border-gray-300 my-4' />
                  </div>
                ))
              )}
            </div>
            {
            selectInvite !== null && <div>
              {LargePartners.find((partner) => partner.name === selectInvite).request === true ? <VerifyRequest type='partner' name={selectInvite} handleCloseVerifyModal={handleCloseVerifyModal} /> : <AlreadyConected name={selectInvite} type='partner' handleCloseVerifyModal={handleCloseVerifyModal}/>}
            </div> 
          }  
          </div> 
        </div> 
      ): 
      <div className="space-y-3">
        {partners.map((partner) => (
          <div
            key={partner.id}
            className="bg-gray-50 p-6 flex items-center justify-between shadow hover:shadow-lg transition"
          >
            <div className="flex items-center space-x-4">
              <Image
                src={partner.logo || unnamed}
                alt={partner.name}
                className="w-20 h-10 object-contain rounded"
                width={100}
                height={100}
              />
              <div>
                <h2 className="text-xl font-semibold">{partner.name}</h2>
                <p className="text-gray-600 text-sm">{partner.description}</p>
              </div>
            </div>
            <a
              href={partner.website}
              target="_blank"
              rel="noopener noreferrer"
              className={`text-white px-4 py-2 text-sm ${partner.request ? 'bg-[#007500] hover:bg-[#468643]' : 'bg-black hover:bg-[#222]'}`}
            >
              {partner.request ? 'Accept' : 'Visit'}
            </a>
          </div>
        ))}
      </div>
    }
    </div>
  )
}

export default Page