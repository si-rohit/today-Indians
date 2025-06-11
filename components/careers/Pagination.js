// src/components/Pagination.jsx
import React from 'react';

const Pagination = ({ total, perPage, current, onPageChange }) => {
  const totalPages = Math.ceil(total / perPage);

  return (
    <div className="flex justify-center mt-6 space-x-2">
      {Array.from({ length: totalPages }, (_, i) => (
        <button
          key={i}
          className={`px-3 py-1 border ${current === i + 1 ? 'bg-black text-white' : 'bg-white border-gray-300'}`}
          onClick={() => onPageChange(i + 1)}
        >
          {i + 1}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
