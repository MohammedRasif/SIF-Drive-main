"use client";

import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  FaUser,
  FaShieldAlt,
  FaLanguage,
  FaFileContract,
  FaUserShield,
  FaHandshake,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { MdLocalOffer } from "react-icons/md";
import { Outlet, useLocation, useNavigate } from "react-router";

const SettingsLayout = () => {
  const { t, i18n } = useTranslation();
  const [activeSection, setActiveSection] = useState("Account");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const userType = localStorage.getItem("userType");

  const isRTL = i18n.dir() === "rtl";

  // Set text direction
  useEffect(() => {
    document.dir = isRTL ? "rtl" : "ltr";
  }, [i18n.language]);

  const navigationItems = [
    {
      id: "Account",
      label: t("account"),
      icon: FaUser,
      path: "account",
    },
    {
      id: "Security",
      label: t("security"),
      icon: FaShieldAlt,
      path: "security",
    },
    {
      id: "Language",
      label: t("language"),
      icon: FaLanguage,
      path: "language",
    },
    {
      id: "Terms",
      label: t("terms"),
      icon: FaFileContract,
      path: "terms",
    },
    {
      id: "Privacy",
      label: t("privacy"),
      icon: FaUserShield,
      path: "privacy",
    },
    userType === "admin" && {
      id: "ManageOfferCard",
      label: t("manageOfferCard"),
      icon: MdLocalOffer,
      path: "manage-offer-card",
    },
  ].filter(Boolean);

  const handleSectionChange = (item) => {
    setActiveSection(item.id);
    setIsSidebarOpen(false);
    navigate(item.path);
  };

  return (
    <div className="flex h-full bg-gray-100">
      {/* Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className="h-full" style={{ backgroundColor: "#dbdeef" }}>
        <div
          className={`
          fixed lg:relative 
          ${isSidebarOpen
              ? "translate-x-0"
              : isRTL
                ? "translate-x-full"
                : "-translate-x-full"
            }
          ${isRTL ? "right-0" : "left-0"}
          lg:translate-x-0 transition-transform duration-300 ease-in-out 
          z-50 lg:z-0 w-64 h-fit py-10 flex flex-col
        `}
          style={{ backgroundColor: "#dbdeef" }}
        >
          {/* Close button (mobile) */}
          <div className="lg:hidden flex justify-end p-4">
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="text-gray-700 hover:text-gray-900 transition-colors"
            >
              <FaTimes className="w-6 h-6" />
            </button>
          </div>

          {/* Nav Items */}
          <nav className="flex-1 px-4 pb-4" >
            <div className="space-y-2">
              {navigationItems.map((item) => {
                const IconComponent = item.icon;
                const isActive = location.pathname.includes(item.path);

                return (
                  <button
                    key={item.id}
                    onClick={() => handleSectionChange(item)}
                    className={`
                    w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors
                    ${isActive
                        ? "bg-gradient-to-r from-[#071352] to-[#0023CF] text-white shadow-md"
                        : "text-[#1E1E1E] hover:bg-[#abb2d4] hover:bg-opacity-20"
                      }
                  `}
                  >
                    <IconComponent className="w-5 h-5 flex-shrink-0" />
                    <span className="font-medium text-sm">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile Header */}
        <div className="lg:hidden bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="text-gray-600 hover:text-gray-900 transition-colors"
          >
            <FaBars className="w-6 h-6" />
          </button>
          <h1 className="font-semibold text-gray-900">
            {t(activeSection.toLowerCase())}
          </h1>
          <div className="w-6"></div> {/* Spacer */}
        </div>

        {/* Outlet */}
        <div className="flex-1 overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default SettingsLayout;
