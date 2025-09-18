import React from "react";
import { BiLogoPlayStore } from "react-icons/bi";
import { IoLogoAppleAppstore } from "react-icons/io5";
import { Link } from "react-router";

const Hero = () => {
  return (
    <div
      className="relative h-[90vh] bg-cover bg-center"
      style={{ backgroundImage: "url('/heroBg.jpg')" }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-[#010C41A1] opacity-70"></div>

      {/* Content */}
      <div className="relative z-10 flex items-center h-full px-6 md:px-20 lg:px-40 text-[#EBF3FD]">
        <div className="max-w-xl">
          <h1 className="text-3xl md:text-6xl font-bold mb-4 leading-tight">
            Explore the Best Rental Properties at Unbeatable Prices
          </h1>
          <p className="mb-6 text-base md:text-2xl leading-relaxed">
            Discover comfortable living with just a few clicks. Our platform
            connects you with trusted rental properties tailored to your needs.
          </p>
          <button className="bg-[#10248A] px-6 py-2 rounded-full hover:bg-indigo-700 transition-colors">
            Start Your Rental Journey
          </button>

          {/* Download Buttons */}
          <div className="flex flex-wrap gap-4 mt-6">
            <Link
              to="#"
              className="flex items-center bg-white text-indigo-900 px-4 py-2 rounded-full hover:bg-gray-200 transition"
            >
              <BiLogoPlayStore className="mr-2 text-2xl md:text-3xl" />
              <div className="flex flex-col text-left">
                <span className="text-xs">GET IT ON</span>
                <span className="text-base md:text-lg font-semibold">
                  Get on Google Play
                </span>
              </div>
            </Link>
            <Link
              to="#"
              className="flex items-center bg-white text-indigo-900 px-4 py-2 rounded-full hover:bg-gray-200 transition"
            >
              <IoLogoAppleAppstore className="mr-2 text-2xl md:text-3xl" />
              <div className="flex flex-col text-left">
                <span className="text-xs">Download on the</span>
                <span className="text-base md:text-lg font-semibold">
                  App Store
                </span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
