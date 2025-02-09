import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Import Link for navigation

const SignInBox = () => {
    const [text, setText] = useState("Ahla w Sahla!"); // Initial text
    const [fadeClass, setFadeClass] = useState("fade-in"); // Initial fade-in class
  
    useEffect(() => {
      // Toggle text every 3 seconds
      const interval = setInterval(() => {
        // First, fade out the text
        setFadeClass("fade-out");
  
        // After fade-out completes (1 second delay), change the text and fade it in
        setTimeout(() => {
          setText((prevText) =>
            prevText === "Ahla w Sahla!" ? "Welcome Back!" : "Ahla w Sahla!"
          );
          setFadeClass("fade-in"); // Fade in with the new text
        }, 1000); // 1000ms delay to allow fade-out to complete
  
      }, 3000); // Change text every 3 seconds
  
      // Cleanup interval on component unmount
      return () => clearInterval(interval);
    }, []);
  

  return (
    <div className="relative w-[470px] h-[600px] bg-[#F5E3C1] opacity-80 rounded-lg p-8 shadow-lg z-20">
      {/* Centered Text Inside the Box */}
      <div
        className="absolute left-1/2 transform -translate-x-1/2 font-pathway text-4xl font-extrabold z-10"
        style={{
          top: "15%", // Fine-tuned position between 1/4 and 1/5
          whiteSpace: "nowrap", // Prevents text from wrapping to a new line
        }}
      >
        <span
          className={`text-black ${fadeClass}`}
          style={{ transition: "opacity 1s ease-in-out" }}
        >
          {text.split(" ")[0]}
        </span>{" "}
        <span
          className={`text-[#B24F4F] ${fadeClass}`}
          style={{ transition: "opacity 1s ease-in-out" }}
        >
          {text.split(" ")[1]} {text.split(" ")[2]}
        </span>
      </div>

      <div className="mt-36">
        {/* Username Input (as line) */}
        <input
          type="text"
          placeholder="Username"
          className="w-full border-b-2 border-[#B24F4F] py-2 mb-10 text-xl font-abel bg-transparent"
        />
        {/* Password Input (as line) */}
        <input
          type="password"
          placeholder="Password"
          className="w-full border-b-2 border-[#B24F4F] py-2 mb-8 text-xl font-abel bg-transparent"
        />
      </div>

      {/* Forgot Password Text */}
      <div className="absolute right-10 top-1/5 transform -translate-y-1/2 text-sm text-[#B24F4F] font-abel">
        <a href="/forgot-password" className="hover:underline">Forgot Password?</a>
      </div>

      {/* Sign In Button */}
      <button className="absolute top-[400px] left-1/2 transform -translate-x-1/2 w-1/4 bg-[#984949] text-white text-xl font-abel font-semibold rounded-lg py-2 opacity-100 z-20">
        Sign In
      </button>

      {/* Sign Up Text */}
      <div className="absolute top-[470px] left-1/2 transform -translate-x-1/2 text-lg font-abel text-[#B24F4F] text-center z-30">
        <span>Don't have an Account? </span>
        <Link to="/signup" className="text-[#B24F4F] font-semibold hover:underline">
          Sign Up
        </Link>
      </div>
    </div>
  );
};

export default SignInBox;
