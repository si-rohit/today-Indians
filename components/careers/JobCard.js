// src/components/JobCard.jsx
import React from 'react';
import { MapPin,Calendar1,BriefcaseBusiness  } from 'lucide-react';
import { useRouter } from 'next/navigation';

const JobCard = ({ job }) =>{
    const router = useRouter();

    const handleOpenJob = () => {
      router.push(`/career/${job.title.replace(/\s+/g, '-')}?id=${job.id}`);
    };

    const handleApply = () => {
      router.push(`/career/form?id=${job.id}`);
    };
return(
  <div onClick={handleOpenJob} className="bg-white shadow hover:shadow-lg cursor-pointer p-4 mb-4 flex justify-between items-center">
    <div>
      <h4 className=" text-lg">{job.title}</h4>
      <div className="text-sm text-gray-600 flex items-center gap-2">
        <p className='px-2 py-0.5 bg-gray-100 flex items-center gap-1'><MapPin className='w-4 h-4'/>{job.location}</p> 
        <p className='px-2 py-0.5 bg-gray-100 flex items-center gap-1'><BriefcaseBusiness className='w-4 h-4' />{job.type}</p> 
        <p className='px-2 py-0.5 bg-gray-100 flex items-center gap-1'><Calendar1 className='w-4 h-4' />{job.experience}</p>
      </div>
      <p className="text-sm text-gray-800 mt-1">{job.skills}</p>
    </div>
    <button onClick={(e)=>{e.stopPropagation();handleApply();}} className="bg-black text-white px-4 py-2 hover:bg-[#222] cursor-pointer">Apply Now</button>
  </div>
)};

export default JobCard;
