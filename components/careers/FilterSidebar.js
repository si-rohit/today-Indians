// src/components/FilterSidebar.jsx
import React from 'react';

const FilterSidebar = () => {
  return (
    <div className="w-1/4 bg-white p-4 border-r border-gray-300">
      <h3 className="font-semibold mb-2">Filters</h3>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Job Type</label>
        <div className="space-y-1">
          {['Full-Time', 'Part-Time', 'Contract', 'Internship'].map(type => (
            <div key={type}>
              <input type="checkbox" id={type} />
              <label htmlFor={type} className="ml-2 text-sm">{type}</label>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Experience Level</label>
        <div className="space-y-1">
          {['Entry Level', 'Mid Level', 'Senior Level', 'Manager'].map(level => (
            <div key={level}>
              <input type="checkbox" id={level} />
              <label htmlFor={level} className="ml-2 text-sm">{level}</label>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Work Mode</label>
        <div className="space-y-1">
          {['Remote', 'On-site', 'Hybrid'].map(mode => (
            <div key={mode}>
              <input type="checkbox" id={mode} />
              <label htmlFor={mode} className="ml-2 text-sm">{mode}</label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">CTC Range</label>
        <div className="space-y-1">
          {['£0 - £20000', '£20001 - £35000', '£35001 - £50000', '£50001 - £75000'].map(ctc => (
            <div key={ctc}>
              <input type="checkbox" id={ctc} />
              <label htmlFor={ctc} className="ml-2 text-sm">{ctc}</label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;
