import React, { useState } from 'react';
import api from '../services/api';

function ForgotPasswordPage() {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setEmail(e.target.value);
    };

    const handleSubmit = async () => {
        if (!email) {
            setError("Please enter your email.");
            return;
        }

        try {
            setLoading(true);
            console.log('Starting password reset request...');
            console.log('API base URL:', api.defaults.baseURL);
            console.log('Request payload:', { email });
            
            const response = await api.post('/auth/password-reset-request/', {
                email,
            });

            console.log('Response received:', response.data);

            if (response.data && response.data.message) {
                setMessage(response.data.message);
                setError(null);
            } else {
                console.warn('Unexpected response format:', response.data);
                setError("Unexpected response from server");
            }
        } catch (err) {
            console.error("Password reset error details:", {
                message: err.message,
                response: err.response?.data,
                status: err.response?.status,
                headers: err.response?.headers,
                config: err.config
            });

            if (err.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                const errorMessage = err.response.data?.email?.[0] || 
                                   err.response.data?.detail || 
                                   err.response.data?.message || 
                                   "Something went wrong. Please try again.";
                setError(errorMessage);
            } else if (err.request) {
                // The request was made but no response was received
                console.error('No response received. Request details:', err.request);
                setError("No response from server. Please check your internet connection.");
            } else {
                // Something happened in setting up the request that triggered an Error
                console.error('Request setup error:', err);
                setError("An error occurred. Please try again.");
            }
            setMessage(null);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="max-w-xl min-h-[400px] w-full p-8 bg-white rounded-lg shadow-md">
                <h1 className="text-2xl font-bold mb-6 text-center">Forgot Password</h1>
                <p className="text-gray-600 mb-6 text-center">Please enter your email to reset the password</p>
                
                {message && (
                    <div className="mb-4 p-4 bg-green-100 text-green-700 rounded-lg text-center">
                        {message}
                    </div>
                )}

                {error && (
                    <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg text-center">
                        {error}
                    </div>
                )}

                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                        Your Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={handleChange}
                        placeholder="Enter your email"
                        className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#984949]"
                        disabled={loading}
                    />
                </div>
                <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className={`w-full py-3 px-6 bg-[#984942] text-white font-bold rounded-lg hover:bg-[#984949] focus:outline-none focus:ring-2 focus:ring-[#984949] ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                    {loading ? 'Sending...' : 'Reset Password'}
                </button>
            </div>
        </div>
    );
}

export default ForgotPasswordPage; 