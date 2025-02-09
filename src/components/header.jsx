import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="flex items-center justify-between bg-white shadow-md px-10 py-4 fixed top-0 w-full z-50">
      {/* Left Section: Logo + Name */}
      <div className="flex items-center gap-4">
        <img src="/logo.png" alt="Meshwar Logo" className="w-14 h-14 rounded-full" />
        <span 
          className="text-5xl font-bold text-[#984949]" 
          style={{ fontFamily: "'Holtwood One SC', serif" }}
        >
          MESHWAR
        </span>
      </div>

      {/* Right Section: Navigation */}
      <nav>
        <ul className="flex gap-10 text-xl" style={{ fontFamily: "'Abel', sans-serif" }}>
          <li><Link to="/" className="text-black hover:text-gray-500">Home</Link></li>
          <li><Link to="/where-to-go" className="text-black hover:text-gray-500">Where To Go</Link></li>
          <li><Link to="/events" className="text-black hover:text-gray-500">Events</Link></li>
          <li><Link to="/account" className="text-black hover:text-gray-500">Account Page</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
