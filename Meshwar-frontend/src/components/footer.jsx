import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Import Link component from react-router-dom
import AboutUs from "../pages/AboutUs";
const Footer = () => {
  const [isAtBottom, setIsAtBottom] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight;
      setIsAtBottom(isBottom);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <footer className="fixed bottom-0 w-full bg-gray-200 py-3 text-center text-black text-lg">
      <p>
        <Link to="/about-us" className="text-black-500 hover:underline">About Us</Link> | Privacy Policy
      </p>
    </footer>
  );
};

export default Footer;
