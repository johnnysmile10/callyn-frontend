
import { Check } from "lucide-react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
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

  return (
    <section className="py-16 md:py-24 px-4 bg-white">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-callyn-darkBlue mb-4">
            Choose your plan
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Select the perfect plan for your business needs with flexible options for any call volume
          </p>
        </div>

        <div className="overflow-x-auto">
          <Table className="w-full border-collapse">
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead className="w-1/6 py-6">Plan</TableHead>
                <TableHead className="w-1/6 py-6">Monthly Price</TableHead>
                <TableHead className="w-1/6 py-6">Included Minutes</TableHead>
                <TableHead className="w-1/3 py-6">Features</TableHead>
                <TableHead className="w-1/6 py-6">Best For</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pricingPlans.map((plan, index) => (
                <TableRow 
                  key={index} 
                  className={plan.popular ? "bg-blue-50 border-blue-200 border-2" : ""}
                >
                  <TableCell className="font-medium py-6">
                    <div className="flex flex-col">
                      <span className="text-xl font-bold text-callyn-darkBlue">{plan.name}</span>
                      {plan.popular && (
                        <Badge className="mt-2 bg-callyn-blue text-white">Most Popular</Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="py-6">
                    <span className="text-2xl font-bold text-callyn-darkBlue">{plan.price}</span>
                    <span className="text-gray-500">/mo</span>
                  </TableCell>
                  <TableCell className="py-6">
                    <span className="text-xl font-semibold">{plan.minutes} mins</span>
                  </TableCell>
                  <TableCell className="py-6">
                    <div className="grid grid-cols-1 gap-2">
                      <div className="flex items-center gap-2">
                        {plan.features.inboundCalls ? (
                          <Check className="w-5 h-5 text-green-500" />
                        ) : (
                          <span className="w-5 h-5 flex items-center justify-center text-gray-400">-</span>
                        )}
                        <span>Inbound Call Handling</span>
                      </div>
                      <div className="flex items-center gap-2">
                        {plan.features.customizedAnswers ? (
                          <Check className="w-5 h-5 text-green-500" />
                        ) : (
                          <span className="w-5 h-5 flex items-center justify-center text-gray-400">-</span>
                        )}
                        <span>Customized Answers</span>
                      </div>
                      <div className="flex items-center gap-2">
                        {plan.features.textTranscripts ? (
                          <Check className="w-5 h-5 text-green-500" />
                        ) : (
                          <span className="w-5 h-5 flex items-center justify-center text-gray-400">-</span>
                        )}
                        <span>Call Transcripts</span>
                      </div>
                      <div className="flex items-center gap-2">
                        {plan.features.calendarIntegration ? (
                          <Check className="w-5 h-5 text-green-500" />
                        ) : (
                          <span className="w-5 h-5 flex items-center justify-center text-gray-400">-</span>
                        )}
                        <span>Calendar Integration</span>
                      </div>
                      <div className="flex items-center gap-2">
                        {plan.features.advancedRouting ? (
                          <Check className="w-5 h-5 text-green-500" />
                        ) : (
                          <span className="w-5 h-5 flex items-center justify-center text-gray-400">-</span>
                        )}
                        <span>Advanced Call Routing</span>
                      </div>
                      <div className="flex items-center gap-2">
                        {plan.features.apiAccess ? (
                          <Check className="w-5 h-5 text-green-500" />
                        ) : (
                          <span className="w-5 h-5 flex items-center justify-center text-gray-400">-</span>
                        )}
                        <span>API Access</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="py-6">{plan.audience}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Add-ons section */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="bg-gray-50 border-0">
            <CardContent className="p-8">
              <h3 className="text-xl font-bold text-callyn-darkBlue mb-4">Need more minutes?</h3>
              <div className="space-y-4">
                {addOns.map((addon, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="font-medium">+{addon.minutes} minutes</span>
                    <span className="font-bold text-callyn-darkBlue">{addon.price}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-callyn-blue bg-opacity-10 border-0">
            <CardContent className="p-8 flex flex-col items-center text-center">
              <h3 className="text-xl font-bold text-callyn-darkBlue mb-4">Start with 50 free minutes</h3>
              <p className="text-gray-600 mb-2">No credit card required</p>
              <p className="text-sm text-gray-500">Try Callyn risk-free and see the benefits firsthand</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default PricingTable;
