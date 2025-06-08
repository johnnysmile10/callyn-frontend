
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Rocket, Phone, Clock, Settings, ArrowRight } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

interface NewStep5LaunchReadyProps {
  onboardingData: any;
}

const NewStep5LaunchReady = ({ onboardingData }: NewStep5LaunchReadyProps) => {
  const [isLaunching, setIsLaunching] = useState(false);
  const [launchStage, setLaunchStage] = useState("");
  const navigate = useNavigate();
  const { createUserAgent } = useAuth();

  const handleLaunch = async () => {
    setIsLaunching(true);
    
    try {
      // Stage 1: Configuring voice settings
      setLaunchStage("Configuring voice settings...");
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Stage 2: Processing business knowledge  
      setLaunchStage("Processing your business knowledge...");
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Stage 3: Setting up call routing
      setLaunchStage("Setting up call routing...");
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Stage 4: Creating the agent
      setLaunchStage("Creating your AI agent...");
      await createUserAgent(onboardingData);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Stage 5: Finalizing deployment
      setLaunchStage("Finalizing agent deployment...");
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setIsLaunching(false);
      navigate("/dashboard");
    } catch (error) {
      console.error('Error creating agent:', error);
      setIsLaunching(false);
      // In a real app, you'd show an error message
    }
  };

  const setupItems = [
    {
      title: "Business Profile",
      status: "complete",
      details: `${onboardingData.businessName} • ${onboardingData.industry}`
    },
    {
      title: "Script & Knowledge",
      status: "complete", 
      details: onboardingData.scriptMethod === "website" ? `Website: ${onboardingData.websiteUrl}` : 
               onboardingData.scriptMethod === "upload" ? `File: ${onboardingData.uploadedFile?.name}` :
               "Custom script provided"
    },
    {
      title: "Voice & Personality",
      status: "complete",
      details: `${onboardingData.selectedVoice} voice • ${onboardingData.personality} style`
    },
    {
      title: "Call Behavior",
      status: "complete",
      details: `Speed: ${onboardingData.speakingSpeed}x • Energy: ${Math.round(onboardingData.enthusiasm * 100)}%`
    }
  ];

  if (isLaunching) {
    return (
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardContent className="text-center py-16">
            <div className="animate-spin h-16 w-16 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-6"></div>
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              🚀 Launching Your AI Agent...
            </h3>
            <div className="space-y-2 text-gray-600 max-w-md mx-auto">
              <p className="text-blue-600 font-medium">{launchStage}</p>
            </div>
            <div className="bg-blue-50 rounded-lg p-4 max-w-md mx-auto mt-6">
              <p className="text-sm text-blue-800">
                Your agent will be ready in just a few seconds!
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="border-2 border-green-100 bg-gradient-to-br from-green-50 to-white">
        <CardHeader className="text-center pb-6">
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <CheckCircle className="h-4 w-4" />
            Setup Complete!
          </div>
          <CardTitle className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            🎉 Your AI Agent is Ready to Launch!
          </CardTitle>
          <CardDescription className="text-xl text-gray-600 max-w-2xl mx-auto">
            Callyn has been configured with your business knowledge and is ready to start handling calls like a pro.
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-8">
          {/* Setup Summary */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Configuration Summary</h3>
            <div className="space-y-3">
              {setupItems.map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">{item.title}</div>
                    <div className="text-sm text-gray-600">{item.details}</div>
                  </div>
                  <Badge className="bg-green-100 text-green-700 border-green-200">
                    Complete
                  </Badge>
                </div>
              ))}
            </div>
          </div>

          {/* What Happens Next */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border border-blue-200">
              <CardContent className="p-6 text-center">
                <Phone className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h4 className="font-semibold text-gray-900 mb-2">Get Your Phone Number</h4>
                <p className="text-sm text-gray-600">
                  We'll assign you a dedicated phone number for your AI agent
                </p>
              </CardContent>
            </Card>

            <Card className="border border-purple-200">
              <CardContent className="p-6 text-center">
                <Clock className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                <h4 className="font-semibold text-gray-900 mb-2">45 Minutes Free</h4>
                <p className="text-sm text-gray-600">
                  Test Callyn risk-free with your first 45 minutes of calls
                </p>
              </CardContent>
            </Card>

            <Card className="border border-green-200">
              <CardContent className="p-6 text-center">
                <Settings className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <h4 className="font-semibold text-gray-900 mb-2">Easy Adjustments</h4>
                <p className="text-sm text-gray-600">
                  Fine-tune your agent's responses anytime from your dashboard
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Trust Indicators */}
          <div className="bg-gray-50 rounded-lg p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-2xl font-bold text-blue-600">45 min</div>
                <div className="text-sm text-gray-600">Free trial</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600">24/7</div>
                <div className="text-sm text-gray-600">Always available</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-600">&lt; 30s</div>
                <div className="text-sm text-gray-600">Response time</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-orange-600">95%</div>
                <div className="text-sm text-gray-600">Success rate</div>
              </div>
            </div>
          </div>

          {/* Launch Button */}
          <div className="text-center pt-4">
            <Button 
              onClick={handleLaunch}
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white px-12 py-4 text-xl font-bold"
            >
              <Rocket className="mr-3 h-6 w-6" />
              Launch My AI Agent Now!
            </Button>
            <p className="text-sm text-gray-500 mt-4">
              No credit card required • Start with 45 free minutes • Cancel anytime
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NewStep5LaunchReady;
