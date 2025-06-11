import React from 'react';

const ProgressCard = ({ title, icon, total, newCount, returning, color }) => {
  const percentage = Math.round((newCount + returning) / total * 100);

  const circleColor = color === 'blue' ? '#3B82F6' : '#10B981';
  const strokeDasharray = 283;
  const strokeDashoffset = strokeDasharray - (percentage / 100) * strokeDasharray;

  return (
    <div className="bg-white flex flex-col items-center gap-4 justify-center shadow-md p-4 w-full max-w-[330px] h-full">
      <h3 className=" font-semibold text-xl mb-2">{title}</h3>
      <div className="relative w-32 h-32 mx-auto">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="45"
            stroke="#e5e7eb"
            strokeWidth="5"
            fill="none"
          />
          <circle
            cx="50"
            cy="50"
            r="45"
            stroke={circleColor}
            strokeWidth="5"
            fill="none"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-xl font-bold">{total.toLocaleString()}</span>
          <span className="text-sm text-gray-500">Requests</span>
        </div>
      </div>
      <div className="flex justify-around mt-4 text-sm">
        <div className="flex items-center space-x-1">
          <span className={`w-2 h-2 rounded-full ${color === 'blue' ? 'bg-blue-500' : 'bg-green-500'}`}></span>
          <span className="text-gray-600">New: {newCount.toLocaleString()}</span>
        </div>
        <div className="flex items-center space-x-1">
          <span className="w-2 h-2 rounded-full bg-gray-400"></span>
          <span className="text-gray-600">Returning: {returning.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
};

export default ProgressCard;