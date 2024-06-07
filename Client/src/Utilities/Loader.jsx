import React from 'react';

const Loader = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center bg-white">
      <div className="flex space-x-3">
        <div className="w-4 h-4 bg-orange-500 rounded-full animate-pulse delay-0"></div>
        <div className="w-4 h-4 bg-orange-500 rounded-full animate-pulse delay-200"></div>
        <div className="w-4 h-4 bg-orange-500 rounded-full animate-pulse delay-400"></div>
        <div className="w-4 h-4 bg-orange-500 rounded-full animate-pulse delay-600"></div>
        <div className="w-4 h-4 bg-orange-500 rounded-full animate-pulse delay-800"></div>
      </div>
    </div>
  );
}

export default Loader;
