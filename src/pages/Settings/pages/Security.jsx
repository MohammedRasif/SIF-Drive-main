"use client";

import { useState, useActionState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useTranslation } from "react-i18next";

const SecurityPage = () => {
  const { t } = useTranslation();
  const tr = (key) => t(`securityPage.${key}`);

  const [showPasswords, setShowPasswords] = useState({
    oldPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  const [formState, submitAction, isPending] = useActionState(
    async (prevState, formData) => {
      const oldPassword = formData.get("oldPassword");
      const newPassword = formData.get("newPassword");
      const confirmPassword = formData.get("confirmPassword");

      const newErrors = {};

      if (!oldPassword) newErrors.oldPassword = tr("error.oldRequired");
      if (!newPassword) {
        newErrors.newPassword = tr("error.newRequired");
      } else if (newPassword.length < 8) {
        newErrors.newPassword = tr("error.length");
      }
      if (!confirmPassword) {
        newErrors.confirmPassword = tr("error.confirmRequired");
      } else if (newPassword !== confirmPassword) {
        newErrors.confirmPassword = tr("error.noMatch");
      }
      if (oldPassword === newPassword) {
        newErrors.newPassword = tr("error.sameAsOld");
      }

      if (Object.keys(newErrors).length > 0) {
        return { errors: newErrors, success: false };
      }

      console.log("Password update data:", { oldPassword, newPassword });
      alert(tr("success.updated"));

      return {
        errors: {},
        success: true,
        resetFields: true,
      };
    },
    { errors: {}, success: false }
  );

  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  if (formState.success && formState.resetFields) {
    setFormData({ oldPassword: "", newPassword: "", confirmPassword: "" });
    formState.resetFields = false;
  }

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (formState.errors[field]) formState.errors[field] = "";
  };

  const togglePasswordVisibility = (field) => {
    setShowPasswords((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const passwordFields = [
    {
      key: "oldPassword",
      label: tr("form.oldPassword"),
      placeholder: tr("form.oldPlaceholder"),
    },
    {
      key: "newPassword",
      label: tr("form.newPassword"),
      placeholder: tr("form.newPlaceholder"),
    },
    {
      key: "confirmPassword",
      label: tr("form.confirmPassword"),
      placeholder: tr("form.confirmPlaceholder"),
    },
  ];

  return (
    <div className="p-6 mx-auto">
      <div className="p-6 max-w-lg">
        <h1 className="text-xl font-bold text-blue-600 mb-8">{tr("title")}</h1>

        <div className="space-y-6">
          {passwordFields.map((field) => (
            <div key={field.key}>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {field.label}
              </label>
              <div className="relative">
                <input
                  type={showPasswords[field.key] ? "text" : "password"}
                  name={field.key}
                  value={formData[field.key]}
                  onChange={(e) => handleInputChange(field.key, e.target.value)}
                  placeholder={field.placeholder}
                  className={`w-full px-4 py-3 pr-12 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                    formState.errors[field.key]
                      ? "border-red-500 bg-red-50"
                      : "border-gray-300 bg-gray-50"
                  }`}
                  disabled={isPending}
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility(field.key)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  disabled={isPending}
                >
                  {showPasswords[field.key] ? (
                    <FaEyeSlash className="w-5 h-5" />
                  ) : (
                    <FaEye className="w-5 h-5" />
                  )}
                </button>
              </div>
              {formState.errors[field.key] && (
                <p className="mt-1 text-sm text-red-600">
                  {formState.errors[field.key]}
                </p>
              )}
            </div>
          ))}
        </div>

        <div className="mt-8">
          <button
            onClick={() => {
              const formDataObj = new FormData();
              Object.entries(formData).forEach(([key, value]) => {
                formDataObj.append(key, value);
              });
              submitAction(formDataObj);
            }}
            disabled={isPending}
            className={`w-full py-3 px-6 rounded-lg font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              isPending
                ? "bg-blue-400 text-white cursor-not-allowed"
                : "bg-gradient-to-r from-[#071352] to-[#0023CF] text-white"
            }`}
          >
            {isPending ? tr("button.updating") : tr("button.update")}
          </button>
        </div>

        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h3 className="text-sm font-medium text-gray-700 mb-2">
            {tr("requirements.title")}
          </h3>
          <ul className="text-xs text-gray-600 space-y-1">
            <li>{tr("requirements.length")}</li>
            <li>{tr("requirements.different")}</li>
            <li>{tr("requirements.mix")}</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SecurityPage;
