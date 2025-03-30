import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/header";
import axios from "axios";

const Accountpage = () => {
  // State variables
  const [email, setEmail] = useState("currentmail@example.com"); // This field will hold the new email address
  const [personalized, setPersonalized] = useState(false);
  const [activeSection, setActiveSection] = useState("settings");
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();
  const API_BASE_URL = "http://127.0.0.1:8000"; // Your local backend URL

  // Basic Auth credentials (replace 'your_password_here' with the actual password)
  const username = "hyd06@mail.aub.edu";
  const password = "your_password_here"; // Ideally, do not hardcode sensitive data in production
  const authHeader = "Basic " + btoa(`${username}:${password}`);

  // Function to handle change email request
  const handleSave = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);
  
    try {
      const response = await axios.patch(
        `${API_BASE_URL}/auth/change-email/`,
        { new_email: email },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: authHeader, // Check if this is correctly set
          },
        }
      );
  
      console.log(response); // Log response for further debugging
  
      if (response.status === 200) {
        setMessage("Verification code sent to your new email!");
        setTimeout(() => {
          navigate("/verify-email-change");
        }, 2000);
      } else {
        setMessage("Failed to send verification email. Try again.");
      }
    } catch (error) {
      console.error("Error updating email:", error);
      setMessage(error.response?.data?.message || "Error updating email. Try again.");
    } finally {
      setLoading(false);
    }
  };
  
  // Sidebar click handler (if needed)
  const handleSidebarClick = (section) => {
    setActiveSection(section);
  };

  return (
    <div className="relative min-h-screen bg-[url('https://www.lebanontours.co/uploads/1/0/3/7/10373098/arches-pigeon-rocks-beirut_orig.jpg')] bg-cover bg-center">
      <Header />
      <div className="flex flex-col md:flex-row min-h-screen z-10 pt-20">
        {/* Sidebar */}
        <div className="w-full md:w-1/4 bg-[#984949] p-6 text-white">
          <h2 className="text-3xl font-bold mb-6">Account</h2>
          <ul>
            <li
              className={`mb-4 cursor-pointer p-2 rounded ${
                activeSection === "settings"
                  ? "bg-[#B24F4F]"
                  : "hover:bg-[#B24F4F]"
              } transition`}
              onClick={() => handleSidebarClick("settings")}
            >
              Settings
            </li>
            <li
              className={`mb-4 cursor-pointer p-2 rounded ${
                activeSection === "history"
                  ? "bg-[#B24F4F]"
                  : "hover:bg-[#B24F4F]"
              } transition`}
              onClick={() => handleSidebarClick("history")}
            >
              History
            </li>
            <li
              className={`mb-4 cursor-pointer p-2 rounded ${
                activeSection === "recommendations"
                  ? "bg-[#B24F4F]"
                  : "hover:bg-[#B24F4F]"
              } transition`}
              onClick={() => handleSidebarClick("recommendations")}
            >
              Recommendations
            </li>
            <li
              className="mb-4 cursor-pointer p-2 rounded hover:bg-[#B24F4F] transition"
              onClick={() => navigate("/favorites")}
            >
              Favorites
            </li>
          </ul>
        </div>

        {/* Main Content */}
        <div className="w-full md:w-3/4 p-6 bg-white bg-opacity-90 shadow-md rounded-lg ml-auto flex flex-col flex-grow space-y-4">
          {activeSection === "settings" && (
            <>
              <h2 className="text-xl font-bold mb-4">Account Settings</h2>
              <div className="mb-4">
                <p>
                  <strong>Current Email:</strong> {email}
                </p>
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
                <h3 className="text-lg font-semibold mt-4">Recommendations</h3>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={personalized}
                    onChange={() => setPersonalized(!personalized)}
                  />
                  Enable Personalized Recommendations
                </label>
                <button
                  type="submit"
                  className="mt-4 p-2 w-full bg-[#984949] text-white rounded hover:bg-[#B24F4F] transition"
                  disabled={loading}
                >
                  {loading ? "Saving..." : "Save Changes"}
                </button>
              </form>
              <div className="mt-8">
                <button
                  className="py-4 px-8 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition text-sm"
                  onClick={() => setShowDeletePopup(true)}
                >
                  Delete Account
                </button>
              </div>
            </>
          )}
          {message && (
            <div
              className={`mt-4 p-4 rounded ${
                message.includes("sent")
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {message}
            </div>
          )}
        </div>
      </div>

      {/* Delete Account Confirmation Popup */}
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
                // Implement handleDeleteAccount similarly with Basic auth if needed
                onClick={() => alert("Delete account functionality here")}
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
