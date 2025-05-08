
import { FC } from "react";
import PricingCard from "./pricing/PricingCard";
import AddOnsSection from "./pricing/AddOnsSection";

interface PricingTableProps {
  audience: "sales" | "business";
}

const PricingTable: FC<PricingTableProps> = ({ audience }) => {
  const pricingPlans = [
    {
      name: "Basic",
      price: "$49",
      minutes: "250",
      features: {
        inboundCalls: true,
        customScriptSupport: true,
        textTranscripts: true,
        calendarIntegration: false,
        smartRouting: false,
        apiAccess: false,
        prioritySupport: false
      },
      audience: audience === "sales" ? "Solo closers" : "Small businesses",
      popular: false,
    },
    {
      name: "Starter",
      price: "$97",
      minutes: "500",
      features: {
        inboundCalls: true,
        customScriptSupport: true,
        textTranscripts: true,
        calendarIntegration: true,
        smartRouting: false,
        apiAccess: false,
        prioritySupport: false
      },
      audience: audience === "sales" ? "Growing sales teams" : "Growing businesses",
      popular: true,
    },
    {
      name: "Pro",
      price: "$197",
      minutes: "1,500",
      features: {
        inboundCalls: true,
        customScriptSupport: true,
        textTranscripts: true,
        calendarIntegration: true,
        smartRouting: true,
        apiAccess: false,
        prioritySupport: true
      },
      audience: audience === "sales" ? "Established closers" : "Established businesses",
      popular: false,
    },
    {
      name: "Closer",
      price: "$497",
      minutes: "3,000",
      features: {
        inboundCalls: true,
        customScriptSupport: true,
        textTranscripts: true,
        calendarIntegration: true,
        smartRouting: true,
        apiAccess: true,
        prioritySupport: true
      },
      audience: audience === "sales" ? "High-volume sales pros" : "High-volume sales teams",
      popular: false,
    },
  ];

  const addOns = [
    { minutes: "500", price: "$59" },
    { minutes: "1,000", price: "$99" },
    { minutes: "2,000", price: "$179" },
  ];

  const headlines = {
    sales: {
      title: "Choose your plan",
      description: "Callyn helps you follow up, qualify, and book 24/7 — so you never miss a close."
    },
    business: {
      title: "Choose your plan",
      description: "Callyn turns missed calls into meetings, day or night. Maximize your ad ROI and improve customer service reliability."
    }
  };

  return (
    <section className="py-16 md:py-24 px-4 bg-gray-900">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            {headlines[audience].title}
          </h2>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto">
            {headlines[audience].description}
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
          {pricingPlans.map((plan, index) => (
            <PricingCard key={index} plan={plan} />
          ))}
        </div>

        {/* Add-ons section */}
        <AddOnsSection addOns={addOns} />
      </div>
    </section>
  );
};

export default PricingTable;
