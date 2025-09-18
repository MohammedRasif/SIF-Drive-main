"use client";

import { useState, useRef, type DragEvent, type ChangeEvent } from "react";
import { useTranslation } from "react-i18next";
import { Cloud, Upload, X } from "lucide-react";

export default function UploadBanner() {
    const { t, i18n } = useTranslation();
    const [isDragOver, setIsDragOver] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragOver(true);
    };

    const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragOver(false);
    };

    const handleDrop = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragOver(false);
        const file = Array.from(e.dataTransfer.files).find((f) =>
            f.type.startsWith("image/")
        );
        if (file) setSelectedFile(file);
    };

    const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
        const file = Array.from(e.target.files || []).find((f) =>
            f.type.startsWith("image/")
        );
        if (file) setSelectedFile(file);
    };

    const handleBrowseClick = () => {
        fileInputRef.current?.click();
    };

    const handleUpload = () => {
        if (selectedFile) {
            console.log("Uploading:", selectedFile);
        }
    };

    const handleRemoveImage = () => {
        setSelectedFile(null);
    };

    return (
        <div className="bg-white rounded-lg w-full max-w-md mx-auto max-h-[80vh] overflow-y-auto">
            <div className="p-6">
                <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    className={`relative border-2 border-dashed rounded-lg p-6 text-center transition-colors ${isDragOver
                        ? "border-[#0B2088] bg-blue-50"
                        : "border-gray-300 hover:border-gray-400"
                        }`}
                >
                    {!selectedFile ? (
                        <div className="flex flex-col items-center gap-4">
                            <div className="relative">
                                <Cloud className="w-20 h-20 text-[#0B2088]" />
                                <div className="absolute top-1 w-full h-full flex items-center justify-center">
                                    <Upload className="w-5 h-5 text-[#0B2088]" />
                                </div>
                            </div>

                            <div className="text-gray-700">
                                <span>{t("uploadBanner.dragOrBrowse")} </span>
                                <button
                                    onClick={handleBrowseClick}
                                    className="text-[#0B2088] hover:underline font-medium"
                                    type="button"
                                >
                                    {t("uploadBanner.browse")}
                                </button>
                            </div>

                            <p className="text-sm text-gray-500">
                                {t("uploadBanner.supportedFormats")}
                            </p>
                        </div>
                    ) : (
                        <div className="relative w-full">
                            <img
                                src={URL.createObjectURL(selectedFile)}
                                alt="Preview"
                                className="h-60 w-full object-contain rounded-md"
                            />
                            <button
                                onClick={handleRemoveImage}
                                className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 shadow"
                                aria-label={t("uploadBanner.removeImage")}
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>
                    )}
                </div>
                <input
                    type="text"
                    placeholder={t("companyId")}
                    className="w-full mt-6 py-3 px-4 rounded-lg font-medium text-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-[#0B2088]"
                />

                <button
                    onClick={handleUpload}
                    disabled={!selectedFile}
                    className={`w-full mt-6 py-3 px-4 rounded-lg font-medium text-white transition-colors ${selectedFile
                        ? "bg-[#0B2088] hover:bg-[#0a1c7a]"
                        : "bg-gray-300 cursor-not-allowed"
                        }`}
                >
                    {t("uploadBanner.uploadFile")}
                </button>
            </div>

            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
            />
        </div>
    );
}
