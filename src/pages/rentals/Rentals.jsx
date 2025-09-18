import React, { useState } from "react";
import CardDashboard from "../../components/CardDashboard";
import RentalData from "./RentalData";

function Rentals() {
  const [overView, setOverView] = useState([
    {
      title: "Active",
      value: "180",
      subtext: "Out of 180 total",
    },
    {
      title: "Pending",
      value: "100",
      subtext: "+10% from last month",
    },
    {
      title: "Cancelled",
      value: "75",
      subtext: "Next 7 days",
    },
    {
      title: "Overdue",
      value: "5",
      subtext: "Out of 180 total",
    },
  ]);
  return (
    <div className="px-5 md:px-20">
      <div className="flex justify-between gap-4 flex-col md:flex-row items-stretch">
        {overView.map((item, id) => (
          <CardDashboard key={id} item={item} />
        ))}
      </div>
      <div>
        <RentalData />
      </div>
    </div>
  );
}

export default Rentals;
