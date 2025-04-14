import React, { useState, useEffect } from "react";
import Header from "../components/header";
import { useLocation } from "react-router-dom";
import { getAllEvents } from "../services/eventService";

const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [filter, setFilter] = useState("All");
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const data = await getAllEvents();
        setEvents(data);
        setError(null);
      } catch (err) {
        setError("Failed to load events. Please try again later.");
        console.error("Error fetching events:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const filteredEvents = filter === "All" ? events : events.filter(event => event.category === filter);

  if (loading) {
    return (
      <div className="flex min-h-screen">
        <Header />
        <div className="w-full flex justify-center items-center">
          <div className="text-2xl text-[#984949]">Loading events...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen">
        <Header />
        <div className="w-full flex justify-center items-center">
          <div className="text-2xl text-red-500">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen">
      <Header />
      {/* Sidebar - Full Height on larger screens, Shorter on smaller screens */}
      <aside className="w-full sm:w-1/4 min-h-screen bg-[#984949] text-white p-8 flex flex-col items-center mt-20">
        {/* Ensure there's enough space for the content */}
        <h3 className="text-3xl font-bold mb-8">Filter by Category</h3>
        <ul className="space-y-4 w-full">
          {["All", "Music", "Food", "Sports", "Culture"].map(category => (
            <li key={category} className="w-full">
              <button 
                onClick={() => setFilter(category)}
                className={`w-full text-left px-6 py-4 rounded-lg text-2xl font-semibold transition duration-300 ${
                  filter === category ? "bg-white text-[#984949]" : "bg-transparent hover:bg-[#7c3b3b]"
                }`}
              >
                {category}
              </button>
            </li>
          ))}
        </ul>
      </aside>

      {/* Events List - Enlarged */}
      <div className="w-full sm:w-3/4 px-12 py-12 mt-20">
        <h2 className="text-5xl font-bold text-center mb-10 text-[#984949]">Upcoming Events & Festivals</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10">
          {filteredEvents.map((event) => (
            <div 
              key={event.id} 
              className="relative bg-white rounded-lg shadow-lg overflow-hidden group cursor-pointer hover:shadow-2xl transition"
              onClick={() => setSelectedEvent(event)}
            >
              <img src={event.image} alt={event.name} className="w-full h-[350px] object-cover" />
              <div className="p-6">
                <h3 className="text-3xl font-bold">{event.name}</h3>
                <p className="text-xl text-gray-600">{event.location} • {new Date(event.date).toDateString()}</p>
              </div>
              {/* Hover Effect */}
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                <p className="text-white font-semibold text-xl">Click for More Info</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Event Popup Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-10 rounded-lg shadow-lg max-w-2xl relative">
            <button onClick={() => setSelectedEvent(null)} className="absolute top-4 right-4 text-gray-600 hover:text-red-500 text-4xl">&times;</button>
            <img src={selectedEvent.image} alt={selectedEvent.name} className="w-full h-72 object-cover rounded-lg" />
            <h3 className="text-4xl font-bold mt-6">{selectedEvent.name}</h3>
            <p className="text-2xl text-gray-600">{selectedEvent.location} • {new Date(selectedEvent.date).toDateString()}</p>
            <p className="text-xl text-gray-700 mt-4">{selectedEvent.description}</p>
            {selectedEvent.ticketLink && (
              <a href={selectedEvent.ticketLink} target="_blank" rel="noopener noreferrer" className="mt-6 block text-center bg-[#984949] text-white text-2xl px-6 py-3 rounded-lg hover:bg-[#7c3b3b] transition duration-300">
                Book Now
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default EventsPage;