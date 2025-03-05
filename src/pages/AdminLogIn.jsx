// AdminLogin.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        // Example admin credentials (replace with secure authentication in production)
        const adminEmail = 'admin@example.com';
        const adminPassword = 'admin123';

        if (email === adminEmail && password === adminPassword) {
            localStorage.setItem('isAdmin', 'true'); // Storing admin authentication
            navigate('/admin-dashboard'); // Redirect to admin dashboard
        } else {
            setError('Invalid email or password');
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-[url('https://www.lebanontours.co/uploads/1/0/3/7/10373098/arches-pigeon-rocks-beirut_orig.jpg')] bg-cover bg-center relative">
            <div className="absolute inset-0 bg-gradient-to-br from-[#984949] to-[#F5E3C1] opacity-70"></div>

            <form
                onSubmit={handleSubmit}
                className="relative z-10 p-10 bg-white bg-opacity-90 rounded-2xl shadow-xl max-w-sm w-full"
            >
                <h2 className="text-4xl font-bold font-pathway text-[#984949] mb-6 text-center">
                    Admin Login
                </h2>

                {error && (
                    <p className="text-red-500 mb-4 p-2 bg-red-100 border border-red-300 rounded">
                        {error}
                    </p>
                )}

                <div className="mb-6">
                    <label
                        className="block mb-2 text-lg font-abel text-[#984949]"
                        htmlFor="email"
                    >
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="border border-[#984949] w-full p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#984949] bg-transparent font-abel text-lg"
                        required
                    />
                </div>

                <div className="mb-6">
                    <label
                        className="block mb-2 text-lg font-abel text-[#984949]"
                        htmlFor="password"
                    >
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="border border-[#984949] w-full p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#984949] bg-transparent font-abel text-lg"
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-[#984949] text-white py-3 rounded-lg font-abel text-xl hover:bg-[#B24F4F] transition transform hover:scale-105 shadow-md"
                >
                    Login
                </button>
            </form>
        </div>
    );
};

export default AdminLogin;
