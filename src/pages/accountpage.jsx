import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/header";  // Assuming Header is a separate component
const Accountpage = () => {
  const [username, setUsername] = useState("currentUsername");  // Default to the old username
  const [email, setEmail] = useState("currentmail@example.com");  // Default to the old email
  const [personalized, setPersonalized] = useState(false);
  const [password, setPassword] = useState("");  // For the password field
  const [activeSection, setActiveSection] = useState("settings"); // Default section is settings
  const history = [
    "Trip to Byblos - Recommended on Jan 20, 2024",
    "Best hiking spots - Searched on Feb 5, 2024",
    "Top-rated restaurants - Recommended on Feb 15, 2024",
  ];
  
  const navigate = useNavigate();
  const handleSave = (e) => {
    e.preventDefault();
    console.log("Saved", { username, email, personalized, password });
  };
  // Function to handle the sidebar selection click
  const handleSidebarClick = (section) => {
    setActiveSection(section);
  };
  return (
    <div className="relative min-h-screen bg-[url('https://www.lebanontours.co/uploads/1/0/3/7/10373098/arches-pigeon-rocks-beirut_orig.jpg')] bg-cover bg-center">
      {/* Header */}
      <Header />
      {/* Main Content Area */}
      <div className="flex flex-col md:flex-row min-h-screen z-10 pt-20"> {/* Flex container for full height */}
        
        {/* Sidebar */}
        <div className="w-full md:w-1/4 bg-[#984949] p-6 text-white">
          <h2 className="text-3xl font-bold mb-6">Account</h2>
          <ul>
            <li
              className={`mb-4 cursor-pointer p-2 rounded ${activeSection === "settings" ? 'bg-[#B24F4F]' : 'hover:bg-[#B24F4F]'} transition`}
              onClick={() => handleSidebarClick("settings")}
            >
              Settings
            </li>
            <li
              className={`mb-4 cursor-pointer p-2 rounded ${activeSection === "history" ? 'bg-[#B24F4F]' : 'hover:bg-[#B24F4F]'} transition`}
              onClick={() => handleSidebarClick("history")}
            >
              History
            </li>
            <li
              className={`mb-4 cursor-pointer p-2 rounded ${activeSection === "recommendations" ? 'bg-[#B24F4F]' : 'hover:bg-[#B24F4F]'} transition`}
              onClick={() => handleSidebarClick("recommendations")}
            >
              Recommendations
            </li>
            {/* For Favorites, navigate to the Favorites page */}
            <li
              className="mb-4 cursor-pointer p-2 rounded hover:bg-[#B24F4F] transition"
              onClick={() => navigate("/favorites")}
            >
              Favorites
            </li>
          </ul>
        </div>
        {/* Main Content (Account Settings Form) */}
        <div className="w-full md:w-3/4 p-6 bg-white bg-opacity-90 shadow-md rounded-lg ml-auto flex flex-col flex-grow">
          {/* Conditional rendering based on active section */}
          
          {activeSection === "settings" && (
            <>
              <h2 className="text-xl font-bold mb-4">Account Settings</h2>
              
              {/* Display Old Username and Email */}
              <div className="mb-4">
                <p><strong> Current Username:</strong> {username}</p>
                <p><strong>Current Email:</strong> {email}</p>
              </div>
              
              <form onSubmit={handleSave} className="flex flex-col flex-grow space-y-4">
                <label className="block mb-2">Change Username:</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded mb-4"
                  placeholder="Enter new username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <label className="block mb-2">Change Email:</label>
                <input
                  type="email"
                  className="w-full p-2 border rounded mb-4"
                  placeholder="Enter new email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <label className="block mb-2">Change Password:</label>
                <input
                  type="password"
                  className="w-full p-2 border rounded mb-4"
                  placeholder="Enter new password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
                >
                  Save Changes
                </button>
              </form>
            </>
          )}
          {activeSection === "history" && (
            <>
              <h2 className="text-xl font-bold mb-4">History</h2>
              <ul className="list-disc pl-5">
                {history.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </>
          )}
          {activeSection === "recommendations" && (
            <>
              <h2 className="text-xl font-bold mb-4">Recommendations</h2>
              <p className="mb-4">Personalized recommendations for you will be displayed here.</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
export default Accountpage;