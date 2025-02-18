import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SignInBox = () => {
    const [text, setText] = useState("Ahla w Sahla!");
    const [fadeClass, setFadeClass] = useState("fade-in");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(""); // State for error message
    const navigate = useNavigate();

    useEffect(() => {
        const interval = setInterval(() => {
            setFadeClass("fade-out");

            setTimeout(() => {
                setText((prevText) =>
                    prevText === "Ahla w Sahla!" ? "Welcome Back!" : "Ahla w Sahla!"
                );
                setFadeClass("fade-in");
            }, 1000);
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    const handleSignIn = () => {
        // Check if both fields are filled
        if (!username || !password) {
            setError("Please enter both username and password.");
        } else {
            setError(""); // Clear error if both fields are filled
            navigate("/"); // Redirect if both fields are filled
        }
    };

    return (
        <div className="relative w-[470px] h-[600px] bg-[#F5E3C1] opacity-80 rounded-lg p-8 shadow-lg z-20">
            <div
                className="absolute left-1/2 transform -translate-x-1/2 font-pathway text-4xl font-extrabold z-10"
                style={{ top: "15%", whiteSpace: "nowrap" }}
            >
                <span className={`text-black ${fadeClass}`} style={{ transition: "opacity 1s ease-in-out" }}>
                    {text.split(" ")[0]}
                </span>{" "}
                <span className={`text-[#B24F4F] ${fadeClass}`} style={{ transition: "opacity 1s ease-in-out" }}>
                    {text.split(" ")[1]} {text.split(" ")[2]}
                </span>
            </div>

            {/* Error Message Above Inputs */}
            {error && (
                <div className="text-[#B24F4F] text-center mb-4">
                    <span>{error}</span>
                </div>
            )}

            <div className="mt-36">
                <input
                    type="text"
                    placeholder="Username"
                    className="w-full border-b-2 border-[#B24F4F] py-2 mb-10 text-xl font-abel bg-transparent"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="w-full border-b-2 border-[#B24F4F] py-2 mb-8 text-xl font-abel bg-transparent"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>

            <div className="absolute right-10 top-1/5 transform -translate-y-1/2 text-sm text-[#B24F4F] font-abel">
                <a href="/forgot-password" className="hover:underline">Forgot Password?</a>
            </div>

            {/* Sign In Button */}
            <button
                onClick={handleSignIn}
                className={`absolute top-[400px] left-1/2 transform -translate-x-1/2 w-1/4 bg-[#984949] text-white text-xl font-abel font-semibold rounded-lg py-2 opacity-100 z-20 ${
                    !username || !password ? "cursor-not-allowed" : "hover:bg-[#B24F4F]"
                }`}
            >
                Log In
            </button>

            {/* Sentence under the button */}
            <div className="absolute top-[470px] left-1/2 transform -translate-x-1/2 text-lg font-abel text-[#B24F4F] text-center z-30">
                <span>Don't have an Account? </span>
                <a href="/signuppage" className="text-[#B24F4F] font-semibold hover:underline">
                    Sign Up
                </a>
            </div>
        </div>
    );
};

export default SignInBox;
