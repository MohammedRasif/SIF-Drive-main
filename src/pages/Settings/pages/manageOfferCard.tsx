"use client";

import React, { useState } from "react";
import ImageSlider from "./CardSlider";
import { Plus } from "lucide-react";
import Modal from "../../../shared/Modal";
import UploadBanner from "./UploadBanner";
import { useTranslation } from "react-i18next";

function ManageOffer() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { t, i18n } = useTranslation();

    const isRTL = i18n.dir() === "rtl";

    return (
        <div>
            <div className="p-6">
                <div
                    className={`flex items-center justify-between mb-4 ${isRTL ? "flex-row-reverse" : ""
                        }`}
                >
                    <h1 className="text-2xl font-semibold">
                        {t("manageOffer.allOfferCard")}
                    </h1>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className={`flex items-center gap-2 px-4 py-2 border border-[#0B2088] rounded-lg hover:bg-[#0B2088] transition-colors duration-200 text-[#0B2088] hover:text-white ${isRTL ? "flex-row-reverse" : ""
                            }`}
                    >
                        <Plus className="w-4 h-4" />
                        {t("manageOffer.addNewCard")}
                    </button>
                </div>
                <p className="text-gray-600 text-sm">
                    {t("manageOffer.createdOfferCard")}
                </p>
            </div>

            <ImageSlider />

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <UploadBanner />
            </Modal>
        </div>
    );
}

export default ManageOffer;
