import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import AddEvent from "../components/AddEvent";
import ViewEvents from "../components/ViewEvents";

const AdminDashboard = () => {
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
            <Link to="/admin/view-events">View Events</Link>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-10">
        <Routes>
          <Route path="add-event" element={<AddEvent />} />
          <Route path="view-events" element={<ViewEvents />} />
        </Routes>
      </div>
    </div>
  );
};

export default AdminDashboard;
