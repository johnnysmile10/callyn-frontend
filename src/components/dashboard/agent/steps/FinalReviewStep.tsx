
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, User, FileText, Brain, Mic, Rocket, Edit, Play } from "lucide-react";

interface FinalReviewStepProps {
  onComplete: (data: any) => void;
  initialData: any;
  isCompleted: boolean;
}

const FinalReviewStep = ({ onComplete, initialData, isCompleted }: FinalReviewStepProps) => {
  const [isDeploying, setIsDeploying] = useState(false);
  const [isDeployed, setIsDeployed] = useState(false);

  const handleDeploy = async () => {
    setIsDeploying(true);
    
    // Simulate deployment process
    setTimeout(() => {
      setIsDeploying(false);
      setIsDeployed(true);
      onComplete({ deployed: true, deployedAt: new Date() });
    }, 3000);
  };

  const handleEdit = (section: string) => {
    // Logic to go back to specific section for editing
    console.log(`Edit ${section}`);
  };

  const summaryData = [
    {
      icon: User,
      title: "Agent Profile",
      data: initialData.profile,
      items: [
        { label: "Name", value: initialData.profile?.agentName || "Not set" },
        { label: "Role", value: initialData.profile?.role || "Not set" },
        { label: "Company", value: initialData.profile?.company || "Not set" },
        { label: "Industry", value: initialData.profile?.industry || "Not specified" }
      ]
    },
    {
      icon: FileText,
      title: "Script & Content",
      data: initialData.script,
      items: [
        { label: "Template", value: initialData.script?.template || "Custom" },
        { label: "Greeting", value: initialData.script?.greeting ? "Configured" : "Not set" },
        { label: "Main Script", value: initialData.script?.customScript ? "Configured" : "Not set" }
      ]
    },
    {
      icon: Brain,
      title: "Behavior Settings",
      data: initialData.behavior,
      items: [
        { label: "Style", value: initialData.behavior?.conversationStyle || "Not set" },
        { label: "Persistence", value: initialData.behavior?.persistence?.[0] ? `Level ${initialData.behavior.persistence[0]}` : "Not set" },
        { label: "Max Duration", value: initialData.behavior?.maxCallDuration?.[0] ? `${initialData.behavior.maxCallDuration[0]} min` : "Not set" }
      ]
    },
    {
      icon: Mic,
      title: "Voice & Testing",
      data: initialData.voice,
      items: [
        { label: "Voice", value: initialData.voice?.voiceId || "Not selected" },
        { label: "Tested", value: initialData.voice?.hasTestedVoice ? "Yes" : "No" }
      ]
    }
  ];

  const isReadyToDeploy = summaryData.every(section => 
    section.items.some(item => item.value !== "Not set" && item.value !== "No")
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Rocket className="h-5 w-5 text-blue-600" />
          Step 5: Final Review + Launch
        </CardTitle>
        <CardDescription>
          Review your agent configuration and deploy to start calling leads
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Configuration Summary */}
        <div className="space-y-4">
          <h3 className="font-semibold text-lg">Configuration Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {summaryData.map((section, index) => (
              <Card key={index} className="relative">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <section.icon className="h-4 w-4 text-blue-600" />
                      <h4 className="font-medium text-sm">{section.title}</h4>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEdit(section.title)}
                      className="text-xs"
                    >
                      <Edit className="h-3 w-3 mr-1" />
                      Edit
                    </Button>
                  </div>
                  <div className="space-y-2">
                    {section.items.map((item, itemIndex) => (
                      <div key={itemIndex} className="flex justify-between text-xs">
                        <span className="text-gray-600">{item.label}:</span>
                        <span className={`font-medium ${
                          item.value === "Not set" || item.value === "No" 
                            ? "text-red-500" 
                            : "text-gray-900"
                        }`}>
                          {item.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Deployment Status */}
        {!isDeployed && (
          <Card className={`border-2 ${isReadyToDeploy ? "border-green-200 bg-green-50" : "border-orange-200 bg-orange-50"}`}>
            <CardContent className="p-6 text-center">
              <div className="space-y-4">
                {isReadyToDeploy ? (
                  <>
                    <CheckCircle className="h-12 w-12 text-green-600 mx-auto" />
                    <div>
                      <h3 className="font-semibold text-green-900 mb-2">Ready for Deployment!</h3>
                      <p className="text-sm text-green-700 mb-4">
                        Your AI agent is fully configured and ready to start calling leads.
                      </p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                      <Button
                        onClick={handleDeploy}
                        disabled={isDeploying}
                        size="lg"
                        className="bg-green-600 hover:bg-green-700"
                      >
                        {isDeploying ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                            Deploying...
                          </>
                        ) : (
                          <>
                            <Rocket className="mr-2 h-4 w-4" />
                            Deploy Agent
                          </>
                        )}
                      </Button>
                      <Button variant="outline" size="lg">
                        <Play className="mr-2 h-4 w-4" />
                        Final Test Call
                      </Button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="h-12 w-12 bg-orange-200 rounded-full flex items-center justify-center mx-auto">
                      <span className="text-orange-600 font-bold">!</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-orange-900 mb-2">Configuration Incomplete</h3>
                      <p className="text-sm text-orange-700 mb-4">
                        Please complete all required sections before deploying your agent.
                      </p>
                    </div>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Success State */}
        {isDeployed && (
          <Card className="border-green-200 bg-green-50">
            <CardContent className="p-6 text-center">
              <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-green-900 mb-2">
                🎉 Agent Successfully Deployed!
              </h3>
              <p className="text-green-700 mb-6">
                Your AI sales agent is now live and ready to start calling leads. 
                You can monitor performance and make adjustments anytime.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                  Start First Campaign
                </Button>
                <Button variant="outline" size="lg">
                  View Agent Dashboard
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Next Steps */}
        {isDeployed && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">What's Next?</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <User className="h-6 w-6 text-blue-600" />
                  </div>
                  <h4 className="font-medium mb-2">Upload Lead Lists</h4>
                  <p className="text-sm text-gray-600">Import your prospects and target contacts</p>
                </div>
                <div className="text-center p-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Play className="h-6 w-6 text-green-600" />
                  </div>
                  <h4 className="font-medium mb-2">Launch Campaigns</h4>
                  <p className="text-sm text-gray-600">Start your first automated calling campaign</p>
                </div>
                <div className="text-center p-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <CheckCircle className="h-6 w-6 text-purple-600" />
                  </div>
                  <h4 className="font-medium mb-2">Monitor Results</h4>
                  <p className="text-sm text-gray-600">Track performance and optimize for better results</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </CardContent>
    </Card>
  );
};

export default FinalReviewStep;
