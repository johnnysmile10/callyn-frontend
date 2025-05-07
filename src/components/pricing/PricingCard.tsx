
import { Check } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
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
    customizedAnswers: "Customized Answers",
    textTranscripts: "Call Transcripts",
    calendarIntegration: "Calendar Integration",
    advancedRouting: "Advanced Call Routing",
    apiAccess: "API Access"
  };

  const audienceLabels = {
    "Small businesses": "Testing & Light Use",
    "Growing businesses": "Solo Users",
    "Established businesses": "Small Teams",
    "High-volume sales teams": "Large Teams"
  };

  return (
    <Card 
      className={`rounded-xl border overflow-hidden ${plan.popular ? "border-callyn-blue shadow-lg" : "border-gray-200"}`}
    >
      <div className={`px-6 py-4 ${plan.popular ? "bg-callyn-blue text-white" : "bg-gray-50"}`}>
        <h3 className={`text-xl font-bold ${plan.popular ? "text-white" : "text-callyn-darkBlue"}`}>{plan.name}</h3>
        {plan.popular && <span className="text-xs font-medium bg-white text-callyn-blue px-2 py-1 rounded-full">Most Popular</span>}
      </div>
      <CardContent className="p-6">
        <div className="mb-6">
          <span className="text-3xl font-bold text-callyn-darkBlue">{plan.price}</span>
          <span className="text-gray-500">/mo</span>
        </div>
        <div className="mb-6">
          <span className="text-xl font-semibold">{plan.minutes} mins</span>
          <p className="text-gray-500 text-sm">Included</p>
        </div>
        <div className="space-y-4 mb-6">
          {Object.entries(plan.features).map(([key, value]) => (
            <div key={key} className="flex items-center gap-2">
              {value ? (
                <Check className="w-5 h-5 text-green-500" />
              ) : (
                <span className="w-5 h-5 flex items-center justify-center text-gray-400">-</span>
              )}
              <span className="text-gray-700 text-sm">{featureLabels[key as keyof typeof featureLabels]}</span>
            </div>
          ))}
        </div>
        <div className="pt-4 border-t border-gray-100">
          <p className="text-sm text-gray-500">Best for: <span className="font-medium text-gray-700">{audienceLabels[plan.audience as keyof typeof audienceLabels]}</span></p>
        </div>
      </CardContent>
    </Card>
  );
};

export default PricingCard;
