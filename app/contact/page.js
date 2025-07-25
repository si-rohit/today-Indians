'use client'
import React, { useEffect, useState } from 'react'
import { MapPin ,Phone,Mail ,Clock7,CircleFadingPlus ,MessageCircle   } from 'lucide-react';
import SubHeader from '@/components/Header/SubHeader';

const Page = () => {
    const [loading, setLoading] = useState(true);
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

    const [contactInfo, setContactInfo] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        companyName: '',
        JobTiltle: '',
        bugget:'',
        message: '',
    })
    const handleChange = (e) => {
        const { name, value } = e.target;
        setContactInfo((prev) => ({ ...prev, [name]: value }));
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('full_name', contactInfo.name);
        formData.append('email', contactInfo.email);
        formData.append('mobile', contactInfo.phone);
        formData.append('subject', contactInfo.subject);
        formData.append('company', contactInfo.companyName);
        formData.append('job_title', contactInfo.JobTiltle);
        formData.append('bugget', contactInfo.bugget);
        formData.append('descr', contactInfo.message);
        formData.append('channel', 42);
        const response = await fetch(`https://5341.general.pointer.8080-server.net/add_enqs`, {
            method: 'POST',
            headers: {
                // 'Content-Type': 'application/json',
                'Authorization': '1',
            },
            body: formData,
        })
        const data = await response.json();
        console.log(data);
        setContactInfo({
            name: '',
            email: '',
            phone: '',
            subject: '',
            companyName: '',
            JobTiltle: '',
            bugget:'',
            message: '',
        })
    };

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 1500); // simulate API delay
        return () => clearTimeout(timer);
      }, []);

  return (
    <div className={`${isDarkMode ? 'bg-[#12110f] text-white' : ''}`}> 
        <SubHeader />
         {/* // Main Container */}
         {loading ? (
             <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-start py-8 px-4">
                <div className="max-w-7xl w-full flex gap-8 max-[769px]:flex-col">

                    {/* Left Side - Contact Information Skeleton */}
                    <div className="bg-white p-6 max-w-[350px] w-full shadow-md flex flex-col gap-6 animate-pulse">
                        <div className="h-6 bg-gray-200 rounded w-1/3" />
                        {Array.from({ length: 5 }).map((_, idx) => (
                            <div key={idx} className="flex items-center gap-4 bg-white p-2 py-3">
                            <div className="w-10 h-6 bg-gray-300 rounded" />
                            <div className="flex flex-col gap-1">
                                <div className="h-4 w-40 bg-gray-200 rounded" />
                                <div className="h-3 w-60 bg-gray-100 rounded" />
                            </div>
                            </div>
                        ))}
                    </div>

                    {/* Right Side - Contact Form + Map Skeleton */}
                    <div className="bg-white p-6 w-full shadow-md flex flex-col justify-center items-start gap-6 animate-pulse">
                    <div className="h-6 bg-gray-200 rounded w-1/3" />

                    {/* Name and Phone */}
                    <div className="flex justify-between w-full gap-4">
                        <div className="h-10 bg-gray-200 rounded w-1/2" />
                        <div className="h-10 bg-gray-200 rounded w-1/2" />
                    </div>

                    {/* Email */}
                    <div className="h-10 bg-gray-200 rounded w-full" />

                    {/* Subject Select */}
                    <div className="h-10 bg-gray-200 rounded w-full" />

                    {/* Conditional Inputs (Business Enquiry Simulation) */}
                    {Array.from({ length: 3 }).map((_, idx) => (
                        <div key={idx} className="h-10 bg-gray-200 rounded w-full" />
                    ))}

                    {/* Message */}
                    <div className="h-24 bg-gray-200 rounded w-full" />

                    {/* Submit Button */}
                    <div className="h-10 bg-gray-300 rounded w-32" />

                    {/* Map */}
                    <div className="h-64 w-full bg-gray-200 rounded" />
                    </div>
                </div>
             </div>
            ): (                         
            <div className={`min-h-screen mt-25 ${isDarkMode ? 'bg-[#12110f] text-white' : 'bg-gray-50 text-black'} flex flex-col items-center justify-start py-8 px-4`}>
                        <div className="max-w-7xl max-[769px]:flex-col w-full flex gap-8">
                    
                            {/* Left Side - Contact Information */}
                            <div className={` ${isDarkMode ? 'bg-[#333] ' : 'bg-white'} p-6 max-w-2xl shadow-md max-[769px]:max-w-full flex flex-col gap-6`}>
                                <h2 className="text-2xl font-bold mb-2">Contact Information</h2>
                                <div className={`max-[769px]:flex-row max-[426px]:flex-col max-[426px]:text-center flex flex-col gap-4  ${isDarkMode ? 'text-gray-400' : 'text-gray-700'} text-sm`}>
                                <div className={` ${isDarkMode ? 'bg-[#222] text-white' : 'bg-white text-black'} p-2 py-3  flex items-center max-[769px]:flex-col gap-2`}>
                                    <MapPin className='w-10 h-6'/>
                                    <div>
                                        <h3 className="font-medium">Company Address</h3>
                                        <p className={`text-xs ${isDarkMode ? 'text-gray-400':'text-gray-600'}`}>124 City Road, London EC1V 2NX, United Kingdom</p>
                                    </div>   
                                </div>

                                <div className={` ${isDarkMode ? 'bg-[#222] text-white' : 'bg-white text-black'} p-2 py-3  flex items-center max-[769px]:flex-col gap-2`}>
                                    <Phone  className='w-10 h-6'/>
                                    <div>
                                        <h3 className="font-medium">Phone Number</h3>
                                        <p className={`text-xs ${isDarkMode ? 'text-gray-400':'text-gray-600'}`}>+44 7586 10338</p>
                                    </div>   
                                </div>

                                <div className={` ${isDarkMode ? 'bg-[#222] text-white' : 'bg-white text-black'} p-2 py-3  flex items-center max-[769px]:flex-col gap-2`}>
                                    <Mail  className='w-10 h-6'/>
                                    <div>
                                        <h3 className="font-medium">Email Address</h3>
                                        <p className={`text-xs ${isDarkMode ? 'text-gray-400':'text-gray-600'}`}>support@todayindians.com</p>
                                    </div>   
                                </div>
                                
                                <div className={` ${isDarkMode ? 'bg-[#222] text-white' : 'bg-white text-black'} p-2 py-3  flex items-center max-[769px]:flex-col gap-2`}>
                                    <MessageCircle   className='w-10 h-6'/>
                                    <div>
                                        <h3 className="font-medium">Social Media</h3>
                                        <p className={`text-xs hover:underline cursor-pointer ${isDarkMode ? 'text-gray-400':'text-gray-600'}`}>Twitter | Facebook | Instagram</p>
                                    </div>   
                                </div> 

                                <div className={` ${isDarkMode ? 'bg-[#222] text-white' : 'bg-white text-black'} p-2 py-3  flex items-center max-[769px]:flex-col gap-2`}>
                                    <Clock7  className='w-10 h-6'/>
                                    <div>
                                        <h3 className="font-medium">support Hours</h3>
                                        <p className={`text-xs ${isDarkMode ? 'text-gray-400':'text-gray-600'}`}>Mon - Fri : 9:00 AM to 6:00 PM</p>
                                    </div>   
                                </div>
                            
                                </div>
                            </div>

                            {/* Right Side - Contact Form + Map */}
                            <div className={` ${isDarkMode ? 'bg-[#333]' : 'bg-white'} p-6 w-full shadow-md flex flex-col justify-center items-start gap-6`}>
                                <h2 className="text-2xl font-bold mb-2">Get in Touch</h2>

                                <div className='flex justify-between w-full'>                   
                                    {/* Name Input */}
                                    <input 
                                    type="text"
                                    name="name"
                                    value={contactInfo.name}
                                    onChange={handleChange} 
                                    placeholder="Enter your name" 
                                    className="border w-[48.5%] border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-black"
                                    />

                                    {/* Phone Input */}
                                    <input 
                                    type="tel"
                                    name="phone"
                                    value={contactInfo.phone}
                                    onChange={handleChange} 
                                    placeholder="Enter your phone number (optional)" 
                                    className="border w-[48.5%] border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-black"
                                    />
                                </div>                       

                                {/* Email Input */}
                                <input 
                                type="email"
                                name="email"
                                value={contactInfo.email}
                                onChange={handleChange} 
                                placeholder="Enter your email" 
                                className="border w-full border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-black"
                                />

                                {/* Search Input */}
                                <select
                                name="subject"
                                value={contactInfo.subject}
                                onChange={handleChange} 
                                className="border w-full border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-black"
                                >
                                    <option value="">Select a query</option>
                                    <option value="General Enquiry">General Enquiry</option>
                                    <option value="Business Enquiry">Business Enquiry</option>
                                    <option value="Career Enquiry">Career Enquiry</option>                       
                                    <option value="Media Enquiry">Media Enquiry</option>
                                    <option value="Other">Other</option>
                                </select>

                                {contactInfo.subject === "Business Enquiry" && (
                                    <>
                                        {/* Company Name Input */}
                                        <input 
                                        type="text"
                                        name="companyName"
                                        value={contactInfo.companyName}
                                        onChange={handleChange} 
                                        placeholder="Enter your company name" 
                                        className="border w-full border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-black"
                                        />
                                        {/* Job Tiltle Input */}
                                        <input 
                                        type="text"
                                        name="JobTiltle"
                                        value={contactInfo.JobTiltle}
                                        onChange={handleChange} 
                                        placeholder="Enter your Enter your job title" 
                                        className="border w-full border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-black"
                                        />
                                        {/* Bugget Input */}
                                        <input 
                                        type="number"
                                        name="bugget"
                                        value={contactInfo.bugget}
                                        onChange={handleChange} 
                                        placeholder="Enter your bugget your min $50000" 
                                        className="border w-full border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-black"
                                        />
                                    </>
                                )}

                                {/* Message Input */}
                                <textarea 
                                placeholder="Write your message here" 
                                name="message"
                                value={contactInfo.message}
                                onChange={handleChange}
                                rows={4}
                                className="border w-full border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-black"
                                />

                                {/* Submit Button */}
                                <button type="submit" onClick={(e)=>handleSubmit(e)} className="bg-[#222] flex justify-center items-center text-white py-2 px-4 hover:bg-[#111] transition">
                                Submit
                                </button>

                                {/* Map Section */}
                                <div className="h-64 w-full overflow-hidden">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d224345.83767019103!2d77.04417244133798!3d28.527554408765195!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d1d8c6a2b909f%3A0xa8a88364e1242d5e!2sNew%20Delhi%2C%20Delhi!5e0!3m2!1sen!2sin!4v1682302226662!5m2!1sen!2sin"
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    allowFullScreen
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                ></iframe>
                                </div>

                            </div>
                        </div>
            </div>
        )}      
    </div>
   
  )
}

export default Page
