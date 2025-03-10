import React, { useState } from 'react';

function ForgotPasswordPage() {
    const [email, setEmail] = useState("");

    const handleChange = (e) => {
        setEmail(e.target.value);
    };

    const handleSubmit = () => {
        alert(`Password reset link sent to: ${email}`);
    };

    return (
        
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            {}
            <div className="max-w-xl  min-h-[400px] w-full p-8 bg-white rounded-lg shadow-md">
                <h1 className="text-2xl font-bold mb-6 text-center">Forgot Password</h1>
                <p className="text-gray-600 mb-6 text-center">Please enter your email to reset the password</p>
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
                    />
                </div>
                <button
                    onClick={handleSubmit}
                    className="w-full py-3 px-6 bg-[#984942] text-white font-bold rounded-lg hover:bg-[#984949] focus:outline-none focus:ring-2 focus:ring-[#984949]"
                >
                    Reset Password
                </button>
            </div>
        </div>
    );
}

export default ForgotPasswordPage;