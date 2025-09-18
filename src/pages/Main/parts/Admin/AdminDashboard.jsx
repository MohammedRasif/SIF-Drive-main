import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import EarningsChart from "../../../../components/DashboardChact";
import DashboardTop from "../../../../components/DashboardTop";
import DataTableDashboard from "../../../../components/DataTableDashboard";
import CardDashboard from "../../../../components/CardDashboard";

const sampleEarningsData = [
  { month: "JAN", value: 4500 },
  { month: "FEB", value: 2800 },
  { month: "MAR", value: 8200 },
  { month: "APR", value: 8800 },
  { month: "MAY", value: 8400 },
  { month: "JUN", value: 9200, highlighted: true, percentageChange: "+8.24%" },
  { month: "JUL", value: 8600 },
  { month: "AUG", value: 5200 },
  { month: "SEP", value: 3400 },
  { month: "OCT", value: 8000 },
  { month: "NOV", value: 8800 },
  { month: "DEC", value: 8400 },
];

const years = ["2024", "2023", "2022", "2021", "2020"];

export default function AdminDashboard() {
  const { t, i18n } = useTranslation();
  const [overView, setOverView] = useState([]);
  const [earningsData, setEarningsData] = useState([...sampleEarningsData]);

  // Re-generate translated card titles when language changes
  useEffect(() => {
    const translatedData = [
      {
        title: t("admin.dashboard.cards.totalEarnings"),
        value: "OMR 24.88K",
        subtext: "-10% from last month",
      },
      {
        title: t("admin.dashboard.cards.totalVehicles"),
        value: "100",
        subtext: "+10% from last month",
      },
      {
        title: t("admin.dashboard.cards.availableVehicles"),
        value: "80",
        subtext: "Out of 180 total",
      },
      {
        title: t("admin.dashboard.cards.upcomingTrips"),
        value: "50",
        subtext: "Next 7 days",
      },
    ];
    setOverView(translatedData);
  }, [i18n.language]);

  const handleYearChange = (year) => {
    console.log("Year changed to:", year);
  };
  const switchUser = (year) => {
    const currentUser = localStorage.getItem("userType")
    if (currentUser === "admin") {
      localStorage.setItem("userType", "user")
    }
  };

  return (
    <div className="bg-[#E8E9F3] h-full">
      <div className="px-5 md:px-10 lg:px-20 py-4">
        <div className="flex justify-between gap-4 flex-col md:flex-row items-stretch">
          {overView.map((item, id) => (
            <CardDashboard key={id} item={item} />
          ))}
        </div>
        <div className="mt-6">
          <EarningsChart
            title="Earnings"
            data={earningsData}
            selectedYear="2024"
            years={years}
            onYearChange={handleYearChange}
            maxValue={10000}
            backgroundColor="#DBDEEF"
            barColor="#0B2088"
            textColor="#1E1E1E"
            className="shadow-lg"
          />
        </div>
        <div>
          <DataTableDashboard />
        </div>
        <div>
          <DataTableDashboard />
          <div className="mt-4">
            <button onClick={switchUser} className="text-xl bg-yellow-300 border p-2 rounded-md hover:cursor-pointer">switch</button>
            <p>this is to switch the user so you can see both (just in dev) after switch give it a refresh</p>
          </div>
        </div>
      </div>
    </div>
  );
}
