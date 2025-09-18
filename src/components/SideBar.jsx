import React, { useState } from "react";
import { Link, useLocation } from "react-router";
import {
  FaMoneyBillWave,
  FaSignOutAlt,
  FaCarAlt,
  FaCarSide,
  FaCrown,
} from "react-icons/fa";
import { RiLayout3Fill, RiMessage2Fill } from "react-icons/ri";
import { HiUsers } from "react-icons/hi";
import { BsBellFill } from "react-icons/bs";
import { AiFillFileText } from "react-icons/ai";
import { IoSettingsSharp } from "react-icons/io5";
import { X } from "lucide-react";
import LogoutModal from "../shared/Logout";
import Modal from "../shared/Modal";
import { useTranslation } from "react-i18next";

function SideBar({ setSidebarOpen }) {
  const { t } = useTranslation();
  const location = useLocation();
  const [isLogoutActive, setIsLogOutActive] = useState(false);

  const menuItems = [
    {
      title: t("admin.sidebar.dashboard"),
      url: "/dashboard",
      icon: RiLayout3Fill,
    },
    {
      title: t("admin.sidebar.earnings"),
      url: "/dashboard/earnings",
      icon: FaMoneyBillWave,
    },
    {
      title: t("admin.sidebar.users"),
      url: "/dashboard/users",
      icon: HiUsers,
    },
    {
      title: t("admin.sidebar.drivers"),
      url: "/dashboard/drivers",
      icon: FaCarAlt,
    },
    {
      title: t("admin.sidebar.rentalCompany"),
      url: "/dashboard/rental-company",
      icon: FaCarSide,
    },
    {
      title: t("admin.sidebar.messages"),
      url: "/dashboard/messages",
      icon: RiMessage2Fill,
    },
    {
      title: t("admin.sidebar.notifications"),
      url: "/dashboard/notifications",
      icon: BsBellFill,
    },
    {
      title: t("admin.sidebar.subscription"),
      url: "/dashboard/subscription",
      icon: FaCrown,
    },
    {
      title: t("admin.sidebar.reports"),
      url: "/dashboard/reports",
      icon: AiFillFileText,
    },
    {
      title: t("admin.sidebar.settings"),
      url: "/dashboard/settings/account",
      icon: IoSettingsSharp,
    },
  ];

  const isActive = (url) => {
    // Exact match for dashboard
    if (url === "/dashboard") {
      return location.pathname === url;
    }
    // For settings, check if the pathname starts with /dashboard/settings
    if (url === "/dashboard/settings") {
      return location.pathname.startsWith(url);
    }
    // For other routes, check if the pathname starts with the URL
    return (
      location.pathname.startsWith(url) && location.pathname !== "/dashboard"
    );
  };

  return (
    <div className="h-full w-full bg-gradient-to-b from-blue-50 to-gray-100 text-gray-800 p-4 shadow-lg relative">
      <button
        className="absolute top-4 right-4 z-50 p-2 lg:hidden"
        onClick={() => setSidebarOpen((prev) => !prev)}
      >
        <X size={24} />
      </button>
      <div className="flex flex-col h-full">
        <div>
          <div className="flex items-center mb-10">
            <img src="/logoName.png" alt="Logo" className="h-8" />
          </div>
          <nav className="space-y-3">
            {menuItems.map((item) => (
              <Link
                key={item.url}
                to={item.url}
                className={`flex items-center p-2.5 rounded-lg transition-all duration-200 ${isActive(item.url)
                    ? "bg-gradient-to-r from-[#071352] to-[#0023CF] text-white"
                    : "text-[#1E1E1E] hover:bg-gray-200 hover:text-gray-900"
                  }`}
              >
                <item.icon className="text-xl mx-3" /> {item.title}
              </Link>
            ))}
          </nav>
        </div>
        <div className="mt-auto">
          <button
            onClick={() => setIsLogOutActive(true)}
            className="flex hover:cursor-pointer items-center p-2.5 rounded-lg w-full bg-gradient-to-r from-red-600 to-red-800 text-white hover:from-red-700 hover:to-red-900 transition-all duration-200 mt-6"
          >
            <FaSignOutAlt className="text-xl mx-3" />{" "}
            {t("admin.sidebar.logout")}
          </button>
        </div>
        <Modal isOpen={isLogoutActive} onClose={() => setIsLogOutActive(false)}>
          <LogoutModal setIsLogOutActive={setIsLogOutActive} />
        </Modal>
      </div>
    </div>
  );
}

export default SideBar;
