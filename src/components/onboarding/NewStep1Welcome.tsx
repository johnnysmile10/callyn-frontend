
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Zap, Clock, Shield, CheckCircle, ArrowRight, Play, Rocket, Target, Bot } from "lucide-react";

interface NewStep1WelcomeProps {
  handleNext: () => void;
}

const NewStep1Welcome = ({ handleNext }: NewStep1WelcomeProps) => {
  const features = [
    "✅ No coding required - just point & click",
    "✅ Your agent learns from your existing sales materials",
    "✅ Sounds exactly like a human sales rep",
    "✅ Handles objections & books meetings automatically",
    "✅ Works 24/7 while you sleep"
  ];

  const ctaPoints = [
    { icon: Rocket, text: "Get your AI agent live in 3 minutes" },
    { icon: Target, text: "Start closing deals while you sleep" },
    { icon: Bot, text: "No technical skills required" }
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

          {/* Direct CTA Section */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6 border border-blue-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">
              Ready to Transform Your Sales Process?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {ctaPoints.map((point, index) => {
                const Icon = point.icon;
                return (
                  <div key={index} className="flex items-center gap-3 text-center md:text-left">
                    <Icon className="h-6 w-6 text-blue-600 flex-shrink-0" />
                    <span className="font-medium text-gray-900">{point.text}</span>
                  </div>
                );
              })}
            </div>
            <div className="text-center">
              <p className="text-lg text-gray-700 mb-4">
                Join thousands of businesses already using AI to close more deals
              </p>
              <Badge className="bg-orange-100 text-orange-700 border-orange-200">
                Most Popular Choice
              </Badge>
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
            >
              Start Now
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
