import { useState } from "react";
import { Building2, Mail, Phone, MapPin, Users, Search, Filter, MoreHorizontal, ArrowLeft } from "lucide-react";
import { Link } from "react-router";
import { useTranslation } from "react-i18next";

export default function CollaboratorDetails() {
    const { t, i18n } = useTranslation();
    const [searchTerm, setSearchTerm] = useState("");
    const [openDropdown, setOpenDropdown] = useState(null);

    // Mock data for collaborator (unchanged)
    const collaborator = {
        id: "COLLAB-001",
        name: "TechCorp Solutions",
        type: "Technology Partner",
        status: "Active",
        joinDate: "2023-01-15",
        contactPerson: "Sarah Johnson",
        email: "sarah.johnson@techcorp.com",
        phone: "+1 (555) 123-4567",
        address: "123 Innovation Drive, Tech Valley, CA 94025",
        description:
            "Leading technology solutions provider specializing in enterprise software development and digital transformation services.",
        totalAuthorized: 12,
        activeProjects: 8,
        image: null,
    };

    // Mock data for authorized people (unchanged)
    const authorizedPeople = [
        {
            id: 1,
            name: "Sarah Johnson",
            role: "Primary Contact",
            email: "sarah.johnson@techcorp.com",
            phone: "+1 (555) 123-4567",
            department: "Business Development",
            status: "Active",
            lastAccess: "2024-01-28",
        },
        {
            id: 2,
            name: "Michael Chen",
            role: "Technical Lead",
            email: "michael.chen@techcorp.com",
            phone: "+1 (555) 123-4568",
            department: "Engineering",
            status: "Active",
            lastAccess: "2024-01-27",
        },
        {
            id: 3,
            name: "Emily Rodriguez",
            role: "Project Manager",
            email: "emily.rodriguez@techcorp.com",
            phone: "+1 (555) 123-4569",
            department: "Project Management",
            status: "Active",
            lastAccess: "2024-01-26",
        },
        {
            id: 4,
            name: "David Kim",
            role: "Security Officer",
            email: "david.kim@techcorp.com",
            phone: "+1 (555) 123-4570",
            department: "Security",
            status: "Inactive",
            lastAccess: "2024-01-20",
        },
        {
            id: 5,
            name: "Lisa Wang",
            role: "Quality Assurance",
            email: "lisa.wang@techcorp.com",
            phone: "+1 (555) 123-4571",
            department: "QA",
            status: "Active",
            lastAccess: "2024-01-28",
        },
    ];

    const filteredPeople = authorizedPeople.filter(
        (person) =>
            person.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            person.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
            person.department.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getStatusColor = (status) => {
        return status === "Active"
            ? "bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium"
            : "bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-medium";
    };

    const getInitials = (name) => {
        return name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .slice(0, 2);
    };

    const handleDropdownToggle = (personId) => {
        setOpenDropdown(openDropdown === personId ? null : personId);
    };

    return (
        <div
            className="min-h-screen py-4 md:py-6 lg:py-8"
            dir={i18n.language === "ar" ? "rtl" : "ltr"}
        >
            <div className="mx-auto space-y-6 px-5 md:px-20">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="text-2xl md:text-3xl font-bold text-[#0B2088]">
                            {t("collaboratorDetails.title")}
                        </h1>
                        <p className="text-[#1E1E1E] mt-1">{t("collaboratorDetails.subtitle")}</p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-2">
                        <Link
                            to="/dashboard/collaborations"
                            className="flex items-center justify-center px-4 py-2 border rounded-md transition-colors hover:cursor-pointer"
                            style={{ borderColor: "#0B2088", color: "#0B2088", backgroundColor: "transparent" }}
                        >
                            <ArrowLeft className={`w-4 h-4 ${i18n.language === "ar" ? "ml-2" : "mr-2"}`} />
                            {t("collaboratorDetails.backButton")}
                        </Link>
                    </div>
                </div>

                {/* Collaborator Overview */}
                <div className="border rounded-lg bg-gray-100" style={{ borderColor: "#0B2088" }}>
                    <div className="p-6 pb-4">
                        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                            <div className="flex items-start gap-4">
                                {collaborator.image ? (
                                    <img
                                        src={collaborator.image}
                                        alt={collaborator.name}
                                        className="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover"
                                    />
                                ) : (
                                    <div
                                        className="w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center text-white text-xl font-semibold"
                                        style={{ backgroundColor: "#0B2088" }}
                                    >
                                        {getInitials(collaborator.name)}
                                    </div>
                                )}
                                <div>
                                    <h2 className="text-xl md:text-2xl font-bold text-[#0B2088]">
                                        {collaborator.name}
                                    </h2>
                                    <p className="mt-1 text-[#1E1E1E]">{collaborator.type}</p>
                                    <div className="flex flex-wrap gap-2 mt-2">
                                        <span className={getStatusColor(collaborator.status)}>{collaborator.status}</span>
                                        <span
                                            className="border px-2 py-1 rounded-full text-xs"
                                            style={{ borderColor: "#0B2088", color: "#1E1E1E" }}
                                        >
                                            ID: {collaborator.id}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4 text-center lg:text-end">
                                <div>
                                    <p className="text-2xl font-bold text-[#0B2088]">
                                        {collaborator.totalAuthorized}
                                    </p>
                                    <p className="text-sm text-[#1E1E1E]">
                                        {t("collaboratorDetails.authorizedUsers")}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-2xl font-bold text-[#0B2088]">
                                        {collaborator.activeProjects}
                                    </p>
                                    <p className="text-sm text-[#1E1E1E]">
                                        {t("collaboratorDetails.activeProjects")}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Contact Information */}
                    <div className="border rounded-lg bg-gray-100" style={{ borderColor: "#0B2088" }}>
                        <div className="p-6 pb-4">
                            <h3 className="font-semibold flex items-center gap-2 mb-4 text-[#0B2088]">
                                <Building2 className="w-5 h-5 text-[#0B2088]" />
                                {t("collaboratorDetails.contactInformation")}
                            </h3>
                        </div>
                        <div className="px-6 pb-6 space-y-4">
                            <div className="flex items-start gap-3">
                                <Mail className="w-5 h-5 mt-0.5 text-[#0B2088]" />
                                <div>
                                    <p className="text-sm text-[#1E1E1E]">
                                        {t("collaboratorDetails.email")}
                                    </p>
                                    <p className="text-[#0B2088]">{collaborator.email}</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <Phone className="w-5 h-5 mt-0.5 text-[#0B2088]" />
                                <div>
                                    <p className="text-sm text-[#1E1E1E]">
                                        {t("collaboratorDetails.phone")}
                                    </p>
                                    <p className="text-[#0B2088]">{collaborator.phone}</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <MapPin className="w-5 h-5 mt-0.5 text-[#0B2088]" />
                                <div>
                                    <p className="text-sm text-[#1E1E1E]">
                                        {t("collaboratorDetails.address")}
                                    </p>
                                    <p className="text-[#0B2088]">{collaborator.address}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Additional Details */}
                    <div className="border rounded-lg bg-gray-100" style={{ borderColor: "#0B2088" }}>
                        <div className="p-6 pb-4">
                            <h3 className="font-semibold flex items-center gap-2 mb-4 text-[#0B2088]">
                                <Users className="w-5 h-5 text-[#0B2088]" />
                                {t("collaboratorDetails.additionalDetails")}
                            </h3>
                        </div>
                        <div className="px-6 pb-6 space-y-4">
                            <div>
                                <p className="text-sm text-[#1E1E1E]">
                                    {t("collaboratorDetails.primaryContact")}
                                </p>
                                <p className="text-[#0B2088]">{collaborator.contactPerson}</p>
                            </div>
                            <div>
                                <p className="text-sm text-[#1E1E1E]">
                                    {t("collaboratorDetails.joinDate")}
                                </p>
                                <p className="text-[#0B2088]">
                                    {new Date(collaborator.joinDate).toLocaleDateString(i18n.language)}
                                </p>
                            </div>
                            <div>
                                <p className="text-sm text-[#1E1E1E]">
                                    {t("collaboratorDetails.description")}
                                </p>
                                <p className="text-sm leading-relaxed text-[#0B2088]">
                                    {collaborator.description}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Authorized People Table */}
                <div className="border rounded-lg bg-gray-100" style={{ borderColor: "#0B2088" }}>
                    <div className="p-6 pb-4">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                            <h3 className="font-semibold flex items-center gap-2 text-[#0B2088]">
                                <Users className="w-5 h-5 text-[#0B2088]" />
                                {t("collaboratorDetails.authorizedPeople")} ({filteredPeople.length})
                            </h3>
                            <div className="flex flex-col sm:flex-row gap-2">
                                <div className="relative">
                                    <Search
                                        className={`absolute ${i18n.language === "ar" ? "left-3" : "right-3"} top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#1E1E1E]`}
                                    />
                                    <input
                                        type="text"
                                        placeholder={t("collaboratorDetails.searchPlaceholder")}
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className={`pl-10 pr-4 py-2 border rounded-md w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-[#0B2088] ${i18n.language === "ar" ? "text-right" : "text-left"}`}
                                        style={{ backgroundColor: "#FFFFFF", color: "#1E1E1E", borderColor: "#0B2088" }}
                                    />
                                </div>
                                <button
                                    className="flex items-center justify-center px-4 py-2 border rounded-md transition-colors"
                                    style={{ borderColor: "#0B2088", color: "#0B2088", backgroundColor: "transparent" }}
                                >
                                    <Filter className={`w-4 h-4 ${i18n.language === "ar" ? "ml-2" : "mr-2"}`} />
                                    {t("collaboratorDetails.filterButton")}
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[640px]">
                            <thead>
                                <tr className="border-b" style={{ borderColor: "#0B2088" }}>
                                    <th className={`font-medium p-4 ${i18n.language === "ar" ? "text-right" : "text-left"} text-[#1E1E1E]`}>
                                        {t("collaboratorDetails.tableHeaders.name")}
                                    </th>
                                    <th className={`font-medium p-4 ${i18n.language === "ar" ? "text-right" : "text-left"} text-[#1E1E1E]`}>
                                        {t("collaboratorDetails.tableHeaders.role")}
                                    </th>
                                    <th className={`font-medium p-4 ${i18n.language === "ar" ? "text-right" : "text-left"} text-[#1E1E1E]`}>
                                        {t("collaboratorDetails.tableHeaders.department")}
                                    </th>
                                    <th className={`font-medium p-4 ${i18n.language === "ar" ? "text-right" : "text-left"} text-[#1E1E1E]`}>
                                        {t("collaboratorDetails.tableHeaders.contact")}
                                    </th>
                                    <th className={`font-medium p-4 ${i18n.language === "ar" ? "text-right" : "text-left"} text-[#1E1E1E]`}>
                                        {t("collaboratorDetails.tableHeaders.status")}
                                    </th>
                                    <th className={`font-medium p-4 ${i18n.language === "ar" ? "text-right" : "text-left"} text-[#1E1E1E]`}>
                                        {t("collaboratorDetails.tableHeaders.lastAccess")}
                                    </th>
                                    <th className={`font-medium p-4 w-12 ${i18n.language === "ar" ? "text-right" : "text-left"} text-[#1E1E1E]`}>
                                        {t("collaboratorDetails.tableHeaders.actions")}
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredPeople.length > 0 ? (
                                    filteredPeople.map((person) => (
                                        <tr
                                            key={person.id}
                                            className="border-b transition-colors"
                                            style={{ borderColor: "#0B2088" }}
                                        >
                                            <td className="p-4">
                                                <div className="flex items-center gap-3">
                                                    <div
                                                        className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold text-white"
                                                        style={{ backgroundColor: "#0B2088" }}
                                                    >
                                                        {getInitials(person.name)}
                                                    </div>
                                                    <div>
                                                        <p className="font-medium text-[#0B2088]">
                                                            {person.name}
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className={`p-4 text-[#1E1E1E] ${i18n.language === "ar" ? "text-right" : "text-left"}`}>
                                                {person.role}
                                            </td>
                                            <td className={`p-4 text-[#1E1E1E] ${i18n.language === "ar" ? "text-right" : "text-left"}`}>
                                                {person.department}
                                            </td>
                                            <td className={`p-4 text-[#1E1E1E] ${i18n.language === "ar" ? "text-right" : "text-left"}`}>
                                                <div>
                                                    <p className="text-sm">{person.email}</p>
                                                    <p className="text-xs text-[#1E1E1E]">{person.phone}</p>
                                                </div>
                                            </td>
                                            <td className="p-4">
                                                <span className={getStatusColor(person.status)}>{person.status}</span>
                                            </td>
                                            <td className={`p-4 text-[#1E1E1E] ${i18n.language === "ar" ? "text-right" : "text-left"}`}>
                                                {person.lastAccess}
                                            </td>
                                            <td className="p-4">
                                                <div className="relative">
                                                    <button
                                                        onClick={() => handleDropdownToggle(person.id)}
                                                        className="p-1 rounded transition-colors text-[#1E1E1E]"
                                                    >
                                                        <MoreHorizontal className="w-4 h-4" />
                                                    </button>
                                                    {openDropdown === person.id && (
                                                        <div
                                                            className={`absolute top-8 ${i18n.language === "ar" ? "left-0" : "right-0"} border rounded-md shadow-lg z-10 min-w-[140px]`}
                                                            style={{ backgroundColor: "#B4BBDF", borderColor: "#0B2088" }}
                                                        >
                                                            <button
                                                                className={`w-full px-4 py-2 transition-colors ${i18n.language === "ar" ? "text-right" : "text-left"} text-[#0B2088]`}
                                                            >
                                                                {t("collaboratorDetails.actions.holdAccess")}
                                                            </button>
                                                            <button
                                                                className={`w-full px-4 py-2 transition-colors ${i18n.language === "ar" ? "text-right" : "text-left"} text-[#0B2088]`}
                                                            >
                                                                {t("collaboratorDetails.actions.removeAccess")}
                                                            </button>
                                                        </div>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="7" className="p-4 text-center text-[#1E1E1E]">
                                            {t("collaboratorDetails.noData")}
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
