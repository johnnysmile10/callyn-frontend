
import { Check, Target, LightningBolt } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

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

        {/* Horizontal Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-16">
          {pricingPlans.map((plan, index) => (
            <Card 
              key={index} 
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
          ))}
        </div>

        {/* Add-ons section with horizontal layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-gray-900 rounded-xl p-8 text-white">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <LightningBolt className="w-5 h-5 text-callyn-blue" />
              <h3 className="text-xl font-bold">Need more minutes?</h3>
            </div>
            <div className="space-y-2">
              {addOns.map((addon, index) => (
                <div key={index} className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-callyn-blue"></span>
                  <span className="text-gray-300">+{addon.minutes} minutes = {addon.price}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Target className="w-5 h-5 text-callyn-blue" />
              <h3 className="text-xl font-bold">Start with 50 free minutes</h3>
            </div>
            <p className="text-gray-300 mb-2">No credit card required</p>
            <p className="text-sm text-gray-400">Try Callyn risk-free and see the benefits firsthand</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingTable;
