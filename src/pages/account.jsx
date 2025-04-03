import React, { useState, useEffect } from "react";
import Header from "../components/header";
import { useAuth } from "../context/authContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Accountpage = () => {
  const [email, setEmail] = useState("");
  const [oldemail,oldEmail] = useState("");
  const [activeSection, setActiveSection] = useState("settings");
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);  // For logout confirmation popup
  const [error, setError] = useState(""); 
  const { isAuthenticated, refreshToken } = useAuth();
  const API_BASE = "http://127.0.0.1:8000";
  const changeEmailURL = `${API_BASE}/auth/change-email/`;
  const logoutURL = `${API_BASE}/auth/logout/`;
  const deleteAccountURL = `${API_BASE}/auth/delete-account/`;
  const resetPasswordPage = "/forgot-password";  // Link to reset password page
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/loginpage");
    }
  }, [isAuthenticated, navigate]);

  const handleSave = async (e) => {
    e.preventDefault();
    setError("");

    const token = localStorage.getItem("authToken");
    if (!token) {
      console.error("Authentication token is missing!");
      navigate("/loginpage");
      return;
    }

    try {
      const response = await axios.post(changeEmailURL, { new_email: email }, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      console.log("Email change initiated successfully:", response.data);
      setError("Verification email sent to your new address.");
      setEmail("");
      navigate("/verify-email-change");
    } catch (error) {
      console.error("Error during request:", error);
      if (error.response) {
        setError(error.response.data.message || 'Failed to change email. Please try again.');
      } else if (error.request) {
        setError('Network error. Please check your connection and try again.');
      } else {
        setError('An unexpected error occurred.');
      }
    }
  };

    // This function fetches the current user's data from the backend.
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
        oldEmail(response.data.email);
      } catch (err) {
        console.error("Error fetching user data:", err);
        setError("Failed to load user data.");
      }
    };
  
    useEffect(() => {
      fetchCurrentUser();
    }, []);
  const handleLogout = async () => {
    const token = localStorage.getItem("authToken");
    const refresh_token = localStorage.getItem("refreshToken");

    if (!refresh_token) {
      console.log("No refresh token found, logging out.");
      navigate("/loginpage");
      return;
    }

    try {
      const response = await axios.post(logoutURL, { refresh: refresh_token }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Logged out successfully!");
      localStorage.removeItem("authToken");
      localStorage.removeItem("refreshToken");
      navigate("/loginpage");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const handleDeleteAccount = async () => {
    const token = localStorage.getItem("authToken");
  
    if (!token) {
      console.log("No authentication token found for account deletion.");
      navigate("/loginpage");
      return;
    }
  
    try {
      const response = await axios.delete(deleteAccountURL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Account deleted successfully!");
      localStorage.removeItem("authToken");
      navigate("/loginpage");
    } catch (error) {
      console.error("Account deletion error:", error);
      if (error.response) {
        // If the server responds with an error message
        console.log("Server error response:", error.response.data);
        setError(error.response.data.message || 'Failed to delete account. Please try again later.');
      } else if (error.request) {
        // If no response is received from the server
        setError('Network error. Please check your connection and try again.');
      } else {
        setError('An unexpected error occurred during account deletion.');
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
              className="mb-4 cursor-pointer p-2 rounded hover:bg-[#B24F4F] transition"
              onClick={() => navigate("/favorites")}
            >
              Favorites
            </li>
            <li
              className="mb-4 cursor-pointer p-2 rounded hover:bg-[#B24F4F] transition"
              onClick={() => setShowLogoutPopup(true)}  // Show logout confirmation popup
            >
              Logout
            </li>
            <li
              className="mb-4 cursor-pointer p-2 rounded hover:bg-[#B24F4F] transition"
              onClick={() => navigate(resetPasswordPage)} // Navigate to reset password page
            >
              Reset Password
            </li>
          </ul>
        </div>
        <div className="w-full md:w-3/4 p-6 bg-white bg-opacity-90 shadow-md rounded-lg ml-auto flex flex-col flex-grow space-y-4">
          {activeSection === "settings" && (
            <>
              <h2 className="text-xl font-bold mb-4">Account Settings</h2>

              {error && <p className={`mb-4 ${error.startsWith("Verification") ? "text-green-500" : "text-red-500"}`}>{error}</p>}

              <div className="mb-4">
                <p><strong>Current Email:</strong> {oldemail}</p>
              </div>

              <form onSubmit={handleSave} className="flex flex-col space-y-4">
                <label className="block mb-2">Change Email:</label>
                <input
                  type="email"
                  className="w-full p-2 border rounded mb-4"
                  placeholder="Enter new email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button
                  type="submit"
                  className="mt-4 p-2 w-full bg-[#984949] text-white rounded hover:bg-[#B24F4F] transition"
                >
                  Save Changes
                </button>
              </form>
              <div className="mt-8 ">
                <button
                  className="py-4 px-8 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition text-sm"
                  onClick={() => setShowDeletePopup(true)}
                >
                  Delete Account
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Logout Confirmation Popup */}
      {showLogoutPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-lg font-bold mb-4">
              Are you sure you want to logout?
            </h3>
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
            <h3 className="text-lg font-bold mb-4">
              Are you sure you want to delete your account?
            </h3>
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
