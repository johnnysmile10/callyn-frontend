
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Zap, Clock, Shield, CheckCircle, ArrowRight, Play } from "lucide-react";

interface NewStep1WelcomeProps {
  handleNext: () => void;
}

const NewStep1Welcome = ({ handleNext }: NewStep1WelcomeProps) => {
  const [selectedTimeframe, setSelectedTimeframe] = useState<string>("");

  const timeframes = [
    { id: "asap", label: "ASAP - I need this working today!", icon: Zap },
    { id: "week", label: "Within a week", icon: Clock },
    { id: "month", label: "Within a month", icon: Shield }
  ];

  const features = [
    "✅ No coding required - just point & click",
    "✅ Your agent learns from your existing sales materials",
    "✅ Sounds exactly like a human sales rep",
    "✅ Handles objections & books meetings automatically",
    "✅ Works 24/7 while you sleep"
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="border-2 border-blue-100 bg-gradient-to-br from-blue-50 to-white">
        <CardHeader className="text-center pb-6">
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <CheckCircle className="h-4 w-4" />
            Account Created Successfully!
          </div>
          <CardTitle className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            🎉 Welcome to Callyn!
          </CardTitle>
          <CardDescription className="text-xl text-gray-600 max-w-2xl mx-auto">
            Your AI sales agent is about to transform how you handle leads. 
            Let's get you set up in the next 3 minutes.
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-8">
          {/* What You'll Get */}
          <div className="bg-white rounded-lg p-6 border border-gray-100">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">What you'll have in 3 minutes:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {features.map((feature, index) => (
                <div key={index} className="text-gray-700 text-sm">
                  {feature}
                </div>
              ))}
            </div>
          </div>

          {/* Timeline Selection */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              When do you need your AI agent ready?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {timeframes.map((timeframe) => {
                const Icon = timeframe.icon;
                return (
                  <button
                    key={timeframe.id}
                    onClick={() => setSelectedTimeframe(timeframe.id)}
                    className={`p-4 rounded-lg border-2 transition-all text-left ${
                      selectedTimeframe === timeframe.id
                        ? "border-blue-500 bg-blue-50 ring-2 ring-blue-200"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className={`h-5 w-5 ${
                        selectedTimeframe === timeframe.id ? "text-blue-600" : "text-gray-600"
                      }`} />
                      <span className={`font-medium ${
                        selectedTimeframe === timeframe.id ? "text-blue-900" : "text-gray-900"
                      }`}>
                        {timeframe.label}
                      </span>
                    </div>
                    {timeframe.id === "asap" && (
                      <Badge className="mt-2 bg-orange-100 text-orange-700 border-orange-200">
                        Most Popular
                      </Badge>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="bg-gray-50 rounded-lg p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-2xl font-bold text-blue-600">45 min</div>
                <div className="text-sm text-gray-600">Free trial included</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600">95%</div>
                <div className="text-sm text-gray-600">Customer satisfaction</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-600">24/7</div>
                <div className="text-sm text-gray-600">Never stops working</div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center pt-4">
            <Button 
              onClick={handleNext}
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg font-semibold"
              disabled={!selectedTimeframe}
            >
              {selectedTimeframe === "asap" ? "Let's Build This Now!" : "Start Building My Agent"}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <p className="text-sm text-gray-500 mt-3">
              No credit card required • 45 minutes free
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NewStep1Welcome;
