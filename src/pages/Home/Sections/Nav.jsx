import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useShowProfileInformationQuery } from "../../../redux/features/withAuth";
import { useDispatch } from "react-redux";

function Nav() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data: profileData, isLoading } = useShowProfileInformationQuery();
  const userType = profileData?.user_type ?? "";
  localStorage.setItem("userType", userType);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Outside click handler
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Check if user is logged in
  const isLoggedIn = !!localStorage.getItem("access");

  // Handle Dashboard Navigation
  const handleDashboardNavigation = () => {
    navigate("/dashboard");
    setIsDropdownOpen(false);
  };

  // Handle Logout
  const handleLogout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("userType");
    localStorage.removeItem("refresh");
    setIsDropdownOpen(false);
    navigate("/");
  };

  // Loading state
  if (isLoading && isLoggedIn) {
    return (
      <nav className="flex items-center justify-between px-6 md:px-20 lg:px-40 py-4 bg-white">
        <div className="flex items-center">
          <img
            src="/logoName.png"
            alt="SLF-Drive"
            className="h-10 w-auto object-contain"
          />
        </div>
        <div className="animate-pulse bg-gray-200 rounded-md px-4 py-2">
          Loading...
        </div>
      </nav>
    );
  }

  return (
    <nav className="flex items-center justify-between px-6 md:px-20 lg:px-40 py-4 bg-white">
      <div className="flex items-center">
        <img
          src="/logoName.png"
          alt="SLF-Drive"
          className="h-10 w-auto object-contain"
        />
      </div>

      <div className="relative" ref={dropdownRef}>
        {isLoggedIn && profileData ? (
          // Profile Dropdown for logged-in users
          <>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center space-x-2 px-4 rounded-md transition-colors overflow-hidden cursor-pointer"
            >
              {profileData?.profile_image ? (
                <img
                  src={profileData.profile_image}
                  alt="Profile"
                  className="w-10 h-10 rounded-full object-cover"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
                  <svg
                    className="w-7 h-7 text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
              )}

              <div className="flex-1 min-w-0">
                <span className="text-[18px] font-semibold text-gray-700 truncate">
                  {profileData?.company_name || profileData?.email}
                </span>
              </div>

              <svg
                className={`w-4 h-4 transition-transform ${
                  isDropdownOpen ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-gray-100 rounded-md shadow-lg z-50 border border-gray-200">
                <div className="py-1">
                  <Link
                    to="/dashboard"
                    onClick={handleDashboardNavigation}
                    className="block px-4 py-2 text-[16px] font-semibold text-gray-700 hover:bg-white cursor-pointer"
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-[16px] font-semibold text-red-600 hover:bg-white cursor-pointer"
                  >
                    Logout
                  </button>
                </div>
              </div>
            )}
          </>
        ) : (
          // Login button for non-logged-in users
          <Link
            className="bg-[#0B2088] text-white px-4 py-2 rounded-md text-base font-medium hover:bg-[#0A1B70] transition-colors"
            to="/login"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Nav;