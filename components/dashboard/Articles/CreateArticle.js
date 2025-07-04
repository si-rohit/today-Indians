'use client';
import { useParams, useSearchParams } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';
import { AlignLeft,AlignCenter ,AlignRight,ChevronDown,List,ListOrdered,Bold,Underline,Italic ,Eye ,CalendarDays,CircleX   } from 'lucide-react';
import { useSelector } from 'react-redux';
import { FaMapPin } from "react-icons/fa6";
import Image from 'next/image';
import Cropper from 'react-easy-crop';
import { getCroppedImg } from '@/utils/cropImage'
import TiptapEditor from '@/utils/TiptapEditor';
import { IoMdAdd } from "react-icons/io";
import { MdOutlineDeleteForever } from "react-icons/md";


const CreateArticle = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [loading, setLoading] = useState(false);
  const editorRef = useRef(null);
  const { user } = useSelector(store => store.auth);
  const [post, setPost] = useState({});
  const [isDarkMode, setIsDarkMode] = useState(true);

  // for image cropping
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [showCropper, setShowCropper] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);

  // for markdown

     
    useEffect(() => {
      const Theam = localStorage.getItem('theam');
      if (Theam === 'dark') {          
        setIsDarkMode(true);
      }
      else {          
        setIsDarkMode(false);
      }
    }, []);

  // fetch the post data
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://5341.general.pointer.8080-server.net/post?poid=${id}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': '1',
          },
          body: JSON.stringify({ user: user.user_id }),
        })
        const data = await response.json();
        console.log(data);
        setPost(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [id, user.user_id]);

  // console.log(post);

  const [formData, setFormData] = useState({
    title:'',
    sub_description: '',
    discription: '',
    thumbnail: '',
    thumbnailPreview: '',
    tags: [],
    category: [],
    users:[],
    visibility:'',
    permalink:'',
    metaTitle:'',
    metaDescription:'',
    metaKeywords:'',
    Publish_Date:new Date().toISOString().split('T')[0],
    status: '',
    type: 'post',
    project_link: '',
    location:'',
    download_link: '',
  });

  // set the form data when the post is loaded
  useEffect(() => {
  if (id && post) {
    setFormData({
      title: post.title || '',
      sub_description: post.sub_descr || '',
      discription: post.description || '',
      thumbnail: '',
      thumbnailPreview: post.image || '',
      tags: post.hashtags ? post.hashtags.split(',') : [],
      category: post.topic_id || [],
      visibility: post.visibility || 'public',
      permalink: post.permalink || '',
      metaTitle: post.meta_title || '',
      metaDescription: post.meta_description || '',
      metaKeywords: post.meta_keywords || '',
      Publish_Date: post.published || new Date().toISOString().split('T')[0],
      status: post.status || 'draft',
      type: post.type || 'post',
      project_link: post.project_link || '',
      location: post.location || '',
      download_link: post.download_link || '',
    });

    if (editorRef.current) {
      editorRef.current.innerHTML = post.description || '';
      // setEditorContent(post.description || '');
    }
  }
}, [post, id]);


  const [showTagSuggestions, setShowTagSuggestions] = useState(false);
  const [showCategorySuggestions, setShowCategorySuggestions] = useState(false);
  const [showPrivateSuggestions, setShowPrivateSuggestions] = useState(false);
  const [showThumbnailLinkInput, setShowThumbnailLinkInput] = useState(false);
  const [categorySuggestions, setCategorySuggestions] = useState([]);
  const [TagsSuggestions, setTagsSuggestions] = useState([]);
  const [showAditionalFields, setShowAdditionalFields] = useState(false);

  const PrivateUsers = ['user1', 'user2', 'user3', 'user4', 'user5',];
  const categorySuggestionsFiltered = categorySuggestions.filter((suggestion) => suggestion.name.toLowerCase().includes(formData.categoryInput));
  const TagsSuggestionsFiltered = TagsSuggestions.filter((suggestion) => suggestion.query.toLowerCase().includes(formData.tagInput));

  // console.log(TagsSuggestionsFiltered);

  // fetch all category
  useEffect(() => {

    const fetchCategory = async () => {
      const res = await fetch(`https://5341.general.pointer.8080-server.net/topic?channel=42`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': '1',
        },
      })
      const data = await res.json();
      // console.log(data);
      setCategorySuggestions(data.data);
    }
    // fetch all tags
    const fetchTags = async () => {
      const res = await fetch(`https://5341.general.pointer.8080-server.net/q_search?status=1&channel=32`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': '1',
        },
      })
      const data = await res.json();
      // console.log(data);
      setTagsSuggestions(data);
    }

    fetchCategory();
    fetchTags();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleThumbnailUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setUploadedImage(url);
      setShowCropper(true); // open cropping modal
    }
  };

  const updateArticle = async (farmData) => {
      // for (let [key, value] of farmData.entries()) {
      //   console.log(`${key}: ${value}`);
      // }
      const response = await fetch(`https://5341.general.pointer.8080-server.net/up_post?id=${id}&channel=42`, {
        method: 'POST',
        headers: {
          // 'Content-Type': 'multipart/form-data',
          'Authorization': '1',
        },
        body: farmData
      })
      const data = await response.json();
      setLoading(false);
    console.log(data);
    if (data.response === "ok") {
      alert("Article update successfully");      
      formData.thumbnail='';
      // thumbnailUploadedImg='';
    }else{
      alert("Something went wrong");
    }
    }
  const CreateArticle = async (farmData) => {
    setLoading(true);
    if (!formData.title || formData.title.trim() === '' || formData.sub_description.trim() === '' || formData.discription.trim() === '') {
      alert(`Please enter a ${formData.title.trim() === '' ? 'title' :''} and ${formData.sub_description.trim() === '' ? 'sub description' : 'discription'}`);
      setLoading(false);
      return;
    }
    const response = await fetch(`https://5341.general.pointer.8080-server.net/add_post&channel=42`, {
      method: 'POST',
      headers: {
        // 'Content-Type': 'multipart/form-data',
        'Authorization': '1',
      },
      body: farmData
    })
    const data = await response.json();
    setLoading(false);
    // console.log(data);
    if (data.response === "ok") {
      alert("Article created successfully");
      setFormData({
        title: '',
        sub_description: '',
        discription: '',
        thumbnail: null,
        thumbnailPreview: '',
        tags: [],
        category: [],
        permalink:'',
        metaTitle:"",
        metaDescription:'',
        metaKeywords:''
      });
    }else{
      alert("Something went wrong");
    }
  }
  const handleUpload = async () => {
    const thumbnailData = new FormData();
    // thumbnailData.append('file', thumbnailFile);
    thumbnailData.append('file', formData.thumbnail);
    thumbnailData.append('fileUploadingPath', `users/${user.user_id}/thumbnails`);

    const res = await fetch('/api/upload', {
      method: 'POST',
      body: thumbnailData,
    });

    const data = await res.json();
    // console.log(data);
    if (data.response === "error") {
      alert("Something went wrong");
      setLoading(false);
      return
    }
    const uploadedThumbnail = data.file !== ''
    ? data.file
    : formData.thumbnailPreview;

    const farmData = new FormData();
    // farmData.append('channel_id', 42);
    farmData.append('uid', user.user_id);
    farmData.append('title', formData.title);
    farmData.append('sub_descr', formData.sub_description);
    farmData.append('description', formData.discription);
    farmData.append('image', uploadedThumbnail);
    farmData.append('hashtags', formData.tags);
    farmData.append('public', formData.visibility === 'public' ? '1' : '2');
    farmData.append('type', 'article');
    if(!id){
      farmData.append('permalink', formData.permalink);
    }
    farmData.append('published', formData.Publish_Date);
    farmData.append('meta_title', formData.metaTitle);
    farmData.append('meta_description', formData.metaDescription);
    farmData.append('meta_keywords', formData.metaKeywords);
    farmData.append('status', formData.status);
    farmData.append('type', 'post');
    farmData.append("project_link", formData.project_link);
    farmData.append("location", formData.location);
    farmData.append("download_link", formData.download_link);
    if (Array.isArray(formData.category)) {
      formData.category.forEach(element => {
        farmData.append('topic_id[]', element);
      });
    }

    // for (let [key, value] of farmData.entries()) {
    //     console.log(`${key}: ${value}`);
    //   }
    if (id) {
      updateArticle(farmData);     
    }
    else{
      CreateArticle(farmData);
    }

  };
  const handleSubmit = async(e) => {
    e.preventDefault();
    setLoading(true);
    await handleUpload();  
  };
  

  return (
    <div className={`relative  ${isDarkMode ? 'text-white' : 'bg-[#f9f9f9]'}`}>
      <h1 className='text-3xl font-bold ml-3 mb-3'>{id ? 'Update Article' : 'Create Article'}</h1>
      <div className="flex flex-col lg:flex-row gap-6 max-w-6xl mx-auto px-4" >
        {/* Main Editor Area */}
        <div className="w-full lg:w-2/3 space-y-4">
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={formData.title}
            onChange={handleChange}
            className={`w-full text-lg border px-2 py-1 focus:outline-none ${isDarkMode ? 'bg-[#333] border-gray-600' : 'bg-white border-gray-300'}`}
          />
          <input
            type="text"
            name="permalink"
            placeholder="Permalink "
            value={formData.permalink}
            onChange={(e) => {
              const value = e.target.value.replace(/[^a-zA-Z0-9-_]/g, '');
              handleChange({ target: { name: e.target.name, value } });
            }}
            className={`w-full text-lg border px-2 ${isDarkMode ? 'bg-[#333] border-gray-600' : 'bg-white border-gray-300'} py-1 focus:outline-none`}
          />

          <input
            type="text"
            name="sub_description"
            placeholder="Sub Description"
            value={formData.sub_description}
            onChange={handleChange}
            className={`w-full text-lg border px-2 py-1 focus:outline-none ${isDarkMode ? 'bg-[#333] border-gray-600' : 'bg-white border-gray-300'}`}
          />

          
          {/* <textarea
            type="text"
            name="discription"
            placeholder="Description "
            value={formData.discription}
            onChange={handleChange}
            rows={8}
            className={`w-full text-lg border  px-2 py-1 focus:outline-none ${isDarkMode ? 'bg-[#333] border-gray-600' : 'bg-white border-gray-300'}`}
          /> */}
          <div className="mt-4">
            <label className="block font-semibold mb-1">Description</label>
            <TiptapEditor
              value={formData.discription}
              onChange={(html) =>
                setFormData((prev) => ({ ...prev, discription: html }))
              }
            />
          </div>

          <h1 className='text-2xl font-bold '>
            SEO Details
          </h1>
          <input
            type="text"
            name="metaTitle"
            placeholder="Meta Title "
            value={formData.metaTitle}
            onChange={handleChange}
            className={`w-full text-lg border ${isDarkMode ? 'bg-[#333] border-gray-600' : 'bg-white border-gray-300'} px-2 py-1  focus:outline-none`}
          />
          <input
            type="text"
            name="permalink"
            placeholder="Permalink "
            value={formData.permalink}
            onChange={(e) => {
              const value = e.target.value.replace(/[^a-zA-Z0-9-_]/g, '');
              handleChange({ target: { name: e.target.name, value } });
            }}
            className={`w-full text-lg border px-2 ${isDarkMode ? 'bg-[#333] border-gray-600' : 'bg-white border-gray-300'} py-1 focus:outline-none`}
          />
          <textarea
            type="text"
            name="metaDescription"
            placeholder="Meta Description "
            value={formData.metaDescription}
            onChange={handleChange}
            className={`w-full text-lg border  ${isDarkMode ? 'bg-[#333] border-gray-600':'bg-white border-gray-300'} px-2 py-1 focus:outline-none`}
          />
          <textarea
            type="text"
            name="metaKeywords"
            placeholder="Meta Keywords "
            value={formData.metaKeywords}
            onChange={handleChange}
            className={`w-full text-lg border  ${isDarkMode ? 'bg-[#333] border-gray-600':'bg-white border-gray-300'} px-2 py-1 focus:outline-none`}
          />

          <h1 className='text-2xl font-bold flex justify-between items-center cursor-pointer' onClick={() => setShowAdditionalFields(!showAditionalFields)}>
            Aditional Details <ChevronDown className={`${showAditionalFields && 'rotate-180'}`}/>
          </h1>
          {
            showAditionalFields && (
              <div className='flex flex-col gap-4'>
                <input
                  type="text"
                  name="project_link"
                  placeholder="Project Link "
                  value={formData.project_link}
                  onChange={handleChange}
                  className={`w-full text-lg border ${isDarkMode ? 'bg-[#333] border-gray-600' : 'bg-white border-gray-300'} px-2 py-1  focus:outline-none`}
                />
                <input
                  type="text"
                  name="download_link"
                  placeholder="Download Link "
                  value={formData.download_link}
                  onChange={handleChange}
                  className={`w-full text-lg border px-2 ${isDarkMode ? 'bg-[#333] border-gray-600' : 'bg-white border-gray-300'} py-1 focus:outline-none`}
                />
                    </div>
                  )
                }
        </div>

        {/* Sidebar */}
        <div className="w-full lg:w-1/3 space-y-6">
            
          {/*publish */}
            <div className={`border flex flex-col gap-1.5 ${isDarkMode ? 'bg-[#333] border-gray-600' : 'bg-white border-gray-300'} p-4`}>
              <h3 className="font-semibold mb-2">Publish</h3>
              <div className='flex '>
                <p className='flex items-center'><Eye className='mr-1 w-4.5'/>Visibility:</p>
                <select
                  name="visibility"
                  value={formData.visibility}
                  onChange={handleChange}
                  className={`focus:outline-none focus:ring-none ${isDarkMode ? 'text-gray-400':'text-gray-700'}`}
                  required
              >
                  <option defaultValue="public">Public</option>
                  <option value="private">Private</option>
              </select>
              </div>
              <div className='flex '>
                <p className='flex items-center'><CalendarDays className='mr-1 w-4.5'/>Date:</p>
                <input
                  type="date"
                  name="Publish_Date"
                  value={formData.Publish_Date || ''}
                  onChange={handleChange}
                  className={`focus:outline-none focus:ring-none ${isDarkMode ? 'text-gray-400':'text-gray-700'}`}
                  ></input>
                {/* <p>{formData.Publish_Date}</p> */}
              </div>
                
              <div className='flex justify-between gap-4'>
                <button
                    type="submit"             
                    onClick={(e) =>{formData.status=0; handleSubmit(e)}}
                    className=" py-1 bg-gray-200 text-black hover:bg-gray-300 group/button w-full"
                  >
                    <div className='flex items-center justify-center py-1 border border-gray-200 group-hover/button:border-gray-300'>
                      <div>Draft </div>
                    </div>
                </button>
                <button
                    type="submit"             
                    onClick={(e) =>{formData.status=9; handleSubmit(e)}}
                    className=" py-1 bg-[#222] text-white hover:bg-[#111] group/button w-full"
                  >
                    {loading ? <div className='flex items-center justify-center py-1 border border-[#222] group-hover/button:border-[#111]'>
                                <div className="loader">
                                  <div className="box-load1"></div>
                                  <div className="box-load2"></div>
                                  <div className="box-load3"></div>
                                </div>
                              </div>: <div>Publish</div>
                    }
                </button>
              </div>
             
          </div>

          {/* select users */}
          {formData.visibility === "private" &&
          <div className={`border ${isDarkMode ? 'bg-[#333] border-gray-600' : 'bg-white border-gray-300'} p-4`} 
          onBlur={() => setTimeout(() => setShowPrivateSuggestions(false), 500)}
          >
            <h3 className="font-semibold mb-2">Select Users </h3>
            <input
            type="text"
            name="category"
            placeholder="Select Users to share"
            value={formData.users}
            onChange={handleChange}
            
            onClick={() => setShowPrivateSuggestions(true)}
            className={`w-full border focus:outline-none p-2 ${isDarkMode ? 'border-gray-600':'border-gray-300'}`}
          />
          {showPrivateSuggestions &&
          <div className={`flex flex-col w-full ${isDarkMode ? 'bg-[#333] border-gray-600' : 'bg-white border-gray-300'} p-4}`}>         
              {PrivateUsers.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() =>{
                    setFormData((prev) => ({
                      ...prev,
                      users: suggestion,
                    }))
                    setShowPrivateSuggestions(false)
                  }  
                  }
                  className={`text-sm  ${isDarkMode ?' text-gray-400':'text-gray-600'} hover:text-gray-800 hover:bg-gray-100 cursor-pointer px-2 min-w-full text-start py-1`}
                >
                  {suggestion}
                </button>
              ))}        
          </div>
          }
          </div>}

          {/* Thumbnail Upload */}
          <div className={`border ${isDarkMode ? 'bg-[#333] border-gray-600' : 'bg-white border-gray-300'} p-4`}>
            <h3 className="font-semibold mb-2">Thumbnail</h3>
            {formData.thumbnailPreview && (
                <div className="mb-3 relative">
                  <Image
                    src={formData.thumbnailPreview  ? formData.thumbnailPreview.trimStart() : ""}
                    alt="Thumbnail Preview"
                    className="w-full h-full max-h-40"
                    width={400}
                    height={160}
                  />
                  <span onClick={() => setFormData((prev) => ({ ...prev, thumbnailPreview: "" }))} className="text-white bg-[#0000008c] cursor-pointer absolute top-1 text-2xl right-1"><MdOutlineDeleteForever /></span>
                </div>
              )}
            <input type="file" accept="image/*" id='thumbnail' className='hidden' onChange={handleThumbnailUpload} />
            <div className='flex justify-between gap-4'>
              <label htmlFor="thumbnail" className={`cursor-pointer w-full  p-2 ${formData.thumbnailPreview ? 'hidden':''} ${isDarkMode ? 'bg-[#111]':'bg-gray-200'} `}>{formData.thumbnailPreview !== "" ? "Change Image" : "Upload Image"}</label>
              <p onClick={()=>setShowThumbnailLinkInput(!showThumbnailLinkInput)} className={`p-2 cursor-pointer w-full ${formData.thumbnailPreview ? 'hidden':''} ${isDarkMode ? 'bg-[#111]':'bg-gray-200'} text-center`}>Image Link</p>
            </div>

            {showThumbnailLinkInput && (
                <div className="mt-2">
                  <input
                    type="text"
                    name="thumbnail"
                    placeholder="Image Link"
                    value={formData.thumbnailPreview}
                    onChange={(e) => setFormData((prev) => ({ ...prev, thumbnailPreview: e.target.value }))}
                    className={`w-full text-lg border ${formData.thumbnailPreview ? 'hidden':''} ${isDarkMode ? 'bg-[#333] border-gray-600':'bg-white border-gray-300'} px-2 py-1 focus:outline-none`}
                  />
                </div>
              )}
            
          </div>         

          {/* Category */}
          <div className={`border ${isDarkMode ? 'bg-[#333] border-gray-600' : 'bg-white border-gray-300'} p-4`} onBlur={() => setTimeout(() => setShowCategorySuggestions(false), 500)}>
            <h3 className="font-semibold mb-2">Category</h3>
            <div className="flex flex-wrap gap-2 mb-2">
              {formData.category.map((tag, index) => (
                <span
                  key={index}
                  className="bg-blue-100 text-black text-sm px-3 py-1 border border-gray-200 flex items-center gap-2"
                >
                  {tag}
                  <button
                    type="button"
                    className="text-red-500 hover:text-red-700"
                    onClick={() =>
                      setFormData((prev) => ({
                        ...prev,
                        category: prev.category.filter((_, i) => i !== index),
                      }))
                    }
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
            <input
            type="text"
            name="categoryInput"
            placeholder="Type a category and press Enter"
            value={formData.categoryInput || ''}
            onClick={() => setShowCategorySuggestions(true)}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                categoryInput: e.target.value,
              }))
            }
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                if (e.target.value.trim() !== '') {
                  setFormData((prev) => ({
                    ...prev,
                    category: [...prev.category, e.target.value.trim()],
                    categoryInput: '',
                  }));
                }
              }
            }}
            className={`w-full focus:outline-none border p-2 ${isDarkMode ? 'border-gray-600':'border-gray-300'}`}
            />
            {showCategorySuggestions &&
            <div className={`flex flex-col w-full${isDarkMode ? 'bg-[#111]':'bg-white'}`}>         
                {categorySuggestionsFiltered.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() =>{
                      setFormData((prev) => ({
                        ...prev,
                        category: [...prev.category, suggestion.name],
                      }))
                      setShowCategorySuggestions(false)
                    }  
                    }
                    className={`text-sm  ${isDarkMode ?' text-gray-400':'text-gray-600'} hover:text-gray-800 hover:bg-gray-100 cursor-pointer px-2 min-w-full text-start py-1`}
                  >
                    {suggestion.name}
                  </button>
                ))}        
            </div>
            }
          </div>

          {/* Tags */}
          <div className={`border ${isDarkMode ? 'bg-[#333] border-gray-600' : 'bg-white border-gray-300'} p-4`} onBlur={() => setTimeout(() => setShowTagSuggestions(false), 500)}>
            <h3 className="font-semibold mb-2">Tags</h3>
            <div className="flex flex-wrap gap-2 mb-2">
              {formData.tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-blue-100 text-black text-sm px-3 py-1 border border-gray-200 flex items-center gap-2"
                >
                  {tag}
                  <button
                    type="button"
                    className="text-red-500 hover:text-red-700"
                    onClick={() =>
                      setFormData((prev) => ({
                        ...prev,
                        tags: prev.tags.filter((_, i) => i !== index),
                      }))
                    }
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
            <input
            type="text"
            name="tagInput"
            placeholder="Type a tag and press Enter"
            value={formData.tagInput || ''}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, tagInput: e.target.value }))
            }
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                const newTag = formData.tagInput?.trim();
                if (newTag && !formData.tags.includes(newTag)) {
                  setFormData((prev) => ({
                    ...prev,
                    tags: [...prev.tags, newTag],
                    tagInput: '',
                  }));
                }
              }
            }}
            onClick={() => setShowTagSuggestions(true)}
            className={`w-full focus:outline-none border p-2 ${isDarkMode ? 'border-gray-600':'border-gray-300'} `}
          />
          {showTagSuggestions &&
          <div className={`flex flex-col w-full ${isDarkMode ? '':'bg-white'}  max-h-[200px] overflow-y-scroll`}>         
              {TagsSuggestionsFiltered.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() =>
                    setFormData((prev) => ({
                      ...prev,
                      tags: [...prev.tags, suggestion.query],
                    }))
                  }
                  className={`text-sm  ${isDarkMode ?' text-gray-400':'text-gray-600'} hover:text-gray-800 hover:bg-gray-100 cursor-pointer px-2 min-w-full text-start py-1`}
                >
                  {suggestion.query}
                </button>
              ))}        
          </div>
          }
          </div>  

          {/* Location */}
          <div className={`border ${isDarkMode ? 'bg-[#333] border-gray-600' : 'bg-white border-gray-300'} p-4`}>
            <h3 className="font-semibold mb-2">Location</h3>
            <input
              type="text"
              name="location"
              placeholder="Location"
              value={formData.location || ''}
              onChange={handleChange}
              className={`w-full text-lg border  ${isDarkMode ? 'bg-[#333] border-gray-600':'bg-white border-gray-300'} px-2 py-1 focus:outline-none`}
            />
          </div>   
        </div>
      </div>
      {showCropper && (
        <div className="fixed inset-0 z-50 bg-[#00000079] bg-opacity-70 flex justify-center items-center">
          <div className="bg-white p-4 w-[90%] max-w-2xl">
            <div className="relative w-full h-96 bg-gray-200">
              <Cropper
                image={uploadedImage}
                crop={crop}
                zoom={zoom}
                aspect={16 / 9}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={(croppedArea, pixels) => {
                  setCroppedAreaPixels(pixels);
                }}
              />
            </div>
            <div className="flex justify-between mt-4">
              <button
                className="bg-gray-300 px-4 py-2 "
                onClick={() => setShowCropper(false)}
              >
                Cancel
              </button>
              <button
                className="bg-black text-white px-4 py-2 "
                onClick={async () => {
                  const blob = await getCroppedImg(uploadedImage, croppedAreaPixels);
                  const file = new File([blob], 'cropped.jpg', { type: 'image/jpeg' });
                  setFormData((prev) => ({ ...prev, thumbnail: file }));
                  setFormData((prev) => ({
                    ...prev,
                    thumbnailPreview: URL.createObjectURL(blob),
                  }));
                  setShowCropper(false);
                }}
              >
                Crop & Set Thumbnail
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateArticle;
