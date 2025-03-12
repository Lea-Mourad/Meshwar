import React, { useState } from "react";

const AdminDashboard = () => {
  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventLocation, setEventLocation] = useState("");
  const [eventCategory, setEventCategory] = useState("");
  const [eventImage, setEventImage] = useState("");
  const [eventTicketLink, setEventTicketLink] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleAddEvent = (e) => {
    e.preventDefault();

    if (!eventName || !eventDate || !eventLocation || !eventCategory || !eventImage) {
      alert("Please fill in all required fields.");
      return;
    }

    const newEvent = {
      id: Date.now(),
      name: eventName,
      date: eventDate,
      location: eventLocation,
      category: eventCategory,
      image: eventImage,
      ticketLink: eventTicketLink,
      description: eventDescription,
    };

    // Retrieve existing events or create new storage
    const storedEvents = JSON.parse(localStorage.getItem("events")) || [];
    localStorage.setItem("events", JSON.stringify([...storedEvents, newEvent]));

    setSuccessMessage("Event added successfully!");

    // Clear input fields
    setEventName("");
    setEventDate("");
    setEventLocation("");
    setEventCategory("");
    setEventImage("");
    setEventTicketLink("");
    setEventDescription("");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[url('https://www.lebanontours.co/uploads/1/0/3/7/10373098/arches-pigeon-rocks-beirut_orig.jpg')] bg-cover bg-center relative">
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#984949] to-[#F5E3C1] opacity-70"></div>

      {/* Admin Form */}
      <div className="relative z-10 p-10 bg-white bg-opacity-90 rounded-2xl shadow-xl max-w-lg w-full">
        <h2 className="text-3xl font-bold text-[#984949] mb-6 text-center">Add New Event</h2>
        {successMessage && <p className="text-green-600 mb-4">{successMessage}</p>}

        <form onSubmit={handleAddEvent} className="space-y-4">
          <input
            type="text"
            placeholder="Event Name"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded"
            required
          />
          <input
            type="date"
            value={eventDate}
            onChange={(e) => setEventDate(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded"
            required
          />
          <input
            type="text"
            placeholder="Location"
            value={eventLocation}
            onChange={(e) => setEventLocation(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded"
            required
          />
          <select
            value={eventCategory}
            onChange={(e) => setEventCategory(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded"
            required
          >
            <option value="">Select Category</option>
            <option value="Music">Music</option>
            <option value="Food">Food</option>
            <option value="Sports">Sports</option>
            <option value="Culture">Culture</option>
          </select>
          <input
            type="url"
            placeholder="Event Image URL"
            value={eventImage}
            onChange={(e) => setEventImage(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded"
            required
          />
          <input
            type="url"
            placeholder="Ticket Link (optional)"
            value={eventTicketLink}
            onChange={(e) => setEventTicketLink(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded"
          />
          <textarea
            placeholder="Event Description (optional)"
            value={eventDescription}
            onChange={(e) => setEventDescription(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded"
          ></textarea>
          <button
            type="submit"
            className="w-full bg-[#984949] text-white py-3 rounded-lg hover:bg-[#B24F4F] transition"
          >
            Add Event
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminDashboard;
