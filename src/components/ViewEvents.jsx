import React, { useState, useEffect } from "react";

const ViewEvents = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const storedEvents = JSON.parse(localStorage.getItem("events")) || [];
    setEvents(storedEvents);
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold text-[#984949] mb-4">View Events</h2>
      {events.length === 0 ? (
        <p>No events available.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {events.map((event) => (
            <div key={event.id} className="border rounded-lg shadow-md p-4 bg-white">
              <img src={event.image} alt={event.name} className="w-full h-40 object-cover rounded-md mb-3" />
              <h3 className="text-xl font-semibold">{event.name}</h3>
              <p className="text-gray-600">{event.date} - {event.location}</p>
              <p className="text-sm text-gray-500">{event.category}</p>
              <p className="text-gray-700 mt-2">{event.description}</p>
              {event.ticketLink && (
                <a href={event.ticketLink} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline mt-2 inline-block">
                  Buy Tickets
                </a>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ViewEvents;
