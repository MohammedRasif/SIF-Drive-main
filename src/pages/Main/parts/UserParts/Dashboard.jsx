import React, { useEffect, useState } from "react";
import CardDashboard from "../../../../components/CardDashboard";
import EarningsChart from "../../../../components/DashboardChact";
import DataTableDashboard from "../../../../components/DataTableDashboard";
import { useTranslation } from "react-i18next";
import { useShowRarningChartDataQuery, useShowUserEarningsQuery } from "../../../../redux/features/withAuth";

const years = ["2024", "2023", "2022", "2021", "2020"];

function Dashboard() {
  const [overView, setOverView] = useState([]);
  const [earningsData, setEarningsData] = useState([]);
  const [selectedYear, setSelectedYear] = useState("2024");
  const { t } = useTranslation();
  
  const { data: earningInformation, error, isLoading } = useShowUserEarningsQuery();
  const { data: earningChartInformation, isLoading: chartLoading } = useShowRarningChartDataQuery({ year: selectedYear });

  // Transform User Earnings data to CardDashboard format
  useEffect(() => {
    if (earningInformation && !isLoading) {
      const { total_earnings, total_vehicles, available_vehicles, upcoming_trips } = earningInformation;
      
      setOverView([
        {
          title: "Total Earnings (Jun)",
          value: `OMR ${total_earnings?.toLocaleString('en-US', { 
            minimumFractionDigits: 2, 
            maximumFractionDigits: 2 
          }) || 0}`,
          subtext: "-10% from last month",
        },
        {
          title: "Total Vehicles",
          value: total_vehicles?.toString() || "0",
          subtext: "+10% from last month",
        },
        {
          title: "Available Vehicles",
          value: available_vehicles?.toString() || "0",
          subtext: `Out of ${total_vehicles || 0} total`,
        },
        {
          title: "Upcoming Trips",
          value: upcoming_trips?.toString() || "0",
          subtext: "Next 7 days",
        },
      ]);
    }
  }, [earningInformation, isLoading]);

  // Transform Chart data to EarningsChart format
  useEffect(() => {
    if (earningChartInformation && !chartLoading) {
      const { monthly_breakdown, currency } = earningChartInformation;
      
      // Map month numbers to 3-letter abbreviations
      const monthAbbreviations = [
        "JAN", "FEB", "MAR", "APR", "MAY", "JUN",
        "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"
      ];
      
      const chartData = monthly_breakdown.map((monthData) => {
        const monthAbbr = monthAbbreviations[monthData.month - 1];
        const value = parseFloat(monthData.earnings);
        
        // Highlight current month (June)
        const isCurrentMonth = monthData.month === 6;
        
        return {
          month: monthAbbr,
          value: value,
          ...(isCurrentMonth && {
            highlighted: true,
            percentageChange: "+8.24%" // You can calculate this dynamically
          })
        };
      });
      
      setEarningsData(chartData);
    }
  }, [earningChartInformation, chartLoading]);

  const handleYearChange = (year) => {
    console.log("Year changed to:", year);
    setSelectedYear(year);
    // API will automatically refetch with new year parameter
  };

  const switchUser = () => {
    const currentUser = localStorage.getItem("userType");
    if (currentUser === "user") {
      localStorage.setItem("userType", "admin");
    } else {
      localStorage.setItem("userType", "user");
    }
    window.location.reload();
  };

  // Loading state
  if (isLoading || chartLoading) {
    return (
      <div className="bg-[#E8E9F3] h-full flex items-center justify-center">
        <div className="text-lg">Loading dashboard...</div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="bg-[#E8E9F3] h-full flex items-center justify-center">
        <div className="text-red-600">Error loading dashboard data</div>
      </div>
    );
  }

  return (
    <div className="bg-[#E8E9F3] h-full">
      <div className="px-5 md:px-10 lg:px-20 py-4">
        {/* Dashboard Cards */}
        <div className="flex justify-between gap-4 flex-col md:flex-row items-stretch">
          {overView.map((item, id) => (
            <CardDashboard key={id} item={item} />
          ))}
        </div>

        {/* Earnings Chart */}
        <div className="mt-6">
          <EarningsChart
            title={t("chart.title")}
            data={earningsData}
            selectedYear={selectedYear}
            years={years}
            onYearChange={handleYearChange}
            maxValue={Math.max(...earningsData.map(d => d.value), 10000)} // Dynamic max value
            backgroundColor="#DBDEEF"
            barColor="#0B2088"
            textColor="#1E1E1E"
            className="shadow-lg"
            currency="OMR" // From API response
          />
        </div>
        
        {/* Data Table & Switch Button */}
        <div>
          <DataTableDashboard />
          {/* <div className="mt-4">
            <button 
              onClick={switchUser} 
              className="text-xl bg-yellow-300 border p-2 rounded-md hover:bg-yellow-400 cursor-pointer"
            >
              Switch User
            </button>
            <p className="text-sm text-gray-600 mt-2">
              This is to switch the user so you can see both (just in dev) - Refresh after switch
            </p>
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;