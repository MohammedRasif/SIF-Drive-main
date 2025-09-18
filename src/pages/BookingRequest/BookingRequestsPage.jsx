import { useState } from "react";
import { useTranslation } from "react-i18next";
import ReusableBookingTable from "./BookingTable";
import { FaSearch } from "react-icons/fa";

const BookingRequestsPage = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState("Company");
  const [searchTerm, setSearchTerm] = useState("");

  const allBookings = [
    {
      id: 1,
      customer: { name: "Jubayer Ahmad", contact: "C: Bocalling it Ltd." },
      vehicle: { model: "BMW 7 Series", type: "Luxury Sedan" },
      dates: { start: "8/15/2026, 10:00 AM", end: "12/15/2026, 10:00 AM" },
      approvedBy: { name: "Jubaer Ahamed", role: "Ui/Ux Designer" },
      amount: "$300",
      status: "pending",
      type: "company",
    },
    {
      id: 2,
      customer: { name: "Jubayer Ahmad", contact: "jubayer@gmail.com" },
      vehicle: { model: "BMW 7 Series", type: "Luxury Sedan" },
      dates: { start: "8/15/2026, 10:00 AM", end: "12/15/2026, 10:00 AM" },
      approvedBy: { name: "Jubaer Ahamed", role: "Ui/Ux Designer" },
      amount: "$300",
      status: "confirmed",
      type: "company",
    },
    {
      id: 3,
      customer: { name: "Jubayer Ahmad", contact: "C: Bocalling it Ltd." },
      vehicle: { model: "BMW 7 Series", type: "Luxury Sedan" },
      dates: { start: "8/15/2026, 10:00 AM", end: "12/15/2026, 10:00 AM" },
      approvedBy: { name: "Jubaer Ahamed", role: "Ui/Ux Designer" },
      amount: "$300",
      status: "pending",
      type: "company",
    },
    {
      id: 4,
      customer: { name: "John Doe", contact: "john@example.com" },
      vehicle: { model: "Toyota Camry", type: "Standard Sedan" },
      dates: { start: "9/1/2026, 2:00 PM", end: "9/5/2026, 2:00 PM" },
      approvedBy: { name: "Jane Smith", role: "Manager" },
      amount: "$200",
      status: "pending",
      type: "user",
    },
    {
      id: 5,
      customer: { name: "Alice Johnson", contact: "alice@example.com" },
      vehicle: { model: "Honda Accord", type: "Mid-size Sedan" },
      dates: { start: "10/1/2026, 9:00 AM", end: "10/3/2026, 9:00 AM" },
      approvedBy: { name: "Bob Wilson", role: "Supervisor" },
      amount: "$150",
      status: "confirmed",
      type: "user",
    },
  ];

  const filteredData = allBookings.filter((booking) => {
    const matchesTab = booking.type === activeTab.toLowerCase();
    const matchesSearch =
      booking.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.vehicle.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.approvedBy.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      booking.amount.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesTab && matchesSearch;
  });

  const handleApprove = (booking) => {
    console.log("Approve booking:", booking);
  };

  const handleDeny = (booking) => {
    console.log("Deny booking:", booking);
  };

  return (
    <div className="min-h-screen">
      <div className="mx-auto px-5 md:px-20">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900">
            {t("bookingRequests.title")}
          </h1>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 flex-wrap mb-10">
          {/* Tabs */}
          <div className="flex space-x-4 sm:space-x-6 md:space-x-8">
            <button
              onClick={() => setActiveTab("Company")}
              className={`pb-2 text-base sm:text-lg md:text-xl font-semibold border-b-2 transition-colors ${activeTab === "Company"
                  ? "text-blue-600 border-blue-600"
                  : "text-gray-500 border-transparent hover:text-gray-700"
                }`}
            >
              {t("bookingRequests.tabs.company")}
            </button>
            <button
              onClick={() => setActiveTab("User")}
              className={`pb-2 text-base sm:text-lg md:text-xl font-semibold border-b-2 transition-colors ${activeTab === "User"
                  ? "text-blue-600 border-blue-600"
                  : "text-gray-500 border-transparent hover:text-gray-700"
                }`}
            >
              {t("bookingRequests.tabs.user")}
            </button>
          </div>

          {/* Search Bar */}
          <div className="relative w-full sm:w-80">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder={t("bookingRequests.searchPlaceholder")}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border-3 border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Booking Table */}
        <ReusableBookingTable
          data={filteredData}
          onApprove={handleApprove}
          onDeny={handleDeny}
          isuser={activeTab}
        />
      </div>
    </div>
  );
};

export default BookingRequestsPage;
