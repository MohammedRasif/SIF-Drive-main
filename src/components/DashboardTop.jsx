import { useState, useRef, useEffect } from "react";
import { Bell, User } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useShowProfileInformationQuery } from "../redux/features/withAuth";

const notifications = [
  {
    id: 1,
    message: "You have received $500 from John Doe",
    timestamp: "15 mins ago",
    type: "payment",
  },
  {
    id: 2,
    message: "New Rental Company Request",
    timestamp: "10 mins ago",
    type: "request",
  },
  {
    id: 3,
    message: "New Rental Company Request",
    timestamp: "5 mins ago",
    type: "request",
  },
  // ...
];

export default function DashboardTop() {
  const { t } = useTranslation();
  const [showNotifications, setShowNotifications] = useState(false);
  const bellRef = useRef(null);
  const { data: profileData, isLoading } = useShowProfileInformationQuery();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (bellRef.current && !bellRef.current.contains(e.target)) {
        setShowNotifications(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="bg-[#E8E9F3] px-5 md:px-10 lg:px-20 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative pt-16 md:pt-5 h-auto">
      {/* Welcome Text */}
      <div>
        <h1 className="text-xl sm:text-2xl font-semibold text-[#0B2088] mb-1">
          {t("dashboardTop.welcome", { name: "Caringcompany" })}
        </h1>
        <p className="text-[#5C5C5C] text-sm">{t("dashboardTop.greeting")}</p>
      </div>

      {/* Notification & User Info */}
      <div className="flex items-center gap-4 w-full sm:w-auto justify-between flex-row-reverse md:flex-row sm:justify-end">
        {/* Notification Bell */}
        <div className="relative" ref={bellRef}>
          <button
            className="bg-[#DBDEEF] p-2 rounded-full hover:cursor-pointer"
            onClick={() => setShowNotifications((prev) => !prev)}
          >
            <Bell className="w-5 h-5 text-[#0B2088]" />
          </button>
          <div className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-[#0B2088] rounded-full text-white text-xs text-center leading-4">
            {notifications.length > 9 ? "9+" : notifications.length}
          </div>

          {/* Notification Dropdown */}
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-72 sm:w-80 bg-white shadow-lg rounded-lg z-50">
              <div className="px-4 py-3 border-b">
                <h1 className="text-lg font-semibold text-gray-900 mb-2">
                  {t("dashboardTop.notifications")}
                </h1>
                <button className="bg-[#0B2088] text-white px-3 py-1 rounded text-sm font-medium flex items-center gap-1">
                  {t("dashboardTop.all")}
                  <span className="bg-white text-[#0B2088] rounded-full w-5 h-5 flex items-center justify-center text-xs font-semibold">
                    {notifications.length}
                  </span>
                </button>
              </div>

              <div className="divide-y max-h-64 overflow-y-auto">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className="flex items-start gap-3 px-4 py-3 hover:bg-gray-50 hover:cursor-pointer transition-colors"
                  >
                    <div className="mt-1">
                      <Bell className="w-5 h-5 text-gray-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-900 leading-relaxed">
                        {notification.message}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {notification.timestamp}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        
        <div className="flex items-center gap-3">
          {profileData?.profile_image ? (
            <img
              src={profileData.profile_image}
              alt={userName}
              className="w-10 h-10 rounded-full object-cover"
              onError={(e) => (e.target.style.display = "none")}
            />
          ) : (
            <div className="bg-[#DBDEEF] p-2 rounded-full">
              <User className="w-5 h-5 text-[#0B2088]" />
            </div>
          )}

          <div className="text-sm">
            <p className="text-[#0B2088] font-medium">
              {profileData?.company_name}
            </p>
            <p className="text-[#5C5C5C] text-xs">{t("dashboardTop.admin")}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
