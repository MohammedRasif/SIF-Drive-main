"use client";

import { useReducer, useRef } from "react";
import { useTranslation } from "react-i18next";
import { formReducer, initialState } from "./formReducer";

const AddNewCarForm = ({ setIsModalOpen, id }) => {
  const { t } = useTranslation();
  const [state, dispatch] = useReducer(formReducer, initialState);
  const fileInputRef = useRef(null);

  const handleInputChange = (section, field, value) => {
    dispatch({
      type: "UPDATE_FIELD",
      payload: { section, field, value },
    });
  };

  const handleCheckboxChange = (section, field) => {
    dispatch({
      type: "TOGGLE_CHECKBOX",
      payload: { section, field },
    });
  };

  // ... other handlers remain the same
  const handleDragOver = (e) => {
    e.preventDefault();
    dispatch({ type: "SET_DRAG_OVER", payload: true });
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    dispatch({ type: "SET_DRAG_OVER", payload: false });
  };

  const handleDrop = (e) => {
    e.preventDefault();
    dispatch({ type: "SET_DRAG_OVER", payload: false });
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileUpload(files[0]);
    }
  };

  const handleFileUpload = (file) => {
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        dispatch({ type: "SET_IMAGE", payload: e.target.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", state.formData);
    console.log("Uploaded image:", state.uploadedImage);
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    console.log("Form cancelled");
    setIsModalOpen(false);
  };
  const locations = [
    "jafnayn",
    "alKhoud",
    "alKhuwair",
    "alMaabilah",
    "alMawaleh",
    "alMouj",
    "alBustan",
    "alHail",
    "alSifah",
    "alWuttayah",
    "amerat",
    "ansab",
    "azaiba",
    "barrAlJissah",
    "bosher",
    "darsait",
    "ghala",
    "ghubrah",
    "halban",
    "hamriya",
    "madentSultan",
    "qaboos",
    "manumah",
    "misfah",
    "muscatHills",
    "muttrah",
    "qantab",
    "quriyat",
    "qurm",
    "rusail",
    "ruwi",
    "seeb",
    "sidab",
    "wadiAlKabir",
    "yenkit",
    "yiti"
  ];


  return (
    <div className="w-full max-w-7xl h-[80vh] mx-auto overflow-hidden">
      <div className="h-full overflow-y-auto">
        <div className="bg-white rounded-lg md:p-4 md:m-4">
          {/* Header */}
          <div className="mb-4">
            <h1 className="text-xl font-bold text-gray-900 mb-1">
              {t("addNewCar.title")}
            </h1>
            <p className="text-gray-600 text-sm">{t("addNewCar.subtitle")}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Location */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                {t("addNewCar.location")}
              </label>
              <select
                value={state.formData.location}
                onChange={(e) => handleInputChange(null, "location", e.target.value)}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 text-sm"
              >
                <option value="">{t("addNewCar.locationPlaceholder")}</option>
                {locations.map((loc) => (
                  <option key={loc} value={loc}>
                    {t(`addNewCar.locations.${loc}`)}
                  </option>
                ))}
              </select>
            </div>

            {/* Car Model */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                {t("addNewCar.carModel")}
              </label>
              <input
                type="text"
                placeholder={t("addNewCar.carModelPlaceholder")}
                value={state.formData.carModel}
                onChange={(e) =>
                  handleInputChange(null, "carModel", e.target.value)
                }
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500 text-sm"
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* Car Features */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  {t("addNewCar.carFeatures")}
                </label>
                <div className="space-y-2">
                  {[
                    {
                      key: "airConditioning",
                      label: t("addNewCar.features.airConditioning"),
                    },
                    {
                      key: "automaticTransmission",
                      label: t("addNewCar.features.automaticTransmission"),
                    },
                    { key: "petrol", label: t("addNewCar.features.petrol") },
                    {
                      key: "withDriver",
                      label: t("addNewCar.features.withDriver"),
                    },
                  ].map((feature) => (
                    <label
                      key={feature.key}
                      className="flex items-center cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={state.formData.features[feature.key]}
                        onChange={() =>
                          handleCheckboxChange("features", feature.key)
                        }
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                      />
                      <span className="mx-2 text-gray-700 text-sm">
                        {feature.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Upload Car Picture */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  {t("addNewCar.uploadCarPicture")}
                </label>
                <div
                  className={`border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition-colors ${state.isDragOver
                    ? "border-blue-500 bg-blue-50"
                    : state.uploadedImage
                      ? "border-green-500 bg-green-50"
                      : "border-gray-300 bg-gray-50"
                    }`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                >
                  {state.uploadedImage ? (
                    <div className="space-y-1">
                      <img
                        src={state.uploadedImage || "/placeholder.svg"}
                        alt={t("addNewCar.uploadCarPicture")}
                        className="w-16 h-16 object-cover rounded-lg mx-auto"
                      />
                      <p className="text-xs text-green-600 font-medium">
                        {t("addNewCar.imageUploadedSuccess")}
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-1">
                      <div className="w-10 h-10 mx-auto bg-gray-200 rounded-full flex items-center justify-center">
                        <svg
                          className="w-5 h-5 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                          />
                        </svg>
                      </div>
                      <p className="text-xs text-gray-500">
                        {t("addNewCar.uploadPhoto")}
                      </p>
                    </div>
                  )}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileInputChange}
                    className="hidden"
                  />
                </div>
              </div>
            </div>

            {/* Capacity */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                {t("addNewCar.capacity")}
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs text-gray-600 mb-1">
                    {t("addNewCar.passengers")}
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="8"
                    value={state.formData.capacity.passengers}
                    onChange={(e) =>
                      handleInputChange(
                        "capacity",
                        "passengers",
                        e.target.value
                      )
                    }
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-600 mb-1">
                    {t("addNewCar.suitcases")}
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="6"
                    value={state.formData.capacity.suitcases}
                    onChange={(e) =>
                      handleInputChange("capacity", "suitcases", e.target.value)
                    }
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-600 mb-1">
                    {t("addNewCar.mileageLimit")}
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      value={state.formData.capacity.mileageLimit}
                      onChange={(e) =>
                        handleInputChange(
                          "capacity",
                          "mileageLimit",
                          e.target.value
                        )
                      }
                      className="w-full px-3 py-2 pr-10 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 text-sm"
                    />
                    <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-xs">
                      {t("addNewCar.km")}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Pricing */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                {t("addNewCar.pricing")}
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-gray-600 mb-1">
                    {t("addNewCar.pricePerDay")}
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-xs">
                      OMR
                    </span>
                    <input
                      type="number"
                      step="0.01"
                      value={state.formData.pricing.pricePerDay}
                      onChange={(e) =>
                        handleInputChange(
                          "pricing",
                          "pricePerDay",
                          e.target.value
                        )
                      }
                      className="w-full pl-7 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 text-sm"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs text-gray-600 mb-1">
                    {t("addNewCar.discountPrice")}
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-xs">
                      OMR
                    </span>
                    <input
                      type="number"
                      step="0.01"
                      value={state.formData.pricing.discountPrice}
                      onChange={(e) =>
                        handleInputChange(
                          "pricing",
                          "discountPrice",
                          e.target.value
                        )
                      }
                      className="w-full pl-7 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 text-sm"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* This Deal Include */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                {t("addNewCar.dealInclude")}
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                {[
                  {
                    key: "freeCancellation",
                    label: t("addNewCar.deals.freeCancellation"),
                  },
                  {
                    key: "theftProtection",
                    label: t("addNewCar.deals.theftProtection"),
                  },
                  {
                    key: "fairFuelPolicy",
                    label: t("addNewCar.deals.fairFuelPolicy"),
                  },
                  {
                    key: "freeCollisionWaiver",
                    label: t("addNewCar.deals.freeCollisionWaiver"),
                  },
                  {
                    key: "unlimitedMileage",
                    label: t("addNewCar.deals.unlimitedMileage"),
                  },
                ].map((deal) => (
                  <label
                    key={deal.key}
                    className="flex items-center cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={state.formData.dealIncludes[deal.key]}
                      onChange={() =>
                        handleCheckboxChange("dealIncludes", deal.key)
                      }
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                    />
                    <span className="mx-2 text-gray-700 text-sm">
                      {deal.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <button
                type="button"
                onClick={handleCancel}
                className="w-full sm:w-auto px-6 py-2 border-2 border-blue-600 text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors text-sm hover:cursor-pointer"
              >
                {t("addNewCar.buttons.cancel")}
              </button>
              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors text-sm hover:cursor-pointer"
              >
                {t("addNewCar.buttons.addCarRental")}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddNewCarForm;