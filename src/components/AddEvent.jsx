import React, { useState } from "react";
import { createEvent } from "../services/eventService";
import { useNavigate } from "react-router-dom";

const AddEvent = () => {
  const navigate = useNavigate();
  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventAddress, setEventAddress] = useState("");
  const [eventLocation, setEventLocation] = useState("");
  const [eventCategory, setEventCategory] = useState("");
  const [costRange, setCostRange] = useState("");
  const [eventImage, setEventImage] = useState("");
  const [eventTicketLink, setEventTicketLink] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleAddEvent = async (e) => {
    e.preventDefault();

    if (!eventName || !eventDate || !eventLocation || !eventCategory || !eventImage) {
      setErrorMessage("Please fill in all required fields.");
      return;
    }

    const eventData = {
      name: eventName,
      date: eventDate,
      address: eventAddress,
      location: eventLocation,
      category: eventCategory,
      image: eventImage,
      ticketLink: eventTicketLink,
      cost_range: costRange,
      description: eventDescription,
    };

    try {
      const token = localStorage.getItem("adminToken");
      if (!token) {
        setErrorMessage("You must be logged in as an admin to add events.");
        return;
      }

      await createEvent(eventData, token);
      setSuccessMessage("Event added successfully!");
      setErrorMessage("");

      // Clear input fields
      setEventName("");
      setEventDate("");
      setEventAddress("");
      setEventLocation("");
      setEventCategory("");
      setCostRange("");
      setEventImage("");
      setEventTicketLink("");
      setEventDescription("");

      // Redirect to events page after 2 seconds
      setTimeout(() => {
        navigate("/events");
      }, 2000);

    } catch (error) {
      console.error("Error creating event:", error);
      setErrorMessage("Failed to add event. Please try again.");
      setSuccessMessage("");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-6">
      <div className="p-6 bg-white shadow-lg rounded-lg max-w-lg w-full">
        <h2 className="text-2xl font-bold text-[#984949] mb-4">Add New Event</h2>
        {successMessage && <p className="text-green-600 mb-4">{successMessage}</p>}
        {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}

        <form onSubmit={handleAddEvent} className="space-y-4">
          <input 
            type="text" 
            placeholder="Event Name" 
            value={eventName} 
            onChange={(e) => setEventName(e.target.value)} 
            className="w-full p-3 border rounded" 
            required 
          />
          <input 
            type="date" 
            value={eventDate} 
            onChange={(e) => setEventDate(e.target.value)} 
            className="w-full p-3 border rounded" 
            required 
          />
          <input 
            type="text" 
            placeholder="Location" 
            value={eventLocation} 
            onChange={(e) => setEventLocation(e.target.value)} 
            className="w-full p-3 border rounded" 
            required 
          />
          <input 
            type="text" 
            placeholder="Address" 
            value={eventAddress} 
            onChange={(e) => setEventAddress(e.target.value)} 
            className="w-full p-3 border rounded" 
            required 
          />
          <select 
            value={eventCategory} 
            onChange={(e) => setEventCategory(e.target.value)} 
            className="w-full p-3 border rounded" 
            required
          >
            <option value="">Select Category</option>
            <option value="Music">Music</option>
            <option value="Food">Food</option>
            <option value="Sports">Sports</option>
            <option value="Culture">Culture</option>
          </select>
          <input 
            type="text" 
            placeholder="Cost Range (optional)" 
            value={costRange} 
            onChange={(e) => setCostRange(e.target.value)} 
            className="w-full p-3 border rounded" 
          />
          <input 
            type="url" 
            placeholder="Event Image URL" 
            value={eventImage} 
            onChange={(e) => setEventImage(e.target.value)} 
            className="w-full p-3 border rounded" 
            required 
          />
          <input 
            type="url" 
            placeholder="Ticket Link (optional)" 
            value={eventTicketLink} 
            onChange={(e) => setEventTicketLink(e.target.value)} 
            className="w-full p-3 border rounded" 
          />
          <textarea 
            placeholder="Event Description (optional)" 
            value={eventDescription} 
            onChange={(e) => setEventDescription(e.target.value)} 
            className="w-full p-3 border rounded"
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

export default AddEvent;
