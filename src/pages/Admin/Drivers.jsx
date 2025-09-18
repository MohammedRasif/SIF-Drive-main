import React, { useState } from "react";
import { IoSearch, IoEllipsisVertical } from "react-icons/io5";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";

const drivers = [
  {
    id: 1,
    name: "Jubayer Ahmad",
    email: "ahmad@jubayer@gmail.com",
    age: 30,
    licenseExpiry: "2026-06-15",
    phone: "12345678",
    joinDate: "16 Jun 2025",
    status: "active",
    submittedDate: "2025-01-20",
    income: 4500, // Added income field
  },
  {
    id: 2,
    name: "Enrique",
    email: "abc@gmail.com",
    age: 28,
    licenseExpiry: "2025-12-31",
    phone: "87654321",
    joinDate: "15 Jun 2025",
    status: "active",
    income: 3800, // Added income field
  },
  {
    id: 3,
    name: "John",
    email: "john@gmail.com",
    age: 35,
    licenseExpiry: "2025-11-20",
    phone: "11223344",
    joinDate: "14 Jun 2025",
    status: "pending",
    submittedDate: "2025-01-19",
    income: 0, // Pending drivers may have no income yet
  },
  {
    id: 4,
    name: "Sarah",
    email: "sarah@gmail.com",
    age: 27,
    licenseExpiry: "2026-03-10",
    phone: "44332211",
    joinDate: "13 Jun 2025",
    status: "active",
    income: 4200, // Added income field
  },
];

export default function DriversPage() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("list");
  const [dropdownOpen, setDropdownOpen] = useState(null);

  const activeDrivers = drivers.filter((driver) => driver.status === "active");
  const pendingDrivers = drivers.filter(
    (driver) => driver.status === "pending"
  );

  const getFilteredDrivers = (driverList) => {
    if (searchTerm.trim() === "") return driverList;
    return driverList.filter(
      (driver) =>
        driver.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        driver.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        driver.phone.includes(searchTerm)
    );
  };

  const handleSearch = () => console.log("Search:", searchTerm);
  const handleKeyPress = (e) => e.key === "Enter" && handleSearch();

  const handleAction = (action, driver) => {
    switch (action) {
      case "view":
        navigate(`/dashboard/drivers/${driver.id}`);
        break;
      case "approve":
        console.log("Approve:", driver.name);
        break;
      case "deny":
        console.log("Deny:", driver.name);
        break;
      case "delete":
        console.log("Delete:", driver.name);
        break;
      case "hold":
        console.log("Hold:", driver.name);
        break;
    }
    setDropdownOpen(null);
  };

  const toggleDropdown = (id) => {
    setDropdownOpen(dropdownOpen === id ? null : id);
  };

  return (
    <div
      className="px-5 md:px-20 py-5 min-h-screen"
      dir={isRTL ? "rtl" : "ltr"}
    >
      <div>
        {/* Tabs + Search */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-4 sm:py-6 gap-4">
          <div className="grid w-full sm:w-auto grid-cols-2 rounded-md">
            <button
              onClick={() => setActiveTab("list")}
              className={`px-4 py-2 text-sm hover:cursor-pointer font-medium ${activeTab === "list"
                  ? "bg-[#0b2080] text-white"
                  : "bg-white text-gray-700"
                }  ${isRTL ? "rounded-r-md" : "rounded-l-md"}`}
            >
              {t("admin.drivers.driverList")}
            </button>
            <button
              onClick={() => setActiveTab("requests")}
              className={`px-4 py-2 text-sm hover:cursor-pointer font-medium ${activeTab === "requests"
                  ? "bg-[#0B2080] text-white"
                  : "bg-white text-gray-700"
                } ${isRTL ? "rounded-l-md" : "rounded-r-md"}`}
            >
              {t("admin.drivers.driverRequest")}
            </button>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <div className="relative flex-1 sm:flex-none bg-white">
              <input
                type="text"
                placeholder={t("admin.drivers.userName")}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={handleKeyPress}
                className="w-full sm:w-64 pr-10 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#0B2088]"
              />
              <IoSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            </div>
            <button
              onClick={handleSearch}
              className="bg-[#0B2088] text-white p-3 rounded-full flex items-center"
            >
              <IoSearch className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Driver List Table */}
        {activeTab === "list" && (
          <div className="overflow-x-auto pb-40">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-[#B4BBDF]">
                <tr>
                  <th className="px-4 py-3 text-start text-sm font-semibold">
                    {t("admin.drivers.userName")}
                  </th>
                  <th className="px-4 py-3 text-start text-sm font-semibold">
                    {t("admin.drivers.email")}
                  </th>
                  <th className="px-4 py-3 text-start text-sm font-semibold">
                    {t("admin.drivers.age")}
                  </th>
                  <th className="px-4 py-3 text-start text-sm font-semibold">
                    {t("admin.drivers.licenseExpiry")}
                  </th>
                  <th className="px-4 py-3 text-start text-sm font-semibold">
                    {t("admin.drivers.phone")}
                  </th>
                  <th className="px-4 py-3 text-start text-sm font-semibold">
                    {t("admin.drivers.joinDate")}
                  </th>
                  <th className="px-4 py-3 text-start text-sm font-semibold">
                    {t("admin.drivers.income")} {/* Added income header */}
                  </th>
                  <th className="px-4 py-3 text-center text-sm font-semibold">
                    {t("admin.drivers.actions")}
                  </th>
                </tr>
              </thead>
              <tbody>
                {getFilteredDrivers(activeDrivers).map((driver) => (
                  <tr key={driver.id}>
                    <td className="px-4 py-3 text-sm text-gray-900">
                      {driver.name}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      {driver.email}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      {driver.age}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      {driver.licenseExpiry}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      {driver.phone}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      {driver.joinDate}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      ${driver.income.toLocaleString()} {/* Added income display */}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <div className="relative">
                        <button
                          onClick={() => toggleDropdown(driver.id)}
                          className="p-2 hover:bg-gray-100 rounded-full"
                        >
                          <IoEllipsisVertical className="h-4 w-4 text-gray-600" />
                        </button>
                        {dropdownOpen === driver.id && (
                          <div
                            className={`absolute z-20 ${isRTL ? "left-0" : "right-0"
                              } mt-2 w-40 bg-white rounded-md shadow-lg`}
                          >
                            <button
                              onClick={() => handleAction("view", driver)}
                              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                              {t("admin.drivers.viewDetails")}
                            </button>
                            <button
                              onClick={() => handleAction("delete", driver)}
                              className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                            >
                              {t("admin.drivers.delete")}
                            </button>
                            <button
                              onClick={() => handleAction("hold", driver)}
                              className="block w-full text-left px-4 py-2 text-sm text-orange-600 hover:bg-gray-100"
                            >
                              {t("admin.drivers.hold")}
                            </button>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Requests Tab */}
        {activeTab === "requests" && (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-[#B4BBDF]">
                <tr>
                  <th className="px-4 py-3 text-start text-sm font-semibold">
                    {t("admin.drivers.userName")}
                  </th>
                  <th className="px-4 py-3 text-start text-sm font-semibold">
                    {t("admin.drivers.email")}
                  </th>
                  <th className="px-4 py-3 text-start text-sm font-semibold">
                    {t("admin.drivers.age")}
                  </th>
                  <th className="px-4 py-3 text-start text-sm font-semibold">
                    {t("admin.drivers.licenseExpiry")}
                  </th>
                  <th className="px-4 py-3 text-start text-sm font-semibold">
                    {t("admin.drivers.submitted")}
                  </th>
                  <th className="px-4 py-3 text-start text-sm font-semibold">
                    {t("admin.drivers.income")} {/* Added income header */}
                  </th>
                  <th className="px-4 py-3 text-center text-sm font-semibold">
                    {t("admin.drivers.actions")}
                  </th>
                </tr>
              </thead>
              <tbody>
                {getFilteredDrivers(pendingDrivers).map((driver) => (
                  <tr key={driver.id}>
                    <td className="px-4 py-3 text-sm text-gray-900">
                      {driver.name}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      {driver.email}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      {driver.age}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      {driver.licenseExpiry}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      {driver.submittedDate}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      ${driver.income.toLocaleString()} {/* Added income display */}
                    </td>
                    <td className="px-4 py-3 text-start">
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() => handleAction("approve", driver)}
                          className="bg-[#0B2088] text-white px-4 py-1 rounded-md"
                        >
                          {t("admin.drivers.approve")}
                        </button>
                        <button
                          onClick={() => handleAction("deny", driver)}
                          className="border border-gray-300 text-gray-700 hover:bg-gray-50 px-4 py-1 rounded-md"
                        >
                          {t("admin.drivers.deny")}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Empty State */}
        {((activeTab === "list" &&
          getFilteredDrivers(activeDrivers).length === 0) ||
          (activeTab === "requests" &&
            getFilteredDrivers(pendingDrivers).length === 0)) && (
            <div className="text-center py-12">
              <p className="text-gray-500">{t("admin.drivers.noDrivers")}</p>
              <button
                onClick={() => setSearchTerm("")}
                className="mt-4 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100"
              >
                {t("admin.drivers.clearSearch")}
              </button>
            </div>
          )}
      </div>
    </div>
  );
}