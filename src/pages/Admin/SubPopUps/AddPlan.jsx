import React, { useState } from "react";
import { useTranslation } from "react-i18next";

function AddPlan() {
  const { t } = useTranslation();

  const [planName, setPlanName] = useState(t("addPlan.defaultPlanName"));
  const [price, setPrice] = useState(t("addPlan.defaultPrice"));
  const [discount, setDiscount] = useState(t("addPlan.defaultDiscount"));
  const [additionalCharges, setAdditionalCharges] = useState(t("addPlan.defaultFeatures", { returnObjects: true }));

  const handlePlanNameChange = (e) => setPlanName(e.target.value);
  const handlePriceChange = (e) => setPrice(e.target.value);
  const handleDiscountChange = (e) => setDiscount(e.target.value);
  const handleAdditionalChange = (index, value) => {
    const newCharges = [...additionalCharges];
    newCharges[index] = value;
    setAdditionalCharges(newCharges);
  };

  const addFeature = () => setAdditionalCharges([...additionalCharges, ""]);
  const removeFeature = (index) => {
    setAdditionalCharges(additionalCharges.filter((_, i) => i !== index));
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">{t("addPlan.title")}</h2>

      {/* Plan Name */}
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">{t("addPlan.planName")}</label>
        <input
          type="text"
          value={planName}
          onChange={handlePlanNameChange}
          className="w-full p-2 border rounded-lg bg-[#DBDEEF] text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Price & Discount */}
      <div className="mb-4 flex space-x-4">
        <div className="w-1/2">
          <label className="block text-gray-700 mb-2">{t("addPlan.price")}</label>
          <input
            type="text"
            value={price}
            onChange={handlePriceChange}
            className="w-full p-2 border rounded-lg bg-[#DBDEEF] text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="w-1/2">
          <label className="block text-gray-700 mb-2">{t("addPlan.discount")}</label>
          <input
            type="text"
            value={discount}
            onChange={handleDiscountChange}
            className="w-full p-2 border rounded-lg bg-[#DBDEEF] text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Additional Charges */}
      <div className="mb-4">
        <div className="flex justify-between mb-2">
          <h3 className="text-gray-700">{t("addPlan.additionalCharges")}</h3>
          <button
            type="button"
            onClick={addFeature}
            className="text-blue-500 hover:text-blue-700 hover:cursor-pointer"
          >
            {t("addPlan.addFeature")}
          </button>
        </div>
        {additionalCharges.map((charge, index) => (
          <div key={index} className="flex items-center mb-2">
            <input
              type="text"
              value={charge}
              onChange={(e) => handleAdditionalChange(index, e.target.value)}
              className="w-full p-2 border rounded-lg bg-[#DBDEEF] text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="button"
              onClick={() => removeFeature(index)}
              className="ml-2 text-gray-500 hover:text-red-500 hover:cursor-pointer"
            >
              ×
            </button>
          </div>
        ))}
      </div>

      {/* Submit Button */}
      <div className="w-full flex items-center justify-center">
        <button className="bg-gradient-to-br hover:cursor-pointer from-[#071352] to-[#0023CF] text-white px-4 py-2 rounded-lg">
          {t("addPlan.createButton")}
        </button>
      </div>
    </div>
  );
}

export default AddPlan;
