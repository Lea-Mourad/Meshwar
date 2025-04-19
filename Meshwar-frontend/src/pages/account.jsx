import React, { useState, useEffect } from "react";
import Header from "../components/header";
import { useAuth } from "../context/authContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Accountpage = () => {
  const [email, setEmail] = useState("");
  const [oldEmail, setOldEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [activeSection, setActiveSection] = useState("settings");
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { isAuthenticated, logout } = useAuth();
  const API_BASE = "https://meshwar-backend.onrender.com";
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/loginpage");
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  const fetchCurrentUser = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      console.error("No auth token found!");
      return;
    }

    try {
      const response = await axios.get(`${API_BASE}/auth/me/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOldEmail(response.data.email);
    } catch (err) {
      console.error("Error fetching user data:", err);
      setError("Failed to load user data.");
    }
  };

  const handleEmailChange = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const token = localStorage.getItem("authToken");
    if (!token) {
      setError("Authentication token is missing!");
      return;
    }

    try {
      const response = await axios.post(
        `${API_BASE}/auth/change-email/`,
        { new_email: email },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setSuccess("Verification email sent to your new address.");
      setEmail("");
      navigate("/verify-email-change");
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message || "Failed to change email. Please try again.");
      } else {
        setError("Network error. Please check your connection and try again.");
      }
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (newPassword !== confirmPassword) {
      setError("New passwords do not match!");
      return;
    }

    const token = localStorage.getItem("authToken");
    if (!token) {
      setError("Authentication token is missing!");
      return;
    }

    try {
      const response = await axios.post(
        `${API_BASE}/auth/change-password/`,
        {
          current_password: currentPassword,
          new_password: newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setSuccess("Password changed successfully!");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message || "Failed to change password. Please try again.");
      } else {
        setError("Network error. Please check your connection and try again.");
      }
    }
  };

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

  const handleDeleteAccount = async () => {
    const token = localStorage.getItem("authToken");

    if (!token) {
      setError("Authentication token is missing!");
      return;
    }

    try {
      await axios.delete(`${API_BASE}/auth/delete-account/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      logout();
      navigate("/loginpage");
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message || "Failed to delete account. Please try again.");
      } else {
        setError("Network error. Please check your connection and try again.");
      }
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
              className={`mb-4 cursor-pointer p-2 rounded ${activeSection === "settings" ? 'bg-[#B24F4F]' : 'hover:bg-[#B24F4F]'} transition`}
              onClick={() => setActiveSection("settings")}
            >
              Change Email
            </li>
            <li
              className={`mb-4 cursor-pointer p-2 rounded ${activeSection === "password" ? 'bg-[#B24F4F]' : 'hover:bg-[#B24F4F]'} transition`}
              onClick={() => setActiveSection("password")}
            >
              Change Password
            </li>
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

        <div className="w-full md:w-3/4 p-6 bg-white bg-opacity-90 shadow-md rounded-lg ml-auto flex flex-col flex-grow space-y-4">
          {error && <div className="p-4 mb-4 text-red-700 bg-red-100 rounded">{error}</div>}
          {success && <div className="p-4 mb-4 text-green-700 bg-green-100 rounded">{success}</div>}

          {activeSection === "settings" && (
            <>
              <h2 className="text-xl font-bold mb-4">Change Email</h2>
              <div className="mb-4">
                <p><strong>Current Email:</strong> {oldEmail}</p>
              </div>
              <form onSubmit={handleEmailChange} className="flex flex-col space-y-4">
                <label className="block mb-2">New Email:</label>
                <input
                  type="email"
                  className="w-full p-2 border rounded mb-4"
                  placeholder="Enter new email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button
                  type="submit"
                  className="mt-4 p-2 w-full bg-[#984949] text-white rounded hover:bg-[#B24F4F] transition"
                >
                  Change Email
                </button>
              </form>
            </>
          )}

          {activeSection === "password" && (
            <>
              <h2 className="text-xl font-bold mb-4">Change Password</h2>
              <form onSubmit={handlePasswordChange} className="flex flex-col space-y-4">
                <label className="block mb-2">Current Password:</label>
                <input
                  type="password"
                  className="w-full p-2 border rounded mb-4"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  required
                />
                <label className="block mb-2">New Password:</label>
                <input
                  type="password"
                  className="w-full p-2 border rounded mb-4"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
                <label className="block mb-2">Confirm New Password:</label>
                <input
                  type="password"
                  className="w-full p-2 border rounded mb-4"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                <button
                  type="submit"
                  className="mt-4 p-2 w-full bg-[#984949] text-white rounded hover:bg-[#B24F4F] transition"
                >
                  Change Password
                </button>
              </form>
            </>
          )}

          <div className="mt-8">
            <button
              className="py-4 px-8 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition text-sm"
              onClick={() => setShowDeletePopup(true)}
            >
              Delete Account
            </button>
          </div>
        </div>
      </div>

      {/* Logout Confirmation Popup */}
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

      {/* Delete Account Popup */}
      {showDeletePopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-lg font-bold mb-4">Are you sure you want to delete your account?</h3>
            <p className="mb-4 text-sm text-gray-600">
              Deleting your account will remove your history, recommendations, and favorites. This action is irreversible.
            </p>
            <div className="flex justify-around">
              <button
                className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
                onClick={handleDeleteAccount}
              >
                Yes
              </button>
              <button
                className="px-4 py-2 bg-gray-300 text-white rounded-md hover:bg-gray-500"
                onClick={() => setShowDeletePopup(false)}
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
