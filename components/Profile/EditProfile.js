'use client'
import Image from 'next/image';
import React, { useState } from 'react'

export const EditProfile = () => {
    const [formData, setFormData] = useState({
        name: '',
        bio: '',
        phone: '',
        gender: '',
        website: ''
    });
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        // API call
        console.log('Updated Profile:', formData);
        alert('Profile updated successfully!');
    };
  return (
    <div>
         <h2 className="text-2xl font-semibold mb-6 ">Edit Profile</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
            {/* Profile Picture */}
            <div className="flex justify-between items-center mb-8 w-full border border-gray-300 p-2 rounded focus:outline-none ">
                <Image src={"https://images.unsplash.com/photo-1633332755192-727a05c4013d?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D" || userIcon} className="" height={47} width={47} alt="" />
                <button className='py-2 cursor-pointer px-4 bg-[#171717] hover:bg-[#353535] text-white font-semibold rounded'>Change Profile Image</button>
            </div>
            {/* Name */}
            <div>
            <label className="block mb-1 font-medium" htmlFor="name">
                Full Name
            </label>
            <input
                type="text"
                name="name"
                placeholder="John Doe"
                value={formData.name}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-black"
                required
            />
            </div>

            {/* bio */}
            <div>
            <label className="block mb-1 font-medium" htmlFor="bio">
                Bio
            </label>
            <input
                type="text"
                name="bio"
                placeholder="Enter your bio"
                value={formData.bio}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-black"
                required
            />
            </div>

            {/* Phone */}
            <div>
            <label className="block mb-1 font-medium" htmlFor="phone">
                Phone Number
            </label>
            <input
                type="tel"
                name="phone"
                placeholder="9876543210"
                value={formData.phone}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-black"
                required
            />
            </div>

            {/* Gender */}
            <div>
            <label className="block mb-1 font-medium" htmlFor="gender">
                Gender
            </label>
            <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-black"
                required
            >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
            </select>
            </div>

            <div>
            <label className="block mb-1 font-medium" htmlFor="phone">
                Website
            </label>
            <input
                type="text"
                name="website"
                placeholder="www.example.com"
                value={formData.website}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-black"
                required
            />
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
                <button
                type="submit"
                className="w-1/3 py-2 cursor-pointer px-4 bg-[#171717] hover:bg-[#353535] text-white font-semibold transition"
                >
                Update Profile
                </button>
            </div>
        </form>    
    </div>
  )
}
