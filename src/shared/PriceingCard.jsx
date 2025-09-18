import React from "react";
import { FaPlus } from "react-icons/fa";

const SubscriptionCard = ({ data, subscribetionType }) => {
  const { name, carRange, price, features } = data;
  return (
    <div className="bg-white p-6 rounded-lg w-80 flex flex-col h-full">
      {" "}
      {/* Added h-full */}
      <div>
        <h2 className="text-xl font-bold text-gray-800">{name}</h2>
        <p className="text-gray-600">{carRange}</p>
        <p className="text-2xl md:text-3xl py-3 font-semibold text-black mt-2 bg-gradient-to-r from-transparent via-gray-400/40 to-transparent">
          {price} OMR/{subscribetionType}
        </p>
        <ul className="mt-4 text-gray-600 list-disc list-inside">
          {features.map((charge, index) => (
            <li key={index} className="flex items-center">
              <span className="mr-2 text-green-500">✔</span> {charge}
            </li>
          ))}
        </ul>
      </div>
      {/* Add mt-auto so the button stays at the bottom */}
      <button className="mt-auto w-full bg-[#0b2088] text-white py-2 rounded hover:bg-[#0b2088ea] hover:cursor-pointer">
        Subscribe Now
      </button>
    </div>
  );
};

export default SubscriptionCard;
