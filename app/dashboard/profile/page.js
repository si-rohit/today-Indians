"use client"
import React, { useEffect, useState }  from 'react'
import { ArrowUpFromLine } from 'lucide-react';
import userIcon from '@/public/images/userIcon.png'
import { useSelector } from 'react-redux';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const Page = () => {
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
    <div className="min-h-screen bg-gray-50 ">
      <div className="max-w-3xl bg-white p-8 shadow">
        <h2 className="text-2xl font-bold mb-6">Edit Profile</h2>

        <div className="flex items-center gap-4 mb-6">
          <Image
            src={profile.image || userIcon}
            alt="Profile"
            width={100}
            height={100}
            className="w-20 h-20  object-cover border"
          />
          <div>
            <label  className="block text-xl font-medium text-gray-700 mb-1">
              Change Profile Photo
            </label>
            <input type="file" accept="image/*" className='hidden' id="fileInput"  onChange={handleImageChange} />
            <button className={`bg-gray-600 text-white px-4 py-2 hover:bg-gray-700 cursor-pointer flex items-center gap-2 ${profile.image !== '' && 'hidden'}`} onClick={() => document.getElementById('fileInput').click()}>Upload <ArrowUpFromLine className='w-4'/></button>
             <button className={`bg-gray-600 text-white px-4 py-2 hover:bg-gray-700 cursor-pointer flex items-center gap-2 ${profile.image === '' && 'hidden'}`} onClick={handleSubmitImage} >Set Image <ArrowUpFromLine className='w-4'/></button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-3">         

          {/* full Name */}
          <div>
            <label className="block font-medium text-gray-700 mb-1">Full Name</label>
            <input
              type="text"
              name="firstname"
              value={profile.firstname}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2"
            />
          </div>

          {/* Gender */}
          <div>
            <label className="block font-medium text-gray-700 mb-1">Gender</label>
            <select
              name="gender"
              value={profile.gender}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2.5"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* user group */}
          <div className='relative' onBlur={() =>
                    setTimeout(() => setShowuserGroups(false), 500)
                }>
            <label className="block font-medium text-gray-700 mb-1">User group</label>
            <input
              type="text"
              name="group"
              value={profile.group}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2"
              onKeyDown={() => setShowuserGroups(true)}
            />
            <div>
              {showuserGroups && <div className="absolute bg-white border border-gray-300 z-50 min-w-full max-h-[200px] overflow-y-scroll">
                {filteredUserGroups.map((group, index) => (
                  <div key={index} className="cursor-pointer hover:bg-gray-100 p-2" onClick={() => setProfile({ ...profile, group: group.name })}>
                    <p className="text-sm text-gray-600">{group.name}</p>
                  </div>
                ))}
              </div>}
            </div>
            
          </div>
                   
              
          {/* Date of Birth */}
          <div>
            <label className="block font-medium text-gray-700 mb-1">Date of Birth</label>
            <input
              type="date"
              name="dob"
              value={profile.dob || ''}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2"
            />
          </div>

          {/* Bio */}
          <div className="md:col-span-2">
            <label className="block font-medium text-gray-700 mb-1">Bio</label>
            <textarea
              name="bio"
              rows="3"
              value={profile.bio}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2"
            ></textarea>
          </div>
        </div>

        {/* Save and Cancel buttons */}
        <div className="flex gap-4">
          <button
            onClick={handleSave}
            className="bg-gray-600 text-white px-6 py-2 hover:bg-gray-700"
          >
            {loading ? "Saving..." : "Save"}
          </button>
          <button
            onClick={() => window.location.reload()}
            className="bg-gray-300 text-black px-6 py-2 hover:bg-gray-400"
          >
            Cancel
          </button>
        </div>

        {/* Username */}
        <div className='border-t border-gray-400 my-6 py-3'>
          <label className="block font-medium text-gray-700 mb-1 ">Username</label>
          <div className='flex items-center'>
            <input
              type="text"
              name="username"
              value={profile.username}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2"
            />
            <button className="bg-gray-600 text-white px-4 py-2 hover:bg-gray-700 cursor-pointer flex items-center gap-2 ml-2">Change</button>
          </div>
          
        </div>
        {/* Link */}
        <div className='border-t border-gray-400 mb-6 py-3'>
          <label className="block font-medium text-gray-700 mb-1 ">Link</label>
          <div className='flex items-center'>
            <input
              type="text"
              name="link"
              value={profile.link}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2"
            />
            <button onClick={handleSave} className="bg-gray-600 text-white px-6.5 py-2 hover:bg-gray-700 cursor-pointer flex items-center gap-2 ml-2">Save</button>
          </div>
          
        </div>
       
      </div>
    </div>
  )
}

export default Page