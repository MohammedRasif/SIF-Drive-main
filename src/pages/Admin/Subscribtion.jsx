import React, { useState, useEffect, useRef } from "react";
import { IoSearch, IoEllipsisVertical } from "react-icons/io5";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import Modal from "../../shared/Modal";
import AddContractualCustomers from "./SubPopUps/AddContractualCustomers";
import AddPlan from "./SubPopUps/AddPlan";
import AddServiceFee from "./SubPopUps/AddServiceFee";

const Dashboard = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === "rtl";

  const [activeTab, setActiveTab] = useState("subscribedUsers");
  const [userSearchTerm, setUserSearchTerm] = useState("");
  const [planBillingType, setPlanBillingType] = useState("All");
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const dropdownRef = useRef(null);

  const [isContractualActive, setIsContractualActive] = useState(false);
  const [isAddOneActive, setIsAddOneActive] = useState(false);
  const [serviceFeeModal, setServiceFeeModal] = useState(false)

  const subscribedUsers = [
    {
      id: 1,
      name: "CaringCompany",
      owner: "Jubayer Ahmad",
      plan: "Premium",
      status: "Active",
      amount: "$299/Month",
      nextBilling: "2024-02-15",
      joined: "2024-01-15",
    },
    // ... other user data
  ];

  const subscriptionPlans = [
    {
      id: 1,
      name: "Starter",
      type: "Monthly",
      cars: "1-10 Cars",
      status: "Active",
      amount: "$299",
    },
    {
      id: 2,
      name: "Starter",
      type: "Yearly",
      cars: "1-10 Cars",
      status: "Active",
      amount: "$299",
    },
    // ... other plan data
  ];

  useEffect(() => {
    setDropdownOpen(null);
  }, [activeTab]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getFilteredUsers = (users) => {
    if (userSearchTerm.trim() === "") return users;
    return users.filter(
      (user) =>
        user.name.toLowerCase().includes(userSearchTerm.toLowerCase()) ||
        user.owner.toLowerCase().includes(userSearchTerm.toLowerCase())
    );
  };

  const getFilteredPlans = (plans) => {
    if (planBillingType === "All") return plans;
    return plans.filter((plan) => plan.type === planBillingType);
  };

  const handleAction = (action, item) => {
    switch (action) {
      case "view":
        navigate(`/dashboard/${activeTab}/${item.id}`);
        break;
      case "delete":
        console.log(
          `Delete ${activeTab === "subscribedUsers" ? "user" : "plan"} ${item.id
          }: ${item.name}`
        );
        break;
      case "hold":
        console.log(
          `Hold ${activeTab === "subscribedUsers" ? "user" : "plan"} ${item.id
          }: ${item.name}`
        );
        break;
      case "edit":
        setIsAddOneActive(true);
        setIsContractualActive(false);
        break;
      default:
        console.log(
          `${action} ${activeTab === "subscribedUsers" ? "user" : "plan"} ${item.id
          }: ${item.name}`
        );
    }
    setDropdownOpen(null);
  };

  const toggleDropdown = (itemId) => {
    setDropdownOpen(dropdownOpen === itemId ? null : itemId);
  };

  return (
    <div className="px-5 md:px-20 py-5 min-h-screen bg-gray-100">
      {/* Header with Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-4 sm:py-6 gap-4">
        <div
          className={`grid w-full sm:w-auto grid-cols-2 rounded-md`}
          role="tablist"
        >
          <button
            className={`px-4 py-2 text-sm font-medium hover:cursor-pointer focus:outline-none ${activeTab === "subscribedUsers"
              ? "bg-[#0B2080] text-white"
              : "bg-white text-gray-700"
              } ${isRTL ? "rounded-r-md" : "rounded-l-md"}`}
            onClick={() => setActiveTab("subscribedUsers")}
            role="tab"
            aria-selected={activeTab === "subscribedUsers"}
          >
            {t("admin.subscription.tabs.users")}
          </button>
          <button
            className={`px-4 py-2 text-sm font-medium hover:cursor-pointer focus:outline-none ${activeTab === "subscriptionPlans"
              ? "bg-[#0B2080] text-white"
              : "bg-white text-gray-700"
              } ${isRTL ? "rounded-l-md" : "rounded-r-md"}`}
            onClick={() => setActiveTab("subscriptionPlans")}
            role="tab"
            aria-selected={activeTab === "subscriptionPlans"}
          >
            {t("admin.subscription.tabs.plans")}
          </button>
        </div>

        {activeTab === "subscribedUsers" && (
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <div className="relative flex-1 sm:flex-none bg-white">
              <input
                type="text"
                placeholder={t("admin.subscription.searchPlaceholder")}
                value={userSearchTerm}
                onChange={(e) => setUserSearchTerm(e.target.value)}
                className="w-full sm:w-64 pr-10 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#0B2088]"
                aria-label={t("admin.subscription.searchPlaceholder")}
              />
              <IoSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            </div>
            <button
              onClick={() => console.log("Search triggered")}
              className="bg-[#0B2080] text-white p-3 rounded-full flex items-center"
              aria-label={t("admin.subscription.searchButton")}
            >
              <IoSearch className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>

      {/* Subscription Plans Header Buttons */}
      {activeTab === "subscriptionPlans" && (
        <div className="flex justify-between items-center mb-6 py-2 rounded-lg">
          <button
            onClick={() => {
              setIsContractualActive(true);
              setIsAddOneActive(false);
              setServiceFeeModal(false)
            }}
            className="px-4 py-2 bg-white text-gray-700 rounded-md hover:cursor-pointer"
          >
            {t("admin.subscription.contractualButton")}
          </button>
          <div className="flex space-x-2">
            <button
              onClick={() => {
                setIsAddOneActive(true);
                setIsContractualActive(false);
                setServiceFeeModal(false)

              }}
              className="px-4 py-2 bg-[#0B2080] text-white rounded-md hover:cursor-pointer"
            >
              {t("admin.subscription.addPlanButton")}
            </button>
            <button onClick={() => {
              setIsAddOneActive(false)
              setIsContractualActive(false)
              setServiceFeeModal(true)
            }} className="px-4 py-2 bg-[#0B2080] text-white rounded-md hover:cursor-pointer">
              {t("admin.subscription.serviceFeeButton")}
            </button>
          </div>
        </div>
      )}

      {/* Subscription Plans Filters */}
      {activeTab === "subscriptionPlans" && (
        <div className="flex items-center justify-between">
          <div className="mb-6 flex space-x-2">
            {["All", "Monthly", "Yearly"].map((type) => (
              <button
                key={type}
                className={`px-4 py-2 rounded hover:cursor-pointer ${planBillingType === type
                  ? "bg-[#0B2080] text-white"
                  : "bg-white text-gray-700"
                  }`}
                onClick={() => setPlanBillingType(type)}
              >
                {t(`admin.subscription.filters.${type.toLowerCase()}`)}
              </button>
            ))}
          </div>
          {/* Repeat tabs here for Subscription Plans header */}
          <div
            className={`grid w-full sm:w-auto grid-cols-2 rounded-md`}
            role="tablist"
          >
            <button
              className={`px-4 py-2 text-sm font-medium hover:cursor-pointer focus:outline-none ${activeTab === "subscribedUsers"
                ? "bg-[#0B2080] text-white"
                : "bg-white text-gray-700"
                } ${isRTL ? "rounded-r-md" : "rounded-l-md"}`}
              onClick={() => setActiveTab("subscribedUsers")}
              role="tab"
              aria-selected={activeTab === "subscribedUsers"}
            >
              {t("admin.subscription.tabs.users")}
            </button>
            <button
              className={`px-4 py-2 text-sm font-medium hover:cursor-pointer focus:outline-none ${activeTab === "subscriptionPlans"
                ? "bg-[#0B2080] text-white"
                : "bg-white text-gray-700"
                } ${isRTL ? "rounded-l-md" : "rounded-r-md"}`}
              onClick={() => setActiveTab("subscriptionPlans")}
              role="tab"
              aria-selected={activeTab === "subscriptionPlans"}
            >
              {t("admin.subscription.tabs.plans")}
            </button>
          </div>
        </div>
      )}

      {/* Subscribed Users Tab */}
      {activeTab === "subscribedUsers" && (
        <div className="overflow-x-auto pb-40">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-[#B4BBDF]">
              <tr>
                <th className="w-16 px-4 py-3 text-left text-sm font-semibold text-[#1E1E1E]">
                  #
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-[#1E1E1E] min-w-[120px]">
                  {t("admin.subscription.userTable.name")}
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-[#1E1E1E] min-w-[180px]">
                  {t("admin.subscription.userTable.owner")}
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-[#1E1E1E] min-w-[120px]">
                  {t("admin.subscription.userTable.plan")}
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-[#1E1E1E] min-w-[100px]">
                  {t("admin.subscription.userTable.status")}
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-[#1E1E1E] min-w-[100px]">
                  {t("admin.subscription.userTable.amount")}
                </th>
                <th className="w-20 px-4 py-3 text-center text-sm font-semibold text-[#1E1E1E]">
                  {t("admin.subscription.userTable.actions")}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {getFilteredUsers(subscribedUsers).map((user, index) => (
                <tr key={user.id}>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">
                    {index + 1}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">
                    {user.name}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    {user.owner}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    {user.plan}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    <span
                      className={`px-2 py-1 rounded ${user.status === t("admin.subscription.status.active")
                        ? "bg-green-500 text-white"
                        : "bg-red-500 text-white"
                        }`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    {user.amount}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <div
                      className="relative"
                      ref={dropdownRef}
                      style={{ textAlign: isRTL ? "left" : "right" }}
                    >
                      <button
                        onClick={() => toggleDropdown(user.id)}
                        className="p-2 hover:bg-gray-100 rounded-full hover:cursor-pointer"
                        aria-haspopup="true"
                        aria-expanded={dropdownOpen === user.id}
                      >
                        <IoEllipsisVertical className="h-4 w-4 text-gray-600" />
                      </button>
                      {dropdownOpen === user.id && (
                        <div
                          className={`absolute z-20 mt-2 w-40 bg-white rounded-md shadow-lg ${isRTL ? "left-0" : "right-0"
                            }`}
                          role="menu"
                        >
                          <button
                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:cursor-pointer"
                            onClick={() => handleAction("view", user)}
                          >
                            {t("admin.subscription.actions.view")}
                          </button>
                          <button
                            className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 hover:cursor-pointer"
                            onClick={() => handleAction("delete", user)}
                          >
                            {t("admin.subscription.actions.delete")}
                          </button>
                          <button
                            className="block w-full text-left px-4 py-2 text-sm text-orange-600 hover:bg-gray-100 hover:cursor-pointer"
                            onClick={() => handleAction("hold", user)}
                          >
                            {t("admin.subscription.actions.hold")}
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

      {/* Subscription Plans Tab */}
      {activeTab === "subscriptionPlans" && (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-[#B4BBDF]">
              <tr>
                <th className="w-16 px-4 py-3 text-left text-sm font-semibold text-[#1E1E1E]">
                  #
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-[#1E1E1E] min-w-[120px]">
                  {t("admin.subscription.planTable.name")}
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-[#1E1E1E] min-w-[120px]">
                  {t("admin.subscription.planTable.type")}
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-[#1E1E1E] min-w-[120px]">
                  {t("admin.subscription.planTable.cars")}
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-[#1E1E1E] min-w-[100px]">
                  {t("admin.subscription.planTable.status")}
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-[#1E1E1E] min-w-[100px]">
                  {t("admin.subscription.planTable.amount")}
                </th>
                <th className="w-20 px-4 py-3 text-center text-sm font-semibold text-[#1E1E1E]">
                  {t("admin.subscription.planTable.actions")}
                </th>
              </tr>
            </thead>
            <tbody className="divide-gray-200">
              {getFilteredPlans(subscriptionPlans).map((plan, index) => (
                <tr key={plan.id}>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">
                    {index + 1}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">
                    {plan.name}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    {plan.type}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    {plan.cars}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    <span
                      className={`px-2 py-1 rounded ${plan.status === t("admin.subscription.status.active")
                        ? "bg-green-500 text-white"
                        : "bg-red-500 text-white"
                        }`}
                    >
                      {plan.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    {plan.amount}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <div
                      className="relative"
                      ref={dropdownRef}
                      style={{ textAlign: isRTL ? "left" : "right" }}
                    >
                      <button
                        onClick={() => toggleDropdown(plan.id)}
                        className="p-2 hover:bg-gray-100 rounded-full hover:cursor-pointer"
                        aria-haspopup="true"
                        aria-expanded={dropdownOpen === plan.id}
                      >
                        <IoEllipsisVertical className="h-4 w-4 text-gray-600" />
                      </button>
                      {dropdownOpen === plan.id && (
                        <div
                          className={`absolute z-20 mt-2 w-40 bg-white rounded-md shadow-lg ${isRTL ? "left-0" : "right-0"
                            }`}
                          role="menu"
                        >
                          <button
                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:cursor-pointer"
                            onClick={() => handleAction("view", plan)}
                          >
                            {t("admin.subscription.actions.view")}
                          </button>
                          <button
                            className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 hover:cursor-pointer"
                            onClick={() => handleAction("delete", plan)}
                          >
                            {t("admin.subscription.actions.delete")}
                          </button>
                          <button
                            className="block w-full text-left px-4 py-2 text-sm text-orange-600 hover:bg-gray-100 hover:cursor-pointer"
                            onClick={() => handleAction("hold", plan)}
                          >
                            {t("admin.subscription.actions.hold")}
                          </button>
                          <button
                            className="block w-full text-left px-4 py-2 text-sm text-orange-600 hover:bg-gray-100 hover:cursor-pointer"
                            onClick={() => handleAction("edit", plan)}
                          >
                            {t("admin.subscription.actions.edit")}
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

      {/* Empty State */}
      {((activeTab === "subscribedUsers" &&
        getFilteredUsers(subscribedUsers).length === 0) ||
        (activeTab === "subscriptionPlans" &&
          getFilteredPlans(subscriptionPlans).length === 0)) && (
          <div className="text-center py-12">
            <p className="text-gray-500">
              {t(
                `admin.subscription.empty.${activeTab === "subscribedUsers" ? "users" : "plans"
                }`
              )}
            </p>
            <button
              className="mt-4 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100"
              onClick={() =>
                activeTab === "subscribedUsers"
                  ? setUserSearchTerm("")
                  : setPlanBillingType("All")
              }
            >
              {t("admin.subscription.empty.clear")}
            </button>
          </div>
        )}

      {/* Modals */}
      <Modal
        isOpen={isContractualActive}
        onClose={() => {
          setIsContractualActive(false);
        }}
      >
        <AddContractualCustomers />
      </Modal>
      <Modal isOpen={isAddOneActive} onClose={() => setIsAddOneActive(false)}>
        <AddPlan />
      </Modal>
      <Modal isOpen={serviceFeeModal} onClose={() => setServiceFeeModal(false)}>
        <AddServiceFee />
      </Modal>
    </div>
  );
};

export default Dashboard;
