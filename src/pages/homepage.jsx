import React from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
       {/* Video Section - No longer full screen height */}
       <div className="relative w-full h-[80vh]">
        <video 
          className="absolute top-0 left-0 w-full h-full object-cover"
          autoPlay 
          loop 
          muted 
          playsInline
        >
          <source src="/lebanon.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>


      {/* Login & Sign Up Section */}
      <div className="flex flex-col items-center justify-center py-20 bg-white">
        <h2 className="text-5xl font-bold mb-6">Explore Lebanon</h2>
        
        
        <div className="flex space-x-6">
          <Link to="/loginpage" className="px-10 py-5 text-white bg-[#984949] text-xl font-bold rounded-lg hover:bg-[#7c3b3b] transition duration-300">
            Log In
          </Link>
          <Link to="/signup" className="px-10 py-5 text-white bg-[#984949] text-xl font-bold rounded-lg hover:bg-[#7c3b3b] transition duration-300">
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
      <Footer />
    </div>
  );
};

export default HomePage;
