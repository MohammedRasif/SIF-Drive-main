"use client";

import { FaMapMarkerAlt, FaMap } from "react-icons/fa";
import { useTranslation } from "react-i18next";

const ReportDetails = ({ data }) => {
  const { t } = useTranslation();

  if (!data) return null;

  const handleMapClick = () => {
    const mapUrl = `https://www.google.com/maps?q=${data.location.latitude},${data.location.longitude}`;
    window.open(mapUrl, "_blank");
  };

  return (
    <div className="bg-white rounded-lg w-full max-w-2xl md:w-xl p-6 space-y-6 mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-200 pb-4">
        <h2 className="text-xl font-bold text-gray-900">
          {t("reportDetails.title")}
        </h2>
      </div>

      {/* Report Info */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
        <div>
          <span className="font-semibold text-gray-700">
            {t("reportDetails.reportedBy")}
          </span>
          <span className="ml-2 text-gray-900">{data.username}</span>
        </div>
        <div>
          <span className="font-semibold text-gray-700">
            {t("reportDetails.date")}
          </span>
          <span className="ml-2 text-gray-900">{data.dateOfOccurrence}</span>
        </div>
      </div>

      {/* Description Section */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-3">
          {t("reportDetails.description")}
        </h3>
        <p className="text-gray-700 leading-relaxed">{data.description}</p>
      </div>

      {/* Pictures Section */}
      {data.images && data.images.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">
            {t("reportDetails.pictures")}
          </h3>
          <div className="flex gap-4">
            {data.images.slice(0, 2).map((image, index) => (
              <div
                key={index}
                className="w-1/2 relative overflow-hidden rounded-lg"
              >
                <img
                  src={image || "/placeholder.svg?height=200&width=300"}
                  alt={`Report image ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Location Section */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-3">
          {t("reportDetails.location")}
        </h3>
        <div className="flex items-center gap-3">
          <div className="flex-1">
            <div className="relative">
              <FaMapMarkerAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={data.location.name}
                readOnly
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-700 cursor-pointer"
                onClick={handleMapClick}
              />
            </div>
          </div>
          <button
            onClick={handleMapClick}
            className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg transition-colors flex-shrink-0"
            title={t("reportDetails.openInMaps")}
          >
            <FaMap className="w-5 h-5" />
          </button>
        </div>

        <p className="text-xs text-gray-500 mt-2">
          {t("reportDetails.coordinates")}: {data.location.latitude},{" "}
          {data.location.longitude}
        </p>
      </div>
    </div>
  );
};

export default ReportDetails;
