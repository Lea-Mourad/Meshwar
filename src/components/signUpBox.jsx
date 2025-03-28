import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignUpBox = () => {
    const [text, setText] = useState("Ahla w Sahla!");
    const [fadeClass, setFadeClass] = useState("fade-in");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false); // Added loading state
    const navigate = useNavigate();

    useEffect(() => {
        const interval = setInterval(() => {
            setFadeClass("fade-out");

            setTimeout(() => {
                setText((prevText) =>
                    prevText === "Ahla w Sahla!" ? "Welcome!" : "Ahla w Sahla!"
                );
                setFadeClass("fade-in");
            }, 1000);
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    const handleSignUp = async (e) => {
        e.preventDefault(); // Prevent default form submission
        setError("");

        // Check if all fields are filled
        if (!email || !username || !password) {
            setError("Please enter all fields.");
            return;
        }

        setLoading(true); // Set loading state to true
        try {
            const response = await axios.post(
                "https://meshwar-backend.onrender.com/auth/register/",
                {
                    email,
                    username,
                    password,
                }
            );
            console.log("Sign Up Successful:", response.data);
            alert("Sign Up Successful!");
            navigate("/verify-email");
        } catch (error) {
            console.error("Sign Up Failed:", error.response?.data || error.message);
            setError(error.response?.data?.message || "Sign Up Failed. Please try again.");
        } finally {
            setLoading(false); // Set loading state back to false
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

            {/* Error Message */}
            {error && (
                <div className="text-[#B24F4F] text-center mb-4">
                    <span>{error}</span>
                </div>
            )}

            <div className="mt-36">
                <input
                    type="email"
                    placeholder="Email"
                    className="w-full border-b-2 border-[#B24F4F] py-2 mb-10 text-xl font-abel bg-transparent"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Username"
                    className="w-full border-b-2 border-[#B24F4F] py-2 mb-10 text-xl font-abel bg-transparent"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="w-full border-b-2 border-[#B24F4F] py-2 mb-8 text-xl font-abel bg-transparent"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>

            <button
                onClick={handleSignUp}
                disabled={loading}
                className={`absolute top-[438px] left-1/2 transform -translate-x-1/2 w-1/4 bg-[#984949] text-white text-xl font-abel font-semibold rounded-lg py-2 opacity-100 z-20 ${
                    loading ? "cursor-not-allowed bg-[#B24F4F]" : "hover:bg-[#B24F4F]"
                }`}
            >
                {loading ? "Signing Up..." : "Sign Up"}
            </button>

            <div className="absolute top-[500px] left-1/2 transform -translate-x-1/2 text-lg font-abel text-[#B24F4F] text-center z-30">
                <span>Already have an Account? </span>
                <a href="/loginpage" className="text-[#B24F4F] font-semibold hover:underline">
                    Log In
                </a>
            </div>
        </div>
    );
};

export default SignUpBox;
