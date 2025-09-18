import React from "react";

const WhyChooseUs = () => {
  return (
    <div className="bg-gray-50 py-16 px-5 md:px-20 lg:px-40  text-center w-full border-b border-gray-100">
      <h2 className="text-4xl md:text-5xl font-bold text-blue-900 mb-4">
        WHY CHOOSE US?
      </h2>
      <p className="text-lg md:text-xl text-gray-600 mb-10">
        Trusted by over 1200 renters, we make the rental process smooth,
        hassle-free, and fast.
      </p>
      <div className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-6 mb-12">
        <button className="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg text-lg md:text-xl">
          Rent With Ease
        </button>
        <button className="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg text-lg md:text-xl">
          Explore Rental Options
        </button>
        <button className="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg text-lg md:text-xl">
          Find Your Perfect Rental
        </button>
        <button className="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg text-lg md:text-xl">
          Affordable Rentals
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-full">
        <div className="p-6">
          <div className="flex justify-start mb-4">
            <img
              src="/1.png"
              alt="Efficient Process Icon"
              className="w-8 h-8 md:w-14 md:h-14"
            />
          </div>
          <h3 className="text-xl md:text-2xl font-semibold text-start text-gray-900 mb-2">
            Efficient and Speedy Rental Process
          </h3>
          <p className="text-base md:text-lg text-gray-600 text-start">
            Discover, Apply, and Secure Your Perfect Home in Record Time
          </p>
        </div>
        <div className="p-6">
          <div className="flex justify-start mb-4">
            <img
              src="/2.png"
              alt="Affordable Options Icon"
              className="w-8 h-8 md:w-14 md:h-14"
            />
          </div>
          <h3 className="text-xl md:text-2xl font-semibold text-start text-gray-900 mb-2">
            Affordable and Flexible Rental Options
          </h3>
          <p className="text-base md:text-lg text-gray-600 text-start">
            A Wide Range of Prices Tailored to Fit Every Budget and Lifestyle
          </p>
        </div>
        <div className="p-6">
          <div className="flex justify-start mb-4">
            <img
              src="/3.png"
              alt="Hassle-Free Journey Icon"
              className="w-8 h-8 md:w-14 md:h-14"
            />
          </div>
          <h3 className="text-xl md:text-2xl font-semibold text-start text-gray-900 mb-2">
            Completely Hassle-Free Rental Journey
          </h3>
          <p className="text-base md:text-lg text-gray-600 text-start">
            Designed for all level business enhancement, with ease of use at its
            core
          </p>
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUs;
