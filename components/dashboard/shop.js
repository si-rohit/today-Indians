"use client";
import Image from "next/image";
import React, { useState } from "react";

const shopItems = [
  {
    id: 1,
    name: "News Journal T-Shirt",
    description: "Comfortable cotton tee with logo print.",
    price: "499",
    stock: 35,
    image:
      "https://images.unsplash.com/photo-1509021436665-8f07dbf5bf1d?auto=format&fit=crop&w=800&q=60",
  },
  {
    id: 2,
    name: "Press Pass Lanyard",
    description: "Official-style lanyard for events & reporting.",
    price: "149",
    stock: 12,
    image:
      "https://images.unsplash.com/photo-1509021436665-8f07dbf5bf1d?auto=format&fit=crop&w=800&q=60",
  },
  {
    id: 3,
    name: "Media Ethics Handbook (eBook)",
    description: "Guidebook on journalism ethics & best practices.",
    price: "299",
    stock: 200,
    image:
      "https://images.unsplash.com/photo-1509021436665-8f07dbf5bf1d?auto=format&fit=crop&w=800&q=60",
  },
  {
    id: 4,
    name: "Premium News Subscription",
    description: "1-year access to premium content.",
    price: "1199",
    stock: 50,
    image:
      "https://images.unsplash.com/photo-1509021436665-8f07dbf5bf1d?auto=format&fit=crop&w=800&q=60",
  },
  {
    id: 5,
    name: "Field Reporting Notebook",
    description: "Durable notebook for on-the-go journalism.",
    price: "99",
    stock: 80,
    image:
      "https://images.unsplash.com/photo-1509021436665-8f07dbf5bf1d?auto=format&fit=crop&w=800&q=60",
  },
];

const Shop = () => {
  const [items, setItems] = useState(shopItems);

  const handleBuy = (name) => {
    alert(`Thanks for showing interest in purchasing: ${name}`);
  };

  return (
    <div className="p-6 mt-6 max-[769px]:p-0 max-[769px]:mt-2">
        <div className="flex justify-between mb-6 max-[769px]:mb-2">
          <h1 className="text-3xl font-bold ">Shop</h1>
          <span className="text-gray-500 text-sm">{items.length} items</span>
        </div>
        <hr className="border-t border-gray-300 mb-5"></hr>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-[769px]:gap-2">
        {items.map((item) => (
          <div
            key={item.id}
            className="bg-white overflow-hidden shadow hover:shadow-md transition"
          >
            <Image
              src={item.image}
              alt={item.name}
              className="w-full h-50 object-cover"
              width={160}
              height={160}
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold">{item.name}</h3>
              <p className="text-gray-600 text-sm mt-1">{item.description}</p>
              <div className="flex items-end gap-3">
                <p className="mt-2 text-black font-semibold text-xl">₹{item.price}</p>
                <p className="mt-2 text-gray-500 line-through font-semibold">₹{item.price*2-50}</p>
                
              </div>
              
              <p className="text-sm text-gray-500">Stock: {item.stock}</p>
              
              <button onClick={() => handleBuy(item.name)} className="py-2 w-full cursor-pointer px-4 bg-[#171717] hover:bg-[#353535] text-white font-semibold transition">
                    Buy Now
                </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Shop;
