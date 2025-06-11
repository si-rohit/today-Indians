import Image from "next/image";
import React from "react";
import { FaAngleRight } from "react-icons/fa";
import image from "@/public/images/Thumbnail/hq720.jpg";
import Link from "next/link";

const notifications = {
  followRequests: [
    {
      id: 1,
      name: "keshav.6305",
      image: "/user1.jpg",
      others: 6,
    },
  ],
  thisMonth: [
    {
      id: 2,
      name: "pushp.berwal",
      time: "1w",
      image: "/user2.jpg",
      followed: true,
    },
    {
      id: 3,
      name: "_lela_majnu001",
      time: "2w",
      image: "/user3.jpg",
      followed: false,
    },
    {
      id: 4,
      name: "lohan9392",
      time: "3w",
      image: "/user4.jpg",
      followed: false,
    },
    {
      id: 5,
      name: "moni.kthkr",
      time: "3w",
      image: "/user5.jpg",
      followed: false,
    },
  ],
  earlier: [
    {
      id: 6,
      name: "swadubalak24",
      time: "5w",
      image: "/user6.jpg",
      type: "request",
    },
    {
      id: 7,
      name: "jaan.jatnii.01",
      time: "7w",
      image: "/user7.jpg",
      type: "like_story",
    },
    {
      id: 8,
      name: "binudhillonbinudhillon",
      time: "7w",
      image: "/user8.jpg",
      type: "like_photo",
    },
    {
      id: 9,
      name: "keshav.6305",
      time: "8w",
      image: "/user9.jpg",
      type: "request",
    },
  ],
};

const Page = () => {
  return (
    <div className="min-h-screen px-3 max-w-[70%]">
      <h2 className="text-2xl font-bold mb-4">Notifications</h2>

      {/* Follow Requests */}
      {notifications.followRequests.length > 0 && (
        <Link href={"/dashboard/notification/follow-requests"} className="mb-4 cursor-pointer">
          <div className="flex items-center gap-3">
            <Image
              // src={notifications.followRequests[0].image}
              src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3"
              width={40} height={40}
              className="w-10 h-10"
              alt="user"
            />
            <p className="text-sm">
              <span className="font-semibold">{notifications.followRequests[0].name}</span> +{" "}
              {notifications.followRequests[0].others} others
              <br />
              <span className="text-gray-400">Follow requests</span>
            </p>
            <span className="ml-auto w-2 h-2 bg-blue-500 rounded-full"></span>
            <FaAngleRight />
          </div>
        </Link>
      )}

      {/* This Month */}
      <p className="border-t border-gray-300 text-sm text-gray-600 mt-2 pt-2 mb-2">This month</p>
      {notifications.thisMonth.map((n) => (
        <div key={n.id} className="flex items-center justify-between py-2">
          <div className="flex gap-3 items-center">
            <Image src={"https://images.unsplash.com/photo-1633332755192-727a05c4013d?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3" || n.image} width={40} height={40} className="w-10 h-10" alt="user" />
            <div>
              <p className="text-sm">
                <span className="font-semibold">{n.name}</span> started following you.
              </p>
              <p className="text-xs text-gray-400">{n.time}</p>
            </div>
          </div>
          <button
            className={`text-sm px-3 py-1 ${
              n.followed ? "bg-white border border-gray-300 text-black" : "bg-black text-white hover:bg-[#333]"
            }`}
          >
            {n.followed ? "Following" : "Follow"}
          </button>
        </div>
      ))}

      {/* Earlier */}
      <p className="text-sm text-gray-600 mt-2 pt-2 border-t border-gray-300 mb-2">Earlier</p>
      {notifications.earlier.map((n) => (
        <div key={n.id} className="flex items-center justify-between py-2">
          <div className="flex gap-3 items-center">
            <Image src={"https://images.unsplash.com/photo-1633332755192-727a05c4013d?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3" || n.image} className="w-10 h-10 " width={40} height={40} alt="user" />
            <div>
              {n.type === "request" && (
                <>
                  <p className="text-sm">
                    <span className="font-semibold">{n.name}</span> requested to follow you.
                  </p>
                  <p className="text-xs text-gray-400">{n.time}</p>
                </>
              )}
              {n.type === "like_story" && (
                <>
                  <p className="text-sm">
                    <span className="font-semibold">{n.name}</span> and others liked your article.
                  </p>
                  <p className="text-xs text-gray-400">{n.time}</p>
                </>
              )}
              {n.type === "like_photo" && (
                <>
                  <p className="text-sm">
                    <span className="font-semibold">{n.name}</span> liked your photo.
                  </p>
                  <p className="text-xs text-gray-400">{n.time}</p>
                </>
              )}
            </div>
          </div>
          {n.type === "request" ? (
            <div className="flex gap-2">
              <button className="bg-black text-white px-3 py-1 text-sm">Confirm</button>
              <button className="bg-white border border-gray-300 text-black px-3 py-1 text-sm">Delete</button>
            </div>
          ):(
            <div>
              <Image src={image || n.image} className="w-auto h-10 " width={100} height={100} alt="user" />
            </div>
          )}         
        </div>
      ))}
    </div>
  );
};

export default Page;
