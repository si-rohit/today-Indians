'use client'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { FaArrowLeft, FaShareAlt } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import userIcon from '@/public/images/userIcon.png'
import MobileRespFooter from './MobileRespFooter';
import { FaArrowRightLong } from "react-icons/fa6"
import Link from 'next/link';

const EditProfileComp = () => {
    const { user } = useSelector(store => store.auth);
    const [loading, setLoading] = useState(false);
    const [userGroups, setUserGroups] = useState([]);
    const [showuserGroups, setShowuserGroups] = useState(false);
    // console.log(user);
    const router = useRouter();
    if (!user) {
        router.push("/auth");
    }

    const fetchUserGroups = async () => {
        const response = await fetch('https://5341.general.pointer.8080-server.net/user_group?channel=32&type=user');
        const data = await response.json();
        setUserGroups(data);
    };

    useEffect(() => {
        fetchUserGroups();
    }, []);

    // console.log(userGroups);

    const [profile, setProfile] = useState({
        image: user.pass_photo || '',
        username: user.username || '',
        bio: user.bio || '',
        group: '',
        dob: user.dob || '',
        firstname:user.firstname +' '+ user.lastname || '',
        gender:user.gender || '',
        link:user.link || '',
    });

    const handleChange = (e) => {
        setProfile({ ...profile, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
        const imageUrl = URL.createObjectURL(file);
        setProfile({ ...profile, image: imageUrl });
        }
    };

    const handleSubmitImage = async()=>{
        const formData = new FormData();
        formData.append('pass_photo', profile.image);
        // formData.append('uid', user.user_id);
        const response = await fetch(`https://5341.general.pointer.8080-server.net/update?uid=${user.user_id}&update_profile=1`, {
        method: 'POST',
        headers: {
            // 'Content-Type': 'application/json',
            'Authorization': '1',
        },
        body: formData,
        })
        const data = await response.json();
        console.log(data);
    }

    const handleSave = async() => {
        setLoading(true);
        const formData = new FormData();
        // formData.append('username', profile.username);
        formData.append('bio', profile.bio);
        formData.append('user_group', profile.group);
        formData.append('dob', profile.dob);
        formData.append('gender', profile.gender);
        formData.append('link', profile.link);
        formData.append('full_name', profile.firstname);
        // formData.append('pass_photo', profile.image);
        // formData.append('uid', user.user_id);
        const response =await fetch(`https://5341.general.pointer.8080-server.net/update?uid=${user.user_id}&update_profile=1`, {
        method: 'POST',
        headers: {
            // 'Content-Type': 'application/json',
            'Authorization': '1',
        },
        body: formData,
        })
        const data = await response.json();
        console.log(data);
        setLoading(false);
    };
    const filteredUserGroups = userGroups.filter((group) => group.name.toLowerCase().includes(profile.group?.toLowerCase()));
    // console.log(filteredUserGroups);
  return (
    <div>
        <div className="min-h-screen ">
            {/* Header */}
            <div className="bg-gray-200 text-black text-2xl px-4 py-4 flex items-start justify-start gap-4">
                <FaArrowLeft onClick={()=>window.history.back()} className='mt-1'/>
                <h1 className="">Edit Profile</h1>
                {/* <FaShareAlt className=" ml-auto" /> */}
            </div>
           <div className="max-w-sm mx-auto text-center mt-8">
               
                {/* Profile Image */}
                <div className="flex flex-col items-center">
                    <Image
                    src={profile?.image || userIcon}
                    alt="Profile"
                    width={100}
                    height={100}
                    className="w-26 h-26 rounded-full border-4 border-white bg-white shadow-md object-cover"
                    />
                    <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                    id='file'
                    />
                    <p className="mt-2 text-lg text-gray-600" onClick={()=>document.getElementById('file').click()}>Change Picture</p>
                </div>
                
                {/* Username */}
                <div className='px-3 text-start mt-6'>
                    <label className="block text-lg text-gray-700 mb-1">username</label>
                    <div className='flex text-lg justify-between w-full rounded-md py-2'>
                        <h1>@{user.username || 'username123'}</h1>
                        <Link href={'edit/edit-username'} className="flex items-center gap-2">Edit <FaArrowRightLong /></Link>
                    </div>
                </div>
                
                {/* Form */}
                <form className="px-3 pt-4 space-y-4 text-left relative">
            
                    {/* Full Name */}
                    <div>
                        <label className="block text-lg text-gray-700 mb-1">Full Name</label>
                        <input
                        type={"text"}
                        name="firstname"
                        value={profile.firstname}
                        onChange={handleChange}
                        className="w-full border border-gray-300 text-lg rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                        />
                    </div>
                    
                    {/* Email */}
                    <div>
                        <label className="block text-lg text-gray-700 mb-1">Email</label>
                        <input
                        type={"email"}
                        name="email"
                        value={user.email}
                        onChange={handleChange}
                        className="w-full border border-gray-300 text-lg rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                        />
                    </div>

                     {/* Gender */}
                    <div>
                        <label className="block text-lg text-gray-700 mb-1">Gender</label>
                        <select
                        name="gender"
                        value={profile.gender}
                        onChange={handleChange}
                        className="w-full border border-gray-300 text-lg rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                        >
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                    </div>

                    {/* DOB */}
                    <div>
                        <label className="block text-lg text-gray-700 mb-1">Date of Birth</label>
                        <input
                        type={"date"}
                        name="dob"
                        value={profile.dob}
                        onChange={handleChange}
                        className="w-full border border-gray-300 text-lg rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                        />
                    </div>

                    {/* Bio */}
                    <div>
                        <label className="block text-lg text-gray-700 mb-1">Bio</label>
                        <textarea
                        type={"text"}
                        name="bio"
                        value={profile.bio}
                        onChange={handleChange}
                        className="w-full border border-gray-300 text-lg rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                        />
                    </div>

                    {/* Group */}
                    <div className='relative'>
                        <label className="block text-lg text-gray-700 mb-1">Group</label>
                        <input
                        type={"text"}
                        name="group"
                        value={profile.group}
                        onChange={handleChange}
                        onClick={()=>setShowuserGroups(!showuserGroups)}
                        className="w-full border border-gray-300 text-lg rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                        />
                        {showuserGroups && (
                            <div className="absolute z-10 w-full max-h-[200px] overflow-y-scroll bg-white border border-gray-300">
                            {filteredUserGroups.map((group) => (
                                <div
                                key={group.user_group_id}
                                className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                                onClick={() => {
                                    setProfile({ ...profile, group: group.name });
                                    setShowuserGroups(false);
                                }}
                                >
                                {group.name}
                                </div>
                            ))}
                            </div>
                        )}
                    </div>
                        
                    {/* Link */}
                    <div>
                        <label className="block text-lg text-gray-700 mb-1">Link</label>
                        <input
                        type={"text"}
                        name="country"
                        value={profile.link}
                        onChange={handleChange}
                        className="w-full border border-gray-300 text-lg rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                        />
                    </div>
                    
                    {/* Save Button */}
                    <div className='flex justify-between gap-4'>
                        <button
                            type="button"
                            className="w-full border py-2 font-semibold mt-4"
                            onClick={()=>window.history.back()}
                            >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="w-full border bg-black text-white py-2 font-semibold mt-4"
                            >
                            Save
                        </button>
                    </div>
                    
                </form>
            </div>
        </div>
        <div className='sticky bottom-0 hidden max-[426px]:block mt-18'>
            <MobileRespFooter />   
        </div> 
    </div>
  )
}

export default EditProfileComp