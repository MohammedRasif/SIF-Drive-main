import React, { useState } from "react";
import { useTranslation } from "react-i18next";

function AddServiceFee() {
    const { t } = useTranslation();
    const [chargingPercentage, setChargingPercentage] = useState("");
    const [chargingPercentageCompany, setChargingPercentageCompany] = useState("");

    return (
        <div className="p-4 flex items-center justify-center">
            <div className="text-center w-full max-w-md">
                <h2 className="text-xl font-bold mb-4 text-[#1E1E1E]">
                    {t("addServiceFee.title")}
                </h2>

                {/* Driver Section */}
                <div className="mb-4 flex flex-col items-center justify-start">
                    <label className="text-start w-full text-[#1E1E1E] mb-2">
                        {t("addServiceFee.driverLabel")}
                    </label>
                    <label className="text-start w-full text-[#1E1E1E] mb-2">
                        {t("addServiceFee.driverChargingLabel")}
                    </label>
                    <input
                        type="number"
                        value={chargingPercentage}
                        onChange={(e) => setChargingPercentage(e.target.value)}
                        placeholder={t("addServiceFee.placeholder")}
                        className="w-full p-2 border rounded-lg bg-[#DBDEEF] text-[#1E1E1E] focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Company Section */}
                <div className="mb-4 flex flex-col items-center justify-start">
                    <label className="text-start w-full text-[#1E1E1E] mb-2">
                        {t("addServiceFee.companyLabel")}
                    </label>
                    <label className="text-start w-full text-[#1E1E1E] mb-2">
                        {t("addServiceFee.companyChargingLabel")}
                    </label>
                    <input
                        type="number"
                        value={chargingPercentageCompany}
                        onChange={(e) => setChargingPercentageCompany(e.target.value)}
                        placeholder={t("addServiceFee.placeholder")}
                        className="w-full p-2 border rounded-lg bg-[#DBDEEF] text-[#1E1E1E] focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Submit Button */}
                <button className="bg-gradient-to-br from-[#071352] to-[#0023CF] text-white px-4 py-2 rounded-lg">
                    {t("addServiceFee.submit")}
                </button>
            </div>
        </div>
    );
}

export default AddServiceFee;
