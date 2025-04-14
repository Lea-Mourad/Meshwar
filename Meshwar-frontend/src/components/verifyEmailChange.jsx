import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ChangeEmailVerificationPage = () => {
    const [verificationCode, setVerificationCode] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const API_BASE_URL = "http://127.0.0.1:8000";  // Change this to your backend URL

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");
        setLoading(true);

        const token = localStorage.getItem("authToken"); // Retrieve token

        if (!token) {
            setMessage("Authentication required. Please log in.");
            setTimeout(() => navigate("/loginpage"), 2000);
            return;
        }

        try {
            const response = await axios.patch(
                `${API_BASE_URL}/auth/verify-email-change/`,
                { verification_code: verificationCode }, 
                {
                    headers: {
                        "Authorization": `Bearer ${token}`, 
                        "Content-Type": "application/json",
                    },
                }
            );

            if (response.status === 200) {
                setMessage(" Email Change Verification Successful!");
                setVerificationCode("");
                setTimeout(() => navigate("/account"), 2000);
            }
        } catch (error) {
            if (error.response?.status === 401) {
                setMessage("Session expired. Please log in again.");
                setTimeout(() => navigate("/login"), 2000);
            } else {
                setMessage(error.response?.data?.error || "Verification failed. Please try again.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-[#F5E3C1]">
            <form onSubmit={handleSubmit} className="p-8 bg-white shadow-md rounded-lg max-w-md w-full">
                <h2 className="text-3xl font-bold mb-6 text-[#984949]">Change Email Verification</h2>

                {message && (
                    <p
                        className={`mb-4 p-3 rounded ${
                            message.includes("Successful") ? "text-green-700 bg-green-100" : "text-red-700 bg-red-100"
                        }`}
                    >
                        {message}
                    </p>
                )}

                <input
                    type="text"
                    placeholder="Enter Verification Code"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                    className="border border-[#984949] p-3 mb-4 w-full rounded"
                    required
                />

                <button
                    type="submit"
                    className={`w-full bg-[#984949] text-white py-3 rounded-lg font-semibold transition ${
                        loading ? "opacity-50 cursor-not-allowed" : "hover:bg-[#B24F4F]"
                    }`}
                    disabled={loading}
                >
                    {loading ? "Verifying..." : "Verify Email Change"}
                </button>
            </form>
        </div>
    );
};

export default ChangeEmailVerificationPage;
