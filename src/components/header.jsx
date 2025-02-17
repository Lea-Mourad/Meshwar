import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [isDropOpen, setIsDropOpen] = useState(false);
  const [hoveredPlace, setHoveredPlace] = useState(null); // Track hovered place

  const places = ["Beirut", "Sidon", "Batroun", "Jounieh", "Byblos"];

  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".dropdown-container")) {
        setIsDropOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

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

          {/* Dropdown for Where To Go */}
          <li className="relative dropdown-container">
            {/* Click to Toggle Dropdown */}
            <button 
              className="text-black hover:text-gray-500" 
              onClick={(e) => {
                e.stopPropagation(); 
                setIsDropOpen((prev) => !prev);
              }}
            >
              Where To Go
            </button>

            {/* Dropdown Menu */}
            {isDropOpen && (
              <div 
                className="absolute bg-white shadow-md mt-2 w-48 py-2 rounded-md"
                onMouseEnter={() => setIsDropOpen(true)}
                onMouseLeave={() => setIsDropOpen(false)}
              >
                {places.map((place) => (
                  <Link 
                    key={place} 
                    to={`/places/${place}`} 
                    className={`block px-4 py-2   ${
                      hoveredPlace === place ? "bg-gray-300" : "text-[#984949]  hover:bg-gray-200"
                    }`}
                    onMouseEnter={() => setHoveredPlace(place)}
                    onMouseLeave={() => setHoveredPlace(null)}
                  >
                    {place}
                  </Link>
                ))}
              </div>
            )}
          </li>

          <li><Link to="/events" className="text-black hover:text-gray-500">Events</Link></li>
          <li><Link to="/account" className="text-black hover:text-gray-500">Account Page</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
