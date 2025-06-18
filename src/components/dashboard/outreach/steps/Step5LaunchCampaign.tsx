
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { 
  Rocket, 
  Phone, 
  Users, 
  Calendar, 
  CheckCircle, 
  AlertCircle,
  Play,
  Settings
} from "lucide-react";
import { useAuth } from "@/context";
import { OutreachData } from "../types";

interface Step5LaunchCampaignProps {
  data: any;
  onUpdate: (data: any) => void;
  outreachData: OutreachData | null;
  onLaunch: () => void;
}

const Step5LaunchCampaign = ({ data, onUpdate, outreachData, onLaunch }: Step5LaunchCampaignProps) => {
  const { updateProgressState } = useAuth();
  const [isLaunching, setIsLaunching] = useState(false);

  const handleLaunchCampaign = async () => {
    setIsLaunching(true);
    
    // Mark campaign as created when launching
    updateProgressState({ hasCampaigns: true });
    
    // Simulate launch process
    setTimeout(() => {
      setIsLaunching(false);
      onLaunch();
    }, 2000);
  };

  // Mock data for demonstration
  const campaignSummary = {
    targetAudience: outreachData?.targetAudience || "Business owners in tech industry",
    leadCount: outreachData?.leadList?.length || 150,
    scriptType: outreachData?.scriptLanguage?.scriptType || "conversational",
    language: outreachData?.scriptLanguage?.language || "English",
    callScheduling: {
      timezone: outreachData?.callScheduling?.timezone || "EST",
      hours: outreachData?.callScheduling?.operatingHours || "9 AM - 5 PM",
      daysPerWeek: outreachData?.callScheduling?.daysPerWeek || "Monday - Friday"
    }
  };

  const readinessChecks = [
    { 
      item: "Target Audience Defined", 
      status: !!outreachData?.targetAudience, 
      description: campaignSummary.targetAudience 
    },
    { 
      item: "Lead List Imported", 
      status: !!outreachData?.leadList && outreachData.leadList.length > 0, 
      description: `${campaignSummary.leadCount} qualified leads` 
    },
    { 
      item: "Script & Language", 
      status: !!outreachData?.scriptLanguage, 
      description: `${campaignSummary.scriptType} script in ${campaignSummary.language}` 
    },
    { 
      item: "Call Scheduling", 
      status: !!outreachData?.callScheduling, 
      description: `${campaignSummary.callScheduling.hours}, ${campaignSummary.callScheduling.daysPerWeek}` 
    },
  ];

  const allChecksPass = readinessChecks.every(check => check.status);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto">
          <Rocket className="h-8 w-8 text-white" />
        </div>
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Ready to Launch!</h2>
          <p className="text-gray-600 mt-2">
            Review your campaign settings and launch your AI-powered outreach
          </p>
        </div>
      </div>

      {/* Readiness Checklist */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-600" />
            Campaign Readiness Check
          </CardTitle>
          <CardDescription>
            Verify all components are configured correctly
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {readinessChecks.map((check, index) => (
            <div key={index} className="flex items-start gap-3">
              <div className={`w-5 h-5 rounded-full flex items-center justify-center mt-0.5 ${
                check.status ? 'bg-green-100' : 'bg-gray-100'
              }`}>
                {check.status ? (
                  <CheckCircle className="h-3 w-3 text-green-600" />
                ) : (
                  <AlertCircle className="h-3 w-3 text-gray-400" />
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className={`font-medium ${check.status ? 'text-gray-900' : 'text-gray-500'}`}>
                    {check.item}
                  </span>
                  <Badge variant={check.status ? "default" : "secondary"}>
                    {check.status ? "Ready" : "Pending"}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600 mt-1">{check.description}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Campaign Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5 text-blue-600" />
            Campaign Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Users className="h-5 w-5 text-blue-600 mt-1" />
                <div>
                  <h4 className="font-medium text-gray-900">Target Audience</h4>
                  <p className="text-sm text-gray-600">{campaignSummary.targetAudience}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-green-600 mt-1" />
                <div>
                  <h4 className="font-medium text-gray-900">Lead Database</h4>
                  <p className="text-sm text-gray-600">{campaignSummary.leadCount} qualified prospects</p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Calendar className="h-5 w-5 text-purple-600 mt-1" />
                <div>
                  <h4 className="font-medium text-gray-900">Schedule</h4>
                  <p className="text-sm text-gray-600">
                    {campaignSummary.callScheduling.hours}<br />
                    {campaignSummary.callScheduling.daysPerWeek}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Rocket className="h-5 w-5 text-orange-600 mt-1" />
                <div>
                  <h4 className="font-medium text-gray-900">Script & Language</h4>
                  <p className="text-sm text-gray-600">
                    {campaignSummary.scriptType} approach in {campaignSummary.language}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Launch Section */}
      <Card className="border-2 border-dashed border-green-200 bg-green-50">
        <CardContent className="pt-6">
          {allChecksPass ? (
            <div className="text-center space-y-4">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <Play className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-green-800">All Systems Ready!</h3>
                <p className="text-green-700 mt-1">
                  Your campaign is configured and ready to start making calls
                </p>
              </div>
              <Button 
                onClick={handleLaunchCampaign}
                disabled={isLaunching}
                size="lg"
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                {isLaunching ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Launching Campaign...
                  </>
                ) : (
                  <>
                    <Rocket className="mr-2 h-5 w-5" />
                    Launch Campaign
                  </>
                )}
              </Button>
            </div>
          ) : (
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Please complete all required steps before launching your campaign.
                Go back to previous steps to finish the configuration.
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Step5LaunchCampaign;
