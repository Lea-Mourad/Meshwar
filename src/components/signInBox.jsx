import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/authContext";

const SignInBox = () => {
    const [text, setText] = useState("Ahla w Sahla!");
    const [fadeClass, setFadeClass] = useState("fade-in");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { setIsAuthenticated } = useAuth();

    const API_BASE_URL = "https://meshwar-backend.onrender.com";

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

    const handleSignIn = async () => {
        if (!email.trim() || !password.trim()) {
            setError("Please enter both email and password.");
            return;
        }

        setError("");
        setLoading(true);

        console.log("Attempting login with:", { email, password });

        try {
            const response = await axios.post(
                `${API_BASE_URL}/auth/login/`,
                { email, password },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            console.log("Full API Response:", JSON.stringify(response.data, null, 2));

            if (response?.status === 200 && response?.data) {
                const { access, refresh, message } = response.data;

                // Check if access token is present
                if (!access) {
                    setError("Login failed. Access token not received.");
                    console.error("Access token is missing from response:", response.data);
                    return;
                }

                // Store tokens in localStorage
                localStorage.setItem("authToken", access);
                localStorage.setItem("refreshToken", refresh);
                setIsAuthenticated(true);

                console.log("Login successful:", message);
                
                setError("");
                navigate("/");
            } else {
                setError("Login failed. Unexpected response from server.");
                console.error("Unexpected API response status:", response.status);
            }
        } catch (error) {
            console.error("Login Error:", error);

            if (error.response) {
                console.log("Error Response Data:", error.response.data);
                setError(
                    error.response.data.message ||
                    error.response.data.detail ||
                    "Login failed. Please check your credentials."
                );
            } else if (error.request) {
                console.log("No response received from the server:", error.request);
                setError("No response from the server. Please try again later.");
            } else {
                console.log("Request setup error:", error.message);
                setError("An unexpected error occurred. Please try again.");
            }
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
                    type="password"
                    placeholder="Password"
                    className="w-full border-b-2 border-[#B24F4F] py-2 mb-8 text-xl font-abel bg-transparent"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>

            <div className="absolute right-10 top-1/5 transform -translate-y-1/2 text-sm text-[#B24F4F] font-abel">
                <a href="/forgot-password" className="hover:underline">Forgot Password?</a>
            </div>

            <button
                onClick={handleSignIn}
                className={`absolute top-[400px] left-1/2 transform -translate-x-1/2 w-1/4 bg-[#984949] text-white text-xl font-abel font-semibold rounded-lg py-2 opacity-100 z-20 ${
                    loading ? "opacity-50 cursor-not-allowed" : "hover:bg-[#B24F4F]"}`
                }
                disabled={loading}
            >
                {loading ? "Logging In..." : "Log In"}
            </button>

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