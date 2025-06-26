
import { Check, X, Star, Zap } from "lucide-react";
import { PricingPlan, PaymentTerm } from "./types";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import CheckoutButton from "./CheckoutButton";

interface NewEnhancedPricingCardProps {
  plan: PricingPlan;
  selectedTerm: PaymentTerm;
}

const NewEnhancedPricingCard = ({ plan, selectedTerm }: NewEnhancedPricingCardProps) => {
  const featureLabels = {
    inboundCalls: "AI Voice Calls & SMS Follow-Ups",
    customScriptSupport: "Custom Script Support",
    textTranscripts: "Call Transcripts",
    calendarIntegration: "Calendar Integration",
    smartRouting: "Smart Call Routing",
    prioritySupport: "Priority Support",
    hybridMode: "Hybrid Mode (Jump In Live)"
  };

  return (
    <Card className={`relative h-full ${plan.popular ? 'border-callyn-blue border-2 shadow-xl scale-105' : 'border-gray-200'} bg-white`}>
      {plan.popular && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <div className="bg-callyn-blue text-white px-6 py-2 rounded-full text-sm font-bold flex items-center gap-2">
            <Star className="w-4 h-4" />
            Most Popular
          </div>
        </div>
      )}
      
      <CardHeader className="text-center pb-4">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Zap className="w-5 h-5 text-callyn-blue" />
          <h3 className="text-2xl font-bold text-gray-900">{plan.name}</h3>
        </div>
        
        <div className="mb-4">
          <div className="flex items-center justify-center gap-2">
            <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
            <div className="text-left">
              <div className="text-gray-500 text-sm">/month</div>
              {selectedTerm.months > 1 && (
                <div className="text-gray-500 text-xs">
                  billed {selectedTerm.label.toLowerCase()}
                </div>
              )}
            </div>
          </div>
          
          {plan.savings && (
            <Badge className="mt-2 bg-green-100 text-green-700">
              {plan.savings}
            </Badge>
          )}
        </div>
        
        <div className="mb-4">
          <span className="text-xl font-semibold text-callyn-blue">{plan.minutes} minutes</span>
          <p className="text-gray-500 text-sm">included every month</p>
        </div>
        
        <p className="text-gray-600 text-sm">{plan.audience}</p>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="space-y-3 mb-8">
          {Object.entries(plan.features).map(([key, value]) => (
            <div key={key} className="flex items-center gap-3">
              {value ? (
                <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
              ) : (
                <X className="w-5 h-5 text-gray-300 flex-shrink-0" />
              )}
              <span className={`text-sm ${value ? 'text-gray-900' : 'text-gray-400'}`}>
                {featureLabels[key as keyof typeof featureLabels]}
              </span>
            </div>
          ))}
        </div>
        
        <CheckoutButton 
          planName={plan.name} 
          planPrice={plan.price}
          isPopular={plan.popular}
        />
      </CardContent>
    </Card>
  );
};

export default NewEnhancedPricingCard;
