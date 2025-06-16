
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Rocket, CheckCircle, Settings, BarChart3, Users } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

interface NewStep6LaunchDashboardProps {
  onboardingData: any;
  handleBack: () => void;
}

const NewStep6LaunchDashboard = ({ onboardingData, handleBack }: NewStep6LaunchDashboardProps) => {
  const [isLaunching, setIsLaunching] = useState(false);
  const [launchProgress, setLaunchProgress] = useState(0);
  const [isLaunched, setIsLaunched] = useState(false);
  const { createUserAgent, markSetupCompleted } = useAuth();
  const navigate = useNavigate();

  const handleLaunch = async () => {
    setIsLaunching(true);
    
    // Simulate launch process with progress updates
    const steps = [
      "Initializing AI agent...",
      "Setting up voice and personality...",
      "Configuring scripts and responses...",
      "Testing call connectivity...",
      "Finalizing agent deployment..."
    ];

    for (let i = 0; i < steps.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setLaunchProgress((i + 1) * 20);
    }

    try {
      // Create the user agent with all onboarding data
      await createUserAgent(onboardingData);
      markSetupCompleted();
      setIsLaunched(true);
      setIsLaunching(false);
    } catch (error) {
      console.error('Error creating agent:', error);
      setIsLaunching(false);
    }
  };

  const handleGoToDashboard = () => {
    navigate('/dashboard', { state: { activeTab: 'outreach-system' } });
  };

  const setupSummary = [
    { 
      label: "Role", 
      value: onboardingData.selectedRole?.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase()) || "Sales Agent",
      icon: Users
    },
    { 
      label: "Business", 
      value: onboardingData.businessName || "Your Business",
      icon: Settings
    },
    { 
      label: "Voice", 
      value: onboardingData.selectedVoice || "Aria",
      icon: Settings
    },
    { 
      label: "Personality", 
      value: onboardingData.personality?.replace(/\b\w/g, l => l.toUpperCase()) || "Professional",
      icon: Settings
    }
  ];

  if (isLaunched) {
    return (
      <div className="max-w-4xl mx-auto text-center">
        <div className="mb-8">
          <CheckCircle className="h-20 w-20 text-green-600 mx-auto mb-6" />
          <h2 className="text-4xl font-bold text-green-900 mb-4">
            🎉 Your AI Agent is Live!
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Congratulations! Your AI sales agent is now ready to start making calls and generating leads.
          </p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 justify-center">
              <BarChart3 className="h-6 w-6 text-blue-600" />
              What Happens Next?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="font-semibold mb-2">Import Your Leads</h3>
                <p className="text-sm text-gray-600">Upload your contact list or integrate with your CRM to start calling prospects</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Rocket className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="font-semibold mb-2">Launch Campaign</h3>
                <p className="text-sm text-gray-600">Set up your first calling campaign and watch your agent work</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <BarChart3 className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="font-semibold mb-2">Track Results</h3>
                <p className="text-sm text-gray-600">Monitor performance and optimize your agent based on real data</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <Button 
            onClick={handleGoToDashboard}
            size="lg"
            className="bg-callyn-blue hover:bg-callyn-darkBlue text-white px-8 py-3 text-lg"
          >
            Go to Dashboard & Start Your First Campaign
          </Button>
          <p className="text-sm text-gray-500">
            You'll be taken to the outreach system to set up your first campaign
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <Rocket className="h-16 w-16 text-callyn-blue mx-auto mb-4" />
        <h2 className="text-3xl font-bold text-callyn-darkBlue mb-4">
          Ready to Launch Your AI Agent?
        </h2>
        <p className="text-xl text-gray-600">
          Review your setup and launch your AI sales agent
        </p>
      </div>

      {/* Setup Summary */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Setup Summary</CardTitle>
          <CardDescription>
            Review your agent configuration before launching
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {setupSummary.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <div key={index} className="text-center p-4 bg-gray-50 rounded-lg">
                  <IconComponent className="h-8 w-8 text-callyn-blue mx-auto mb-2" />
                  <div className="font-medium text-sm text-gray-600">{item.label}</div>
                  <div className="font-semibold">{item.value}</div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Launch Progress */}
      {isLaunching && (
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-lg font-semibold mb-4">Launching Your AI Agent...</div>
              <Progress value={launchProgress} className="mb-4" />
              <div className="text-sm text-gray-600">{launchProgress}% Complete</div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Launch Actions */}
      <div className="flex justify-between items-center">
        <Button variant="outline" onClick={handleBack} disabled={isLaunching}>
          Back
        </Button>
        <Button 
          onClick={handleLaunch}
          disabled={isLaunching}
          size="lg"
          className="bg-green-600 hover:bg-green-700 text-white px-8 py-3"
        >
          {isLaunching ? "Launching..." : "Launch My AI Agent"}
        </Button>
      </div>
    </div>
  );
};

export default NewStep6LaunchDashboard;
