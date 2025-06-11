'use client'
import Image from "next/image";
import React from "react";
import { FaAngleLeft } from "react-icons/fa";

const followRequests = [
  { id: 1, username: "keshav.6305", fullName: "Keshav", image: "/user1.jpg" },
  { id: 2, username: "gopalpandit4090", fullName: "gopal", image: "/user2.jpg" },
  { id: 3, username: "swadubalak24", fullName: "Sachin_Saini", image: "/user3.jpg" },
  { id: 4, username: "silu_bhamniya_143", fullName: "Silu Baminya", image: "/user4.jpg" },
  { id: 5, username: "surenderdhillon60", fullName: "surender Dhillon", image: "/user5.jpg" },
  { id: 6, username: "vishaldhanda498", fullName: "Vishal Dhanda", image: "/user6.jpg" },
  { id: 7, username: "numberdar_courier", fullName: "Numberdar Courier", image: "/user7.jpg" },
];

const suggestions = [
  {
    id: 1,
    username: "s.sharma23",
    note: "Followed by pushp.berwal",
    image: "/user8.jpg",
  },
  {
    id: 2,
    username: "lohan9392",
    note: "Followed by ashidshahola50",
    image: "/user9.jpg",
  },
  {
    id: 3,
    username: "manavrathore407",
    note: "Suggested for you",
    image: "/user10.jpg",
  },
  {
    id: 4,
    username: "miss.sharma007",
    note: "Suggested for you",
    image: "/user11.jpg",
  },
  {
    id: 5,
    username: "sahuldhanda007",
    note: "Suggested for you",
    image: "/user12.jpg",
  },
];

const Page = () => {
  return (
    <div className="px-3 max-w-[70%] min-h-screen">
      <div className="flex items-center mb-5 text-2xl font-semibold gap-2">
        <FaAngleLeft onClick={() => window.history.back()} cursor={"pointer"}/>
        <h2 className="">Follow requests</h2>
      </div>
      

      {/* Follow Requests */}
      {followRequests.map((user) => (
        <div key={user.id} className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <Image src={"https://images.unsplash.com/photo-1633332755192-727a05c4013d?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3" || user.image} width={40} height={40} alt={user.username} className="w-10 h-10" />
            <div>
              <p className="text-sm font-semibold">{user.username}</p>
              <p className="text-xs text-gray-400">{user.fullName}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="bg-black text-white text-sm px-3 py-1">Confirm</button>
            <button className="bg-white text-black border border-gray-300 text-sm px-3 py-1">Delete</button>
          </div>
        </div>
      ))}

      {/* Suggested */}
      <h3 className="text-2xl font-semibold mt-6 mb-3">Suggested for you</h3>
      {suggestions.map((user) => (
        <div key={user.id} className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <Image src={"https://images.unsplash.com/photo-1633332755192-727a05c4013d?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3" || user.image} width={40} height={40} alt={user.username} className="w-10 h-10" />
            <div>
              <p className="text-sm font-semibold">{user.username}</p>
              <p className="text-xs text-gray-400">{user.note}</p>
            </div>
          </div>
          <button className="bg-black text-white text-sm px-4 py-1">Follow</button>
        </div>
      ))}
    </div>
  );
};

export default Page;
