"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
const faqData = [
  {
    id: "1",
    question: "What is rental management?",
    answer:
      "Rental management is a comprehensive service that handles all aspects of managing rental properties, including tenant screening, rent collection, property maintenance, and legal compliance. It helps property owners maximize their investment returns while minimizing the time and effort required to manage their properties.",
  },
  {
    id: "2",
    question: "What are the benefits of renting?",
    answer:
      "Renting offers several benefits including flexibility to move without selling, lower upfront costs compared to buying, no responsibility for major repairs and maintenance, access to amenities you might not afford when buying, and the ability to live in prime locations at a fraction of the purchase cost.",
  },
  {
    id: "3",
    question: "How much does renting cost?",
    answer:
      "Rental costs vary significantly based on location, property type, size, and amenities. Generally, you can expect to pay monthly rent plus additional costs such as security deposits, utilities, renter's insurance, and sometimes application fees. It's recommended to budget no more than 30% of your income for housing costs.",
  },
  {
    id: "4",
    question: "What are the common features of rental properties?",
    answer:
      "Common rental property features include furnished or unfurnished options, kitchen appliances, heating and cooling systems, parking spaces, laundry facilities, and basic maintenance services. Premium properties may offer additional amenities like gyms, pools, concierge services, and smart home features.",
  },
  {
    id: "5",
    question: "What factors should I consider before renting a property?",
    answer:
      "Key factors to consider include location and neighborhood safety, proximity to work and amenities, rental price and additional fees, lease terms and conditions, property condition and maintenance policies, landlord reputation, pet policies, and future rent increase policies.",
  },
  {
    id: "6",
    question: "Who needs rental management?",
    answer:
      "Rental management services are ideal for property owners who lack time to manage their properties, live far from their rental properties, own multiple properties, want to maximize rental income, prefer professional tenant screening, or need help with legal compliance and maintenance coordination.",
  },
];

function AccordionItem({ item, isOpen, onToggle }) {
  return (
    <div className="border-b border-gray-200 last:border-b-0 px-4">
      <button
        onClick={onToggle}
        className="w-full py-6 flex items-center justify-between text-left hover:bg-gray-50 transition-colors duration-200 hover:cursor-pointer"
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${item.id}`}
      >
        <span className="text-gray-800 font-medium text-lg pr-4">
          {item.question}
        </span>
        <div className="flex-shrink-0">
          {isOpen ? (
            <ChevronUp className="w-5 h-5 text-gray-600" />
          ) : (
            <ChevronDown className="w-5 h-5 text-gray-600" />
          )}
        </div>
      </button>

      {isOpen && (
        <div
          id={`faq-answer-${item.id}`}
          className="pb-6 pr-8 animate-in slide-in-from-top-2 duration-200"
        >
          <p className="text-gray-600 leading-relaxed">{item.answer}</p>
        </div>
      )}
    </div>
  );
}

export default function Faq() {
  const [openItems, setOpenItems] = useState(new Set());

  const toggleItem = (id) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(id)) {
      newOpenItems.delete(id);
    } else {
      newOpenItems.add(id);
    }
    setOpenItems(newOpenItems);
  };

  return (
    <div className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-blue-900 mb-4">
            FREQUENTLY ASKED QUESTIONS
          </h2>
          <p className="text-lg text-gray-600">
            Have a look what our clients opinion
          </p>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* FAQ Accordion */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              {faqData.map((item) => (
                <AccordionItem
                  key={item.id}
                  item={item}
                  isOpen={openItems.has(item.id)}
                  onToggle={() => toggleItem(item.id)}
                />
              ))}
            </div>
          </div>

          {/* FAQ Circle Element */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative">
              <div className="w-80 h-80 bg-gradient-to-br from-blue-200 to-purple-300 rounded-full flex items-center justify-center shadow-lg">
                <div className="text-center">
                  <h3 className="text-6xl font-bold text-gray-800 mb-4">FAQ</h3>
                  <p className="text-gray-700 text-sm px-8 leading-relaxed">
                    Let us know if you have any other questions, our team is
                    always happy to help!
                  </p>
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-blue-400 rounded-full opacity-60"></div>
              <div className="absolute -bottom-6 -left-6 w-12 h-12 bg-purple-300 rounded-full opacity-40"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
