import React, { useState, useEffect } from "react";
import { Link, Route, Routes } from "react-router-dom";
import AddEvent from "../components/AddEvent";
import AddListing from "../components/AddListing";
import Chart from "react-apexcharts";

const AdminDashboard = () => {
  // Dummy Data for Statistics
  const [totalListings, setTotalListings] = useState(25);
  const [totalEvents, setTotalEvents] = useState(10);
  const [popularCategories, setPopularCategories] = useState([
    { category: "Food", count: 8 },
    { category: "Beaches", count: 6 },
    { category: "Historical", count: 5 },
    { category: "Nightlife", count: 4 },
    { category: "Cultural", count: 2 },
  ]);
  const [listingsPerCity, setListingsPerCity] = useState([
    { city: "Beirut", count: 12 },
    { city: "Batroun", count: 5 },
    { city: "Byblos", count: 3 },
    { city: "Sidon", count: 2 },
    { city: "Baalbek", count: 3 },
  ]);

  // Dummy Data for Recent Listings Table
  const recentListings = [
    { id: 1, name: "Zaitunay Bay", city: "Beirut", category: "Beaches", date: "2025-03-15" },
    { id: 2, name: "Pierre & Friends", city: "Batroun", category: "Nightlife", date: "2025-03-10" },
    { id: 3, name: "Byblos Citadel", city: "Byblos", category: "Historical", date: "2025-03-05" },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-[#984949] text-white p-5 space-y-4">
        <h2 className="text-xl font-bold">Admin Dashboard</h2>
        <ul className="space-y-2">
          <li className="cursor-pointer p-2 rounded hover:bg-[#B24F4F]">
            <Link to="/admin/add-event">Add Event</Link>
          </li>
          <li className="cursor-pointer p-2 rounded hover:bg-[#B24F4F]">
            <Link to="/admin/add-listing">Add Listing</Link>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-10">
        <h1 className="text-4xl font-bold text-[#984949] mb-6">Dashboard Overview</h1>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold">Total Listings</h2>
            <p className="text-4xl font-bold">{totalListings}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold">Total Events</h2>
            <p className="text-4xl font-bold">{totalEvents}</p>
          </div>
        </div>

        {/* Popular Categories Pie Chart */}
        <div className="bg-white mt-10 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Most Popular Categories</h2>
          <Chart
            options={{
              labels: popularCategories.map((cat) => cat.category),
            }}
            series={popularCategories.map((cat) => cat.count)}
            type="pie"
            width="400"
          />
        </div>

        {/* Listings Per City Bar Chart */}
        <div className="bg-white mt-10 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Listings Per City</h2>
          <Chart
            options={{
              chart: { id: "listings-per-city" },
              xaxis: {
                categories: listingsPerCity.map((city) => city.city),
              },
            }}
            series={[
              {
                name: "Listings",
                data: listingsPerCity.map((city) => city.count),
              },
            ]}
            type="bar"
            height="300"
          />
        </div>

        {/* Recent Listings Table */}
        <div className="bg-white mt-10 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Recent Listings</h2>
          <table className="w-full border-collapse border border-gray-200">
            <thead>
              <tr className="bg-[#984949] text-white">
                <th className="p-3 border">Name</th>
                <th className="p-3 border">City</th>
                <th className="p-3 border">Category</th>
                <th className="p-3 border">Date</th>
              </tr>
            </thead>
            <tbody>
              {recentListings.map((listing) => (
                <tr key={listing.id} className="text-center">
                  <td className="p-3 border">{listing.name}</td>
                  <td className="p-3 border">{listing.city}</td>
                  <td className="p-3 border">{listing.category}</td>
                  <td className="p-3 border">{listing.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Routes for Adding Events & Listings */}
        <Routes>
          <Route path="add-event" element={<AddEvent />} />
          <Route path="add-listing" element={<AddListing />} />
        </Routes>
      </div>
    </div>
  );
};

export default AdminDashboard;
