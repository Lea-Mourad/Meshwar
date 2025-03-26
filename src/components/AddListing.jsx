import React, { useState } from "react";

const AddListing = () => {
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [category, setCategory] = useState("");
  const [maxPeople, setMaxPeople] = useState("");
  const [cost, setCost] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const cities = ["Beirut", "Batroun", "Byblos", "Sidon", "Baalbek", "Sour"]; // Add more cities if needed
  const categories = ["Historical", "Natural", "Cultural", "Adventure", "Food", "Shopping", "Nightlife", "Other"];

  const handleAddListing = async (e) => {
    e.preventDefault();

    const newListing = {
      name,
      city,
      category,
      max_people: maxPeople,
      cost,
      description,
      picture_url: imageUrl,
    };

    try {
      const response = await fetch("http://127.0.0.1:8000/api/listings/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newListing),
      });

      if (response.ok) {
        setSuccessMessage("Listing added successfully!");
        setName(""); setCity(""); setCategory(""); setMaxPeople(""); setCost(""); setDescription(""); setImageUrl("");
      } else {
        setSuccessMessage("Failed to add listing.");
      }
    } catch (error) {
      console.error("Error adding listing:", error);
      setSuccessMessage("Something went wrong!");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-6">
      <div className="p-6 bg-white shadow-lg rounded-lg max-w-lg w-full">
        <h2 className="text-2xl font-bold text-[#984949] mb-4 text-center">Add New Listing</h2>
        {successMessage && <p className="text-green-600 text-center">{successMessage}</p>}

        <form onSubmit={handleAddListing} className="space-y-4">
          <input type="text" placeholder="Listing Name" value={name} onChange={(e) => setName(e.target.value)} className="w-full p-3 border rounded" required />
          
          <select value={city} onChange={(e) => setCity(e.target.value)} className="w-full p-3 border rounded" required>
            <option value="">Select City</option>
            {cities.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>

          <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full p-3 border rounded" required>
            <option value="">Select Category</option>
            {categories.map((cat) => <option key={cat} value={cat.toUpperCase()}>{cat}</option>)}
          </select>

          <input type="number" placeholder="Max People" value={maxPeople} onChange={(e) => setMaxPeople(e.target.value)} className="w-full p-3 border rounded" required />
          <input type="number" placeholder="Cost" value={cost} onChange={(e) => setCost(e.target.value)} className="w-full p-3 border rounded" required />

          <input type="url" placeholder="Image URL" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} className="w-full p-3 border rounded" required />
          
          <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} className="w-full p-3 border rounded"></textarea>
          
          <button type="submit" className="w-full bg-[#984949] text-white py-3 rounded-lg hover:bg-[#B24F4F] transition">Add Listing</button>
        </form>
      </div>
    </div>
  );
};

export default AddListing;
