'use client'
import Header from '@/components/Header';
import { MoreArticle } from '@/components/MoreArticle';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import Duplicate from './Duplicate';
import MostPopular from '@/components/HeroPageComponents/MostPopular';
import SubHeader from '@/components/Header/SubHeader';
import DuplicateSkeleton from '@/components/DuplicateSkeleton';

const Page = () => {
  const { id } = useParams();
  // console.log(id);
  const { user } = useSelector(store => store.auth);
  const [post, setPost] = useState({});
  const [loading, setLoading] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
    
    useEffect(() => {
        const Theam = localStorage.getItem('theam');
        if (Theam === 'dark') {
            setIsDarkMode(true);
        }
        else {
            setIsDarkMode(false);
        }
    }, []);
    
    useEffect(() => {
      setLoading(true);
      const fetchData = async () => {
      try {
        const response = await fetch(`https://5341.general.pointer.8080-server.net/${id}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': '1',
          },
          body: JSON.stringify({ user: user ? user.user_id : ''}),
        })
        const data = await response.json();
        // console.log(data);
        setPost(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
      fetchData();
    }, [id, user]);

    console.log(post);

  return (
    <div className={`${isDarkMode ? 'text-white bg-[#12110f]' : 'text-black bg-white'} `}>
      {/* <Header /> */}
      <SubHeader />
      <div className=" bg-[#f8b841] text-black overflow-hidden flex items-center mt-25">
        <div className='bg-red-500 text-white px-2 font-bold'>
          Breaking
        </div>
        <marquee className="bg-[#f8b841] text-black h-full flex items-center justify-start " onMouseEnter={(e)=>e.target.setAttribute("scrollamount",0)} onMouseLeave={(e)=>e.target.setAttribute("scrollamount",6)}>
          {[...Array(30).keys()].map((i) => (
            <span key={i} className="px-5 hover:underline cursor-pointer ">
              This website is currently in beta phase. Some features may not work as expected.
            </span>
          ))}
        </marquee>
      </div>
        <div className='hidden w-2/4 max-[769px]:w-3/4 max-[426px]:w-full mx-auto'>
          <h1 className='text-[40px] font-bold max-[426px]:px-3 max-[426px]:text-[30px]'>
            {post.title}
          </h1>
          <p className='text-xl text-gray-700 max-[426px]:px-3 max-[426px]:text-lg'>
            {post.sub_descr}
          </p>

          <div className='relative flex flex-col justify-center items-center mt-5'>
            <div className='w-[calc(100%+300px)] max-[426px]:w-full max-[769px]:w-[calc(100%+180px)]'>
              <Image src="https://static01.nyt.com/images/2025/04/06/multimedia/06int-global-trade-assess-kzvh/06int-global-trade-assess-kzvh-superJumbo-v2.jpg?quality=75&auto=webp" alt="" className='w-full' width={1000} height={1000} />
              <p className='text-gray-500 text-sm mt-2'>
                {post.meta_description}
              </p>
            </div>
          </div>

          <div className="max-w-4xl mx-auto p-6 text-gray-800">
            <h1 className="text-4xl font-bold mb-4">Trade War Timeline</h1>
            <h2 className="text-3xl font-semibold mb-3">Major Events</h2>
            <h3 className="text-2xl font-semibold mb-2">Global Impact</h3>
            <h4 className="text-xl font-semibold mb-2">Consumers Reaction</h4>
            <h5 className="text-lg font-medium mb-2">Expert View</h5>
            <h6 className="text-base font-medium mb-4 text-gray-600">Hidden Facts</h6>

            <p className="mb-4">
              The <abbr title="World Trade Organization">WTO</abbr> was created to regulate trade. Now, things are changing.
              <mark>This change is historic.</mark> President Trump has announced new tariffs that will <del>improve</del>{' '}
              <ins>disrupt</ins> global trade.
            </p>

            <blockquote className="border-l-4 border-blue-500 pl-4 italic text-gray-600 mb-4">
              “Rather than fixing the rules, Trump has chosen to blow up the system.”
            </blockquote>
           <p className="mb-4">Read the full article on 
              <Link href="https://example.com" className="text-blue-600 underline">our website</Link>.
            </p>

            <p className="mb-4"><strong>Note:</strong> New rules will take effect <small>this Saturday</small>.</p>

            <details className="mb-4">
              <summary className="cursor-pointer font-medium text-lg">See Affected Countries</summary>
              <ul className="list-disc list-inside mt-2">
                <li>China</li>
                <li>India</li>
                <li>Japan</li>
                <li>European Union</li>
              </ul>
            </details>

            <fieldset className="border border-gray-300 p-4 mb-4">
              <legend className="text-lg font-semibold">Your Opinion</legend>
              <label className="block mt-2">Name:
                <input type="text" className="block w-full mt-1 p-2 border rounded" />
              </label>
              <label className="block mt-4">Comment:
                <textarea className="block w-full mt-1 p-2 border rounded" rows="3"></textarea>
              </label>
              <label className="block mt-4">Choose country:
                <select className="block w-full mt-1 p-2 border rounded">
                  <option>China</option>
                  <option>India</option>
                  <option>Japan</option>
                  <option>EU</option>
                </select>
              </label>
              <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                Submit Feedback
              </button>
            </fieldset>

            <p className="mb-4">Basic Calculation Example:</p>
            <pre className="bg-gray-100 p-4 rounded mb-4 text-sm">
              <code>
                {`let baseTariff = 10;\nlet chinaExtra = 34;\nlet finalTariff = baseTariff + chinaExtra;\nconsole.log(finalTariff);`}
              </code>
            </pre>

            <ol className="list-decimal list-inside mb-4">
              <li>Announcement</li>
              <li>Executive Order</li>
              <li>Tariffs Applied</li>
            </ol>

            <ul className="list-disc list-inside mb-4">
              <li>Markets react strongly</li>
              <li>Currency fluctuations</li>
              <li>Manufacturing cost increase</li>
            </ul>

            <table className="table-auto w-full border-collapse border border-gray-300 mb-6">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border px-4 py-2">Country</th>
                  <th className="border px-4 py-2">Tariff %</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border px-4 py-2">China</td>
                  <td className="border px-4 py-2">44%</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">Japan</td>
                  <td className="border px-4 py-2">24%</td>
                </tr>
              </tbody>
            </table>

            <hr className="my-6 border-gray-400" />

            <p className="text-sm">
              Terms and conditions apply. Prices and policies are subject to change without notice.
              <sup>*</sup> Refer to the official White House document<sub>1</sub>.
            </p>
          </div>

          <p className='text-gray-700 mt-4 text-[17px] max-[426px]:px-3'>
            Reporting was contributed by Joe Rennison, Colby Smith and Lazaro Gamio from New York and Alan Rappeport and Shawn McCreesh from Washington. Tung Ngo contributed research.
            <br /> <br />
            <Link href='#' className='text-black underline font-semibold'>Ana Swanson</Link> covers trade and international economics for The Times and is based in Washington. She has been a journalist for more than a decade. More about Ana Swanson
            <br /><br />
            <Link href='#' className='text-black underline font-semibold'>Tony Romm</Link> is a reporter covering economic policy and the Trump administration for The Times, based in Washington. More about Tony Romm
          </p>
          <p className='border-y border-gray-400 py-3 text-sm my-4 text-gray-700 max-[426px]:px-3'>
            A version of this article appears in print on April 3, 2025, Section A, Page 1 of the New York edition with the headline: Trump Rolls Out Vast New Arsenal Of Global Tariffs. Order Reprints | Today’s Paper | Subscribe
          </p>
          <button className='text-white bg-[#144a69] w-full rounded py-2 font-bold'>READ 449 COMMENTS</button>

        </div>
        <div className='flex container mx-auto gap-4 '>
          <div className='min-w-[74%] '>
            {loading ? <DuplicateSkeleton /> : <Duplicate post={post} />}
          </div>
          <div className='mt-4'>
            <MostPopular />
          </div>
        </div>
        
        <div>
          <MoreArticle />
        </div>
    </div>
  )
}

export default Page
