"use client";

import { useEffect, useRef } from "react";
import { FaUpload, FaFileAlt, FaTrash } from "react-icons/fa";
import { useAccountReducer } from "./useAccountReducer";
import { useTranslation } from "react-i18next";

const AccountPage = () => {
  const { state, dispatch } = useAccountReducer();
  const { t, i18n } = useTranslation();
  const logoInputRef = useRef(null);
  const fileInputRefs = {
    vat: useRef(null),
    commercial: useRef(null),
    contract: useRef(null),
  };
  useEffect(() => {
    document.dir = i18n.language === "ar" ? "rtl" : "ltr";
  }, [i18n.language]);

  const handleInputChange = (field, value) => {
    dispatch({ type: "UPDATE_FORM_FIELD", payload: { field, value } });
  };

  const handleServiceChange = (service) => {
    dispatch({ type: "TOGGLE_SERVICE", payload: service });
  };

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
    if (files.length > 0 && files[0].type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = () => {
        dispatch({ type: "UPLOAD_LOGO", payload: reader.result });
      };
      reader.readAsDataURL(files[0]);
    }
  };

  const handleLogoInputChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = () => {
        dispatch({ type: "UPLOAD_LOGO", payload: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileUpload = (documentType) => (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      const reader = new FileReader();
      reader.onload = () => {
        dispatch({
          type: "UPLOAD_DOCUMENT",
          payload: { documentType, file: reader.result, fileName: file.name },
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveLogo = () => {
    dispatch({ type: "REMOVE_LOGO" });
  };

  const handleRemoveDocument = (documentType) => {
    dispatch({ type: "REMOVE_DOCUMENT", payload: documentType });
  };

  const handleUpdate = () => {
    console.log("Update form data:", state.formData);
    console.log("Uploaded logo:", state.uploadedLogo);
    console.log("Uploaded documents:", state.documents);
  };

  return (
    <div className="p-4 mx-auto lg:p-4">
      <div className="bg-white rounded-lg shadow-sm p-4 lg:p-5 max-h-[90vh] lg:overflow-y-auto">
        <h1 className="text-xl font-bold text-gray-900 mb-4 lg:text-2xl lg:mb-5">
          {t("updateInformation")}
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-5">
          {/* Left Column - Form Fields */}
          <div className="lg:col-span-2 space-y-4 lg:space-y-5">
            {/* Company Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                {t("companyName")}
              </label>
              <input
                type="text"
                value={state.formData.companyName}
                onChange={(e) =>
                  handleInputChange("companyName", e.target.value)
                }
                placeholder={t("companyName")}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                {t("phoneNumber")}
              </label>
              <input
                type="tel"
                value={state.formData.phoneNumber}
                onChange={(e) =>
                  handleInputChange("phoneNumber", e.target.value)
                }
                placeholder="+880 10*****"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
            </div>

            {/* About Company */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                {t("aboutCompany")}
              </label>
              <textarea
                value={state.formData.aboutCompany}
                onChange={(e) =>
                  handleInputChange("aboutCompany", e.target.value)
                }
                placeholder={t("aboutPlaceHolder")}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-sm"
              />
            </div>
          </div>

          {/* Right Column - Logo Upload */}
          <div className="h-full">
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              {t("updateLogo")}
            </label>
            <div
              className={`border-2 border-dashed md:h-[89%] rounded-lg p-4 text-center cursor-pointer transition-colors flex items-center justify-center ${
                state.isDragOver
                  ? "border-blue-500 bg-blue-50"
                  : state.uploadedLogo
                  ? "border-green-500 bg-green-50"
                  : "border-gray-300 bg-gray-50"
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => logoInputRef.current?.click()}
            >
              {state.uploadedLogo ? (
                <div className="space-y-1">
                  <img
                    src={state.uploadedLogo || "/placeholder.svg"}
                    alt="Company logo"
                    className="w-20 md:w-28 object-cover rounded-lg mx-auto"
                  />
                  <p className="text-xs text-green-600 font-medium">
                    {t("uploaded")}{" "}
                    {/* No key for "Logo uploaded!", keeping as is */}
                  </p>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveLogo();
                    }}
                    className="text-xs text-red-600 hover:text-red-700 font-medium"
                  >
                    <FaTrash className="inline mr-1" /> {t("remove")}
                  </button>
                </div>
              ) : (
                <div className="space-y-1">
                  <FaUpload className="w-6 h-6 text-gray-400 mx-auto" />
                  <p className="text-xs text-gray-500">{t("uploadPhoto")}</p>
                  <p className="text-xs text-gray-400">png, jpg</p>
                </div>
              )}
              <input
                ref={fileInputRefs}
                type="file"
                accept="image/*"
                onChange={handleLogoInputChange}
                className="hidden"
              />
            </div>
          </div>
        </div>

        {/* Services Section */}
        <div className="mt-6 lg:mt-5">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">
            {t("services")}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full md:w-1/2">
            {[
              { key: "insurance", label: t("insurance") },
              { key: "ecoFriendly", label: t("ecoFriendlyOptions") },
              { key: "driverOptions", label: t("driverOptions") },
              { key: "mileageOptions", label: t("mileageOptions") },
              { key: "roadsideAssistance", label: t("roadsideAssistance") },
              { key: "discountsLoyalty", label: t("discountsLoyalty") },
              { key: "specialDeals", label: t("specialDeals") },
              { key: "longDistanceRentals", label: t("longDistanceRentals") },
            ].map((service) => (
              <label
                key={service.key}
                className="flex items-center cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={state.formData.services[service.key]}
                  onChange={() => handleServiceChange(service.key)}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                />
                <span className="mx-2 text-gray-700 text-sm">
                  {service.label}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Upload Documents Section */}
        <div className="mt-6 lg:mt-5">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">
            {t("uploadDocuments")}
          </h3>
          <div className="space-y-2 w-full md:w-1/2">
            {[
              { key: "vat", label: t("vatCertificate") },
              { key: "commercial", label: t("commercialRegistration") },
              { key: "contract", label: t("contractToSigned") },
            ].map((doc) => (
              <div
                key={doc.key}
                className="flex items-center justify-between p-2 border border-gray-200 rounded-lg"
              >
                <div className="flex items-center gap-2 flex-1">
                  <FaFileAlt className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-700 text-sm truncate">
                    {state.documents[doc.key]?.fileName || doc.label}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {state.documents[doc.key] && (
                    <span className="text-xs text-green-600 font-medium">
                      {t("uploaded")}
                    </span>
                  )}
                  <input
                    type="file"
                    accept="application/pdf"
                    onChange={handleFileUpload(doc.key)}
                    className="hidden"
                    id={`file-upload-${doc.key}`}
                    ref={fileInputRefs[doc.key]}
                  />
                  <label
                    htmlFor={`file-upload-${doc.key}`}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-xs font-medium transition-colors cursor-pointer"
                  >
                    {t("upload")}
                  </label>
                  {state.documents[doc.key] && (
                    <button
                      onClick={() => handleRemoveDocument(doc.key)}
                      className="text-red-600 hover:text-red-700 text-xs"
                    >
                      <FaTrash />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Update Button */}
        <div className="mt-6 lg:mt-5 w-full md:w-1/2">
          <button
            onClick={handleUpdate}
            className="w-full bg-gradient-to-r from-[#071352] to-[#0023CF] text-white py-3 px-4 rounded-lg font-semibold transition-colors hover:cursor-pointer"
          >
            {t("update")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;
