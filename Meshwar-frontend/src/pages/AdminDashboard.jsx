import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaChartBar, FaCalendarAlt, FaMapMarkerAlt, FaPlus } from "react-icons/fa";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import ManageContent from "../components/ManageContent";
import AddEvent from "../components/AddEvent";
import AddListing from "../components/AddListing";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [totalListings, setTotalListings] = useState(0);
  const [totalEvents, setTotalEvents] = useState(0);
  const [popularCategories, setPopularCategories] = useState([]);
  const [recentListings, setRecentListings] = useState([]);
  const [activeTab, setActiveTab] = useState("dashboard");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("adminToken");
        if (!token) {
          navigate("/admin-login");
          return;
        }

        const [listingsRes, eventsRes] = await Promise.all([
          fetch("https://meshwar-backend.onrender.com/locations/", {
            headers: {
              Authorization: `Token ${token}`,
            },
          }),
          fetch("https://meshwar-backend.onrender.com/events/", {
            headers: {
              Authorization: `Token ${token}`,
            },
          }),
        ]);

        if (!listingsRes.ok || !eventsRes.ok) {
          throw new Error("Failed to fetch data");
        }

        const listingsData = await listingsRes.json();
        const eventsData = await eventsRes.json();

        setTotalListings(listingsData.length);
        setTotalEvents(eventsData.length);

        // Calculate popular categories
        const categoryCount = {};
        listingsData.forEach((listing) => {
          categoryCount[listing.category] = (categoryCount[listing.category] || 0) + 1;
        });
        setPopularCategories(
          Object.entries(categoryCount)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5)
        );

        // Get recent listings
        setRecentListings(listingsData.slice(-5));
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin-login");
  };

  const renderContent = () => {
    switch (activeTab) {
      case "manage":
        return <ManageContent />;
      case "add-event":
        return <AddEvent />;
      case "add-listing":
        return <AddListing />;
      default:
        return (
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center">
                  <FaMapMarkerAlt className="text-3xl text-[#984949] mr-4" />
                  <div>
                    <h3 className="text-lg font-semibold">Total Listings</h3>
                    <p className="text-2xl font-bold">{totalListings}</p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center">
                  <FaCalendarAlt className="text-3xl text-[#984949] mr-4" />
                  <div>
                    <h3 className="text-lg font-semibold">Total Events</h3>
                    <p className="text-2xl font-bold">{totalEvents}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-4">Popular Categories</h3>
                <Bar
                  data={{
                    labels: popularCategories.map(([category]) => category),
                    datasets: [
                      {
                        label: "Number of Listings",
                        data: popularCategories.map(([_, count]) => count),
                        backgroundColor: "#984949",
                      },
                    ],
                  }}
                  options={{
                    responsive: true,
                    scales: {
                      y: {
                        beginAtZero: true,
                        ticks: {
                          stepSize: 1,
                        },
                      },
                    },
                  }}
                />
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-[#984949] text-white p-6">
        <h2 className="text-2xl font-bold mb-8">Admin Dashboard</h2>
        <nav>
          <ul className="space-y-4">
            <li>
              <button
                onClick={() => setActiveTab("dashboard")}
                className={`flex items-center w-full p-2 rounded ${
                  activeTab === "dashboard" ? "bg-white text-[#984949]" : "hover:bg-white/20"
                }`}
              >
                <FaChartBar className="mr-2" />
                Dashboard
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab("manage")}
                className={`flex items-center w-full p-2 rounded ${
                  activeTab === "manage" ? "bg-white text-[#984949]" : "hover:bg-white/20"
                }`}
              >
                <FaMapMarkerAlt className="mr-2" />
                Manage Content
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab("add-event")}
                className={`flex items-center w-full p-2 rounded ${
                  activeTab === "add-event" ? "bg-white text-[#984949]" : "hover:bg-white/20"
                }`}
              >
                <FaPlus className="mr-2" />
                Add Event
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab("add-listing")}
                className={`flex items-center w-full p-2 rounded ${
                  activeTab === "add-listing" ? "bg-white text-[#984949]" : "hover:bg-white/20"
                }`}
              >
                <FaPlus className="mr-2" />
                Add Listing
              </button>
            </li>
          </ul>
        </nav>
        <button
          onClick={handleLogout}
          className="mt-8 w-full bg-white text-[#984949] py-2 px-4 rounded hover:bg-gray-100"
        >
          Logout
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {renderContent()}
      </div>
    </div>
  );
};

export default AdminDashboard;

