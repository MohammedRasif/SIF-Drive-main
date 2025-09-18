"use client";

import React from "react";
import { useTranslation } from "react-i18next";
import { Star } from "lucide-react";

const VehiclesDetails = ({ data }) => {
  const { t } = useTranslation();

  return (
    <div className="bg-white rounded-lg w-full mx-4 overflow-hidden">
      {/* Header */}
      <div className="px-6 pt-6 pb-4">
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1">
            <h2 className="text-lg font-bold text-gray-900 mb-1">
              {data.vehicle}
            </h2>
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-medium text-gray-700">
                {data.rating}
              </span>
              <span className="text-sm text-gray-500">
                - ({t("vehiclesDetails.trips", { count: data.totalTrips })})
              </span>
            </div>
          </div>
          <img
            src={data.vehicleImage || "/placeholder.svg"}
            alt="Vehicle"
            className="w-16 h-12 object-cover rounded ml-4"
          />
        </div>
      </div>

      {/* Trip Details */}
      <div className="px-6 pb-6">
        <h3 className="text-base font-semibold text-gray-900 mb-4">
          {t("vehiclesDetails.tripDetails")}
        </h3>

        <div className="space-y-3">
          <div className="flex">
            <span className="flex-1/2 text-sm font-medium text-gray-700">
              {t("vehiclesDetails.tripLocation")}
            </span>
            <span className="text-sm flex-1/2 text-gray-900">
              {data.tripLocation}
            </span>
          </div>

          <div className="flex">
            <span className="flex-1/2 text-sm font-medium text-gray-700">
              {t("vehiclesDetails.dropOffLocation")}
            </span>
            <span className="text-sm flex-1/2 text-gray-900">
              {data.dropOffLocation}
            </span>
          </div>

          <div className="flex">
            <span className="flex-1/2 text-sm font-medium text-gray-700">
              {t("vehiclesDetails.vehicleType")}
            </span>
            <span className="text-sm flex-1/2 text-gray-900">
              {data.vehicleType}
            </span>
          </div>

          <div className="flex">
            <span className="flex-1/2 text-sm font-medium text-gray-700">
              {t("vehiclesDetails.persons")}
            </span>
            <span className="text-sm flex-1/2 text-gray-900">
              {data.persons}
            </span>
          </div>

          <div className="flex">
            <span className="flex-1/2 text-sm font-medium text-gray-700">
              {t("vehiclesDetails.email")}
            </span>
            <span className="text-sm flex-1/2 text-gray-900">
              {data.customer.email}
            </span>
          </div>

          <div className="flex">
            <span className="flex-1/2 text-sm font-medium text-gray-700">
              {t("vehiclesDetails.phoneNumber")}
            </span>
            <span className="text-sm flex-1/2 text-gray-900">
              {data.phoneNumber}
            </span>
          </div>

          <div className="flex">
            <span className="flex-1/2 text-sm font-medium text-gray-700">
              {t("vehiclesDetails.bookingDate")}
            </span>
            <span className="text-sm flex-1/2 text-gray-900">
              {data.dates.start.split(",")[0]}
            </span>
          </div>

          <div className="flex">
            <span className="flex-1/2 text-sm font-medium text-gray-700">
              {t("vehiclesDetails.bookingTime")}
            </span>
            <span className="text-sm flex-1/2 text-gray-900">
              {data.dates.start.split(",")[1]?.trim()}
            </span>
          </div>

          <div className="flex">
            <span className="flex-1/2 text-sm font-medium text-gray-700">
              {t("vehiclesDetails.tripAmount")}
            </span>
            <span className="text-sm flex-1/2 text-gray-900">
              $ {data.amount}
            </span>
          </div>

          <div className="flex">
            <span className="flex-1/2 text-sm font-medium text-gray-700">
              {t("vehiclesDetails.paymentType")}
            </span>
            <span className="text-sm flex-1/2 text-gray-900">
              {data.paymentType}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehiclesDetails;
