"use client";

import { useState, useRef } from "react";
import { FaUpload } from "react-icons/fa";
import { useTranslation } from "react-i18next";

const Collaborator = ({ setIsAddCollaborator }) => {
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    organizationName: "",
    phoneNumber: "",
    sectorOfCompany: "",
    aboutCompany: "",
    startingDate: "",
    endingDate: "",
  });

  const [uploadedLogo, setUploadedLogo] = useState(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const logoInputRef = useRef(null);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleLogoUpload(files[0]);
    }
  };

  const handleLogoUpload = (file) => {
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedLogo(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLogoInputChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleLogoUpload(file);
    }
  };

  const handleSubmit = () => {
    console.log("Collaboration form data:", formData);
    console.log("Uploaded logo:", uploadedLogo);
    // Submit to API here
    alert(t("collaborator.submit") + " " + t("collaborator.title"));
    setIsAddCollaborator(false);
  };

  return (
    <div className="px-5 md:px-20 mx-auto">
      <div className="">
        <h1 className="text-2xl font-bold text-[#0B2088] mb-8">
          {t("collaborator.title")}
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Form Fields */}
          <div className="lg:col-span-2 space-y-6">
            {/* Organization Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                {t("collaborator.organizationName")}
              </label>
              <input
                type="text"
                value={formData.organizationName}
                onChange={(e) =>
                  handleInputChange("organizationName", e.target.value)
                }
                placeholder={t("collaborator.organizationName")}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50"
              />
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                {t("collaborator.phoneNumber")}
              </label>
              <input
                type="tel"
                value={formData.phoneNumber}
                onChange={(e) =>
                  handleInputChange("phoneNumber", e.target.value)
                }
                placeholder="+880 012**"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50"
              />
            </div>

            {/* Sector Of The Company */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                {t("collaborator.sectorOfCompany")}
              </label>
              <input
                type="text"
                value={formData.sectorOfCompany}
                onChange={(e) =>
                  handleInputChange("sectorOfCompany", e.target.value)
                }
                placeholder={t("collaborator.sectorOfCompany")}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50"
              />
            </div>

            {/* About Company */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                {t("collaborator.aboutCompany")}
              </label>
              <textarea
                value={formData.aboutCompany}
                onChange={(e) =>
                  handleInputChange("aboutCompany", e.target.value)
                }
                placeholder={t("collaborator.aboutCompany")}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none bg-gray-50"
              />
            </div>

            {/* Date Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  {t("collaborator.startingDate")}
                </label>
                <input
                  type="date"
                  value={formData.startingDate}
                  onChange={(e) =>
                    handleInputChange("startingDate", e.target.value)
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  {t("collaborator.endingDate")}
                </label>
                <input
                  type="date"
                  value={formData.endingDate}
                  onChange={(e) =>
                    handleInputChange("endingDate", e.target.value)
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50"
                />
              </div>
            </div>
            {/* contractr */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                {t("attachment")}
              </label>
              <input
                type="file"

                placeholder="contract"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50"
              />
            </div>
          </div>

          {/* Right Column - Logo Upload */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              {t("collaborator.uploadLogo")}
            </label>
            <div
              className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${isDragOver
                ? "border-blue-500 bg-blue-50"
                : uploadedLogo
                  ? "border-green-500 bg-green-50"
                  : "border-gray-300 bg-gray-50"
                }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => logoInputRef.current?.click()}
            >
              {uploadedLogo ? (
                <div className="space-y-2">
                  <img
                    src={uploadedLogo || "/placeholder.svg"}
                    alt="Company logo"
                    className="w-20 h-20 object-cover rounded-lg mx-auto"
                  />
                  <p className="text-xs text-green-600 font-medium">
                    {t("collaborator.logoUploaded")}
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  <FaUpload className="w-8 h-8 text-gray-400 mx-auto" />
                  <p className="text-sm text-gray-500">
                    {t("collaborator.uploadPhoto")}
                  </p>
                  <p className="text-xs text-gray-400">
                    {t("collaborator.png")}
                  </p>
                </div>
              )}
              <input
                ref={logoInputRef}
                type="file"
                accept="image/*"
                onChange={handleLogoInputChange}
                className="hidden"
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-8 flex justify-center">
          <button
            onClick={handleSubmit}
            className="w-full max-w-md bg-gradient-to-r from-[#071352] to-[#0023CF] text-white hover:cursor-pointer py-3 px-6 rounded-lg font-semibold transition-colors"
          >
            {t("collaborator.submit")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Collaborator;
