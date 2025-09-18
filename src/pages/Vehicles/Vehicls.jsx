import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Search, Plus, MoreVertical, Edit, Trash2, Pause } from "lucide-react";
import Modal from "../../shared/Modal";
import AddNewCarForm from "./helpersComponent/AddNewCarForm";
import i18n from "../../i18n";

const Vehicles = () => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");
  const [dropdownOpenId, setDropdownOpenId] = useState(null);
  const [vehicles, setVehicles] = useState([
    {
      id: 1,
      rentalId: "AJ0125",
      name: "BMW 7 Series",
      seats: "6 Sit",
      charge: "$300",
      status: "active",
    },
    // ... other vehicles
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleDropdown = (id) => {
    setDropdownOpenId(dropdownOpenId === id ? null : id);
  };

  const handleEdit = (vehicle) => {
    console.log("Edit vehicle:", vehicle);
    setDropdownOpenId(null);
  };

  const handleDelete = (vehicleId) => {
    setVehicles(vehicles.filter((v) => v.id !== vehicleId));
    setDropdownOpenId(null);
  };

  const handleHold = (vehicleId) => {
    setVehicles(
      vehicles.map((v) =>
        v.id === vehicleId
          ? { ...v, status: v.status === "active" ? "hold" : "active" }
          : v
      )
    );
    setDropdownOpenId(null);
  };

  const handleAddNewCar = () => {
    setIsModalOpen(true);
  };

  const filteredVehicles = vehicles.filter(
    (v) =>
      v.rentalId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      v.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      v.seats.toLowerCase().includes(searchTerm.toLowerCase()) ||
      v.charge.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className=" bg-[#e7e9f5] p-6 px-5 md:px-20" dir={i18n.dir()}>
      <div className="mx-auto">
        {/* Header */}
        <div className="flex items-center flex-col md:flex-row justify-between mb-6">
          <h1 className="md:text-2xl text-4xl font-bold text-gray-900">
            {t("vehicles.title")}
          </h1>
          <div className="flex items-center flex-col md:flex-row mt-5 md:mt-0 gap-4 w-full md:w-fit">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder={t("vehicles.searchPlaceholder")}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-3 py-2 border border-gray-300 rounded-md w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              onClick={handleAddNewCar}
              className="flex w-full justify-center items-center bg-gradient-to-r from-[#071352] to-[#0023CF] hover:from-[#0023CF] hover:to-[#071352] transition-colors text-white px-4 py-2 rounded-md"
            >
              <Plus className="w-4 h-4 mr-2" />
              {t("vehicles.addNewCar")}
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="rounded-lg overflow-hidden">
          <div className="overflow-x-auto pb-30">
            <table className="w-full">
              <thead className="bg-[#B4BBDF] border-b">
                <tr>
                  <th className="text-start py-4 px-6 font-semibold text-[#1E1E1E]">
                    {t("vehicles.rentalId")}
                  </th>
                  <th className="text-start py-4 px-6 font-semibold text-[#1E1E1E]">
                    {t("vehicles.vehicleName")}
                  </th>
                  <th className="text-start py-4 px-6 font-semibold text-[#1E1E1E]">
                    {t("vehicles.seats")}
                  </th>
                  <th className="text-start py-4 px-6 font-semibold text-[#1E1E1E]">
                    {t("vehicles.charge")}
                  </th>
                  <th className="text-start py-4 px-6 font-semibold text-[#1E1E1E]">
                    {t("vehicles.actions")}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredVehicles.map((v) => (
                  <tr key={v.id} className="bg-[#DBDEEF] relative">
                    <td className="py-4 px-6 text-gray-900">{v.rentalId}</td>
                    <td className="py-4 px-6 text-gray-900">{v.name}</td>
                    <td className="py-4 px-6 text-gray-900">{v.seats}</td>
                    <td className="py-4 px-6 text-gray-900">{v.charge}</td>
                    <td className="py-4 px-6 relative">
                      <button
                        onClick={() => toggleDropdown(v.id)}
                        className="p-2 hover:bg-gray-200 rounded"
                      >
                        <MoreVertical className="h-4 w-4" />
                      </button>

                      {dropdownOpenId === v.id && (
                        <div
                          className="absolute z-10 mt-2 w-40 bg-white border border-gray-200 shadow-lg rounded-md"
                          style={{
                            top: "100%", // just below the button
                          }}
                        >
                          <button
                            onClick={() => handleEdit(v)}
                            className="flex items-center w-full px-4 py-2 text-sm hover:bg-gray-100"
                          >
                            <Edit className="w-4 h-4 mx-2" />
                            {t("vehicles.edit")}
                          </button>
                          <button
                            onClick={() => handleHold(v.id)}
                            className="flex items-center w-full px-4 py-2 text-sm text-orange-600 hover:bg-gray-100"
                          >
                            <Pause className="w-4 h-4 mx-2" />
                            {v.status === "active"
                              ? t("vehicles.hold")
                              : t("vehicles.activate")}
                          </button>
                          <button
                            onClick={() => handleDelete(v.id)}
                            className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                          >
                            <Trash2 className="w-4 h-4 mx-2" />
                            {t("vehicles.delete")}
                          </button>
                          <div
                            className={`h-3 w-3 absolute -top-[6px] rotate-45 bg-white -z-10 ${
                              i18n.dir() === "rtl" ? "right-3" : "left-3"
                            }`}
                          />
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredVehicles.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              {t("vehicles.noVehicles")}
            </div>
          )}
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <AddNewCarForm setIsModalOpen={setIsModalOpen} />
      </Modal>
    </div>
  );
};

export default Vehicles;
