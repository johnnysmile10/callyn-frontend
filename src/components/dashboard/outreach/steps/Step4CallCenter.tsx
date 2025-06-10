
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Phone, 
  Settings, 
  Clock, 
  Users,
  CheckCircle,
  ArrowRight
} from "lucide-react";

interface Step4CallCenterProps {
  data: any;
  onUpdate: (data: any) => void;
}

const Step4CallCenter = ({ data, onUpdate }: Step4CallCenterProps) => {
  const handleSetupCallCenter = () => {
    onUpdate({
      ...data,
      callCenterConfigured: true,
      setupDate: new Date().toISOString()
    });
  };

  const features = [
    {
      icon: Phone,
      title: "Agent Status Control",
      description: "Start, stop, and monitor your AI calling agent",
      status: "ready"
    },
    {
      icon: Clock,
      title: "Operating Hours",
      description: "Set when your agent should make calls",
      status: "ready"
    },
    {
      icon: Users,
      title: "Call Queue Management",
      description: "Monitor pending, active, and completed calls",
      status: "ready"
    },
    {
      icon: Settings,
      title: "Call Rate Controls",
      description: "Configure calling speed and retry settings",
      status: "ready"
    }
  ];

  if (data?.callCenterConfigured) {
    return (
      <Card className="border-green-200 bg-green-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-800">
            <CheckCircle className="h-6 w-6" />
            Call Center Ready
          </CardTitle>
          <CardDescription className="text-green-700">
            Your call center is configured and ready to launch campaigns
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center gap-3 p-3 bg-white rounded-lg border border-green-200">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                  <feature.icon className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <div className="font-medium text-green-800">{feature.title}</div>
                  <div className="text-sm text-green-600">Configured</div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex items-center justify-center pt-4">
            <Button 
              onClick={() => window.open('/dashboard', '_blank')}
              className="bg-green-600 hover:bg-green-700"
            >
              Open Call Center Dashboard
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Phone className="h-6 w-6 text-blue-600" />
          Call Center Setup
        </CardTitle>
        <CardDescription>
          Configure your AI calling operations and monitoring dashboard
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {features.map((feature, index) => (
            <div key={index} className="border rounded-lg p-4 space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <feature.icon className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold">{feature.title}</h3>
                  <Badge variant="outline" className="text-xs">
                    {feature.status}
                  </Badge>
                </div>
              </div>
              <p className="text-sm text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="font-semibold text-blue-800 mb-2">What you'll get:</h3>
          <ul className="space-y-2 text-sm text-blue-700">
            <li className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4" />
              Real-time call monitoring and status control
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4" />
              Automated scheduling with operating hours
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4" />
              Advanced call rate and retry configuration
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4" />
              Daily performance analytics and reporting
            </li>
          </ul>
        </div>

        <div className="flex justify-center">
          <Button 
            onClick={handleSetupCallCenter}
            size="lg"
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Phone className="mr-2 h-5 w-5" />
            Setup Call Center
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default Step4CallCenter;
