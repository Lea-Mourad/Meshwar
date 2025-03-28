// src/components/EventsManagement.jsx
import React, { useState } from "react";

const EventsManagement = ({ onAddEvent }) => {
    const [name, setName] = useState("");
    const [image, setImage] = useState("");
    const [category, setCategory] = useState("Music");
    const [date, setDate] = useState("");
    const [location, setLocation] = useState("");
    const [description, setDescription] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        const newEvent = {
            id: Date.now(),
            name,
            image,
            category,
            date,
            location,
            description,
            ticketLink: "#",
        };

        onAddEvent(newEvent);

        setName("");
        setImage("");
        setCategory("Music");
        setDate("");
        setLocation("");
        setDescription("");
    };

    return (
        <div className="p-8 bg-white rounded-lg shadow-md">
            <h2 className="text-3xl font-bold mb-6 text-[#984949]">Add New Event</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    placeholder="Event Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-3 border rounded"
                    required
                />
                <input
                    type="text"
                    placeholder="Image URL"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    className="w-full p-3 border rounded"
                    required
                />
                <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full p-3 border rounded"
                    required
                />
                <input
                    type="text"
                    placeholder="Location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full p-3 border rounded"
                    required
                />
                <textarea
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full p-3 border rounded"
                    required
                />
                <button
                    type="submit"
                    className="w-full bg-[#984949] text-white py-2 rounded-lg hover:bg-[#7c3b3b] transition"
                >
                    Add Event
                </button>
            </form>
        </div>
    );
};

export default EventsManagement;
