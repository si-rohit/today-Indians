'use client';
import React, { useState, useEffect } from 'react';
import { jobData } from '@/components/careers/jobData';
import JobCard from '@/components/careers/JobCard';
import Pagination from '@/components/careers/Pagination';
import HelpCenterHeader from '@/components/HelpCenterHeader';
import HelpSearch from '@/components/HelpSearch';
import { Search,ChevronDown  } from 'lucide-react';
import SearchBar from '@/components/careers/SearchBar';

const uniqueLocations = [...new Set(jobData.map((job) => job.location))];

const Page = () => {
  const [filters, setFilters] = useState({
    jobType: [],
    experience: [],
    location: [],
    ctc: [],
  });
  const [searchLocation, setSearchLocation] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState('newest');
  const [isOpenJobType, setIsOpenJobType] = useState(true);
  const [isOpenExperience, setIsOpenExperience] = useState(true);
  const [isOpenCTC, setIsOpenCTC] = useState(true);

  const jobsPerPage = 6;

  console.log(filters);

  const handleCheckboxChange = (filterType, value) => {
    setFilters((prev) => {
      const updated = prev[filterType].includes(value)
        ? prev[filterType].filter((item) => item !== value)
        : [...prev[filterType], value];
      return { ...prev, [filterType]: updated };
    });
    setCurrentPage(1);
  };

  const clearAllFilters = () => {
    setFilters({ jobType: [], experience: [], location: [], ctc: [] });
    setSearchLocation('');
  };

  const handleLocationSearch = () => {
    if (searchLocation.trim()) {
      setFilters((prev) => ({
        ...prev,
        location: [...new Set([...prev.location, searchLocation.trim()])],
      }));
    }
    setSearchLocation('');
  };

  const filteredJobs = jobData.filter((job) => {
    const matchJobType =
      filters.jobType.length === 0 || filters.jobType.includes(job.type);
    const matchExperience =
      filters.experience.length === 0 || filters.experience.includes(job.experience);
    const matchLocation =
      filters.location.length === 0 || filters.location.includes(job.location);
    const matchCTC =
      filters.ctc.length === 0 || filters.ctc.some((range) => {
        const [min, max] = range.split('-').map((v) => Number(v));
        return job.ctc.min >= min && job.ctc.max <= max;
      });

    return matchJobType && matchExperience && matchLocation && matchCTC;
  });

  const sortedJobs = [...filteredJobs].sort((a, b) => {
    if (sortBy === 'newest') return b.id - a.id;
    if (sortBy === 'oldest') return a.id - b.id;
    return 0;
  });

  const indexOfLast = currentPage * jobsPerPage;
  const indexOfFirst = indexOfLast - jobsPerPage;
  const currentJobs = sortedJobs.slice(indexOfFirst, indexOfLast);

  return (
    <div className="min-h-screen">
      <HelpCenterHeader title="Careers" />
      <div className="bg-white py-10 text-center mb-10 flex flex-col items-center">
        <h1 className="text-5xl font-bold">Explore Open Positions</h1>
        <h3 className="py-2">Find Jobs here related to your skills and experience</h3>
        <div className="flex">
          <SearchBar />
        </div>
      </div>

      <div className="flex bg-gray-100 p-4">
        {/* Filter Sidebar */}
        <div className="w-1/4 bg-white p-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-xl font-semibold">Filters</h3>
            <button onClick={clearAllFilters} className="text-sm border px-2 py-1 border-gray-200">Clear All</button>
          </div>

          {/* Location Filter */}
          <div className="mb-4 bg-gray-50 p-2">
            <div className='flex border border-gray-200 px-2 py-1 w-full justify-between items-center '>
                <input
                type="text"
                className="outline-none "
                value={searchLocation}
                placeholder="Search location"
                onChange={(e) => setSearchLocation(e.target.value)}
                />
                <button onClick={handleLocationSearch} type='submit' className=" gray-600"><Search className='w-4 h-4'/></button>
            </div>
            
            <div className="flex flex-wrap mt-2 gap-1">
              {filters.location.map((loc) => (
                <span key={loc} className="bg-gray-200 px-2 py-1 text-sm rounded">{loc}</span>
              ))}
            </div>
          </div>

          {/* Job Type Filter */}
          <div className="mb-4 bg-gray-50 p-2">
            <div className='flex w-full justify-between items-center cursor-pointer' onClick={() => setIsOpenJobType(!isOpenJobType)}>
                <p className="font-semibold">Job Type</p>
                <ChevronDown className={`w-4 h-4 ${isOpenJobType ? 'rotate-180' : ''}`} />
            </div>
            {isOpenJobType && (
              <div className="mt-2">
                {['Full-Time', 'Part-Time', 'Contract', 'Internship'].map((type) => (
                  <div key={type}>
                    <label>
                      <input
                        type="checkbox"
                        checked={filters.jobType.includes(type)}
                        onChange={() => handleCheckboxChange('jobType', type)}                        
                      />{' '}
                      {type}
                    </label>
                  </div>
                ))}
              </div>
            )}           
            
          </div>

          {/* Experience Filter */}
          <div className="mb-4 bg-gray-50 p-2">
            <div className='flex w-full justify-between items-center cursor-pointer' onClick={() => setIsOpenExperience(!isOpenExperience)}>
                <p className="font-semibold">Experience</p>
                <ChevronDown className={`w-4 h-4 ${isOpenJobType ? 'rotate-180' : ''}`} />
            </div>
            {isOpenExperience && (
              <div className="mt-2">
                {['Entry Level', 'Mid Level', 'Senior Level', 'Manager'].map((level) => (
                  <div key={level}>
                    <label>
                      <input
                        type="checkbox"
                        checked={filters.experience.includes(level)}
                        onChange={() => handleCheckboxChange('experience', level)}
                      />{' '}
                      {level}
                    </label>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* CTC Filter */}
          <div className="mb-4 bg-gray-50 p-2">
            <div className='flex w-full justify-between items-center cursor-pointer' onClick={() => setIsOpenCTC(!isOpenCTC)}>
                <p className="font-semibold">CTC</p>
                <ChevronDown className={`w-4 h-4 ${isOpenJobType ? 'rotate-180' : ''}`} />
            </div>
            {
              isOpenCTC && (
                <div className="mt-2">
                  {['0-5,000', '5,000-10,000', '10,000-15,000', '15,000-20,000'].map((range) => (
                    <div key={range}>
                      <label>
                        <input
                          type="checkbox"
                          checked={filters.ctc.includes(range)}
                          onChange={() => handleCheckboxChange('ctc', range)}
                        />{' '}
                        £{range.replace('-', ' - £')}
                      </label>
                    </div>
                  ))}
                </div>
              )
            }
          </div>
        </div>

        {/* Job Results */}
        <div className="flex-1 px-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Highlighted Openings</h2>
            <div className="flex items-center gap-2">
              <span>Sort by:</span>
              <select
                className="border rounded px-2 py-1"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
              </select>
              <span className="text-sm text-gray-500">{filteredJobs.length} Openings</span>
            </div>
          </div>

          {currentJobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}

          <Pagination
            total={filteredJobs.length}
            perPage={jobsPerPage}
            current={currentPage}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
    </div>
  );
};

export default Page;
