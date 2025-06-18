
import { Check, X } from "lucide-react";
import { PricingPlan } from "./types";
import { Card, CardContent } from "@/components/ui/card";

interface FeatureMatrixProps {
  plans: PricingPlan[];
}

const FeatureMatrix = ({ plans }: FeatureMatrixProps) => {
  const features = [
    { key: 'inboundCalls', label: 'AI Voice Calls & SMS Follow-Ups', description: 'Automated calling with intelligent SMS sequences' },
    { key: 'customScriptSupport', label: 'Custom Script Support', description: 'Personalized scripts for your industry and style' },
    { key: 'textTranscripts', label: 'Call Transcripts', description: 'Full conversation transcripts with key insights' },
    { key: 'calendarIntegration', label: 'Calendar Integration', description: 'Automatic appointment booking and scheduling' },
    { key: 'smartRouting', label: 'Smart Call Routing', description: 'Route qualified leads to the right team member' },
    { key: 'apiAccess', label: 'API Access', description: 'Connect to your CRM and other sales tools' },
    { key: 'prioritySupport', label: 'Priority Support', description: 'Fast-track support with dedicated assistance' },
    { key: 'hybridMode', label: 'Hybrid Mode', description: 'Jump into AI calls live for personal closing' }
  ];

  return (
    <Card className="bg-gray-900 border-gray-800 mt-12">
      <CardContent className="p-8">
        <h3 className="text-2xl font-bold text-white mb-8 text-center">
          Feature Comparison
        </h3>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left py-4 px-6 text-gray-300 font-medium">Feature</th>
                {plans.map((plan) => (
                  <th key={plan.name} className="text-center py-4 px-6">
                    <div className="text-white font-bold">{plan.name}</div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {features.map((feature) => (
                <tr key={feature.key} className="border-b border-gray-800">
                  <td className="py-4 px-6">
                    <div className="text-white font-medium">{feature.label}</div>
                    <div className="text-gray-400 text-sm mt-1">{feature.description}</div>
                  </td>
                  {plans.map((plan) => (
                    <td key={`${plan.name}-${feature.key}`} className="text-center py-4 px-6">
                      {plan.features[feature.key as keyof typeof plan.features] ? (
                        <Check className="w-6 h-6 text-green-500 mx-auto" />
                      ) : (
                        <X className="w-6 h-6 text-red-500 mx-auto" />
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default FeatureMatrix;
