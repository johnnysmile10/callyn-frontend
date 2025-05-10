
import { FC } from "react";
import PricingCard from "./pricing/PricingCard";
import AddOnsSection from "./pricing/AddOnsSection";
import HybridModeExplainer from "./pricing/HybridModeExplainer";

const PricingTable: FC = () => {
  const pricingPlans = [
    {
      name: "Solo Closer",
      price: "$49",
      minutes: "250",
      features: {
        inboundCalls: true,
        customScriptSupport: true,
        textTranscripts: true,
        calendarIntegration: false,
        smartRouting: false,
        apiAccess: false,
        prioritySupport: false,
        hybridMode: false
      },
      audience: "Best for solo sales reps testing Callyn",
      popular: false,
    },
    {
      name: "Appointment Setter",
      price: "$97",
      minutes: "500",
      features: {
        inboundCalls: true,
        customScriptSupport: true,
        textTranscripts: true,
        calendarIntegration: true,
        smartRouting: false,
        apiAccess: false,
        prioritySupport: false,
        hybridMode: true
      },
      audience: "Best for growing sales teams",
      popular: true,
    },
    {
      name: "Pro Closer",
      price: "$197",
      minutes: "1,500",
      features: {
        inboundCalls: true,
        customScriptSupport: true,
        textTranscripts: true,
        calendarIntegration: true,
        smartRouting: true,
        apiAccess: false,
        prioritySupport: true,
        hybridMode: true
      },
      audience: "Best for high-volume individual closers",
      popular: false,
    },
    {
      name: "Sales Elite",
      price: "$497",
      minutes: "3,000",
      features: {
        inboundCalls: true,
        customScriptSupport: true,
        textTranscripts: true,
        calendarIntegration: true,
        smartRouting: true,
        apiAccess: true,
        prioritySupport: true,
        hybridMode: true
      },
      audience: "Best for full teams needing API + support",
      popular: false,
    },
  ];

  const addOns = [
    { minutes: "500", price: "$59" },
    { minutes: "1,000", price: "$99" },
    { minutes: "2,000", price: "$179" },
  ];

  return (
    <section className="py-16 md:py-24 px-4 bg-gray-900">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Choose your plan
          </h2>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto">
            Callyn helps you follow up, qualify, and book 24/7 — so you never miss a close. Every plan includes AI voice calls, SMS follow-ups, and transcripts. Choose your volume and tools.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
          {pricingPlans.map((plan, index) => (
            <PricingCard key={index} plan={plan} />
          ))}
        </div>
        
        {/* Upgrade/Cancel Anytime text */}
        <div className="text-center mt-8 text-gray-400">
          <p>Upgrade or cancel anytime. No long-term contracts.</p>
        </div>
        
        {/* Hybrid Mode Explainer */}
        <HybridModeExplainer />

        {/* Add-ons section */}
        <AddOnsSection addOns={addOns} />
      </div>
    </section>
  );
};

export default PricingTable;
