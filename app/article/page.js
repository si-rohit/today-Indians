'use client'
import UserArticles from '@/components/dashboard/Articles/UserArticles'
import React, { useEffect, useState } from 'react'
import Image1 from '@/public/images/Thumbnail/hq720(1).jpg'
import Image2 from '@/public/images/Thumbnail/hq720(2).jpg'
import Image3 from '@/public/images/Thumbnail/hq720(3).jpg'
import Image4 from '@/public/images/Thumbnail/hq720(4).jpg'
import Image5 from '@/public/images/Thumbnail/hq720.jpg'
import Image6 from '@/public/images/Thumbnail/hq720(5).jpg'
import noImage from '@/public/images/noImage.jpeg'
import Image from 'next/image'
import SubHeader from '@/components/Header/SubHeader'
import Link from 'next/link'
import Header from '@/components/Header'
import MobileRespHeader from '@/components/MobileComponents/MobileRespHeader'
import MobileRespFooter from '@/components/MobileComponents/MobileRespFooter'

const Page = () => {
  const [articles, setArticles] = useState([]);

  const AllArticles = async()=>{
    const res = await fetch(`https://5341.general.pointer.8080-server.net/posts?sort=x_date&channel=42`,{
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': '1',
      },
    })
    const data = await res.json();
    console.log(data);
    setArticles(data.data);
  }
  useEffect(()=>{
    AllArticles();
  },[])

  // const articles = [
  //       {
  //         title: "Those who have created peace, are the world better?",
  //         date: "January 6, 2020",
  //         read: "3 mins read",
  //         author: "Ryan",
  //         description:
  //           "Ash jaguar ostrich quail one excited dear hello and bound[1] and the and bland moral misheard roadrunner flapped lynx...",
  //         image: Image1,
  //       },
  //       {
  //         title: "This Concept Jet Could Get You From New York To London In Under 11 Minutes",
  //         date: "July 26, 2019",
  //         read: "3 mins read",
  //         author: "Ryan",
  //         description:
  //           "Ash jaguar ostrich quail one excited dear hello and bound[1] and the and bland moral misheard roadrunner flapped lynx...",
  //         image: Image2,
  //       },
  //       {
  //         title: "Bradley Cooper’s “Twin” Causes Madness At Sundance Film Festival Opening",
  //         date: "July 26, 2019",
  //         read: "2 mins read",
  //         author: "Ryan",
  //         description:
  //           "Uninhibited carnally hired played in whimpered dear gorilla koala depending and much yikes off far quetzal goodness...",
  //         image: Image3,
  //       },
  //       {
  //         title: "Greek Islanders are to be Nominated for Peace Prize",
  //         date: "July 25, 2019",
  //         read: "2 mins read",
  //         author: "Ryan",
  //         description:
  //           "Submissive much less between in and the by wow cutely versus vitally much by alas when on far that koala fought...",
  //         image: Image4,
  //       },
  //       {
  //         title: "30th Anniversary of the Space Shuttle Challenger Catastrophe, in pictures",
  //         date: "July 25, 2019",
  //         read: "2 mins read",
  //         author: "Ryan",
  //         description:
  //           "More accommodatingly anticipatively because until frog attractively and ludicrously that the re-laid sociable...",
  //         image: Image5,
  //       },
  //       {
  //         title: "Uber is Using Phone Gyrometers to Check Whether Drivers go Over Speed",
  //         date: "July 24, 2019",
  //         read: "2 mins read",
  //         author: "Ryan",
  //         description:
  //           "Some snug a some far a much sociably hence and where justly considering one preparatory up this less and crud had wow...",
  //         image: Image6,
  //       },
  //     ]
  return (
    <div>
      {/* <SubHeader/> */}
      <div className='block max-[426px]:hidden'>
        <Header/>
      </div>
      <div className='hidden max-[426px]:block'>
        <MobileRespHeader/>
      </div>
      
      <div className="p-4">
            <div className="container mx-auto grid md:grid-cols-3 gap-6">
              {articles.map((article, index) => (
                <Link href={`/article/${article.post_id}`} key={index} className=" overflow-hidden">
                    <Image src={article.image?.trimStart()  || noImage} alt="News" width={300} height={300} className="w-full object-cover" />
                    <div className="pt-2">
                      <h3 className="text-lg font-semibold leading-5">{article.title.split(' ').slice(0, 8).join(' ')}</h3>
                      <p className=' text-sm text-gray-500'>{article.sub_descr}</p>
                      <p className="text-sm text-gray-500">
                        {new Date(article.date_added).toDateString()} • {article.user.username}
                      </p>
                    </div>
                </Link>
              ))}
            </div>
          </div>
      <div className='sticky mt-18 w-full bottom-0 hidden max-[426px]:block'>
          <MobileRespFooter />   
      </div> 
    </div>
  )
}

export default Page