
import { Check, Diamond, X, HelpCircle } from "lucide-react";
import { PlanFeatures } from "./types";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";

interface PricingCardProps {
  plan: {
    name: string;
    price: string;
    minutes: string;
    features: PlanFeatures;
    audience: string;
    popular: boolean;
    isCustomPlan?: boolean;
  };
}

const PricingCard = ({ plan }: PricingCardProps) => {
  // Feature labels and tooltips configuration
  const featureLabels = {
    inboundCalls: "AI Voice Calls & SMS Follow-Ups",
    customScriptSupport: "Custom Script Support",
    textTranscripts: "Call Transcripts",
    calendarIntegration: "Calendar Integration",
    smartRouting: "Smart Call Routing",
    prioritySupport: "Priority Support",
    hybridMode: "Hybrid Mode (Jump In Live)"
  };

  const tooltips = {
    hybridMode: "Jump in live during an AI call",
    smartRouting: "Send calls to right rep based on lead status"
  };

  // Custom Plan Card
  if (plan.isCustomPlan) {
    return (
      <div className={`flex flex-col ${plan.popular ? "border-l-4 border-callyn-blue pl-2" : ""}`}>
        <div className="flex items-center gap-2 mb-3">
          <Diamond className="w-4 h-4 text-callyn-blue" />
          <h3 className="text-xl font-bold text-white">{plan.name}</h3>
          {plan.popular && <span className="text-xs font-medium bg-callyn-blue text-white px-2 py-1 rounded-full">Most Popular</span>}
        </div>
        
        <div className="mb-8">
          <p className="text-lg font-medium text-white">{plan.audience}</p>
        </div>
        
        <div className="mt-auto">
          <Button className="w-full bg-callyn-blue hover:bg-blue-700 text-white">
            Contact Sales
          </Button>
        </div>
      </div>
    );
  }

  // Regular Plan Cards
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
        <TooltipProvider>
          {Object.entries(plan.features).map(([key, value]) => (
            <div key={key} className="flex items-center gap-2">
              {value ? (
                <Check className="w-5 h-5 text-green-500" />
              ) : (
                <X className="w-5 h-5 text-red-500" />
              )}
              
              {/* Add tooltip for specific features */}
              {tooltips[key as keyof typeof tooltips] ? (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="flex items-center gap-1 cursor-help">
                      <span className="text-gray-300 text-sm">{featureLabels[key as keyof typeof featureLabels]}</span>
                      <HelpCircle className="w-3 h-3 text-gray-400" />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{tooltips[key as keyof typeof tooltips]}</p>
                  </TooltipContent>
                </Tooltip>
              ) : (
                <span className="text-gray-300 text-sm">{featureLabels[key as keyof typeof featureLabels]}</span>
              )}
            </div>
          ))}
        </TooltipProvider>
      </div>
      
      <div className="mt-auto">
        <p className="text-sm text-gray-400">{plan.audience}</p>
      </div>
    </div>
  );
};

export default PricingCard;
