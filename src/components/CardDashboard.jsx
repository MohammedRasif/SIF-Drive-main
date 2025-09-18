import React from "react";

const CardDashboard = ({ item }) => {
  console.log(item);
  const { title, value, subtext } = item;
  return (
    <div className="bg-[#DBDEEF] w-full h-full p-4 rounded-lg flex flex-col items-start">
      <h3 className="text-[#333333] text-2xl font-bold">{title}</h3>
      <div className="flex items-baseline flex-col mt-2">
        <span className="text-[#0B2088] text-3xl font-bold">{value}</span>
        <span className="text-[#333333] text-xs ml-1 mt-2">{subtext}</span>
      </div>
    </div>
  );
};

export default CardDashboard;
