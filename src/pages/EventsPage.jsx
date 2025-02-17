import React, { useState, useEffect } from "react";

const eventsData = [
  { 
    id: 1, 
    name: "Baalbek International Festival", 
    date: "2025-07-15", 
    location: "Baalbek", 
    category: "Music", 
    image: "https://i.pinimg.com/474x/10/b4/00/10b4009ac2d87bc8c499e4274fa57106.jpg", 
    ticketLink: "https://baalbekfestival.com/",
    description: "Experience the magic of music and history in Baalbek!"
  },
  { 
    id: 2, 
    name: "Batroun Wine Festival", 
    date: "2025-08-20", 
    location: "Batroun", 
    category: "Food", 
    image: "https://i.pinimg.com/736x/47/6b/65/476b6583525ca075ac63837534f4f690.jpg", 
    ticketLink: "#",
    description: "Taste the finest Lebanese wines at the Batroun Wine Festival."
  },
  { 
    id: 3, 
    name: "Beirut Marathon", 
    date: "2025-11-10", 
    location: "Beirut", 
    category: "Sports", 
    image: "https://i.pinimg.com/736x/69/36/66/693666a70acec324ef5a0b2fbe37b521.jpg", 
    ticketLink: "https://www.beirutmarathon.org/registration.php",
    description: "Join thousands of runners in the famous Beirut Marathon!"
  },
  { 
    id: 4, 
    name: "Christmas Market", 
    date: "2025-12-15", 
    location: "Downtown Beirut", 
    category: "Culture", 
    image: "https://i.pinimg.com/474x/00/3e/34/003e3418eb4298d0956b471ddebcd261.jpg", 
    ticketLink: "#",
    description: "Celebrate the festive season at Beirut’s magical Christmas market."
  },
];

const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [filter, setFilter] = useState("All");
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    setEvents(eventsData);
  }, []);

  const filteredEvents = filter === "All" ? events : events.filter(event => event.category === filter);

  return (
    <div className="flex min-h-screen">
      
      {/* Sidebar - Full Height */}
      <aside className="w-1/4 min-h-screen bg-[#984949] text-white p-8 flex flex-col items-center">
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
      <div className="w-3/4 px-12 py-12">
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
            <a href={selectedEvent.ticketLink} target="_blank" rel="noopener noreferrer" className="mt-6 block text-center bg-[#984949] text-white text-2xl px-6 py-3 rounded-lg hover:bg-[#7c3b3b] transition duration-300">
              Book Now
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventsPage;
