import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaTrash } from "react-icons/fa";

const ManageContent = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("adminToken");
        if (!token) {
          navigate("/admin-login");
          return;
        }

        const [eventsRes, listingsRes] = await Promise.all([
          fetch("https://meshwar-backend.onrender.com/events/", {
            headers: {
              Authorization: `Token ${token}`,
            },
          }),
          fetch("https://meshwar-backend.onrender.com/locations/", {
            headers: {
              Authorization: `Token ${token}`,
            },
          }),
        ]);

        if (!eventsRes.ok || !listingsRes.ok) {
          throw new Error("Failed to fetch data");
        }

        const eventsData = await eventsRes.json();
        const listingsData = await listingsRes.json();

        setEvents(eventsData);
        setListings(listingsData);
        setLoading(false);
      } catch (err) {
        setError("Failed to load data. Please try again later.");
        console.error("Error fetching data:", err);
      }
    };

    fetchData();
  }, [navigate]);

  const handleDeleteEvent = async (eventId) => {
    try {
      const token = localStorage.getItem("adminToken");
      if (!token) {
        navigate("/admin-login");
        return;
      }

      const response = await fetch(`https://meshwar-backend.onrender.com/events/${eventId}/`, {
        method: "DELETE",
        headers: {
          Authorization: `Token ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete event");
      }

      setEvents(events.filter(event => event.id !== eventId));
    } catch (err) {
      setError("Failed to delete event. Please try again later.");
      console.error("Error deleting event:", err);
    }
  };

  const handleDeleteListing = async (listingId) => {
    try {
      const token = localStorage.getItem("adminToken");
      if (!token) {
        navigate("/admin-login");
        return;
      }

      const response = await fetch(`https://meshwar-backend.onrender.com/locations/${listingId}/`, {
        method: "DELETE",
        headers: {
          Authorization: `Token ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete listing");
      }

      setListings(listings.filter(listing => listing.id !== listingId));
    } catch (err) {
      setError("Failed to delete listing. Please try again later.");
      console.error("Error deleting listing:", err);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-2xl text-[#984949]">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-2xl text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-[#984949] mb-8">Manage Content</h2>

      {/* Events Section */}
      <div className="mb-12">
        <h3 className="text-2xl font-semibold mb-4">Events</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <div key={event.id} className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex justify-between items-start">
                <h4 className="text-xl font-bold">{event.name}</h4>
                <button
                  onClick={() => handleDeleteEvent(event.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <FaTrash />
                </button>
              </div>
              <p className="text-gray-600">{event.location}</p>
              <p className="text-gray-600">{new Date(event.date).toDateString()}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Listings Section */}
      <div>
        <h3 className="text-2xl font-semibold mb-4">Listings</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {listings.map((listing) => (
            <div key={listing.id} className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex justify-between items-start">
                <h4 className="text-xl font-bold">{listing.name}</h4>
                <button
                  onClick={() => handleDeleteListing(listing.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <FaTrash />
                </button>
              </div>
              <p className="text-gray-600">{listing.city}</p>
              <p className="text-gray-600">{listing.category}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ManageContent; 