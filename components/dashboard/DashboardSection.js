import React from "react";
import { Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";
import { IoCreateOutline } from "react-icons/io5";
import ProgressCard from "./ProgressCard";
import Link from "next/link";
import Image from "next/image";
import { IoMdTrendingUp } from "react-icons/io";
import { MdAccessTime } from "react-icons/md";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

const DashboardSection = ({data}) => {

  const trendingArticleViews = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Views",
        data: [500, 800, 1200, 900, 1400, 1600],
        borderColor: "#4f46e5",
        backgroundColor: "rgba(79, 70, 229, 0.2)",
        fill: true,
      },
    ],
  };

  const websiteTraffic = {
    labels: ["Direct", "Search", "Social", "Referral"],
    datasets: [
      {
        label: "Traffic",
        data: [14500, 8000, 3000, 1251],
        backgroundColor: ["#4f46e5", "#22c55e", "#facc15", "#ec4899"],
      },
    ],
  };

  return (
    <div className="px-3 max-[769px]:p-0 min-h-screen">
      <div className="text-2xl font-bold mb-6">Dashboard</div>
      <hr className="border-t border-gray-300 mb-5"></hr>

      <div className="flex justify-between">
        <div className="flex flex-col gap-6 w-full max-[769px]:gap-2 max-[769px]:my-2 max-w-1/3">
          <Link href="/dashboard/articles/form" className="bg-[#18181d] text-white p-4 pb-8 shadow flex flex-col items-center max-w-[330px]">
            <IoCreateOutline className="text-4xl max-[769px]:text-2xl max-[769px]:mb-2"/>
            <p className="text-lg max-[769px]:text-sm text-gray-300">Create a new article</p>
          </Link>
          <ProgressCard
          title="Total Views"
          total={9245}
          newCount={5900}
          returning={3100}
          color="blue"
        />     
        </div>

        <div className="flex flex-col gap-6 max-[769px]:gap-2 justify-between w-full">
          <div className="w-[100%] grid grid-cols-1 md:grid-cols-3 gap-6 max-[769px]:gap-2">
            <div className="bg-white p-4 shadow flex flex-col items-center text-center w-full">
              <p className="text-3xl max-[769px]:text-2xl font-bold">25</p>
              <h2 className="text-lg max-[769px]:text-sm mb-4 text-gray-500">Total Articles</h2>         
            </div>
            <div className="bg-white p-4 shadow flex flex-col items-center text-center">
              <p className="text-3xl max-[769px]:text-2xl font-bold">19</p>
              <h2 className="text-lg max-[769px]:text-sm mb-4 text-gray-500">Total Videos</h2>         
            </div>
            <div className="bg-white p-4 shadow flex flex-col items-center text-center">
              <p className="text-3xl max-[769px]:text-2xl font-bold">179</p>
              <h2 className="text-lg max-[769px]:text-sm mb-4 text-gray-500">Total Comments</h2>         
            </div>
          </div>
          <div className="p-4 shadow w-[100%] bg-white">
            <h2 className="text-xl font-semibold mb-2">Trending Article Views</h2>
            <Line data={trendingArticleViews} />
          </div>
      </div>
      </div>
      
      <div className="my-6 max-[769px]:my-2">
        <div className="bg-white p-4 shadow">
          <h2 className="text-xl font-semibold">Account Traffic</h2>
          <Bar data={websiteTraffic} />
        </div>
      </div>

      <div className="mt-6 max-[769px]:gap-2 max-[769px]:mt-2 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-4 shadow">
          <h2 className="text-xl font-semibold mb-2 flex items-center gap-2 border-b border-gray-300 pb-2"><IoMdTrendingUp /> Trending Articles</h2>
          <ul className="list-none space-y-1 ">
            {data.articles.map((article, index) => (
              <li key={index}>
                <Link href={`/article/${article.id}`} className={`flex pb-2 mb-2 items-center max-[769px]:flex-col max-[769px]:my-4 space-x-2 ${index === data.articles.length - 1 ? 'border-none' : 'border-b border-gray-300'}`}>
                  <Image src={article.image} alt="Thumbnail" width={100} height={100} className="max-[769px]:w-full"/>
                  <div>
                     <h2>{article.title}</h2>
                     <p className="text-sm text-gray-500">24.06.2023</p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white p-4 shadow">
          <h2 className="text-xl font-semibold mb-2 flex items-center gap-2 border-b border-gray-300 pb-2">< MdAccessTime/> Recent Articles</h2>
          <ul className="list-none space-y-1">
            {data.articles.map((article, index) => (
              <li key={index}>
                <Link href={`/article/${article.id}`} className={`flex pb-2 mb-2 items-center max-[769px]:flex-col max-[769px]:my-4 space-x-2 ${index === data.articles.length - 1 ? 'border-none' : 'border-b border-gray-300'}`}>
                
                  <Image src={article.image} alt="Thumbnail" width={100} height={100} className="max-[769px]:w-full"/>
                  <div>
                     <h2>{article.title}</h2>
                     <p className="text-sm text-gray-500">24.06.2023</p>
                  </div>
                 

                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardSection;
