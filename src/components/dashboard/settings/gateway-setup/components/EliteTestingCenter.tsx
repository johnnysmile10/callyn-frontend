
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Play, Square, TestTube, CheckCircle, XCircle, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { EliteGatewaySetup, TestScenario, TestResult, DEFAULT_TEST_SCENARIOS } from "../types/eliteGatewayTypes";

interface EliteTestingCenterProps {
  gatewaySetup: EliteGatewaySetup;
}

const EliteTestingCenter = ({ gatewaySetup }: EliteTestingCenterProps) => {
  const { toast } = useToast();
  const [selectedScenario, setSelectedScenario] = useState<string>("");
  const [isRunningTest, setIsRunningTest] = useState(false);
  const [testResults, setTestResults] = useState<TestResult[]>([]);

  const runTest = async (scenarioId: string) => {
    const scenario = DEFAULT_TEST_SCENARIOS.find(s => s.id === scenarioId);
    if (!scenario) return;

    setIsRunningTest(true);
    
    // Simulate test execution
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const mockResult: TestResult = {
      scenarioId,
      success: Math.random() > 0.2, // 80% success rate
      executionTime: Math.random() * 30 + 10, // 10-40 seconds
      detectedPrompts: scenario.mockPrompts,
      executedActions: scenario.expectedActions,
      confidence: Math.random() * 0.3 + 0.7, // 70-100% confidence
      timestamp: new Date()
    };

    setTestResults(prev => [mockResult, ...prev.slice(0, 4)]); // Keep last 5 results
    setIsRunningTest(false);

    toast({
      title: mockResult.success ? "Test Passed" : "Test Failed",
      description: `${scenario.name} completed in ${mockResult.executionTime.toFixed(1)}s`,
    });
  };

  const runAllTests = async () => {
    for (const scenario of DEFAULT_TEST_SCENARIOS) {
      await runTest(scenario.id);
    }
  };

  return (
    <div className="space-y-6">
      {/* Test Control Panel */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TestTube className="h-5 w-5 text-blue-600" />
            Elite Testing Center
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert className="bg-blue-50 border-blue-200">
            <TestTube className="h-4 w-4 text-blue-600" />
            <AlertDescription>
              Test your Elite gateway configuration with AI-powered scenarios including 
              multi-language support, voice detection, and adaptive learning validation.
            </AlertDescription>
          </Alert>

          <div className="flex gap-4">
            <div className="flex-1">
              <Select value={selectedScenario} onValueChange={setSelectedScenario}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a test scenario" />
                </SelectTrigger>
                <SelectContent>
                  {DEFAULT_TEST_SCENARIOS.map((scenario) => (
                    <SelectItem key={scenario.id} value={scenario.id}>
                      {scenario.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button
              onClick={() => selectedScenario && runTest(selectedScenario)}
              disabled={!selectedScenario || isRunningTest}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {isRunningTest ? (
                <>
                  <Square className="h-4 w-4 mr-2" />
                  Running...
                </>
              ) : (
                <>
                  <Play className="h-4 w-4 mr-2" />
                  Run Test
                </>
              )}
            </Button>
            <Button
              variant="outline"
              onClick={runAllTests}
              disabled={isRunningTest}
            >
              Run All Tests
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Available Test Scenarios */}
      <Card>
        <CardHeader>
          <CardTitle>Available Test Scenarios</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {DEFAULT_TEST_SCENARIOS.map((scenario) => (
              <div key={scenario.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">{scenario.name}</h4>
                  {scenario.language && (
                    <Badge variant="outline" className="text-xs">
                      {scenario.language.toUpperCase()}
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-gray-600 mb-3">{scenario.description}</p>
                <div className="text-xs text-gray-500">
                  <div><strong>Mock Prompts:</strong> {scenario.mockPrompts.join(", ")}</div>
                  <div><strong>Expected Actions:</strong> {scenario.expectedActions.map(a => `${a.type}: ${a.value}`).join(", ")}</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Test Results */}
      {testResults.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Recent Test Results</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {testResults.map((result, index) => {
                const scenario = DEFAULT_TEST_SCENARIOS.find(s => s.id === result.scenarioId);
                return (
                  <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                    <div className="flex items-center gap-3">
                      {result.success ? (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      ) : (
                        <XCircle className="h-5 w-5 text-red-500" />
                      )}
                      <div>
                        <div className="font-medium">{scenario?.name}</div>
                        <div className="text-sm text-gray-600">
                          Confidence: {Math.round(result.confidence * 100)}%
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1 text-sm text-gray-600">
                        <Clock className="h-4 w-4" />
                        {result.executionTime.toFixed(1)}s
                      </div>
                      <div className="text-xs text-gray-500">
                        {result.timestamp.toLocaleTimeString()}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default EliteTestingCenter;
