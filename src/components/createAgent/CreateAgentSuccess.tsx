
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Phone, Settings, Play } from "lucide-react";
import { AgentData } from "@/pages/CreateAgent";

interface CreateAgentSuccessProps {
  agentData: AgentData;
  onBackToDashboard: () => void;
}

const CreateAgentSuccess = ({ agentData, onBackToDashboard }: CreateAgentSuccessProps) => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <Card className="text-center p-8">
          <CardHeader className="pb-6">
            <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
              <CheckCircle className="h-12 w-12 text-green-600" />
            </div>
            <CardTitle className="text-3xl font-bold text-callyn-darkBlue mb-2">
              Agent Created Successfully!
            </CardTitle>
            <CardDescription className="text-lg text-gray-600">
              "{agentData.agentName}" is ready to start making calls
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-8">
            {/* Agent Summary */}
            <Card className="bg-blue-50 border-blue-200">
              <CardHeader>
                <CardTitle className="text-xl text-blue-900">Agent Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                  <div>
                    <label className="text-sm font-medium text-gray-600">Agent Name</label>
                    <p className="font-semibold">{agentData.agentName}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Role</label>
                    <p className="font-semibold">{agentData.agentRole}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Type</label>
                    <Badge variant="secondary" className="capitalize">{agentData.agentType}</Badge>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Voice</label>
                    <p className="font-semibold capitalize">{agentData.voiceId}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Primary Language</label>
                    <p className="font-semibold">{agentData.primaryLanguage}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Training Method</label>
                    <Badge variant="outline" className="capitalize">{agentData.trainingMethod}</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Next Steps */}
            <div className="text-left">
              <h3 className="text-xl font-semibold mb-4">What's Next?</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-callyn-blue rounded-full flex items-center justify-center">
                      <Play className="h-4 w-4 text-white" />
                    </div>
                    <h4 className="font-semibold">Test Your Agent</h4>
                  </div>
                  <p className="text-sm text-gray-600">
                    Make a test call to ensure everything works perfectly
                  </p>
                </Card>

                <Card className="p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                      <Phone className="h-4 w-4 text-white" />
                    </div>
                    <h4 className="font-semibold">Start Campaign</h4>
                  </div>
                  <p className="text-sm text-gray-600">
                    Upload your contact list and begin making calls
                  </p>
                </Card>

                <Card className="p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                      <Settings className="h-4 w-4 text-white" />
                    </div>
                    <h4 className="font-semibold">Fine-tune</h4>
                  </div>
                  <p className="text-sm text-gray-600">
                    Adjust settings based on call performance
                  </p>
                </Card>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
              <Button 
                variant="outline"
                className="px-6 py-3"
                onClick={onBackToDashboard}
              >
                Back to Dashboard
              </Button>
              <Button 
                className="px-6 py-3 bg-callyn-blue hover:bg-callyn-darkBlue"
                onClick={onBackToDashboard}
              >
                Start First Campaign
              </Button>
            </div>

            <div className="text-center pt-4">
              <p className="text-sm text-gray-500">
                Need help? Check out our{" "}
                <a href="#" className="text-callyn-blue hover:underline">
                  getting started guide
                </a>{" "}
                or{" "}
                <a href="#" className="text-callyn-blue hover:underline">
                  contact support
                </a>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CreateAgentSuccess;
