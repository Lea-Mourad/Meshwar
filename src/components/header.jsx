import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Bars3Icon } from "@heroicons/react/24/outline"; // Heroicons v2

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // For toggling the sidebar menu
  const [isPlacesOpen, setIsPlacesOpen] = useState(false); // For toggling "Where To Go" menu
  const places = ["Beirut", "Sidon", "Batroun", "Jounieh", "Byblos"];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".sidebar") && !event.target.closest(".hamburger")) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <>
      {/* Main Header */}
      <header className="flex items-center justify-between bg-white shadow-md px-6 py-4 fixed top-0 w-full z-50 sm:flex-row sm:justify-between">
        {/* Left Section: Logo */}
        <div className="flex items-center gap-4">
          <img src="/logo2.png" alt="Meshwar Logo" className="w-50 h-14 rounded-full" />
        </div>

        {/* Right Section: Navigation (Visible on larger screens) */}
        <nav className="hidden sm:flex gap-10 text-xl" style={{ fontFamily: "'Abel', sans-serif" }}>
          <Link to="/" className="text-[#B24F4F] hover:text-gray-500">Home</Link>
          <Link to="/events" className="text-[#B24F4F] hover:text-gray-500">Events</Link>
          <Link to="/account" className="text-[#B24F4F] hover:text-gray-500">Account Page</Link>
          <div className="relative">
            <button
              className="text-[#B24F4F] hover:text-gray-500"
              onClick={() => setIsPlacesOpen(!isPlacesOpen)} // Toggle "Where To Go" options
            >
              Where To Go
            </button>
            {/* Conditional Dropdown for Larger Screens */}
            {isPlacesOpen && (
              <div className="absolute bg-white shadow-md mt-2 w-48 py-2 rounded-md">
                {places.map((place) => (
                  <Link
                    key={place}
                    to={`/places/${place}`}
                    className="block px-4 py-2 text-[#B24F4F] hover:bg-gray-200"
                  >
                    {place}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </nav>

        {/* Right Section: Hamburger Icon (Mobile Only) */}
        <div 
          className="sm:hidden flex items-center cursor-pointer hamburger ml-auto" 
          onClick={() => setIsMenuOpen(!isMenuOpen)} // Toggle Sidebar
        >
          <Bars3Icon className="h-6 w-6 text-black" />
        </div>
      </header>

      {/* Sidebar Menu for Mobile */}
      <div
        className={`fixed top-20 left-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-10 ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        } sidebar sm:hidden`} // Hidden on larger screens
      >
        <div className="flex flex-col items-center mt-10 space-y-6" style={{ fontFamily: "'Abel', sans-serif" }}>
          {/* Home Link */}
          <Link to="/" className="text-[#B24F4F] hover:text-gray-500 text-xl" onClick={() => setIsMenuOpen(false)}>
            Home
          </Link>

          {/* Events Link */}
          <Link to="/events" className="text-[#B24F4F] hover:text-gray-500 text-xl" onClick={() => setIsMenuOpen(false)}>
            Events
          </Link>

          {/* Account Page Link */}
          <Link to="/account" className="text-[#B24F4F] hover:text-gray-500 text-xl" onClick={() => setIsMenuOpen(false)}>
            Account Page
          </Link>

          {/* Where To Go Menu */}
          <div className="relative">
            <button
              className="text-[#B24F4F] hover:text-gray-500 text-xl"
              onClick={() => setIsPlacesOpen(!isPlacesOpen)} // Toggle "Where To Go" options
            >
              Where To Go
            </button>

            {/* Conditional Dropdown */}
            {isPlacesOpen && (
              <div className="mt-2">
                {places.map((place) => (
                  <Link
                    key={place}
                    to={`/places/${place}`}
                    className="block px-4 py-2 text-[#B24F4F] hover:bg-gray-200 text-xl"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {place}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
