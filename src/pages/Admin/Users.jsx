"use client";

import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import Modal from "../../shared/Modal";
import { UserDetailsModal } from "./helps/UserDetails";
import { useTranslation } from "react-i18next";

const users = [
  {
    id: 1,
    name: "Enrique",
    email: "abc@gmail.com",
    phone: "12345678",
    joinDate: "16 Jun 2025",
  },
  {
    id: 2,
    name: "Maria",
    email: "maria@gmail.com",
    phone: "87654321",
    joinDate: "15 Jun 2025",
  },
  {
    id: 3,
    name: "John",
    email: "john@gmail.com",
    phone: "11223344",
    joinDate: "14 Jun 2025",
  },
  {
    id: 4,
    name: "Sarah",
    email: "sarah@gmail.com",
    phone: "44332211",
    joinDate: "13 Jun 2025",
  },
  {
    id: 5,
    name: "Enrique",
    email: "enrique2@gmail.com",
    phone: "12345678",
    joinDate: "16 Jun 2025",
  },
  {
    id: 6,
    name: "David",
    email: "david@gmail.com",
    phone: "55667788",
    joinDate: "12 Jun 2025",
  },
  {
    id: 7,
    name: "Lisa",
    email: "lisa@gmail.com",
    phone: "99887766",
    joinDate: "11 Jun 2025",
  },
  {
    id: 8,
    name: "Mike",
    email: "mike@gmail.com",
    phone: "33445566",
    joinDate: "10 Jun 2025",
  },
  {
    id: 9,
    name: "Anna",
    email: "anna@gmail.com",
    phone: "77889900",
    joinDate: "09 Jun 2025",
  },
  {
    id: 10,
    name: "Carlos",
    email: "carlos@gmail.com",
    phone: "22334455",
    joinDate: "08 Jun 2025",
  },
  {
    id: 11,
    name: "Emma",
    email: "emma@gmail.com",
    phone: "66778899",
    joinDate: "07 Jun 2025",
  },
  {
    id: 12,
    name: "Robert",
    email: "robert@gmail.com",
    phone: "11335577",
    joinDate: "06 Jun 2025",
  },
];

export default function UsersPage() {
  const { t, i18n } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUsers, setFilteredUsers] = useState(users);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [isDetails, setIsDetails] = useState(false);
  const [seclectedUser, setSeclectedUser] = useState(null);

  // Set layout direction
  useEffect(() => {
    document.dir = i18n.language === "ar" ? "rtl" : "ltr";
  }, [i18n.language]);

  // Search logic
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredUsers(users);
    } else {
      const filtered = users.filter(
        (user) =>
          user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.phone.includes(searchTerm)
      );
      setFilteredUsers(filtered);
    }
  }, [searchTerm]);

  const handleSearch = () => console.log("Search for:", searchTerm);

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  const handleAction = (action, user) => {
    switch (action) {
      case "view":
        setIsDetails(true);
        setSeclectedUser(user);
        break;
      case "delete":
        console.log(`Delete user ${user.id}`);
        break;
      case "hold":
        console.log(`Hold user ${user.id}`);
        break;
    }
    setDropdownOpen(null);
  };

  const toggleDropdown = (userId) => {
    setDropdownOpen(dropdownOpen === userId ? null : userId);
  };

  return (
    <div className="px-5 md:px-20 min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 sm:p-6 border-b gap-4">
        <h1 className="text-xl font-semibold text-gray-900">
          {t("admin.users.title")}
        </h1>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:flex-none bg-white">
            <input
              type="text"
              placeholder={t("admin.users.searchPlaceholder")}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={handleKeyPress}
              className="w-full sm:w-64 pr-10 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#0B2088] text-start"
              dir="auto"
            />
            <svg
              className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#1E1E1E]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <button
            onClick={handleSearch}
            className="bg-[#0B2088] text-white p-3 rounded-full flex items-center"
          >
            <FaSearch className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-[#B4BBDF]">
            <tr>
              <th className="px-4 py-3 text-sm font-semibold text-start">
                {t("admin.users.table.si")}
              </th>
              <th className="px-4 py-3 text-sm font-semibold text-start min-w-[120px]">
                {t("admin.users.table.name")}
              </th>
              <th className="px-4 py-3 text-sm font-semibold text-start min-w-[180px]">
                {t("admin.users.table.email")}
              </th>
              <th className="px-4 py-3 text-sm font-semibold text-start min-w-[120px]">
                {t("admin.users.table.phone")}
              </th>
              <th className="px-4 py-3 text-sm font-semibold text-start min-w-[100px]">
                {t("admin.users.table.joinDate")}
              </th>
              <th className="px-4 py-3 text-sm font-semibold text-center">
                {t("admin.users.table.details")}
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id}>
                <td className="px-4 py-3 text-sm">{user.id}</td>
                <td className="px-4 py-3 text-sm">{user.name}</td>
                <td className="px-4 py-3 text-sm text-gray-600">
                  {user.email}
                </td>
                <td className="px-4 py-3 text-sm text-gray-600">
                  {user.phone}
                </td>
                <td className="px-4 py-3 text-sm text-gray-600">
                  {user.joinDate}
                </td>
                <td className="px-4 py-3 text-center">
                  <div className="relative">
                    <button
                      onClick={() => toggleDropdown(user.id)}
                      className="p-2 hover:bg-gray-100 rounded-full"
                    >
                      <svg
                        className="h-4 w-4 text-gray-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 5v.01M12 12v.01M12 19v.01"
                        />
                      </svg>
                    </button>
                    {dropdownOpen === user.id && (
                      <div
                        className={`absolute ${
                          i18n.language === "ar" ? "left-0" : "right-0"
                        } mt-2 w-40 bg-white border rounded-md shadow-lg z-10`}
                      >
                        <button
                          onClick={() => handleAction("view", user)}
                          className="block w-full text-start px-4 py-2 text-sm text-[#1E1E1E] hover:bg-gray-100"
                        >
                          {t("admin.users.dropdown.view")}
                        </button>
                        <button
                          onClick={() => handleAction("delete", user)}
                          className="block w-full text-start px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                        >
                          {t("admin.users.dropdown.delete")}
                        </button>
                        <button
                          onClick={() => handleAction("hold", user)}
                          className="block w-full text-start px-4 py-2 text-sm text-orange-600 hover:bg-gray-100"
                        >
                          {t("admin.users.dropdown.hold")}
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

      {/* No results */}
      {filteredUsers.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">{t("admin.users.empty.noResult")}</p>
          <button
            className="mt-4 px-4 py-2 border border-gray-300 rounded-md text-[#1E1E1E] hover:bg-gray-100"
            onClick={() => setSearchTerm("")}
          >
            {t("admin.users.empty.clear")}
          </button>
        </div>
      )}

      {/* Found count */}
      {searchTerm && filteredUsers.length > 0 && (
        <div className="px-4 sm:px-6 py-3 border-t bg-gray-50">
          <p className="text-sm text-gray-600">
            {t("admin.users.results", {
              count: filteredUsers.length,
              term: searchTerm,
            })}
          </p>
        </div>
      )}

      <Modal
        isOpen={isDetails}
        onClose={() => {
          setIsDetails(false);
          setSeclectedUser(null);
        }}
      >
        <UserDetailsModal user={seclectedUser} />
      </Modal>
    </div>
  );
}
