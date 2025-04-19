import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminLogin = ({ setIsAdmin }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Login form submitted");
        setError("");
        setLoading(true);
        console.log("Submitting login request...");  
    console.log("Email:", email);  
    console.log("Password:", password);

        try {

            const response = await fetch("https://meshwar-backend.onrender.com/auth/admin-login/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();
            console.log("Response received:", data); 

            if (response.ok) {
                localStorage.setItem("adminToken", data.access);  // Save auth token
                localStorage.setItem("isAdmin", "true");         // Mark admin status
                setIsAdmin(true);  // Update the state in the App component
                navigate("/admin-dashboard");  // Redirect to the dashboard
            } else {
                setError(data.message || "Invalid email or password");  // Show error from API
            }
        } catch (error) {
            console.error("Fetch error:", error);
            setError("An error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-[url('https://www.lebanontours.co/uploads/1/0/3/7/10373098/arches-pigeon-rocks-beirut_orig.jpg')] bg-cover bg-center relative">
            <div className="absolute inset-0 bg-gradient-to-br from-[#984949] to-[#F5E3C1] opacity-70"></div>

            <form
                onSubmit={handleSubmit}
                className="relative z-10 p-10 bg-white bg-opacity-90 rounded-2xl shadow-xl max-w-sm w-full"
            >
                <h2 className="text-4xl font-bold text-[#984949] mb-6 text-center">Admin Login</h2>

                {error && (
                    <p className="text-red-500 mb-4 p-2 bg-red-100 border border-red-300 rounded">
                        {error}
                    </p>
                )}

                <div className="mb-6">
                    <label className="block mb-2 text-lg text-[#984949]" htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="border border-[#984949] w-full p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#984949] bg-transparent text-lg"
                        required
                    />
                </div>

                <div className="mb-6">
                    <label className="block mb-2 text-lg text-[#984949]" htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="border border-[#984949] w-full p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#984949] bg-transparent text-lg"
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-[#984949] text-white py-3 rounded-lg text-xl hover:bg-[#B24F4F] transition transform hover:scale-105 shadow-md flex justify-center"
                    disabled={loading}
                >
                    {loading ? "Logging in..." : "Login"}
                </button>
            </form>
        </div>
    );
};

export default AdminLogin;
