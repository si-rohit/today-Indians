"use client"
import HelpCenterHeader from '@/components/HelpCenterHeader'
import React from 'react'
import { jobData } from '@/components/careers/jobData';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { MapPin,Calendar1,BriefcaseBusiness  } from 'lucide-react';

const Page  = () => {
    const searchParams = useSearchParams(); 
    const router = useRouter();
    const params = useParams();
    const title = params.title;
    const id = searchParams.get("id");

    const job = jobData.find((job) => job.id === Number(id));

    const handleApply = () => {
        router.push(`/career/form?id=${id}`);
    }
  return (
    <div className='flex flex-col min-h-screen'>
        <HelpCenterHeader title="Careers" />
        <div className="bg-white py-10 text-center mb-10 flex flex-col items-center">
            <h1 className="text-5xl font-bold">{title}</h1>
            <div className='flex gap-3 my-4'>
                <p className="text-sm text-gray-600 flex items-center gap-1 bg-gray-200 px-2 py-1"><MapPin className='w-4 h-4'/>{job.location}</p> 
                <p className="text-sm text-gray-600 flex items-center gap-1 bg-gray-200 px-2 py-1"><BriefcaseBusiness className='w-4 h-4' />{job.type}</p> 
                <p className="text-sm text-gray-600 flex items-center gap-1 bg-gray-200 px-2 py-1"><Calendar1 className='w-4 h-4' />{job.experience}</p>
            </div>
            <button onClick={handleApply} className='bg-black hover:bg-[#222] text-white px-4 py-2 mt-4 cursor-pointer '>Apply Now</button>
        </div>
        <div className='w-full bg-gray-100 py-10'>
            <div className='w-full max-w-5xl mx-auto p-8 bg-white'>
                <h1 className='text-xl font-bold mb-3'>Job Description</h1>
                <p className='text-gray-600 text-sm'>{job.description || "Are you a creative thinker passionate about crafting user-first digital experiences? Ready to take the next step with one of the UK’s most exciting e-commerce innovators? At Shipcart, we’re expanding rapidly and are looking for a talented UX Designer to shape the next generation of online shopping."}</p>
                <div className='my-5'>
                    <p><span className='font-bold text-sm'>Type: </span><span className='text-gray-600 text-sm'>{job.type}</span></p>
                    <p><span className='font-bold text-sm'>Location: </span><span className='text-gray-600 text-sm'>{job.location}</span></p>
                    <p><span className='font-bold text-sm'>Start Date: </span><span className='text-gray-600 text-sm'>{job.startDate || " Immediate or as per mutual agreement"}</span></p>
                </div>
                <p className='text-gray-600 text-sm'>{"At Shipcart, our mission is simple — make shopping effortless for everyone. With a fast-growing customer base across the UK and Europe, 2025 is set to be a defining year. We're heavily investing in design, experience, and personalization, and UX sits right at the heart of this evolution. We’re seeking an experienced UX Designer who can bring fresh ideas, user empathy, and design expertise to our expanding team. You’ll collaborate closely with Product Managers, Developers, and Marketers to ensure Shipcart feels intuitive, seamless, and a joy to use. If you thrive in a fast-paced environment where innovation is celebrated, and users are always the priority — we’d love to meet you"}</p>
                <h1 className=' font-bold mt-5 mb-2'>What You&apos;ll Work On:</h1>
                <ul className='list-disc pl-5 text-sm text-gray-600'>
                    <li>End-to-End Design Ownership: Lead UX design across new and existing projects, from discovery to launch.</li>
                    <li>End-to-End Design Ownership: Lead UX design across new and existing projects, from discovery to launch.</li>
                    <li>End-to-End Design Ownership: Lead UX design across new and existing projects, from discovery to launch.</li>
                    <li>End-to-End Design Ownership: Lead UX design across new and existing projects, from discovery to launch.</li>
                    <li>End-to-End Design Ownership: Lead UX design across new and existing projects, from discovery to launch.</li>
                    <li>End-to-End Design Ownership: Lead UX design across new and existing projects, from discovery to launch.</li>
                </ul>
                <h1 className=' font-bold mt-5 mb-2'>What You’ll Get at Today Indians:</h1>
                <ul className='list-disc pl-5 text-sm text-gray-600'>
                    <li>End-to-End Design Ownership: Lead UX design across new and existing projects, from discovery to launch.</li>
                    <li>End-to-End Design Ownership: Lead UX design across new and existing projects, from discovery to launch.</li>
                    <li>End-to-End Design Ownership: Lead UX design across new and existing projects, from discovery to launch.</li>
                    <li>End-to-End Design Ownership: Lead UX design across new and existing projects, from discovery to launch.</li>
                    <li>End-to-End Design Ownership: Lead UX design across new and existing projects, from discovery to launch.</li>
                    <li>End-to-End Design Ownership: Lead UX design across new and existing projects, from discovery to launch.</li>
                </ul>
                <h1 className=' font-bold mt-5 mb-2'>Excited to join us?</h1>
                <ul className='text-sm text-gray-600'>
                    <li>We can&apos;t wait to hear your story. Please submit your updated CV, a short cover letter including your portfolio link, and tell us your earliest availability and salary expectations</li>
                    <li className='mt-3'>If you have questions about the role, reach out to:</li>
                    <li>Sophie Mitchell</li>
                    <li>Lead UX Manager</li>
                    <li>careers@shipcart.com</li>
                    <li className='mt-3'>At Shipcart, diversity fuels our creativity and innovation.</li>
                    <li>We celebrate individuality and are committed to creating an inclusive environment for all employees, regardless of gender, race, background, or ability.</li>
                </ul>
                <button onClick={handleApply} className='text-white bg-black py-2 px-5 mt-5 cursor-pointer hover:bg-[#222]'>Apply Now</button>
            </div>
        </div>
    </div>
  )
}

export default Page 