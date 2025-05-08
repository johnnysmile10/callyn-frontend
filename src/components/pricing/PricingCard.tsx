
import { Check, Diamond, X } from "lucide-react";
import { PlanFeatures } from "./types";

interface PricingCardProps {
  plan: {
    name: string;
    price: string;
    minutes: string;
    features: PlanFeatures;
    audience: string;
    popular: boolean;
  };
}

const PricingCard = ({ plan }: PricingCardProps) => {
  const featureLabels = {
    inboundCalls: "AI Voice Calls & SMS Follow-Ups",
    customScriptSupport: "Custom Script Support",
    textTranscripts: "Call Transcripts",
    calendarIntegration: "Calendar Integration",
    smartRouting: "Smart Call Routing",
    apiAccess: "API Access",
    prioritySupport: "Priority Support",
    hybridMode: "Hybrid Mode (Jump In Live)"
  };

  return (
    <div className={`flex flex-col ${plan.popular ? "border-l-4 border-callyn-blue pl-2" : ""}`}>
      <div className="flex items-center gap-2 mb-3">
        <Diamond className="w-4 h-4 text-callyn-blue" />
        <h3 className="text-xl font-bold text-white">{plan.name}</h3>
        {plan.popular && <span className="text-xs font-medium bg-callyn-blue text-white px-2 py-1 rounded-full">Most Popular</span>}
      </div>
      
      <div className="mb-4">
        <span className="text-3xl font-bold text-white">{plan.price}</span>
        <span className="text-gray-400">/mo</span>
      </div>
      
      <div className="mb-4">
        <span className="text-xl font-semibold text-white">{plan.minutes} mins</span>
        <p className="text-gray-400 text-sm">Included</p>
      </div>
      
      <div className="space-y-3 mb-6">
        {Object.entries(plan.features).map(([key, value]) => (
          <div key={key} className="flex items-center gap-2">
            {value ? (
              <Check className="w-5 h-5 text-green-500" />
            ) : (
              <X className="w-5 h-5 text-red-500" />
            )}
            <span className="text-gray-300 text-sm">{featureLabels[key as keyof typeof featureLabels]}</span>
          </div>
        ))}
      </div>
      
      <div className="mt-auto">
        <p className="text-sm text-gray-400">Best for: <span className="font-medium text-gray-300">{plan.audience}</span></p>
      </div>
    </div>
  );
};

export default PricingCard;
