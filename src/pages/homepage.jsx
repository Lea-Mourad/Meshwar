import React from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import { Link } from "react-router-dom";
import ExploreLebanon from "../components/abouLeb";
import Slideshow from "../components/Slideshow";
import PopularDestination from "../components/popularDestinations"
import CurrencyConverter from "../components/CurrencyConverter";

const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
   {/* Full-Width Background Video */}
<div className="relative w-screen h-[500px] overflow-hidden mt-20">
  <video
    className="w-full h-full object-cover"
    autoPlay
    loop
    muted
    playsInline
  >
    <source src="/lebanon.mp4" type="video/mp4" />
    Your browser does not support the video tag.
  </video>
  {/* Credits Text */}
  <p className="absolute bottom-4 right-6 text-white bg-black bg-opacity-50 px-3 py-1 text-sm rounded-md italic">
    "Rise Above Lebanon" <span className="font-semibold">-@Two Wheels Across</span>
  </p>
</div>
      {/* Login & Sign Up Section */}
      <div className="flex flex-col items-center justify-center py-20 bg-white">
        <h2 className="text-5xl font-bold mb-6">Explore Lebanon</h2>
        
        
        <div className="flex space-x-6">
          <Link to="/loginpage" className="px-10 py-5 text-white bg-[#984949] text-xl font-bold rounded-lg hover:bg-[#7c3b3b] transition duration-300">
            Log In
          </Link>
          <Link to="/signuppage" className="px-10 py-5 text-white bg-[#984949] text-xl font-bold rounded-lg hover:bg-[#7c3b3b] transition duration-300">
            Sign Up
          </Link>
        </div>
        </div>
        {/* Search Bar */}
        <div className="flex flex-col items-center justify-center py-40 bg-gray-100">
        <h3 className="text-3xl font-semibold text-gray-800 mb-6">Search for Places</h3>
        
        <div className="flex items-center w-full max-w-3xl border border-gray-300 rounded-full p-3 shadow-lg bg-white">
          <input 
            type="text" 
            placeholder="Search for places..." 
            className="w-full px-6 py-4 text-lg border-none focus:outline-none rounded-full"
          />
          <button className="px-8 py-4 bg-[#984949] text-white text-lg font-bold rounded-full hover:bg-[#7c3b3b] transition duration-300">
            Search
          </button>
          </div>
      </div>
       {/* Currency Converter */}
       <div className="flex flex-col items-center justify-center py-20 bg-white">
       
        <CurrencyConverter />
      </div>
      <PopularDestination/>
      
      <ExploreLebanon/>
      <Footer />
    </div>
  );
};

export default HomePage;
