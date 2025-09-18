import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router";
import {
  FaCalendarAlt,
  FaCar,
  FaCog,
  FaSignOutAlt,
  FaFileInvoiceDollar,
  FaBell,
  FaHandshake,
} from "react-icons/fa";
import { X } from "lucide-react";
import Modal from "../shared/Modal";
import LogoutModal from "../shared/Logout";
import { RiLayout3Fill, RiMessage2Fill } from "react-icons/ri";
import { BsCalendar2CheckFill } from "react-icons/bs";
import { IoIosPaper } from "react-icons/io";
import { useTranslation } from "react-i18next";
import i18n from "../i18n";

function UserSideBar({ setSidebarOpen }) {
  const { t } = useTranslation();
  const location = useLocation();

  const isActive = (path) => {
    if (path === "/dashboard/settings") {
      return location.pathname.startsWith("/dashboard/settings/");
    }
    if (path === "/dashboard/collaborations") {
      return location.pathname.startsWith("/dashboard/collaborations");
    }
    return location.pathname === path;
  };
  useEffect(() => {
    document.dir = i18n.language === "ar" ? "rtl" : "ltr";
  }, [i18n.language]);
  const [isLogoutActive, setIsLogOutActive] = useState(false);

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
            <Link
              to="/dashboard"
              className={`flex items-center p-2.5 rounded-lg transition-all duration-200 ${isActive("/dashboard")
                  ? "bg-gradient-to-r from-[#071352] to-[#0023CF] text-white"
                  : "text-[#1E1E1E] hover:bg-gray-200 hover:text-gray-900"
                }`}
            >
              <RiLayout3Fill className="text-xl mx-3 " />{" "}
              {t("sidebar.dashboard")}
            </Link>
            <Link
              to="/dashboard/manage-rentals"
              className={`flex items-center p-2.5 rounded-lg transition-all duration-200 ${isActive("/dashboard/manage-rentals")
                  ? "bg-gradient-to-r from-[#071352] to-[#0023CF] text-white"
                  : "text-[#1E1E1E] hover:bg-gray-200 hover:text-gray-900"
                }`}
            >
              <FaCalendarAlt className="text-xl mx-3" />{" "}
              {t("sidebar.manageRentals")}
            </Link>
            <Link
              to="/dashboard/vehicles"
              className={`flex items-center p-2.5 rounded-lg transition-all duration-200 ${isActive("/dashboard/vehicles")
                  ? "bg-gradient-to-r from-[#071352] to-[#0023CF] text-white"
                  : "text-[#1E1E1E] hover:bg-gray-200 hover:text-gray-900"
                }`}
            >
              <FaCar className="text-xl mx-3" /> {t("sidebar.vehicles")}
            </Link>
            <Link
              to="/dashboard/collaborations"
              className={`flex items-center p-2.5 rounded-lg transition-all duration-200 ${isActive("/dashboard/collaborations")
                  ? "bg-gradient-to-r from-[#071352] to-[#0023CF] text-white"
                  : "text-[#1E1E1E] hover:bg-gray-200 hover:text-gray-900"
                }`}
            >
              <FaHandshake className="text-xl mx-3" /> {t("collaborations")}
            </Link>
            <Link
              to="/dashboard/booking-request"
              className={`flex items-center p-2.5 rounded-lg transition-all duration-200 ${isActive("/dashboard/booking-request")
                  ? "bg-gradient-to-r from-[#071352] to-[#0023CF] text-white"
                  : "text-[#1E1E1E] hover:bg-gray-200 hover:text-gray-900"
                }`}
            >
              <BsCalendar2CheckFill className="text-xl mx-3" />{" "}
              {t("sidebar.bookingRequest")}
            </Link>
            <Link
              to="/dashboard/invoice-payment"
              className={`flex items-center p-2.5 rounded-lg transition-all duration-200 ${isActive("/dashboard/invoice-payment")
                  ? "bg-gradient-to-r from-[#071352] to-[#0023CF] text-white"
                  : "text-[#1E1E1E] hover:bg-gray-200 hover:text-gray-900"
                }`}
            >
              <FaFileInvoiceDollar className="text-xl mx-3" />{" "}
              {t("sidebar.invoicePayment")}
            </Link>
            <Link
              to="/dashboard/messages"
              className={`flex items-center p-2.5 rounded-lg transition-all duration-200 ${isActive("/dashboard/messages")
                  ? "bg-gradient-to-r from-[#071352] to-[#0023CF] text-white"
                  : "text-[#1E1E1E] hover:bg-gray-200 hover:text-gray-900"
                }`}
            >
              <RiMessage2Fill className="text-xl mx-3" />{" "}
              {t("sidebar.messages")}
            </Link>
            <Link
              to="/dashboard/notifications"
              className={`flex items-center p-2.5 rounded-lg transition-all duration-200 ${isActive("/dashboard/notifications")
                  ? "bg-gradient-to-r from-[#071352] to-[#0023CF] text-white"
                  : "text-[#1E1E1E] hover:bg-gray-200 hover:text-gray-900"
                }`}
            >
              <FaBell className="text-xl mx-3" /> {t("sidebar.notifications")}
            </Link>
            <Link
              to="/dashboard/settings/account"
              className={`flex items-center p-2.5 rounded-lg transition-all duration-200 ${isActive("/dashboard/settings")
                  ? "bg-gradient-to-r from-[#071352] to-[#0023CF] text-white"
                  : "text-[#1E1E1E] hover:bg-gray-200 hover:text-gray-900"
                }`}
            >
              <FaCog className="text-xl mx-3" /> {t("sidebar.settings")}
            </Link>
            <Link
              to="/dashboard/reports"
              className={`flex items-center p-2.5 rounded-lg transition-all duration-200 ${isActive("/dashboard/reports")
                  ? "bg-gradient-to-r from-[#071352] to-[#0023CF] text-white"
                  : "text-[#1E1E1E] hover:bg-gray-200 hover:text-gray-900"
                }`}
            >
              <IoIosPaper className="text-xl mx-3" /> {t("sidebar.reports")}
            </Link>
          </nav>
        </div>
        <div className="mt-auto">
          <button
            onClick={() => setIsLogOutActive(true)}
            className="flex hover:cursor-pointer items-center p-2.5 rounded-lg w-full text-red-600 duration-200 mt-6"
          >
            <FaSignOutAlt className="text-xl mx-3" /> {t("sidebar.logout")}
          </button>
        </div>
        <Modal isOpen={isLogoutActive} onClose={() => setIsLogOutActive(false)}>
          <LogoutModal setIsLogOutActive={setIsLogOutActive} />
        </Modal>
      </div>
    </div>
  );
}

export default UserSideBar;
