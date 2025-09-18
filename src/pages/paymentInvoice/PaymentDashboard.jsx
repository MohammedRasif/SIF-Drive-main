"use client";

import { useState } from "react";
import { FiCalendar, FiSearch, FiX } from "react-icons/fi";
import { useTranslation } from "react-i18next";
import i18n from "../../i18n";

const PaymentDashboard = () => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");
  const [dateFilter, setDateFilter] = useState("");

  const bookingData = [
    {
      id: 1,
      customer: { name: "Jubayer Ahmad", email: "ahmadjubayer@gmail.com" },
      vehicle: { model: "BMW 7 Series", type: "Luxury Sedan" },
      startDate: "2026-08-15",
      endDate: "2026-12-15",
      amount: "$300",
    },
    {
      id: 2,
      customer: { name: "Jubayer Ahmad", email: "ahmadjubayer@gmail.com" },
      vehicle: { model: "BMW 7 Series", type: "Luxury Sedan" },
      startDate: "2026-08-15",
      endDate: "2026-12-15",
      amount: "$300",
    },
    {
      id: 3,
      customer: { name: "Jubayer Ahmad", email: "ahmadjubayer@gmail.com" },
      vehicle: { model: "BMW 7 Series", type: "Luxury Sedan" },
      startDate: "2026-08-15",
      endDate: "2026-12-15",
      amount: "$300",
    },
    {
      id: 4,
      customer: { name: "Jubayer Ahmad", email: "ahmadjubayer@gmail.com" },
      vehicle: { model: "BMW 7 Series", type: "Luxury Sedan" },
      startDate: "2026-08-15",
      endDate: "2026-12-15",
      amount: "$300",
    },
    {
      id: 5,
      customer: { name: "Jubayer Ahmad", email: "ahmadjubayer@gmail.com" },
      vehicle: { model: "BMW 7 Series", type: "Luxury Sedan" },
      startDate: "2026-08-15",
      endDate: "2026-12-15",
      amount: "$300",
    },
    {
      id: 6,
      customer: { name: "Jubayer Ahmad", email: "ahmadjubayer@gmail.com" },
      vehicle: { model: "BMW 7 Series", type: "Luxury Sedan" },
      startDate: "2026-08-15",
      endDate: "2026-12-15",
      amount: "$300",
    },
    {
      id: 7,
      customer: { name: "Jubayer Ahmad", email: "ahmadjubayer@gmail.com" },
      vehicle: { model: "BMW 7 Series", type: "Luxury Sedan" },
      startDate: "2026-08-15",
      endDate: "2026-12-15",
      amount: "$300",
    },
    {
      id: 8,
      customer: { name: "Jubayer Ahmad", email: "ahmadjubayer@gmail.com" },
      vehicle: { model: "BMW 7 Series", type: "Luxury Sedan" },
      startDate: "2026-08-15",
      endDate: "2026-12-15",
      amount: "$300",
    },
    {
      id: 9,
      customer: { name: "Jubayer Ahmad", email: "ahmadjubayer@gmail.com" },
      vehicle: { model: "BMW 7 Series", type: "Luxury Sedan" },
      startDate: "2026-08-15",
      endDate: "2026-12-15",
      amount: "$300",
    },
  ];

  const today = new Date().toISOString().split("T")[0];

  const filteredData = bookingData.filter((booking) => {
    const matchesSearch =
      booking.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.vehicle.model.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDate = dateFilter
      ? new Date(booking.startDate) >= new Date(today) &&
        new Date(booking.endDate) <= new Date(dateFilter)
      : true;

    return matchesSearch && matchesDate;
  });

  const handleManageMethod = () => {
    console.log("Manage method clicked");
  };

  const handleResetDateFilter = () => {
    setDateFilter("");
  };

  return (
    <div className="min-h-screen py-6">
      <div className="px-5 md:px-20 mx-auto">
        {/* Top Cards */}
        <div className="flex gap-6">
          {/* Available Balance Card */}
          <div
            className={
              i18n.dir() == "ltr" ? "md:border-r-2 pe-8" : "md:border-l-2 pe-8"
            }
          >
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">
                {t("paymentDashboard.availableBalance")}
              </p>
              <h2 className="text-3xl font-bold" style={{ color: "#1E1E1E" }}>
                OMR 44.00
              </h2>
            </div>
            <button
              onClick={handleManageMethod}
              className="w-full py-3 px-6 text-white font-medium rounded-lg transition-colors bg-gradient-to-r from-[#071352] to-[#0023CF] hover:cursor-pointer"
            >
              {t("paymentDashboard.manageMethod")}
            </button>
          </div>

          {/* Payments Card */}
          <div>
            <div>
              <p className="text-sm text-gray-600 mb-2">
                {t("paymentDashboard.paymentsForActiveOrders")}
              </p>
              <h2
                className="text-3xl font-bold mb-2"
                style={{ color: "#1E1E1E" }}
              >
                OMR 454.00
              </h2>
              <p className="text-sm text-gray-500">
                {t("paymentDashboard.totalInst")}
              </p>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row justify-between w-full items-start sm:items-center gap-4 mb-6 mt-6">
          {/* Date Range */}
          <button
            className="flex items-center text-sm font-medium"
            style={{ color: "#1E1E1E" }}
          >
            {t("paymentDashboard.dateRange")}
            <FiCalendar className="w-4 h-4 mx-1" />
          </button>

          {/* Filter Inputs */}
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <div className="relative">
              <input
                type="date"
                placeholder={t("paymentDashboard.filterByDate")}
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="px-2 py-2 w-full border rounded-lg focus:outline-none focus:ring-2 text-sm"
                style={{ borderColor: "#B4BBDF" }}
                min={today}
              />
              {dateFilter && (
                <button
                  onClick={handleResetDateFilter}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4"
                  style={{ color: "#B4BBDF" }}
                  aria-label="Reset date filter"
                >
                  <FiX />
                </button>
              )}
            </div>

            <div className="relative">
              <FiSearch
                className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4"
                style={{ color: "#B4BBDF" }}
              />
              <input
                type="text"
                placeholder={t("paymentDashboard.searchPlaceholder")}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border rounded-lg focus:outline-none focus:ring-2 text-sm"
                style={{ borderColor: "#B4BBDF" }}
              />
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead style={{ backgroundColor: "#B4BBDF" }}>
                <tr>
                  <th
                    className="text-start py-4 px-6 font-semibold text-sm"
                    style={{ color: "#1E1E1E" }}
                  >
                    {t("paymentDashboard.customer")}
                  </th>
                  <th
                    className="text-start py-4 px-6 font-semibold text-sm"
                    style={{ color: "#1E1E1E" }}
                  >
                    {t("paymentDashboard.vehicles")}
                  </th>
                  <th
                    className="text-start py-4 px-6 font-semibold text-sm"
                    style={{ color: "#1E1E1E" }}
                  >
                    {t("paymentDashboard.startDate")}
                  </th>
                  <th
                    className="text-start py-4 px-6 font-semibold text-sm"
                    style={{ color: "#1E1E1E" }}
                  >
                    {t("paymentDashboard.endDate")}
                  </th>
                  <th
                    className="text-start py-4 px-6 font-semibold text-sm"
                    style={{ color: "#1E1E1E" }}
                  >
                    {t("paymentDashboard.amount")}
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((booking) => (
                  <tr
                    key={booking.id}
                    style={{ backgroundColor: "#DBDEEF" }}
                    className="border-b border-gray-300"
                  >
                    <td className="py-4 px-6">
                      <div>
                        <div
                          className="font-semibold text-sm"
                          style={{ color: "#1E1E1E" }}
                        >
                          {booking.customer.name}
                        </div>
                        <div className="text-xs" style={{ color: "#1E1E1E" }}>
                          {booking.customer.email}
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div>
                        <div
                          className="font-medium text-sm"
                          style={{ color: "#1E1E1E" }}
                        >
                          {booking.vehicle.model}
                        </div>
                        <div className="text-xs" style={{ color: "#1E1E1E" }}>
                          {booking.vehicle.type}
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="text-sm" style={{ color: "#1E1E1E" }}>
                        {booking.startDate}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="text-sm" style={{ color: "#1E1E1E" }}>
                        {booking.endDate}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span
                        className="font-medium text-sm"
                        style={{ color: "#1E1E1E" }}
                      >
                        {booking.amount}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredData.length === 0 && (
            <div className="text-center py-8" style={{ color: "#B4BBDF" }}>
              {t("paymentDashboard.noBookingsFound")}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentDashboard;
