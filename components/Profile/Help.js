import React, { useState } from 'react'

const Help = () => {
  const [formData, setFormData] = useState({
          email: '',
          message: '',
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
             <h2 className="text-2xl font-semibold mb-6 ">Help</h2>
    
            <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block mb-1 font-medium" htmlFor="name">
                      Email 
                  </label>
                <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-black"
                    required
                />
                </div>
    
                {/* message */}
                <div>
                <label className="block mb-1 font-medium" htmlFor="bio">
                    Message
                </label>
                <textarea
                    type="text"
                    name="message"
                    placeholder="Enter your Message"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-black"
                    required
                />
                </div>
                {/* Submit Button */}
                <div className="flex justify-end">
                    <button
                    type="submit"
                    className="w-1/3 py-2 cursor-pointer px-4 bg-[#171717] hover:bg-[#353535] text-white font-semibold rounded transition"
                    >
                    Send message
                    </button>
                </div>
            </form>    
        </div>
  )
}

export default Help