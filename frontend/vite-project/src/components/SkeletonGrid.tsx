import React from 'react';

export const SkeletonGrid: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div
          key={i}
          className="bg-white rounded-3xl border border-[#e8dfd3]/60 p-4 animate-pulse"
        >
          <div className="h-56 rounded-2xl bg-[#f4ede4] mb-4" />
          <div className="h-6 bg-[#f4ede4] rounded-lg w-2/3 mb-2" />
          <div className="h-4 bg-[#f4ede4] rounded-lg w-full mb-1" />
          <div className="h-4 bg-[#f4ede4] rounded-lg w-4/5" />
        </div>
      ))}
    </div>
  );
};