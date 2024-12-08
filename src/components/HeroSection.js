import React from 'react';

const HeroSection = () => {
  // Creating a separate component for the decorative elements on the right
  const DecorativeElements = () => (
    <div className="relative w-48 h-48">
      {/* Center sun/star icon */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="w-20 h-20 bg-blue-500 rounded-xl rotate-45 flex items-center justify-center">
          <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center">
            <span className="text-white text-2xl transform -rotate-45">✦</span>
          </div>
        </div>
      </div>
      
      {/* Decorative elements around the center */}
      <div className="absolute top-0 right-0 text-orange-300 text-2xl">★</div>
      <div className="absolute bottom-0 right-8 text-pink-300 text-xl">★</div>
      
      {/* Thumbs up icon */}
      <div className="absolute bottom-4 left-4 w-12 h-12 bg-blue-200 rounded-lg flex items-center justify-center transform rotate-12">
        <span className="text-2xl">👍</span>
      </div>
      
      {/* Column icon */}
      <div className="absolute top-8 left-0 w-12 h-12 bg-blue-200 rounded-lg flex items-center justify-center transform -rotate-12">
        <span className="text-2xl">🏛️</span>
      </div>
    </div>
  );

  return (
    <div className="w-full bg-white px-4 py-16">
      <div className="mx-auto max-w-7xl flex items-center justify-between">
        {/* Text content on the left */}
        <div className="max-w-2xl">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            The home of zenoDAO voters
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            Delegates are the stewards of the zenoDAO, appointed by 
            token holders to make governance decisions on their behalf.
          </p>
        </div>

        {/* Decorative elements on the right */}
        <DecorativeElements />
      </div>
    </div>
  );
};

export default HeroSection;