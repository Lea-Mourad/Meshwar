import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const EmailVerificationPage = () => {
    const [verificationCode, setVerificationCode] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const API_BASE_URL = "https://meshwar-backend.onrender.com";

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");
        setLoading(true);

        try {
            const response = await axios.post(
                `${API_BASE_URL}/auth/verify-email/`,
                { code: verificationCode }
            );

            if (response.status === 200) {
                setMessage("Verification Successful!");
                setVerificationCode(""); // Clear input field
                setTimeout(() => {
                    navigate("/account"); // Redirect to the account page
                }, 2000); // Delay to show the success message before redirecting
            } else {
                setMessage("Invalid Verification Code. Please try again.");
            }
        } catch (error) {
            setMessage(
                error.response?.data?.message ||
                "Verification failed. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-[#F5E3C1]">
            <form onSubmit={handleSubmit} className="p-8 bg-white shadow-md rounded-lg max-w-md w-full">
                <h2 className="text-3xl font-bold mb-6 text-[#984949]">Email Verification</h2>

                {message && (
                    <p
                        className={`mb-4 p-3 rounded ${
                            message.includes("Successful")
                                ? "text-green-700 bg-green-100"
                                : "text-red-700 bg-red-100"
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
                    {loading ? "Verifying..." : "Verify Email"}
                </button>
            </form>
        </div>
    );
};

export default EmailVerificationPage;
