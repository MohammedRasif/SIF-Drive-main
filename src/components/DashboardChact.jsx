"use client";
import { useState, useRef, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Cell,
  Tooltip,
} from "recharts";
import { ChevronDown } from "lucide-react";
import { useTranslation } from "react-i18next";

// Custom Tooltip with i18n currency
const CustomTooltip = ({ active, payload }) => {
  const { t } = useTranslation();
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-[#0B2088] text-white px-2 py-1 rounded text-sm font-medium">
        {data.percentageChange ||
          `${t("chart.currency")} ${(payload[0].value / 1000).toFixed(0)}k`}
      </div>
    );
  }
  return null;
};

function Dropdown({ options, selected, onSelect }) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      className="relative text-xl font-semibold border border-gray-300 hover:cursor-pointer"
      ref={dropdownRef}
    >
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-1 hover:bg-white/50 px-3 py-1 rounded hover:cursor-pointer"
      >
        {selected}
        <ChevronDown
          className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded shadow-md z-10">
          {options.map((opt) => (
            <button
              key={opt}
              onClick={() => {
                onSelect(opt);
                setOpen(false);
              }}
              className={`block w-full text-left px-3 py-2 text-sm hover:bg-gray-100 ${
                opt === selected ? "bg-gray-100 font-medium" : ""
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function EarningsChart({
  title,
  data,
  selectedYear = "2024",
  years = ["2024", "2023", "2022", "2021"],
  onYearChange,
  maxValue = 10000,
  backgroundColor = "#DBDEEF",
  barColor = "#0B2088",
  textColor = "#1E1E1E",
  className = "",
}) {
  const { t } = useTranslation();

  const formatYAxisLabel = (value) => `${t("chart.currency")} ${value / 1000}k`;

  return (
    <div className={`p-6 rounded-lg ${className}`} style={{ backgroundColor }}>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold" style={{ color: textColor }}>
          {title || t("chart.title")}
        </h2>
        <Dropdown
          options={years}
          selected={selectedYear}
          onSelect={onYearChange}
        />
      </div>

      {/* Chart */}
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 20, bottom: 5 }}
            barCategoryGap="20%"
          >
            <CartesianGrid
              strokeDasharray="none"
              stroke="#C1C7D6"
              horizontal={true}
              vertical={false}
            />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fill: textColor, fontSize: 16 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: textColor, fontSize: 12 }}
              tickFormatter={formatYAxisLabel}
              domain={[0, maxValue]}
              ticks={[0, 2000, 4000, 6000, 8000, 10000]}
            />
            <Tooltip
              content={<CustomTooltip />}
              cursor={{ fill: "transparent" }}
            />
            <Bar dataKey="value" radius={[2, 2, 0, 0]}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={barColor} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
