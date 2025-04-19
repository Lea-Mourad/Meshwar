import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignUpBox = () => {
    const [text, setText] = useState("Ahla w Sahla!");
    const [fadeClass, setFadeClass] = useState("fade-in");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const API_BASE_URL = "https://meshwar-backend.onrender.com";

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

    const validateForm = () => {
        if (!email || !password || !confirmPassword) {
            setError("Please fill in all fields.");
            return false;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return false;
        }

        if (password.length < 8) {
            setError("Password must be at least 8 characters long.");
            return false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setError("Please enter a valid email address.");
            return false;
        }

        return true;
    };

    const handleSignUp = async (e) => {
        e.preventDefault();
        setError("");

        if (!validateForm()) {
            return;
        }

        setLoading(true);
        try {
            const response = await axios.post(
                `${API_BASE_URL}/auth/register/`,
                {
                    email,
                    password,
                }
            );

            if (response.status === 201) {
                navigate("/verify-email");
            } else {
                setError("Registration failed. Please try again.");
            }
        } catch (error) {
            setError(
                error.response?.data?.detail ||
                error.response?.data?.message ||
                "Registration failed. Please try again."
            );
        } finally {
            setLoading(false);
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

            {error && (
                <div className="text-[#B24F4F] text-center mb-4">
                    <span>{error}</span>
                </div>
            )}

            <form onSubmit={handleSignUp} className="mt-36">
                <input
                    type="email"
                    placeholder="Email"
                    className="w-full border-b-2 border-[#B24F4F] py-2 mb-10 text-xl font-abel bg-transparent"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="w-full border-b-2 border-[#B24F4F] py-2 mb-10 text-xl font-abel bg-transparent"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Confirm Password"
                    className="w-full border-b-2 border-[#B24F4F] py-2 mb-10 text-xl font-abel bg-transparent"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#B24F4F] text-white py-3 rounded-lg text-xl font-abel hover:bg-[#9e3d3d] transition duration-300"
                >
                    {loading ? "Signing up..." : "Sign Up"}
                </button>
            </form>

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
