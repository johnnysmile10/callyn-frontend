
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Target, 
  Users, 
  Phone, 
  MessageSquare, 
  Calendar, 
  Zap,
  CheckCircle,
  ArrowRight,
  Rocket,
  Building2
} from "lucide-react";
import OutreachIntegrations from "./outreach/OutreachIntegrations";

const CallynOutreachSystem = () => {
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  
  const outreachSteps = [
    {
      id: 1,
      title: "Define Your Target Audience",
      description: "Set up your ideal customer profile and targeting criteria",
      icon: Target,
      status: "pending" as const,
      estimatedTime: "5 min"
    },
    {
      id: 2,
      title: "Build Your Lead List",
      description: "Import or create your prospect database",
      icon: Users,
      status: "pending" as const,
      estimatedTime: "10 min"
    },
    {
      id: 3,
      title: "Craft Your Outreach Script",
      description: "Design compelling conversation flows and messaging",
      icon: MessageSquare,
      status: "pending" as const,
      estimatedTime: "15 min"
    },
    {
      id: 4,
      title: "Set Call Scheduling",
      description: "Configure availability and booking preferences",
      icon: Calendar,
      status: "pending" as const,
      estimatedTime: "5 min"
    },
    {
      id: 5,
      title: "Test Your Agent",
      description: "Run test calls to ensure optimal performance",
      icon: Phone,
      status: "pending" as const,
      estimatedTime: "10 min"
    },
    {
      id: 6,
      title: "Launch Campaign",
      description: "Go live with your AI-powered outreach campaign",
      icon: Rocket,
      status: "pending" as const,
      estimatedTime: "2 min"
    }
  ];

  const progressPercentage = (completedSteps.length / outreachSteps.length) * 100;

  const handleStepClick = (stepId: number) => {
    // This would navigate to the appropriate configuration page/modal
    console.log(`Navigate to step ${stepId} configuration`);
  };

  const getStepStatus = (stepId: number) => {
    if (completedSteps.includes(stepId)) return "completed";
    if (stepId === Math.min(...outreachSteps.map(s => s.id).filter(id => !completedSteps.includes(id)))) {
      return "current";
    }
    return "pending";
  };

  return (
    <div className="space-y-6">
      {/* Purpose Banner */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Building2 className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <CardTitle className="text-blue-900">Callyn Outreach System</CardTitle>
              <CardDescription className="text-blue-700">
                Complete setup to launch your AI-powered outreach campaigns
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm text-blue-700 mb-2">
                <span>Setup Progress</span>
                <span>{completedSteps.length} of {outreachSteps.length} completed</span>
              </div>
              <Progress value={progressPercentage} className="h-2" />
            </div>
            {progressPercentage === 100 && (
              <div className="flex items-center gap-2 text-green-700">
                <CheckCircle className="h-4 w-4" />
                <span className="text-sm font-medium">Ready to launch your outreach campaign!</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Setup Steps */}
      <Card>
        <CardHeader>
          <CardTitle>Setup Steps</CardTitle>
          <CardDescription>
            Follow these steps to configure your outreach campaign
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {outreachSteps.map((step, index) => {
              const status = getStepStatus(step.id);
              const isCompleted = status === "completed";
              const isCurrent = status === "current";
              
              return (
                <div key={step.id} className="relative">
                  {index < outreachSteps.length - 1 && (
                    <div className={`absolute left-6 top-12 w-0.5 h-8 ${
                      isCompleted ? 'bg-green-200' : 'bg-gray-200'
                    }`} />
                  )}
                  
                  <div className={`flex items-center gap-4 p-4 rounded-lg border transition-colors ${
                    isCurrent 
                      ? 'bg-blue-50 border-blue-200' 
                      : isCompleted 
                        ? 'bg-green-50 border-green-200' 
                        : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                  }`}>
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                      isCompleted 
                        ? 'bg-green-100' 
                        : isCurrent 
                          ? 'bg-blue-100' 
                          : 'bg-gray-100'
                    }`}>
                      {isCompleted ? (
                        <CheckCircle className="h-6 w-6 text-green-600" />
                      ) : (
                        <step.icon className={`h-6 w-6 ${
                          isCurrent ? 'text-blue-600' : 'text-gray-600'
                        }`} />
                      )}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className={`font-medium ${
                          isCurrent ? 'text-blue-900' : isCompleted ? 'text-green-900' : 'text-gray-900'
                        }`}>
                          {step.title}
                        </h3>
                        <Badge variant={isCompleted ? "default" : "secondary"} className="text-xs">
                          {step.estimatedTime}
                        </Badge>
                      </div>
                      <p className={`text-sm ${
                        isCurrent ? 'text-blue-700' : isCompleted ? 'text-green-700' : 'text-gray-600'
                      }`}>
                        {step.description}
                      </p>
                    </div>
                    
                    <Button
                      variant={isCurrent ? "default" : isCompleted ? "outline" : "secondary"}
                      size="sm"
                      onClick={() => handleStepClick(step.id)}
                      className="ml-4"
                    >
                      {isCompleted ? "Edit" : isCurrent ? "Start" : "Configure"}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Integrations Panel */}
      <OutreachIntegrations />

      {/* Launch Section */}
      {progressPercentage === 100 && (
        <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Rocket className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <CardTitle className="text-green-900">Ready to Launch</CardTitle>
                <CardDescription className="text-green-700">
                  Your outreach system is configured and ready to go live
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex gap-3">
              <Button className="bg-green-600 hover:bg-green-700">
                <Rocket className="mr-2 h-4 w-4" />
                Launch Campaign
              </Button>
              <Button variant="outline">
                Schedule Launch
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CallynOutreachSystem;
