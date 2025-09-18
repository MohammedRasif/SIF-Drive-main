"use client";

import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import Collaborator from "./AddCollaborator";
import { FaPlus } from "react-icons/fa";
import Modal from "../../../shared/Modal";
import AddAuthorizedPerson from "../../Admin/AuthPeople/AuthPeople";
import { useNavigate } from "react-router";

const Collaborations = () => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");
  const [openDropdownIndex, setOpenDropdownIndex] = useState(null);
  const dropdownRef = useRef(null);
  const [isAddCollaborator, setIsAddCollaborator] = useState(false);
  const navigate = useNavigate()
  const [showAuthorizedPersonForm, setShowAuthorizedPersonForm] = useState(false);


  const reportsData = [
    {
      id: 1,
      username: "Company A",
      startDate: "2023-01-15",
      endDate: "2023-12-31",
    },
    {
      id: 2,
      username: "Company B",
      startDate: "2023-03-01",
      endDate: "2023-11-30",
    },
    {
      id: 3,
      username: "Company C",
      startDate: "2023-05-20",
      endDate: "2023-10-15",
    },
  ];

  const filteredData = reportsData.filter((report) =>
    report.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearch = () => console.log("Search clicked for:", searchTerm);
  const handleKeyPress = (e) => e.key === "Enter" && handleSearch();

  const toggleDropdown = (index) =>
    setOpenDropdownIndex(openDropdownIndex === index ? null : index);

  const handleEdit = (report) => {
    console.log("Edit clicked for:", report);
    setOpenDropdownIndex(null);
  };

  const handleDelete = (report) => {
    console.log("Delete clicked for:", report);
    setOpenDropdownIndex(null);
  };

  const handleHold = (report) => {
    console.log("Hold clicked for:", report);
    setOpenDropdownIndex(null);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdownIndex(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  const addauthPeople = () => {
    setShowAuthorizedPersonForm(true)
    setOpenDropdownIndex(null)
  }
  return (
    <div className="pt-5">
      {isAddCollaborator ? (
        <Collaborator setIsAddCollaborator={setIsAddCollaborator} />
      ) : (
        <div className="w-full px-5 md:px-20 mx-auto">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <h1 className="text-2xl font-bold text-gray-900">
              {t("collaborationsPage.title")}
            </h1>

            {/* Search and Add */}
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                onClick={() => setIsAddCollaborator(true)}
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#071352] to-[#0023CF] text-white py-1.5 px-6 rounded-lg font-semibold transition-colors"
              >
                <FaPlus />
                <span>{t("collaborationsPage.addButton")}</span>
              </button>

              <div className="relative flex-1 sm:flex-none">
                <input
                  type="text"
                  placeholder={t("collaborationsPage.searchPlaceholder")}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="w-full sm:w-64 px-4 py-2 border bg-white border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                />
              </div>

              <button
                onClick={handleSearch}
                className="bg-[#0B2088] text-white p-2 rounded-full"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-hidden">
            <div className="overflow-x-auto" style={{ paddingBottom: "15rem" }}>
              <table className="w-full min-w-[600px]">
                <thead style={{ backgroundColor: "#B4BBDF" }}>
                  <tr>
                    <th className="text-start py-4 px-6 text-sm font-semibold text-gray-800 whitespace-nowrap">
                      {t("collaborationsPage.table.si")}
                    </th>
                    <th className="text-start py-4 px-6 text-sm font-semibold text-gray-800 whitespace-nowrap">
                      {t("collaborationsPage.table.companyName")}
                    </th>
                    <th className="text-start py-4 px-6 text-sm font-semibold text-gray-800 whitespace-nowrap">
                      {t("collaborationsPage.table.startDate")}
                    </th>
                    <th className="text-start py-4 px-6 text-sm font-semibold text-gray-800 whitespace-nowrap">
                      {t("collaborationsPage.table.endDate")}
                    </th>
                    <th className="text-start py-4 px-6 text-sm font-semibold text-gray-800 whitespace-nowrap">
                      {t("collaborationsPage.table.action")}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.map((report, index) => (
                    <tr
                      key={report.id}
                      className="border-b border-gray-200 hover:bg-gray-50"
                    >
                      <td className="py-4 px-6 text-sm text-gray-700">
                        {index + 1}
                      </td>
                      <td className="py-4 px-6 text-sm text-gray-700">
                        {report.username}
                      </td>
                      <td className="py-4 px-6 text-sm text-gray-700">
                        {report.startDate}
                      </td>
                      <td className="py-4 px-6 text-sm text-gray-700">
                        {report.endDate}
                      </td>
                      <td className="py-4 px-6 text-sm text-gray-700 relative">
                        <button
                          onClick={() => toggleDropdown(index)}
                          className="focus:outline-none hover:cursor-pointer"
                        >
                          <svg
                            className="w-5 h-5 text-gray-600 hover:text-gray-800"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                            />
                          </svg>
                        </button>

                        {openDropdownIndex === index && (
                          <div
                            ref={dropdownRef}
                            className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10"
                          >
                            <button
                              onClick={() => { navigate(`/dashboard/collaborations/${report.id}`) }}
                              className="block w-full hover:cursor-pointer text-start px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                              {t("collaborationsPage.dropdown.view")}
                            </button>
                            <button
                              onClick={() => handleEdit(report)}
                              className="block w-full hover:cursor-pointer text-start px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                              {t("collaborationsPage.dropdown.edit")}
                            </button>

                            <button
                              onClick={() => handleDelete(report)}
                              className="block w-full hover:cursor-pointer text-start px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                              {t("collaborationsPage.dropdown.delete")}
                            </button>

                            <button
                              onClick={() => handleHold(report)}
                              className="block w-full hover:cursor-pointer text-start px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                              {t("collaborationsPage.dropdown.hold")}
                            </button>

                            {/* ✅ New option: Add Authorized People */}
                            <button
                              onClick={() => {
                                addauthPeople()
                              }}
                              className="block w-full text-start px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                              {t("collaborationsPage.dropdown.addAuthorizedPerson")}
                            </button>
                          </div>
                        )}

                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* No Results */}
            {filteredData.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <p>{t("collaborationsPage.noResults")}</p>
              </div>
            )}

            {/* Mobile Scroll Hint */}
            <div className="sm:hidden bg-gray-50 px-4 py-2 text-center">
              <p className="text-xs text-gray-500">
                {t("collaborationsPage.mobileScrollHint")}
              </p>
            </div>
          </div>
          <Modal isOpen={showAuthorizedPersonForm} onClose={() => setShowAuthorizedPersonForm(false)}>
            <AddAuthorizedPerson />
          </Modal>
        </div>
      )}
    </div>
  );
};

export default Collaborations;
