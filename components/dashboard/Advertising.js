"use client";
import Image from "next/image";
import React, { useState } from "react";
import { IoCreateOutline } from "react-icons/io5";

const advertisingData = [
  {
    id: 1,
    name: "Election 2025 Awareness",
    impressions: 12000,
    clicks: 5400,
    ctr: "4.5%",
    budgetUsed: "₹42,000",
    duration :'01/01/2023 - 31/12/2023',
    image:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=60",
  },
  {
    id: 2,
    name: "Youth Employment Campaign",
    impressions: 95000,
    clicks: 3800,
    ctr: "4.0%",
    budgetUsed: "₹32,000",
    duration :'01/04/2023 - 31/10/2023',
    image:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=60",
  },
  {
    id: 3,
    name: "Vaccination Awareness Drive",
    impressions: 180000,
    clicks: 9100,
    ctr: "5.1%",
    budgetUsed: "₹75,000",
    duration :'01/01/2025 - 30/04/2025',
    image:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=60",
  },
  {
    id: 4,
    name: "Tech Journalism Conference",
    impressions: 73000,
    clicks: 2400,
    ctr: "3.3%",
    budgetUsed: "₹25,000",
    duration :'01/05/2025 - 31/06/2025',
    image:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=60",
  },
];

const Advertising = () => {
  const [ads, setAds] = useState(advertisingData);

  const handleCreateAd = () => {
    alert("Create Ad form coming soon!");
  };

  return (
    <div className="p-6 mt-6 max-[769px]:p-0 max-[769px]:mt-2">
      <div className="flex justify-between mb-6 max-[769px]:mb-2">
        <h1 className="text-3xl font-bold ">Advertising</h1>
        <button className="py-2 cursor-pointer px-4 bg-[#171717] hover:bg-[#353535] text-white font-semibold transition flex items-center gap-2">
        <IoCreateOutline />  Create Ad
        </button>
      </div>
      <hr className="border-t border-gray-300 mb-5"></hr>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-[769px]:gap-2">
        {ads.map((ad) => (
          <div
            key={ad.id}
            className=" overflow-hidden bg-white shadow hover:shadow-md transition"
          >
            <Image
              src={ad.image}
              alt={ad.name}
              className="w-full h-50 "
              width={160}
              height={160}
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold">{ad.name}</h3>
              <div className="text-sm text-gray-600 mt-2 space-y-1">
                <p>📊 Impressions: {ad.impressions}</p>
                <p>🖱️ Clicks: {ad.clicks.toLocaleString()}</p>
                <p>💡 CTR: {ad.ctr}</p>
                <p>💸 Budget Used: {ad.budgetUsed}</p>
                <p>📅 Duration: {ad.duration}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Advertising;
