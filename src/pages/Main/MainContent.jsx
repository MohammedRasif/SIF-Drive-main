import React, { useState } from "react";
import SideBar from "../../components/SideBar";
import { Menu, X } from "lucide-react"; // optional icons for a better look
import UserSideBar from "../../components/UserSideBar";
import Dashboard from "./parts/UserParts/Dashboard";
import AdminDashboard from "./parts/Admin/AdminDashboard";
import DashboardTop from "../../components/DashboardTop";
import { Outlet } from "react-router";

function MainContent() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const userType = localStorage.getItem("userType");

  return (
    <div className="flex min-h-screen bg-gray-100 relative overflow-hidden">
      {/* Toggle Button (only on small screens) */}
      {!sidebarOpen && (
        <button
          className="absolute top-4 left-4 z-50 p-2 bg-white rounded-md shadow-md lg:hidden"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <Menu size={24} />
        </button>
      )}
      <aside
        className={`fixed top-0 left-0 h-screen bg-white shadow-lg z-40 transform transition-transform duration-300 
          w-4/5 sm:w-3/5 md:w-64 lg:relative lg:translate-x-0
          ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          }`}
      >
        {userType === "admin" ? (
          <SideBar setSidebarOpen={setSidebarOpen} />
        ) : (
          <UserSideBar setSidebarOpen={setSidebarOpen} />
        )}
      </aside>
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-[#ffffff34] backdrop-blur-xs lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      <div className="flex flex-col w-full h-screen overflow-y-scroll">
        <DashboardTop />
        {/* Main Content */}
        <main className="flex-1  lg:ml-0 transition-all duration-300 md:pt-16 lg:pt-0 bg-[#E8E9F3]">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default MainContent;
