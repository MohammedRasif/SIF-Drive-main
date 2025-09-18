import React, { useState } from "react";
import { useTranslation } from "react-i18next";

const LanguageSelector = () => {
  const { t, i18n } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState(
    i18n.language || "en"
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    i18n.changeLanguage(selectedLanguage);
    // document.dir = selectedLanguage === "ar" ? "rtl" : "ltr";
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <form onSubmit={handleSubmit} className="p-6 w-sm">
        <h2 className="text-lg font-semibold text-gray-800 mb-4 text-center">
          {t("selectLanguage")}
        </h2>
        <div className="mb-4 space-y-4">
          {/* English */}
          <label
            className={`flex items-center border rounded-lg p-3 cursor-pointer transition ${
              selectedLanguage === "en"
                ? "border-blue-600 bg-blue-50"
                : "border-gray-300 hover:border-blue-400"
            }`}
          >
            <input
              type="radio"
              value="en"
              checked={selectedLanguage === "en"}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="mr-3 accent-blue-600"
            />
            <span className="flex items-center gap-2 text-gray-800">
              {t("english")}
            </span>
          </label>

          {/* Arabic */}
          <label
            className={`flex items-center border rounded-lg p-3 cursor-pointer transition ${
              selectedLanguage === "ar"
                ? "border-blue-600 bg-blue-50"
                : "border-gray-300 hover:border-blue-400"
            }`}
          >
            <input
              type="radio"
              value="ar"
              checked={selectedLanguage === "ar"}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="mr-3 accent-blue-600"
            />
            <span className="flex items-center gap-2 text-gray-800">
              {t("arabic")}
            </span>
          </label>
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {t("submit")}
        </button>
      </form>
    </div>
  );
};

export default LanguageSelector;
