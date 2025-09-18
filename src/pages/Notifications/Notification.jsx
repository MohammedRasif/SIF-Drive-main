"use client";

import { Bell } from "lucide-react";
import React from "react";
import { useTranslation } from "react-i18next";

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
  {
    id: 4,
    message: "New Rental Company Request",
    timestamp: "5 mins ago",
    type: "request",
  },
  {
    id: 5,
    message: "New Rental Company Request",
    timestamp: "5 mins ago",
    type: "request",
  },
  {
    id: 6,
    message: "New Rental Company Request",
    timestamp: "5 mins ago",
    type: "request",
  },
];

function Notification() {
  const { t } = useTranslation();

  return (
    <div className="w-full h-full px-5 md:px-20">
      <div className="mt-2 w-full rounded-lg bg-[#DBDEEF]">
        <div className="px-4 py-3 border-b flex items-center justify-between">
          <h1 className="text-lg font-semibold text-gray-900 mb-2">
            {t("notifications.title")}
          </h1>
          <button className="bg-[#0B2088] text-white px-3 py-1 rounded text-sm font-medium flex items-center gap-1">
            {t("notifications.all")}
            <span className="bg-white text-[#0B2088] rounded-full w-5 h-5 flex items-center justify-center text-xs font-semibold">
              {notifications.length}
            </span>
          </button>
        </div>

        <div>
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className="flex items-start gap-3 px-4 py-3 hover:bg-[#c8cbda] hover:cursor-pointer transition-colors"
            >
              <div className="mt-1 p-2 rounded bg-[#B8C1CF] text-[#193664]">
                <Bell className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-900 leading-relaxed">
                  {notification.message}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {t("notifications.ago", {
                    time: `${notification.timestamp} mins`,
                  })}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Notification;
