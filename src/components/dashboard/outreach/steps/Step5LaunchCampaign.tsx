
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Rocket, 
  CheckCircle, 
  Play, 
  Pause,
  Clock,
  Phone,
  Users,
  MessageSquare,
  Calendar,
  Target,
  ArrowRight,
  Zap,
  AlertCircle
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface LaunchCampaignData {
  isLive?: boolean;
  campaignStarted?: boolean;
  launchedAt?: string;
}

interface Step5LaunchCampaignProps {
  data: LaunchCampaignData;
  onUpdate: (data: LaunchCampaignData) => void;
  outreachData?: any;
  onLaunch?: () => void;
}

const Step5LaunchCampaign = ({ data, onUpdate, outreachData, onLaunch }: Step5LaunchCampaignProps) => {
  const { toast } = useToast();
  const [isLaunching, setIsLaunching] = useState(false);

  const configurationItems = [
    {
      icon: Target,
      label: "Target Audience",
      value: outreachData?.targetAudience?.industry?.length 
        ? `${outreachData.targetAudience.industry.join(', ')} • ${outreachData.targetAudience.companySize.join(', ')}`
        : "Not configured",
      status: outreachData?.targetAudience?.industry?.length ? "complete" : "incomplete",
      color: "blue"
    },
    {
      icon: Users,
      label: "Lead List",
      value: outreachData?.leadList?.length 
        ? `${outreachData.leadList.length} leads imported`
        : "No leads uploaded",
      status: outreachData?.leadList?.length ? "complete" : "incomplete",
      color: "green"
    },
    {
      icon: MessageSquare,
      label: "AI Script",
      value: outreachData?.script?.greeting 
        ? "Script configured with greeting, pitch & objections"
        : "Script not configured",
      status: outreachData?.script?.greeting ? "complete" : "incomplete",
      color: "purple"
    },
    {
      icon: Calendar,
      label: "Calendar Integration",
      value: outreachData?.scheduling?.calendarIntegration?.connected 
        ? `${outreachData.scheduling.calendarIntegration.provider} connected`
        : "Calendar not connected",
      status: outreachData?.scheduling?.calendarIntegration?.connected ? "complete" : "incomplete",
      color: "orange"
    },
    {
      icon: Clock,
      label: "Calling Hours",
      value: outreachData?.scheduling?.timezone 
        ? `${Object.values(outreachData.scheduling.operatingHours || {}).filter((day: any) => day?.enabled).length} days/week • ${outreachData.scheduling.timezone}`
        : "Calling hours not set",
      status: outreachData?.scheduling?.timezone ? "complete" : "incomplete",
      color: "indigo"
    }
  ];

  const isReadyToLaunch = configurationItems.every(item => item.status === "complete");
  const incompleteItems = configurationItems.filter(item => item.status === "incomplete");

  const handleLaunchCampaign = async () => {
    if (!isReadyToLaunch) {
      toast({
        title: "Configuration Incomplete",
        description: "Please complete all required steps before launching.",
        variant: "destructive"
      });
      return;
    }

    setIsLaunching(true);
    
    // Simulate launch process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const launchData = {
      isLive: true,
      campaignStarted: true,
      launchedAt: new Date().toISOString()
    };
    
    onUpdate(launchData);
    
    toast({
      title: "🎉 Campaign Launched!",
      description: "Your AI agent is now live and calling leads. You'll be notified when meetings are booked.",
    });

    if (onLaunch) {
      onLaunch();
    }

    setIsLaunching(false);
  };

  const handlePauseCampaign = () => {
    const pauseData = {
      ...data,
      isLive: false
    };
    onUpdate(pauseData);
    
    toast({
      title: "Campaign Paused",
      description: "Your AI agent has stopped calling leads. You can resume anytime.",
    });
  };

  const handleResumeCampaign = () => {
    const resumeData = {
      ...data,
      isLive: true
    };
    onUpdate(resumeData);
    
    toast({
      title: "Campaign Resumed",
      description: "Your AI agent is back online and calling leads.",
    });
  };

  if (data.campaignStarted) {
    return (
      <div className="space-y-6">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            {data.isLive ? (
              <Zap className="h-10 w-10 text-green-600" />
            ) : (
              <Pause className="h-10 w-10 text-orange-600" />
            )}
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Campaign {data.isLive ? "Live" : "Paused"}
          </h2>
          <p className="text-xl text-gray-600">
            {data.isLive 
              ? "Your AI agent is actively calling leads during scheduled hours"
              : "Your campaign is paused. Resume anytime to continue calling."
            }
          </p>
        </div>

        {/* Campaign Status */}
        <Alert className={data.isLive ? "bg-green-50 border-green-200" : "bg-orange-50 border-orange-200"}>
          <Zap className={`h-4 w-4 ${data.isLive ? "text-green-600" : "text-orange-600"}`} />
          <AlertDescription className={data.isLive ? "text-green-800" : "text-orange-800"}>
            <div className="flex items-center justify-between">
              <div>
                <strong>Status:</strong> {data.isLive ? "AI Agent is Live" : "Campaign Paused"}
                {data.launchedAt && (
                  <div className="text-sm mt-1">
                    Started: {new Date(data.launchedAt).toLocaleString()}
                  </div>
                )}
              </div>
              <Badge className={data.isLive ? "bg-green-600" : "bg-orange-600"}>
                {data.isLive ? "LIVE" : "PAUSED"}
              </Badge>
            </div>
          </AlertDescription>
        </Alert>

        {/* Quick Stats Preview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <Users className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <div className="font-semibold">
                {outreachData?.leadList?.length || 0}
              </div>
              <div className="text-sm text-gray-600">Total Leads</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Phone className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <div className="font-semibold">0</div>
              <div className="text-sm text-gray-600">Calls Made</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Calendar className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <div className="font-semibold">0</div>
              <div className="text-sm text-gray-600">Meetings Booked</div>
            </CardContent>
          </Card>
        </div>

        {/* Campaign Controls */}
        <Card>
          <CardHeader>
            <CardTitle>Campaign Controls</CardTitle>
            <CardDescription>
              Manage your active calling campaign
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-3">
              {data.isLive ? (
                <Button onClick={handlePauseCampaign} variant="outline">
                  <Pause className="mr-2 h-4 w-4" />
                  Pause Campaign
                </Button>
              ) : (
                <Button onClick={handleResumeCampaign} className="bg-green-600 hover:bg-green-700">
                  <Play className="mr-2 h-4 w-4" />
                  Resume Campaign
                </Button>
              )}
              <Button variant="outline">
                View Call Log
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button variant="outline">
                View Analytics
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <Rocket className="h-16 w-16 text-blue-600 mx-auto mb-4" />
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Ready to Launch Your Campaign?
        </h2>
        <p className="text-xl text-gray-600">
          Review your configuration and activate your AI calling agent
        </p>
      </div>

      {/* Configuration Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-blue-600" />
            Campaign Configuration Summary
          </CardTitle>
          <CardDescription>
            Verify all settings before launching your AI agent
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {configurationItems.map((item, index) => (
              <div key={index} className="flex items-center gap-4 p-3 border rounded-lg">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center bg-${item.color}-100`}>
                  <item.icon className={`h-5 w-5 text-${item.color}-600`} />
                </div>
                <div className="flex-1">
                  <div className="font-medium">{item.label}</div>
                  <div className="text-sm text-gray-600">{item.value}</div>
                </div>
                <div>
                  {item.status === "complete" ? (
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  ) : (
                    <AlertCircle className="h-5 w-5 text-red-600" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Validation Messages */}
      {!isReadyToLaunch && (
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            <strong>Configuration incomplete:</strong> Please complete the following steps before launching:
            <ul className="mt-2 list-disc list-inside">
              {incompleteItems.map((item, index) => (
                <li key={index}>{item.label}</li>
              ))}
            </ul>
          </AlertDescription>
        </Alert>
      )}

      {/* Pre-Launch Info */}
      {isReadyToLaunch && (
        <Card className="border-blue-200 bg-blue-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-800">
              <Zap className="h-5 w-5" />
              What Happens After Launch?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-blue-700">
              <div className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 mt-0.5 text-blue-600" />
                <span>Callyn will start calling leads during your scheduled hours</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 mt-0.5 text-blue-600" />
                <span>Interested prospects will be automatically booked in your calendar</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 mt-0.5 text-blue-600" />
                <span>All calls will be recorded and tracked in your Call Log</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 mt-0.5 text-blue-600" />
                <span>You'll receive notifications when meetings are booked</span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Launch Button */}
      <div className="text-center">
        <Button 
          onClick={handleLaunchCampaign}
          disabled={!isReadyToLaunch || isLaunching}
          size="lg"
          className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 text-lg"
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
        <p className="text-sm text-gray-500 mt-2">
          Start calling leads and booking meetings on autopilot
        </p>
      </div>
    </div>
  );
};

export default Step5LaunchCampaign;
