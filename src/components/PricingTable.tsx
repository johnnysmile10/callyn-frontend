
import { Check, Target, Zap } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import PricingCard from "./pricing/PricingCard";
import AddOnsSection from "./pricing/AddOnsSection";

const PricingTable = () => {
  const pricingPlans = [
    {
      name: "Basic",
      price: "$49",
      minutes: "250",
      features: {
        inboundCalls: true,
        customizedAnswers: true,
        textTranscripts: true,
        calendarIntegration: false,
        advancedRouting: false,
        apiAccess: false,
      },
      audience: "Small businesses",
      popular: false,
    },
    {
      name: "Starter",
      price: "$97",
      minutes: "500",
      features: {
        inboundCalls: true,
        customizedAnswers: true,
        textTranscripts: true,
        calendarIntegration: true,
        advancedRouting: false,
        apiAccess: false,
      },
      audience: "Growing businesses",
      popular: true,
    },
    {
      name: "Pro",
      price: "$197",
      minutes: "1,500",
      features: {
        inboundCalls: true,
        customizedAnswers: true,
        textTranscripts: true,
        calendarIntegration: true,
        advancedRouting: true,
        apiAccess: false,
      },
      audience: "Established businesses",
      popular: false,
    },
    {
      name: "Closer",
      price: "$497",
      minutes: "3,000",
      features: {
        inboundCalls: true,
        customizedAnswers: true,
        textTranscripts: true,
        calendarIntegration: true,
        advancedRouting: true,
        apiAccess: true,
      },
      audience: "High-volume sales teams",
      popular: false,
    },
  ];

  const addOns = [
    { minutes: "500", price: "$59" },
    { minutes: "1,000", price: "$99" },
    { minutes: "2,000", price: "$179" },
  ];

  return (
    <section className="py-16 md:py-24 px-4 bg-callyn-background">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-callyn-darkBlue mb-4">
            Choose your plan
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Select the perfect plan for your business needs with flexible options for any call volume
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-16">
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
