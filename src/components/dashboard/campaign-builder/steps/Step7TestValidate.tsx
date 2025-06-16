
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TestTube, Play, CheckCircle, AlertCircle, Phone, MessageSquare, Target } from "lucide-react";
import TestAgentPanel from "../../agent/TestAgentPanel";

interface Step7TestValidateProps {
  data: any;
  onUpdate: (data: any) => void;
}

const Step7TestValidate = ({ data, onUpdate }: Step7TestValidateProps) => {
  const [isTestingMode, setIsTestingMode] = useState(false);

  const handleStartTest = () => {
    setIsTestingMode(true);
  };

  const handleTestComplete = (results: any) => {
    const updatedData = {
      ...data,
      testCallsCompleted: true,
      validationPassed: true,
      testResults: results
    };
    onUpdate(updatedData);
    setIsTestingMode(false);
  };

  if (isTestingMode) {
    return (
      <div className="max-w-4xl mx-auto">
        <TestAgentPanel />
        <div className="mt-6 text-center">
          <Button onClick={() => handleTestComplete({ score: 85, issues: [] })}>
            Complete Testing
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <TestTube className="h-5 w-5 text-blue-600" />
            <CardTitle>Test & Validate Your Agent</CardTitle>
          </div>
          <CardDescription>
            Run test calls to ensure your agent is ready for live campaigns
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="border-dashed">
              <CardContent className="pt-6 text-center">
                <Phone className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <h3 className="font-semibold mb-1">Voice Quality</h3>
                <p className="text-sm text-gray-600 mb-3">Test voice clarity and tone</p>
                {data.testCallsCompleted ? (
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Passed
                  </Badge>
                ) : (
                  <Badge variant="outline">Pending</Badge>
                )}
              </CardContent>
            </Card>

            <Card className="border-dashed">
              <CardContent className="pt-6 text-center">
                <MessageSquare className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <h3 className="font-semibold mb-1">Script Flow</h3>
                <p className="text-sm text-gray-600 mb-3">Validate conversation logic</p>
                {data.testCallsCompleted ? (
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Passed
                  </Badge>
                ) : (
                  <Badge variant="outline">Pending</Badge>
                )}
              </CardContent>
            </Card>

            <Card className="border-dashed">
              <CardContent className="pt-6 text-center">
                <Target className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <h3 className="font-semibold mb-1">Response Quality</h3>
                <p className="text-sm text-gray-600 mb-3">Check objection handling</p>
                {data.testCallsCompleted ? (
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Passed
                  </Badge>
                ) : (
                  <Badge variant="outline">Pending</Badge>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="text-center">
            <Button onClick={handleStartTest} size="lg" className="bg-blue-600 hover:bg-blue-700">
              <Play className="h-4 w-4 mr-2" />
              Start Agent Testing
            </Button>
          </div>

          {data.validationPassed && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
              <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <h3 className="text-green-800 font-semibold mb-1">Agent Validation Complete!</h3>
              <p className="text-green-700">Your agent is ready to launch campaigns.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Step7TestValidate;
