import React, { useState, useEffect } from "react";
import { Link, Route, Routes } from "react-router-dom";
import AddEvent from "../components/AddEvent";
import AddListing from "../components/AddListing";
import Chart from "react-apexcharts";




const AdminDashboard = () => {
  const [totalListings, setTotalListings] = useState(0);
  const [totalEvents, setTotalEvents] = useState(0);
  const [popularCategories, setPopularCategories] = useState([]);
  const [listingsPerCity, setListingsPerCity] = useState([]);
  const [recentListings, setRecentListings] = useState([]);
  useEffect(() => {
    Promise.all([
      fetch("http://localhost:8000/locations/").then(res => res.json()),
      fetch("http://localhost:8000/events/").then(res => res.json())
    ])
    .then(([locationsData, eventsData]) => {
      // Total listings
      setTotalListings(locationsData.length);
  
      // Recent 5 Listings
      setRecentListings(locationsData.slice(0, 5));
  
      // Popular Categories
      const categoryCounts = {};
      locationsData.forEach((item) => {
        categoryCounts[item.category_display] = (categoryCounts[item.category_display] || 0) + 1;
      });
      const popular = Object.entries(categoryCounts).map(([category, count]) => ({
        category,
        count,
      }));
      setPopularCategories(popular);
  
      // Listings per City
      const cityCounts = {};
      locationsData.forEach((item) => {
        cityCounts[item.city_display] = (cityCounts[item.city_display] || 0) + 1;
      });
      const perCity = Object.entries(cityCounts).map(([city, count]) => ({
        city,
        count,
      }));
      setListingsPerCity(perCity);
  
      // Total events
      setTotalEvents(eventsData.length);
    })
    .catch((err) => {
      console.error("Error fetching data:", err);
    });
  }, []);
  

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

