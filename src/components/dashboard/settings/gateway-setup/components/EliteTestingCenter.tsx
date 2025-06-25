
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { TestTube, Play, RotateCcw, CheckCircle, XCircle, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { EliteGatewaySetup, TestScenario, TestResult, DEFAULT_TEST_SCENARIOS } from "../types/eliteGatewayTypes";

interface EliteTestingCenterProps {
  gatewaySetup: EliteGatewaySetup;
}

const EliteTestingCenter = ({ gatewaySetup }: EliteTestingCenterProps) => {
  const { toast } = useToast();
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [runningTests, setRunningTests] = useState<string[]>([]);
  const [testProgress, setTestProgress] = useState(0);

  const runSingleTest = async (scenario: TestScenario): Promise<TestResult> => {
    // Simulate test execution
    setRunningTests(prev => [...prev, scenario.id]);
    
    await new Promise(resolve => setTimeout(resolve, 2000 + Math.random() * 3000));
    
    const result: TestResult = {
      scenarioId: scenario.id,
      success: Math.random() > 0.2, // 80% success rate for demo
      executionTime: 1500 + Math.random() * 2000,
      detectedPrompts: scenario.mockPrompts,
      executedActions: scenario.expectedActions,
      confidence: 0.7 + Math.random() * 0.3,
      timestamp: new Date()
    };

    if (!result.success) {
      result.errors = ['Menu option not detected', 'Timeout waiting for response'];
    }

    setRunningTests(prev => prev.filter(id => id !== scenario.id));
    return result;
  };

  const runAllTests = async () => {
    setTestResults([]);
    setTestProgress(0);
    
    const totalTests = DEFAULT_TEST_SCENARIOS.length;
    const results: TestResult[] = [];
    
    for (let i = 0; i < DEFAULT_TEST_SCENARIOS.length; i++) {
      const scenario = DEFAULT_TEST_SCENARIOS[i];
      const result = await runSingleTest(scenario);
      results.push(result);
      setTestResults([...results]);
      setTestProgress(((i + 1) / totalTests) * 100);
    }

    const successCount = results.filter(r => r.success).length;
    
    toast({
      title: "Test Suite Completed",
      description: `${successCount}/${totalTests} tests passed successfully.`,
    });
  };

  const runIndividualTest = async (scenario: TestScenario) => {
    const result = await runSingleTest(scenario);
    setTestResults(prev => {
      const filtered = prev.filter(r => r.scenarioId !== scenario.id);
      return [...filtered, result];
    });

    toast({
      title: result.success ? "Test Passed" : "Test Failed",
      description: `${scenario.name} completed in ${Math.round(result.executionTime)}ms`,
    });
  };

  const getTestResult = (scenarioId: string) => {
    return testResults.find(r => r.scenarioId === scenarioId);
  };

  const isTestRunning = (scenarioId: string) => {
    return runningTests.includes(scenarioId);
  };

  return (
    <div className="space-y-6">
      {/* Test Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TestTube className="h-5 w-5 text-blue-600" />
            Gateway Testing Center
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-4">
            <Button
              onClick={runAllTests}
              disabled={runningTests.length > 0}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Play className="h-4 w-4 mr-2" />
              Run All Tests
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                setTestResults([]);
                setTestProgress(0);
              }}
              disabled={runningTests.length > 0}
            >
              <RotateCcw className="h-4 w-4 mr-2" />
              Clear Results
            </Button>
            <div className="text-sm text-gray-600">
              {testResults.length > 0 && (
                <>
                  {testResults.filter(r => r.success).length}/{testResults.length} tests passed
                </>
              )}
            </div>
          </div>

          {runningTests.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Running tests...</span>
                <span>{Math.round(testProgress)}%</span>
              </div>
              <Progress value={testProgress} className="w-full" />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Individual Test Scenarios */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {DEFAULT_TEST_SCENARIOS.map((scenario) => {
          const result = getTestResult(scenario.id);
          const isRunning = isTestRunning(scenario.id);

          return (
            <Card key={scenario.id} className="border border-gray-200">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium">{scenario.name}</CardTitle>
                  <div className="flex items-center gap-2">
                    {result && (
                      <Badge variant={result.success ? "default" : "destructive"}>
                        {result.success ? (
                          <CheckCircle className="h-3 w-3 mr-1" />
                        ) : (
                          <XCircle className="h-3 w-3 mr-1" />
                        )}
                        {result.success ? "Passed" : "Failed"}
                      </Badge>
                    )}
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => runIndividualTest(scenario)}
                      disabled={isRunning}
                    >
                      {isRunning ? (
                        <Clock className="h-4 w-4" />
                      ) : (
                        <Play className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-gray-600">{scenario.description}</p>
                
                <div className="space-y-2">
                  <div>
                    <p className="text-xs font-medium text-gray-700">Mock Prompts:</p>
                    <div className="text-xs text-gray-600 bg-gray-50 p-2 rounded">
                      {scenario.mockPrompts.join(" | ")}
                    </div>
                  </div>
                  
                  {scenario.language && (
                    <div>
                      <p className="text-xs font-medium text-gray-700">Language:</p>
                      <Badge variant="outline" className="text-xs">
                        {scenario.language}
                      </Badge>
                    </div>
                  )}
                </div>

                {result && (
                  <div className="pt-2 border-t border-gray-100 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span>Execution Time:</span>
                      <span>{Math.round(result.executionTime)}ms</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span>Confidence:</span>
                      <span>{Math.round(result.confidence * 100)}%</span>
                    </div>
                    {result.errors && result.errors.length > 0 && (
                      <div>
                        <p className="text-xs font-medium text-red-700">Errors:</p>
                        <div className="text-xs text-red-600">
                          {result.errors.join(", ")}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default EliteTestingCenter;
