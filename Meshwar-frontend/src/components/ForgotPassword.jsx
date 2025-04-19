import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from '../services/api';

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email.trim()) {
            setError("Please enter your email address.");
            return;
        }

        setError("");
        setSuccess("");
        setLoading(true);

        try {
            const response = await api.post("/password-reset/", {
                email: email
            });

            if (response.status === 200) {
                setSuccess("Password reset instructions have been sent to your email. Please check your inbox.");
                setTimeout(() => {
                    navigate("/loginpage");
                }, 5000); // Give user more time to read the success message
            }
        } catch (error) {
            if (error.response?.data?.email) {
                // Handle field-specific errors
                setError(error.response.data.email[0]);
            } else if (error.response?.data?.error) {
                // Handle general error message from backend
                setError(error.response.data.error);
            } else if (error.response?.data?.non_field_errors) {
                // Handle non-field errors
                setError(error.response.data.non_field_errors[0]);
            } else {
                setError("An error occurred. Please try again later.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative w-screen h-screen bg-cover bg-center bg-no-repeat" 
             style={{ backgroundImage: "url(https://www.lebanontours.co/uploads/1/0/3/7/10373098/arches-pigeon-rocks-beirut_orig.jpg)" }}>
            {/* White Overlay */}
            <div className="absolute inset-0 bg-white bg-opacity-50 z-10"></div>
            
            <div className="relative z-20 flex items-center justify-center h-full">
                <div className="w-[470px] bg-[#F5E3C1] opacity-90 rounded-lg p-8 shadow-lg">
                    <div className="text-center mb-8">
                        <h2 className="text-4xl font-pathway font-extrabold text-black mb-2">Reset Password</h2>
                        <p className="text-gray-600 font-abel">Enter your email to receive reset instructions</p>
                    </div>

                    {error && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                            <span>{error}</span>
                        </div>
                    )}

                    {success && (
                        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
                            <span>{success}</span>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="w-full border-b-2 border-[#B24F4F] py-2 text-xl font-abel bg-transparent focus:outline-none focus:border-[#9e3d3d]"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-[#B24F4F] text-white py-3 rounded-lg text-xl font-abel hover:bg-[#9e3d3d] transition duration-300 disabled:opacity-50"
                        >
                            {loading ? "Sending..." : "Send Reset Link"}
                        </button>
                        <button
                            type="button"
                            onClick={() => navigate("/loginpage")}
                            className="w-full text-[#B24F4F] py-2 rounded-lg text-lg font-abel hover:text-[#9e3d3d] transition duration-300"
                        >
                            Back to Login
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword; 