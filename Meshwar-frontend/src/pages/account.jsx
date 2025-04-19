import React, { useState, useEffect } from "react";
import Header from "../components/header";
import { useAuth } from "../context/authContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Accountpage = () => {
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);
  const { isAuthenticated, logout } = useAuth();
  const API_BASE = "https://meshwar-backend.onrender.com";
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/loginpage");
    }
  }, [isAuthenticated, navigate]);

  const handleLogout = async () => {
    const token = localStorage.getItem("authToken");
    const refresh_token = localStorage.getItem("refreshToken");

    if (!refresh_token) {
      logout();
      navigate("/loginpage");
      return;
    }

    try {
      await axios.post(
        `${API_BASE}/auth/logout/`,
        { refresh: refresh_token },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      logout();
      navigate("/loginpage");
    } catch (error) {
      console.error("Logout error:", error);
      logout();
      navigate("/loginpage");
    }
  };

  return (
    <div className="relative min-h-screen bg-[url('https://www.lebanontours.co/uploads/1/0/3/7/10373098/arches-pigeon-rocks-beirut_orig.jpg')] bg-cover bg-center">
      <Header />

      <div className="flex flex-col md:flex-row min-h-screen z-10 pt-20">
        <div className="w-full md:w-1/4 bg-[#984949] p-6 text-white">
          <h2 className="text-3xl font-bold mb-6">Account</h2>
          <ul>
            <li
              className="mb-4 cursor-pointer p-2 rounded hover:bg-[#B24F4F] transition"
              onClick={() => navigate("/favorites")}
            >
              Favorites
            </li>
            <li
              className="mb-4 cursor-pointer p-2 rounded hover:bg-[#B24F4F] transition"
              onClick={() => setShowLogoutPopup(true)}
            >
              Logout
            </li>
          </ul>
        </div>

        <div className="w-full md:w-3/4 p-6 bg-white bg-opacity-90 shadow-md rounded-lg ml-auto flex flex-col flex-grow items-center justify-center">
          <div className="text-center">
            <h2 className="text-4xl font-semibold mb-4" style={{ fontFamily: 'serif', color: '#984949' }}>
              Welcome to Your Account
            </h2>
            <p className="text-lg" style={{ fontFamily: 'serif', color: '#6A3434' }}>
              Manage your favorites and explore the beautiful cities in Lebeanon.
            </p>
            <div className="mt-8 text-sm" style={{ fontFamily: 'serif', color: '#6A3434' }}>
              Thank you for being a part of the Meshwar community!
            </div>
          </div>
        </div>
      </div>

      {showLogoutPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-lg font-bold mb-4">Are you sure you want to logout?</h3>
            <div className="flex justify-around">
              <button
                className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
                onClick={handleLogout}
              >
                Yes
              </button>
              <button
                className="px-4 py-2 bg-gray-300 text-white rounded-md hover:bg-gray-500"
                onClick={() => setShowLogoutPopup(false)}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Accountpage;
