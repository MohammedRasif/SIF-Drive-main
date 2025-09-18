"use client"

import { useState } from "react"
import { User, Building2, Mail, Phone } from "lucide-react"
import { useTranslation } from "react-i18next"

export default function AddAuthorizedPerson() {
    const { t } = useTranslation()
    const [formData, setFormData] = useState({
        name: "",
        company: "",
        position: "",
        email: "",
        phone: "",
    })

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log("Authorized person data:", formData)
        alert(t("authorizedPerson.success"))
        setFormData({
            name: "",
            company: "",
            position: "",
            email: "",
            phone: "",
        })
    }

    return (
        <div className="py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md mx-auto">
                <div className="rounded-lg p-6">
                    <div className="mb-4 flex flex-col justify-center items-center">
                        <div className="text-xl font-semibold flex flex-col items-center gap-2">
                            <User className="h-10 w-10" />
                            <span>{t("authorizedPerson.title")}</span>
                        </div>
                        <p className="text-gray-500 text-sm text-center">
                            {t("authorizedPerson.subtitle")}
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Full Name */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                {t("authorizedPerson.fullName")}
                            </label>
                            <div className="relative">
                                <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    placeholder={t("authorizedPerson.placeholder.fullName")}
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    className="pl-10 w-full border border-gray-300 bg-white rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>
                        </div>

                        {/* Company */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                {t("authorizedPerson.company")}
                            </label>
                            <div className="relative">
                                <Building2 className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                <input
                                    id="company"
                                    name="company"
                                    type="text"
                                    placeholder={t("authorizedPerson.placeholder.company")}
                                    value={formData.company}
                                    onChange={handleInputChange}
                                    className="pl-10 w-full border border-gray-300 bg-white rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>
                        </div>

                        {/* Position */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                {t("authorizedPerson.position")}
                            </label>
                            <div className="relative">
                                <Building2 className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                <input
                                    id="position"
                                    name="position"
                                    type="text"
                                    placeholder={t("authorizedPerson.placeholder.position")}
                                    value={formData.position}
                                    onChange={handleInputChange}
                                    className="pl-10 w-full border border-gray-300 bg-white rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                {t("authorizedPerson.email")}
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder={t("authorizedPerson.placeholder.email")}
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="pl-10 w-full border border-gray-300 bg-white rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>
                        </div>

                        {/* Phone */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                {t("authorizedPerson.phone")}
                            </label>
                            <div className="relative">
                                <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                <input
                                    id="phone"
                                    name="phone"
                                    type="tel"
                                    placeholder={t("authorizedPerson.placeholder.phone")}
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    className="pl-10 w-full border border-gray-300 bg-white rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-[#0C2397] hover:bg-[#0c2397ee] text-white font-medium py-2 px-4 rounded-md"
                        >
                            {t("authorizedPerson.submit")}
                        </button>
                    </form>
                </div>

                <div className="mt-6 text-center text-sm text-gray-500">
                    <p>{t("authorizedPerson.note")}</p>
                </div>
            </div>
        </div>
    )
}
