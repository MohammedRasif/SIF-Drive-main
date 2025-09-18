import * as React from "react";
import { IoSearch, IoEllipsisVertical } from "react-icons/io5";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";

const drivers = [
  {
    id: 1,
    name: "Jubayer Ahmad",
    email: "ahmad@jubayer@gmail.com",
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
    phone: "87654321",
    joinDate: "15 Jun 2025",
    status: "active",
    income: 3800, // Added income field
  },
  {
    id: 3,
    name: "John",
    email: "john@gmail.com",
    phone: "11223344",
    joinDate: "14 Jun 2025",
    status: "pending",
    submittedDate: "2025-01-19",
    income: 0, // Pending driver with no income
  },
  {
    id: 4,
    name: "Sarah",
    email: "sarah@gmail.com",
    phone: "44332211",
    joinDate: "13 Jun 2025",
    status: "active",
    income: 4200, // Added income field
  },
];

export default function RentalCompany() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = React.useState("");
  const [activeTab, setActiveTab] = React.useState("list");
  const [dropdownOpen, setDropdownOpen] = React.useState(null);
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === "rtl";

  const activeDrivers = drivers.filter((d) => d.status === "active");
  const pendingDrivers = drivers.filter((d) => d.status === "pending");

  const getFilteredDrivers = (list) =>
    searchTerm.trim() === ""
      ? list
      : list.filter((d) =>
        [d.name, d.email, d.phone, d.income.toString()].some((val) =>
          val?.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );

  const handleAction = (type, driver) => {
    switch (type) {
      case "view":
        navigate(`/dashboard/rental-company/${driver.id}`);
        break;
      case "approve":
      case "deny":
      case "delete":
      case "hold":
        console.log(`${type} driver:`, driver.name);
        break;
    }
    setDropdownOpen(null);
  };

  const toggleDropdown = (id) => {
    setDropdownOpen(dropdownOpen === id ? null : id);
  };

  return (
    <div className="px-5 md:px-20 py-5 min-h-screen" dir={i18n.dir()}>
      {/* Tabs & Search */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-4 sm:py-6 gap-4">
        <div className="grid w-full sm:w-auto grid-cols-2 rounded-md">
          {["list", "requests"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 text-sm font-medium focus:outline-none hover:cursor-pointer ${activeTab === tab
                  ? "bg-[#0B2080] text-white"
                  : "bg-white text-gray-700"
                } ${i18n.language === "ar"
                  ? tab === "list"
                    ? "rounded-r-md"
                    : "rounded-l-md"
                  : tab === "list"
                    ? "rounded-l-md"
                    : "rounded-r-md"
                }`}
            >
              {t(
                `admin.rentalCompany.${tab === "list" ? "driverList" : "driverRequest"
                }`
              )}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:flex-none bg-white">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && console.log(searchTerm)}
              placeholder={t("admin.rentalCompany.userName")}
              className="w-full sm:w-64 pr-10 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#0B2088]"
            />
            <IoSearch
              className={`absolute top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 ${isRTL ? "left-3" : "right-3"
                }`}
            />
          </div>
          <button
            onClick={() => console.log(searchTerm)}
            className="bg-[#0B2088] text-white p-3 rounded-full"
          >
            <IoSearch className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Tables */}
      {["list", "requests"].map((tab) =>
        activeTab === tab ? (
          <div key={tab} className="overflow-x-auto pb-20">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-[#B4BBDF]">
                <tr>
                  {tab === "list" && (
                    <th className="px-4 py-3 text-start text-sm font-semibold text-[#1E1E1E]">
                      #SI
                    </th>
                  )}
                  <th className="px-4 py-3 text-start text-sm font-semibold text-[#1E1E1E] min-w-[120px]">
                    {t("admin.rentalCompany.userName")}
                  </th>
                  <th className="px-4 py-3 text-start text-sm font-semibold text-[#1E1E1E] min-w-[180px]">
                    {t("admin.rentalCompany.email")}
                  </th>
                  <th className="px-4 py-3 text-start text-sm font-semibold text-[#1E1E1E] min-w-[120px]">
                    {tab === "list"
                      ? t("admin.rentalCompany.phone")
                      : t("admin.rentalCompany.submitted")}
                  </th>
                  {tab === "list" && (
                    <th className="px-4 py-3 text-start text-sm font-semibold text-[#1E1E1E] min-w-[100px]">
                      {t("admin.rentalCompany.joinDate")}
                    </th>
                  )}
                  <th className="px-4 py-3 text-start text-sm font-semibold text-[#1E1E1E] min-w-[100px]">
                    {t("admin.rentalCompany.income")} {/* Added income header */}
                  </th>
                  <th className="px-4 py-3 text-start text-sm font-semibold text-[#1E1E1E]">
                    {t("admin.rentalCompany.actions")}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {getFilteredDrivers(
                  tab === "list" ? activeDrivers : pendingDrivers
                ).map((driver) => (
                  <tr key={driver.id}>
                    {tab === "list" && (
                      <td className="px-4 py-3 text-sm text-gray-900">
                        {driver.id}
                      </td>
                    )}
                    <td className="px-4 py-3 text-sm text-gray-900">
                      {driver.name}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      {driver.email}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      {tab === "list" ? driver.phone : driver.submittedDate}
                    </td>
                    {tab === "list" && (
                      <td className="px-4 py-3 text-sm text-gray-600">
                        {driver.joinDate}
                      </td>
                    )}
                    <td className="px-4 py-3 text-sm text-gray-600">
                      ${driver.income.toLocaleString()} {/* Added income display */}
                    </td>
                    <td className="px-4 py-3 text-center">
                      {tab === "list" ? (
                        <div className="relative">
                          <button
                            onClick={() => toggleDropdown(driver.id)}
                            className="p-2 hover:bg-gray-100 rounded-full"
                          >
                            <IoEllipsisVertical className="h-4 w-4 text-gray-600" />
                          </button>
                          {dropdownOpen === driver.id && (
                            <div
                              className={`absolute mt-2 w-40 bg-white rounded-md shadow-lg z-20 ${isRTL ? "left-0" : "right-0"
                                }`}
                            >
                              {["view", "delete", "hold"].map((type) => (
                                <button
                                  key={type}
                                  onClick={() => handleAction(type, driver)}
                                  className={`block w-full text-left px-4 py-2 text-sm ${type === "delete"
                                      ? "text-red-600"
                                      : type === "hold"
                                        ? "text-orange-600"
                                        : "text-gray-700"
                                    } hover:bg-gray-100`}
                                >
                                  {t(
                                    `admin.rentalCompany.${type === "view" ? "viewDetails" : type
                                    }`
                                  )}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="flex justify-center gap-2">
                          <button
                            onClick={() => handleAction("approve", driver)}
                            className="bg-[#0B2088] text-white px-4 py-1 rounded-md"
                          >
                            {t("admin.rentalCompany.approve")}
                          </button>
                          <button
                            onClick={() => handleAction("deny", driver)}
                            className="border border-gray-300 text-gray-700 px-4 py-1 rounded-md"
                          >
                            {t("admin.rentalCompany.deny")}
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : null
      )}

      {/* Empty State */}
      {(activeTab === "list"
        ? getFilteredDrivers(activeDrivers)
        : getFilteredDrivers(pendingDrivers)
      ).length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">
              {t("admin.rentalCompany.noDriversFound")}
            </p>
            <button
              className="mt-4 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100"
              onClick={() => setSearchTerm("")}
            >
              {t("admin.rentalCompany.clearSearch")}
            </button>
          </div>
        )}
    </div>
  );
}
