'use client'
import React, { useEffect, useState } from 'react'
import jobData from '@/components/careers/jobData';
import HelpCenterHeader from '@/components/HelpCenterHeader';
import { useParams, useSearchParams } from 'next/navigation';
import { MapPin,Calendar1,BriefcaseBusiness,Plus,ArrowRight,ArrowLeft,SquarePen,CircleCheck  } from 'lucide-react';
import Image from 'next/image';
import Stage01 from "@/public/images/progress-timeline/Stage-01.svg"
import Stage02 from "@/public/images/progress-timeline/Stage-02.svg"
import Stage03 from "@/public/images/progress-timeline/Stage-03.svg"
import Stage04 from "@/public/images/progress-timeline/Stage-04.svg"
import Stage05 from "@/public/images/progress-timeline/Stage-05.svg"
import Link from 'next/link';

const Page = () => {
    const searchParams = useSearchParams(); // query string
    const id = searchParams.get("id");    
    const job = jobData.find((job) => job.id === Number(id));   

    const [step, setStep] = useState(1);
    const handleNext = () => setStep((prev) => prev + 1);
    const handleBack = () => setStep((prev) => prev - 1);

    const [userInfo, setUserInfo] = useState({
        fullName: "",
        email: "",
        phone: "",
        portfolio: "",
        resume: null,
    });
    const handleUserInfoChange = (e) => {
        const { name, value, files } = e.target;
        setUserInfo((prev) => ({
            ...prev,
            [name]: files ? files[0] : value,
        }));
    };

    const [userExperience, setUserExperience] = useState({
        companyName: "",
        jobRole: "",
        startDate: "",
        endDate: "",
        description: "",
        achievements: "",       
    });
    const handleUserExperienceChange = (e) => {
        const { name, value } = e.target;
        setUserExperience((prev) => ({ ...prev, [name]: value }));
    };

    const [userEducation, setUserEducation] = useState({
        schoolName: "",
        degree: "",
        startDate: "",
        endDate: "",
    });
    const handleUserEducationChange = (e) => {
        const { name, value } = e.target;
        setUserEducation((prev) => ({ ...prev, [name]: value }));
    };

    // const fetchLanguage =async()=>{
    //     const response = await fetch("https://libretranslate.com/languages", {method: "GET"});
    //     const data = await response.json();
    //     setLanguagesData(data);
    //     // console.log(data);
    // }
    // useEffect(()=>{
    //     fetchLanguage();
    // },[])

    const [userVoluntary_selfIdentity, setUserVoluntary_selfIdentity] = useState({
        gender: "",
        race_ethnicity: "",
        veteranStatus: "",
        languages: "English",
    })
    const handleUserVoluntary_selfIdentityChange = (e) => {
        const { name, value } = e.target;
        setUserVoluntary_selfIdentity((prev) => ({ ...prev, [name]: value }));
    };

  return (
    <div className='flex flex-col min-h-screen'>
        <HelpCenterHeader title="Careers" />
        <div className={`bg-white py-10 text-center mb-10 flex flex-col items-center ${step === 6 && "hidden"}`}>
            <h1 className="text-5xl font-bold">{job.title}</h1>
            <div className='flex gap-3 my-4'>
                <p className="text-sm text-gray-600 flex items-center gap-1 bg-gray-200 px-2 py-1"><MapPin className='w-4 h-4'/>{job.location}</p> 
                <p className="text-sm text-gray-600 flex items-center gap-1 bg-gray-200 px-2 py-1"><BriefcaseBusiness className='w-4 h-4' />{job.type}</p> 
                <p className="text-sm text-gray-600 flex items-center gap-1 bg-gray-200 px-2 py-1"><Calendar1 className='w-4 h-4' />{job.experience}</p>
            </div>
        </div>
        <div className='w-full bg-gray-100 py-10'>
            <div className='w-full max-w-5xl mx-auto p-8 bg-white'>
                {step === 1 && (
                    <div>
                        <div className='mb-12 relative'>
                            <Image src={Stage01} alt="resume" className='w-[90%] mx-auto h-full' />
                            <p className='absolute left-[0%] text-sm font-bold text-gray-600'>Your Information</p>
                            <p className='absolute left-[22%] text-sm font-bold text-gray-300'>Work Experience</p>
                            <p className='absolute left-[47%] text-sm font-bold text-gray-300'>Education</p>
                            <p className='absolute right-[17%] text-sm font-bold text-gray-300'>Voluntary & Self Identification</p>
                            <p className='absolute right-[0%] text-sm font-bold text-gray-300'>Review & Submit</p>
                        </div>
                        <h1 className='text-xl font-bold '>Personal Information</h1>
                        <p className='text-gray-600 text-sm'>Please provide your full name, email address, phone number, and a link to your portfolio.</p>
                        <div className='my-5'>
                            <label className='text-sm font-bold text-gray-600'>Full Name <sup className='text-red-600'>*</sup></label>
                            <input type="text" name="fullName" required value={userInfo.fullName} onChange={handleUserInfoChange} className='border border-gray-300 px-3 py-2 mt-1 w-full' />
                        </div>
                        <div className='my-5'>
                            <label className='text-sm font-bold text-gray-600'>Email Address <sup className='text-red-600'>*</sup></label>
                            <input type="email" name="email" value={userInfo.email} onChange={handleUserInfoChange} className='border border-gray-300 px-3 py-2 mt-1 w-full' />
                        </div>
                        <div className='my-5'>
                            <label className='text-sm font-bold text-gray-600'>Phone Number <sup className='text-red-600'>*</sup></label>
                            <input type="tel" name="phone" value={userInfo.phone} onChange={handleUserInfoChange} className='border border-gray-300 px-3 py-2 mt-1 w-full' />
                        </div>
                        <div className='my-5'>
                            <label className='text-sm font-bold text-gray-600'>Portfolio Link <sup className='text-red-600'>*</sup></label>
                            <input type="url" name="portfolio" value={userInfo.portfolio} onChange={handleUserInfoChange} className='border border-gray-300 px-3 py-2 mt-1 w-full' />
                        </div>
                        <div className='my-5'>
                            <label className='text-sm font-bold text-gray-600'>Upload Your Resume <sup className='text-red-600'>*</sup></label>
                            <input type="file" name="resume" onChange={handleUserInfoChange} id='resume' className='hidden' />
                            <div className='border border-dashed border-gray-300 mt-1 w-full flex flex-col items-center py-5 justify-center cursor-pointer' onClick={() => document.getElementById('resume').click()}>
                                {userInfo.resume ? (
                                    <div className='flex flex-col items-center'>
                                        <Image className='h-10 w-10 cursor-pointer' width={100} height={100} src={URL.createObjectURL(userInfo.resume)} alt="" />
                                        <p className='text-sm text-gray-600'>{userInfo.resume.name}</p>
                                        <p className='text-gray-400 text-xs'>PDF, DOC, DOCX</p>
                                    </div>
                                ) : (
                                    <div className='flex flex-col items-center'>
                                        <Plus className='w-10 h-10 text-gray-600'/>
                                        <p className='text-gray-600 text-sm mt-2'>Drag or select a file</p>
                                        <p className='text-gray-400 text-xs'>PDF, DOC, DOCX</p>
                                    </div>
                                )}
                            </div>

                        </div>
                        <div className='my-5 flex justify-end'>
                            <button onClick={handleNext} className='bg-black text-white px-4 py-2 flex items-center gap-2 cursor-pointer'>Next <ArrowRight /></button>
                        </div>  
                    </div>
                )}
                {step === 2 && (
                    <div>
                        <div className='mb-12 relative'>
                            <Image src={Stage02} alt="resume" className='w-[90%] mx-auto h-full' />
                            <p className='absolute left-[0%] text-sm font-bold text-gray-600'>Your Information</p>
                            <p className='absolute left-[22%] text-sm font-bold text-gray-600'>Work Experience</p>
                            <p className='absolute left-[47%] text-sm font-bold text-gray-300'>Education</p>
                            <p className='absolute right-[17%] text-sm font-bold text-gray-300'>Voluntary & Self Identification</p>
                            <p className='absolute right-[0%] text-sm font-bold text-gray-300'>Review & Submit</p>
                        </div>
                        <h1 className='text-xl font-bold'>Work Experience</h1>
                        <p className='text-gray-600 text-sm'>Please provide a summary of your work experience.</p>
                        <div className='my-5'>
                            <label className='text-sm font-bold text-gray-600'>Company Name <sup className='text-red-600'>*</sup></label>
                            <input type="text" name="companyName" value={userExperience.companyName} onChange={handleUserExperienceChange} className='border border-gray-300 px-3 py-2 mt-1 w-full' />
                        </div>
                        <div className='my-5'>
                            <label className='text-sm font-bold text-gray-600'>Your Role <sup className='text-red-600'>*</sup></label>
                            <input type="text" name="jobRole" value={userExperience.jobRole} onChange={handleUserExperienceChange} className='border border-gray-300 px-3 py-2 mt-1 w-full' />
                        </div>
                        <div className='my-5 flex justify-between gap-5'>
                            <div className='w-full'>
                                <label className='text-sm font-bold text-gray-600'>Start Date <sup className='text-red-600'>*</sup></label>
                                <input type="date" name="startDate" value={userExperience.startDate} onChange={handleUserExperienceChange} className='border border-gray-300 px-3 py-2 mt-1 w-full' />
                            </div>
                            <div className='w-full'>
                                <label className='text-sm font-bold text-gray-600'>End Date <sup className='text-red-600'>*</sup></label>
                                <input type="date" name="endDate" value={userExperience.endDate} onChange={handleUserExperienceChange} className='border border-gray-300 px-3 py-2 mt-1 w-full' />
                            </div>
                        </div>
                        <div className='my-5'>
                            <label className='text-sm font-bold text-gray-600'>Description </label>
                            <textarea name="description" value={userExperience.description} onChange={handleUserExperienceChange} className='border border-gray-300 px-3 py-2 mt-1 w-full' />
                        </div>
                        <div className='my-5'>
                            <label className='text-sm font-bold text-gray-600'>Achievements</label>
                            <input type="text" name="achievements" value={userExperience.achievements} onChange={handleUserExperienceChange} className='border border-gray-300 px-3 py-2 mt-1 w-full' />
                        </div>
                        <div className='my-5 flex justify-between'>
                            <button onClick={handleBack} className='bg-black text-white px-4 py-2 flex items-center gap-2 cursor-pointer'><ArrowLeft /> Previous </button>
                            <button onClick={handleNext} className='bg-black text-white px-4 py-2 flex items-center gap-2 cursor-pointer'>Next <ArrowRight /></button>
                        </div>                        
                    </div>
                )}
                {step == 3 && (
                    <div>
                        <div className='mb-12 relative'>
                            <Image src={Stage03} alt="resume" className='w-[90%] mx-auto h-full' />
                            <p className='absolute left-[0%] text-sm font-bold text-gray-600'>Your Information</p>
                            <p className='absolute left-[22%] text-sm font-bold text-gray-600'>Work Experience</p>
                            <p className='absolute left-[47%] text-sm font-bold text-gray-600'>Education</p>
                            <p className='absolute right-[17%] text-sm font-bold text-gray-300'>Voluntary & Self Identification</p>
                            <p className='absolute right-[0%] text-sm font-bold text-gray-300'>Review & Submit</p>
                        </div>
                        <h1 className='text-xl font-bold '>Education</h1>
                        <p className='text-gray-600 text-sm'>Please provide a summary of your education.</p>
                        <div className='my-5'>
                            <label className='text-sm font-bold text-gray-600'>School or University Name<sup className='text-red-600'>*</sup></label>
                            <input type="text" name="schoolName" value={userEducation.schoolName} onChange={handleUserEducationChange} className='border border-gray-300 px-3 py-2 mt-1 w-full' />
                        </div>
                        <div className='my-5'>
                            <label className='text-sm font-bold text-gray-600'>Degree<sup className='text-red-600'>*</sup></label>
                            <input type="text" name="degree" value={userEducation.degree} onChange={handleUserEducationChange} className='border border-gray-300 px-3 py-2 mt-1 w-full' />
                        </div>
                        <div className='my-5 flex justify-between gap-5'>
                            <div className='w-full'>
                                <label className='text-sm font-bold text-gray-600'>Start Date<sup className='text-red-600'>*</sup></label>
                                <input type="date" name="startDate" value={userEducation.startDate} onChange={handleUserEducationChange} className='border border-gray-300 px-3 py-2 mt-1 w-full' />
                            </div>
                            <div className='w-full'>
                                <label className='text-sm font-bold text-gray-600'>End Date<sup className='text-red-600'>*</sup></label>
                                <input type="date" name="endDate" value={userEducation.endDate} onChange={handleUserEducationChange} className='border border-gray-300 px-3 py-2 mt-1 w-full' />
                            </div>
                        </div>
                        <div className='my-5 flex justify-between'>
                            <button onClick={handleBack} className='bg-black text-white px-4 py-2 flex items-center gap-2 cursor-pointer'><ArrowLeft /> Previous </button>
                            <button onClick={handleNext} className='bg-black text-white px-4 py-2 flex items-center gap-2 cursor-pointer'>Next <ArrowRight /></button>
                        </div>  
                    </div>
                )}
                {step == 4 && (
                    <div>
                        <div className='mb-12 relative'>
                            <Image src={Stage04} alt="resume" className='w-[90%] mx-auto h-full' />
                            <p className='absolute left-[0%] text-sm font-bold text-gray-600'>Your Information</p>
                            <p className='absolute left-[22%] text-sm font-bold text-gray-600'>Work Experience</p>
                            <p className='absolute left-[47%] text-sm font-bold text-gray-600'>Education</p>
                            <p className='absolute right-[17%] text-sm font-bold text-gray-600'>Voluntary & Self Identification</p>
                            <p className='absolute right-[0%] text-sm font-bold text-gray-300'>Review & Submit</p>
                        </div>
                        <h1 className='text-xl font-bold '>Voluntary & Self Identification</h1>
                        <p className='text-gray-600 text-sm'>Please provide a summary of your voluntary and Self Identification</p>
                        <div className='my-5'>
                            <label className='text-sm font-bold text-gray-600'>Gender <sup className='text-red-600'>*</sup></label>
                            <div className=' flex gap-5'>                              
                                <div className='flex items-center gap-2'>
                                    <input type="radio" name="gender" value="Male" checked={userVoluntary_selfIdentity.gender == 'Male'} onChange={handleUserVoluntary_selfIdentityChange} className='cursor-pointer' />
                                    <label className='text-sm font-bold text-gray-600'>Male</label>
                                </div>
                                <div className='flex items-center gap-2'>
                                    <input type="radio" name="gender" value="Female" checked={userVoluntary_selfIdentity.gender == 'Female'} onChange={handleUserVoluntary_selfIdentityChange} className='cursor-pointer' />
                                    <label className='text-sm font-bold text-gray-600'>Female</label>
                                </div>
                                <div className='flex items-center gap-2'>
                                    <input type="radio" name="gender" value="Other" checked={userVoluntary_selfIdentity.gender == 'Other'} onChange={handleUserVoluntary_selfIdentityChange} className='cursor-pointer' />
                                    <label className='text-sm font-bold text-gray-600'>Other</label>
                                </div>
                            </div>
                        </div>

                        <div className='my-5'>
                            <label className='text-sm font-bold text-gray-600'>Select your race/ethnicity</label>
                            <div className=' flex flex-wrap gap-0 space-x-5'>                              
                                <div className='flex items-center gap-2'>
                                    <input type="radio" name="race_ethnicity" value="Native American or Alaska Native" checked={userVoluntary_selfIdentity.race_ethnicity == 'Native American or Alaska Native'} onChange={handleUserVoluntary_selfIdentityChange} className='cursor-pointer' />
                                    <label className='text-sm font-bold text-gray-600'>Native American or Alaska Native</label>
                                </div>
                                <div className='flex items-center gap-2'>
                                    <input type="radio" name="race_ethnicity" value="Asian" checked={userVoluntary_selfIdentity.race_ethnicity == 'Asian'} onChange={handleUserVoluntary_selfIdentityChange} className='cursor-pointer' />
                                    <label className='text-sm font-bold text-gray-600'>Asian</label>
                                </div>
                                <div className='flex items-center gap-2'>
                                    <input type="radio" name="race_ethnicity" value="Black or African American" checked={userVoluntary_selfIdentity.race_ethnicity == 'Black or African American'} onChange={handleUserVoluntary_selfIdentityChange} className='cursor-pointer' />
                                    <label className='text-sm font-bold text-gray-600'>Black or African American</label>
                                </div>
                                <div className='flex items-center gap-2'>
                                    <input type="radio" name="race_ethnicity" value="Hispanic or Latino" checked={userVoluntary_selfIdentity.race_ethnicity == 'Hispanic or Latino'} onChange={handleUserVoluntary_selfIdentityChange} className='cursor-pointer' />
                                    <label className='text-sm font-bold text-gray-600'>Hispanic or Latino</label>
                                </div>
                                <div className='flex items-center gap-2'>
                                    <input type="radio" name="race_ethnicity" value="Native Hawaiian or Other Pacific Islander" checked={userVoluntary_selfIdentity.race_ethnicity == 'Native Hawaiian or Other Pacific Islander'} onChange={handleUserVoluntary_selfIdentityChange} className='cursor-pointer' />
                                    <label className='text-sm font-bold text-gray-600'>Native Hawaiian or Other Pacific Islander</label>
                                </div>
                                <div className='flex items-center gap-2'>
                                    <input type="radio" name="race_ethnicity" value="White" checked={userVoluntary_selfIdentity.race_ethnicity == 'White'} onChange={handleUserVoluntary_selfIdentityChange} className='cursor-pointer' />
                                    <label className='text-sm font-bold text-gray-600'>White</label>
                                </div>
                                <div className='flex items-center gap-2'>
                                    <input type="radio" name="race_ethnicity" value="Two or more races" checked={userVoluntary_selfIdentity.race_ethnicity == 'Two or more races'} onChange={handleUserVoluntary_selfIdentityChange} className='cursor-pointer' />
                                    <label className='text-sm font-bold text-gray-600'>Two or more races</label>
                                </div>
                                <div className='flex items-center gap-2'>
                                    <input type="radio" name="race_ethnicity" value="I do not wish to disclose" checked={userVoluntary_selfIdentity.race_ethnicity == 'I do not wish to disclose'} onChange={handleUserVoluntary_selfIdentityChange} className='cursor-pointer' />
                                    <label className='text-sm font-bold text-gray-600'>I do not wish to disclose</label>
                                </div>
                            </div>
                        </div>

                        <div className='my-5'>
                            <label className='text-sm font-bold text-gray-600'>Select your Protected Veteran Status </label>
                            <div className=' flex flex-col gap-2'>                              
                                <div className='flex items-center gap-2'>
                                    <input type="radio" name="veteranStatus" value="I identify as one or more of the classifications of protected veteran listed" checked={userVoluntary_selfIdentity.veteranStatus == 'I identify as one or more of the classifications of protected veteran listed'} onChange={handleUserVoluntary_selfIdentityChange} className='cursor-pointer' />
                                    <label className='text-sm font-bold text-gray-600'>I identify as one or more of the classifications of protected veteran listed</label>
                                </div>
                                <div className='flex items-center gap-2'>
                                    <input type="radio" name="veteranStatus" value="Other veteran" checked={userVoluntary_selfIdentity.veteranStatus == 'Other veteran'} onChange={handleUserVoluntary_selfIdentityChange} className='cursor-pointer' />
                                    <label className='text-sm font-bold text-gray-600'>Other veteran</label>
                                </div>
                                <div className='flex items-center gap-2'>
                                    <input type="radio" name="veteranStatus" value="I am not a protected veteran" checked={userVoluntary_selfIdentity.veteranStatus == 'I am not a protected veteran'} onChange={handleUserVoluntary_selfIdentityChange} className='cursor-pointer' />
                                    <label className='text-sm font-bold text-gray-600'>I am not a protected veteran</label>
                                </div>
                                <div className='flex items-center gap-2'>
                                    <input type="radio" name="veteranStatus" value="I choose not to answer" checked={userVoluntary_selfIdentity.veteranStatus == 'I choose not to answer'} onChange={handleUserVoluntary_selfIdentityChange} className='cursor-pointer' />
                                    <label className='text-sm font-bold text-gray-600'>I choose not to answer</label>
                                </div>
                                
                            </div>
                        </div>
                        <div className='my-5 flex justify-between'>
                            <button onClick={handleBack} className='bg-black text-white px-4 py-2 flex items-center gap-2 cursor-pointer'><ArrowLeft /> Previous </button>
                            <button onClick={handleNext} className='bg-black text-white px-4 py-2 flex items-center gap-2 cursor-pointer'>Next <ArrowRight /></button>
                        </div>
                    </div>
                )}
                {step === 5 && (
                        <div>
                            <div className='mb-12 relative'>
                                <Image src={Stage05} alt="resume" className='w-[90%] mx-auto h-full' />
                                <p className='absolute left-[0%] text-sm font-bold text-gray-600'>Your Information</p>
                                <p className='absolute left-[22%] text-sm font-bold text-gray-600'>Work Experience</p>
                                <p className='absolute left-[47%] text-sm font-bold text-gray-600'>Education</p>
                                <p className='absolute right-[17%] text-sm font-bold text-gray-600'>Voluntary & Self Identification</p>
                                <p className='absolute right-[0%] text-sm font-bold text-gray-600'>Review & Submit</p>
                            </div>
                            <h1 className='w-[90%] mx-auto text-xl font-bold'>Review & Submit</h1>
                            <div className='w-[80%] mx-auto py-3 border-b border-gray-300'>
                                <div className='flex items-center justify-between text-lg'>
                                    <p className='font-bold text-gray-800'>Your Information</p>
                                    <SquarePen className='cursor-pointer '/>
                                </div>
                                <div>
                                    <label className='text-sm font-bold text-gray-600'>First Name</label>
                                    <p className='text-sm text-gray-600'>{userInfo.fullName}</p>
                                </div>                              
                                <div>
                                    <label className='text-sm font-bold text-gray-600'>Email</label>
                                    <p className='text-sm text-gray-600'>{userInfo.email}</p>
                                </div>
                                <div>
                                    <label className='text-sm font-bold text-gray-600'>Phone Number</label>
                                    <p className='text-sm text-gray-600'>{userInfo.phone}</p>
                                </div>
                                <div>
                                    <label className='text-sm font-bold text-gray-600'>Portfolio Link</label>
                                    <p className='text-sm text-gray-600'>{userInfo.portfolio}</p>
                                </div>
                            </div>
                            <div className='w-[80%] mx-auto py-3 border-b border-gray-300'>
                                <div className='flex items-center justify-between text-lg'>
                                    <p className='font-bold text-gray-800'>Work Experience</p>
                                    <SquarePen className='cursor-pointer '/>
                                </div>
                                <div>
                                    <label className='text-sm font-bold text-gray-600'>Company</label>
                                    <p className='text-sm text-gray-600'>{userExperience.company}</p>
                                </div>
                                <div>
                                    <label className='text-sm font-bold text-gray-600'>Job Role</label>
                                    <p className='text-sm text-gray-600'>{userExperience.jobRole}</p>
                                </div>
                                <div>
                                    <label className='text-sm font-bold text-gray-600'>Start Date</label>
                                    <p className='text-sm text-gray-600'>{userExperience.startDate}</p>
                                </div>
                                <div>
                                    <label className='text-sm font-bold text-gray-600'>End Date</label>
                                    <p className='text-sm text-gray-600'>{userExperience.endDate}</p>
                                </div>
                                <div>
                                    <label className='text-sm font-bold text-gray-600'>Description</label>
                                    <p className='text-sm text-gray-600'>{userExperience.description}</p>
                                </div>
                            </div>
                            <div className='w-[80%] mx-auto py-3 border-b border-gray-300'>
                                <div className='flex items-center justify-between text-lg'>
                                    <p className='font-bold text-gray-800'>Education</p>
                                    <SquarePen className='cursor-pointer '/>
                                </div>
                                <div>
                                    <label className='text-sm font-bold text-gray-600'>School or University Name</label>
                                    <p className='text-sm text-gray-600'>{userEducation.school}</p>
                                </div>
                                <div>
                                    <label className='text-sm font-bold text-gray-600'>Degree</label>
                                    <p className='text-sm text-gray-600'>{userEducation.degree}</p>
                                </div>
                                <div>
                                    <label className='text-sm font-bold text-gray-600'>Start Date</label>
                                    <p className='text-sm text-gray-600'>{userEducation.startDate}</p>
                                </div>
                                <div>
                                    <label className='text-sm font-bold text-gray-600'>End Date</label>
                                    <p className='text-sm text-gray-600'>{userEducation.endDate}</p>
                                </div>                           
                            </div>
                            <div className='w-[80%] mx-auto py-3 '>
                                <div className='flex items-center justify-between text-lg'>
                                    <p className='font-bold text-gray-800'>Voluntary & Self Identification</p>
                                    <SquarePen className='cursor-pointer'/>
                                </div>
                                <div>
                                    <label className='text-sm font-bold text-gray-600'>Gender</label>
                                    <p className='text-sm text-gray-600'>{userVoluntary_selfIdentity.gender}</p>
                                </div>
                                <div>
                                    <label className='text-sm font-bold text-gray-600'>Your Race or Ethnicity</label>
                                    <p className='text-sm text-gray-600'>{userVoluntary_selfIdentity.race_ethnicity}</p>
                                </div>
                                <div>
                                    <label className='text-sm font-bold text-gray-600'>Protected Veteran Status</label>
                                    <p className='text-sm text-gray-600'>{userVoluntary_selfIdentity.veteranStatus}</p>
                                </div>
                            </div>
                            
                            <div className='my-5 flex justify-between'>
                                <button onClick={handleBack} className='bg-black text-white px-4 py-2 flex items-center gap-2 cursor-pointer'><ArrowLeft /> Previous </button>
                                <button onClick={handleNext} className='bg-black text-white px-4 py-2 flex items-center gap-2 cursor-pointer'>Submit <ArrowRight /></button>
                            </div>
                        </div>
                )}
                {step === 6 && (
                    <div className='w-full h-full flex flex-col items-center justify-center min-h-[70vh]'>
                        <CircleCheck className='text-green-500 w-15 h-15 mb-5'/> 
                        <h1 className='text-2xl font-bold mb-2 flex items-center gap-2'>Congratulations! Your Application Has Been Submitted</h1>
                        <p className='text-sm text-center leading-6 mb-6 text-gray-600 max-w-2xl'>Our team is currently reviewing all applications, and if you’re shortlisted, we’ll be in touch via the email you provided. Keep an eye on your inbox for updates!</p>
                        
                        <Link href={'/career'} className='bg-black text-white px-4 py-2 flex items-center gap-2 cursor-pointer'>Browse More Jobs</Link>
                    </div>
                )}
            </div>
        </div>
    </div>
   
  )
}

export default Page