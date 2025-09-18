import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Search,
  MoreHorizontal,
  Clock,
  AlertTriangle,
  CheckCircle,
} from "lucide-react";
import Modal from "../../shared/Modal";
import VehiclesDetails from "./HelperComponent/VehiclesDetails";
import i18n from "../../i18n";
const tableData = [
  {
    id: 1,
    customer: { name: "Saydun Tuhin", email: "Info@Gamil.Com" },
    vehicle: "MERCEDES-BENZ CLA",
    dates: { start: "06/06/2025, 08:00 PM", end: "12/15/2025, 10:00 AM" },
    amount: 25,
    status: "Completed",
    daysLeft: "1 Day Left",
    rating: 4.8,
    totalTrips: 50,
    vehicleImage: "/car1.jpg",
    tripLocation: "Banasree",
    dropOffLocation: "Cantonment",
    vehicleType: "Car",
    persons: 4,
    phoneNumber: "1234567890",
    bookingDate: "06 Jun 2025",
    bookingTime: "08:00 PM",
    paymentType: "Cash",
  },
  {
    id: 2,
    customer: { name: "Jubayer Ahmad", email: "Info@Gamil.Com" },
    vehicle: "MERCEDES-BENZ CLA",
    dates: { start: "06/06/2025, 08:00 PM", end: "12/15/2025, 10:00 AM" },
    amount: 25,
    status: "Overdue",
    daysLeft: "1 Overdue",
    rating: 4.8,
    totalTrips: 50,
    vehicleImage: "/car2.jpg",
    tripLocation: "Banasree",
    dropOffLocation: "Cantonment",
    vehicleType: "Car",
    persons: 4,
    phoneNumber: "1234567890",
    bookingDate: "06 Jun 2025",
    bookingTime: "08:00 PM",
    paymentType: "Cash",
  },
  {
    id: 3,
    customer: { name: "Muhammad", email: "Info@Gamil.Com" },
    vehicle: "MERCEDES-BENZ CLA",
    dates: { start: "06/06/2025, 08:00 PM", end: "12/15/2025, 10:00 AM" },
    amount: 25,
    status: "Active",
    daysLeft: "3 Days",
    rating: 4.8,
    totalTrips: 50,
    vehicleImage: "/car1.jpg",
    tripLocation: "Banasree",
    dropOffLocation: "Cantonment",
    vehicleType: "Car",
    persons: 4,
    phoneNumber: "1234567890",
    bookingDate: "06 Jun 2025",
    bookingTime: "08:00 PM",
    paymentType: "Cash",
  },
  {
    id: 4,
    customer: { name: "Abdul Mannan", email: "Info@Gamil.Com" },
    vehicle: "MERCEDES-BENZ CLA",
    dates: { start: "06/06/2025, 08:00 PM", end: "12/15/2025, 10:00 AM" },
    amount: 25,
    status: "Completed",
    daysLeft: "1 Day Left",
    rating: 4.8,
    totalTrips: 50,
    vehicleImage: "/car1.jpg",
    tripLocation: "Banasree",
    dropOffLocation: "Cantonment",
    vehicleType: "Car",
    persons: 4,
    phoneNumber: "1234567890",
    bookingDate: "06 Jun 2025",
    bookingTime: "08:00 PM",
    paymentType: "Cash",
  },
  {
    id: 5,
    customer: { name: "MAHBUBUR RAHMAN", email: "Info@Gamil.Com" },
    vehicle: "MERCEDES-BENZ CLA",
    dates: { start: "06/06/2025, 08:00 PM", end: "12/15/2025, 10:00 AM" },
    amount: 25,
    status: "Completed",
    daysLeft: "1 Day Left",
    rating: 4.8,
    totalTrips: 50,
    vehicleImage: "/car2.jpg",
    tripLocation: "Banasree",
    dropOffLocation: "Cantonment",
    vehicleType: "Car",
    persons: 4,
    phoneNumber: "1234567890",
    bookingDate: "06 Jun 2025",
    bookingTime: "08:00 PM",
    paymentType: "Cash",
  },
];

export default function RentalData() {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");
  const [dateFilter, setDateFilter] = useState({ startDate: "", endDate: "" });
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [detailsItem, setDetailsItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (data) => {
    setDetailsItem(data);
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setDetailsItem(null);
  };

  const getStatusBadge = (status) => {
    const baseClass =
      "inline-flex items-center px-3 py-1 rounded-full text-sm font-medium text-white";
    const statusText = t(`rentalData.${status.toLowerCase()}`);
    if (status === "Completed") {
      return (
        <span className={baseClass} style={{ backgroundColor: "#99AAFF" }}>
          {statusText}
        </span>
      );
    } else if (status === "Overdue") {
      return (
        <span className={baseClass} style={{ backgroundColor: "#860000" }}>
          {statusText}
        </span>
      );
    } else if (status === "Active") {
      return (
        <span className={baseClass} style={{ backgroundColor: "#00782A" }}>
          {statusText}
        </span>
      );
    }
    return null;
  };

  const getDaysLeftIcon = (status) => {
    if (status === "Overdue")
      return <AlertTriangle className="w-4 h-4" style={{ color: "#860000" }} />;
    if (status === "Active")
      return <CheckCircle className="w-4 h-4" style={{ color: "#00782A" }} />;
    return <Clock className="w-4 h-4" style={{ color: "#C28400" }} />;
  };

  const parseDate = (dateStr) => {
    const [datePart] = dateStr.split(", ");
    const [month, day, year] = datePart.split("/").map(Number);
    return new Date(year, month - 1, day);
  };

  const handleDateFilter = (e) => {
    const { name, value } = e.target;
    setDateFilter((prev) => ({ ...prev, [name]: value }));
  };

  const toggleDropdown = (id) => {
    setActiveDropdown(activeDropdown === id ? null : id);
  };

  const filteredAndSortedData = tableData
    .filter((row) => {
      const matchesSearch =
        row.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        row.customer.email.toLowerCase().includes(searchTerm.toLowerCase());

      if (!dateFilter.startDate && !dateFilter.endDate) return matchesSearch;

      const rowDate = parseDate(row.dates.start);
      const filterStart = dateFilter.startDate
        ? new Date(dateFilter.startDate)
        : null;
      const filterEnd = dateFilter.endDate
        ? new Date(dateFilter.endDate)
        : null;

      const normalizeDate = (date) =>
        new Date(date.getFullYear(), date.getMonth(), date.getDate());

      const normalizedRowDate = normalizeDate(rowDate);
      const normalizedFilterStart = filterStart
        ? normalizeDate(filterStart)
        : null;
      const normalizedFilterEnd = filterEnd ? normalizeDate(filterEnd) : null;

      const matchesDate =
        (!normalizedFilterStart ||
          normalizedRowDate >= normalizedFilterStart) &&
        (!normalizedFilterEnd || normalizedRowDate <= normalizedFilterEnd);

      return matchesSearch && matchesDate;
    })
    .sort((a, b) => parseDate(b.dates.start) - parseDate(a.dates.start));

  return (
    <div className="w-full mx-auto py-6" dir={i18n.dir()}>
      {/* Controls */}
      <div className="flex flex-col sm:flex-row sm:justify-end gap-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <input
            type="date"
            name="startDate"
            value={dateFilter.startDate}
            onChange={handleDateFilter}
            className="w-full sm:w-48 border border-gray-300 px-3 py-2 rounded"
          />
          <input
            type="date"
            name="endDate"
            value={dateFilter.endDate}
            onChange={handleDateFilter}
            className="w-full sm:w-48 border border-gray-300 px-3 py-2 rounded"
          />
        </div>
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            placeholder={t("rentalData.searchPlaceholder")}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 w-full sm:w-64 border border-gray-300 px-3 py-2 rounded"
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg border border-gray-200 pb-20">
        {filteredAndSortedData.length > 0 ? (
          <table className="w-full min-w-[800px] text-start">
            <thead className="" style={{ backgroundColor: "#B4BBDF" }}>
              <tr>
                {[
                  "customer",
                  "vehicle",
                  "dates",
                  "amount",
                  "status",
                  "daysLeft",
                  "actions",
                ].map((key) => (
                  <th
                    key={key}
                    className="px-6 py-4 text-start text-sm font-semibold whitespace-nowrap "
                    style={{ color: "#1E1E1E" }}
                  >
                    {t(`rentalData.${key}`)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredAndSortedData.map((row) => (
                <tr
                  key={row.id}
                  style={{ backgroundColor: "#DFE1F1" }}
                  className="border-b border-gray-400"
                >
                  <td className="px-6 py-4">
                    <div>
                      <div className="font-medium text-[#1E1E1E]">
                        {row.customer.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        {row.customer.email}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-[#1E1E1E]">
                    {row.vehicle || "N/A"}
                  </td>
                  <td className="px-6 py-4 text-sm text-[#1E1E1E]">
                    <div>{row.dates.start} -</div>
                    <div className="text-[#860000]">{row.dates.end}</div>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-[#1E1E1E]">
                    ${row.amount}
                  </td>
                  <td className="px-6 py-4">{getStatusBadge(row.status)}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {getDaysLeftIcon(row.status)}
                      <span className="text-sm text-[#1E1E1E]">
                        {row.daysLeft}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 relative">
                    <button
                      onClick={() => toggleDropdown(row.id)}
                      className="h-8 w-8 p-0 text-gray-600 hover:text-black"
                    >
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                    {activeDropdown === row.id && (
                      <div
                        className={`absolute flex flex-col w-36 bg-white items-start p-2 z-10 top-[60%] rounded-xl shadow-lg ${
                          i18n.dir() === "rtl" ? "left-[60%]" : "right-[60%]"
                        }`}
                      >
                        {}
                        <button
                          onClick={() => openModal(row)}
                          className="hover:bg-gray-200 p-1 rounded w-full text-start"
                        >
                          {t("rentalData.viewDetails")}
                        </button>
                        <button className="hover:bg-gray-200 p-1 rounded w-full text-start text-red-500">
                          {t("rentalData.delete")}
                        </button>
                        <div
                          className={`w-3 h-3 bg-white absolute  ${
                            i18n.dir() === "rtl"
                              ? "left-3 -top-[6px]"
                              : "right-0 -top-[12px]"
                          } rotate-45`}
                        />
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="text-center py-6 text-gray-500">
            {t("rentalData.noResults")}
          </div>
        )}
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <VehiclesDetails data={detailsItem} />
      </Modal>
    </div>
  );
}
