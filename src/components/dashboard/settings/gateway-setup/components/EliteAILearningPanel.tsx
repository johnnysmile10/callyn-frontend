
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";
import { Brain, TrendingUp, Lightbulb, Database, Settings } from "lucide-react";
import { EliteGatewaySetup } from "../types/eliteGatewayTypes";

interface EliteAILearningPanelProps {
  gatewaySetup: EliteGatewaySetup;
}

const EliteAILearningPanel = ({ gatewaySetup }: EliteAILearningPanelProps) => {
  // Mock learning data
  const learningStats = {
    totalAdaptations: 156,
    successRateImprovement: 23.5,
    lastLearningUpdate: new Date('2024-01-15T10:30:00'),
    activePatterns: 43,
    confidenceScore: 94.1
  };

  const recentAdaptations = [
    {
      id: "1",
      trigger: "Spanish menu detection",
      action: "Adjusted voice recognition sensitivity",
      confidence: 0.92,
      impact: "+15% success rate",
      timestamp: new Date('2024-01-15T09:15:00')
    },
    {
      id: "2", 
      trigger: "Long hold time pattern",
      action: "Increased patience threshold to 8 seconds",
      confidence: 0.87,
      impact: "+8% completion rate",
      timestamp: new Date('2024-01-15T08:45:00')
    },
    {
      id: "3",
      trigger: "Voice prompt not recognized",
      action: "Added fallback to DTMF navigation",
      confidence: 0.95,
      impact: "+12% navigation success",
      timestamp: new Date('2024-01-14T16:22:00')
    }
  ];

  return (
    <div className="space-y-6">
      {/* Learning Status Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-purple-600" />
            AI Learning Status
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{learningStats.totalAdaptations}</div>
              <div className="text-sm text-gray-600">Total Adaptations</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">+{learningStats.successRateImprovement}%</div>
              <div className="text-sm text-gray-600">Success Rate Improvement</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{learningStats.activePatterns}</div>
              <div className="text-sm text-gray-600">Active Patterns</div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">AI Confidence Score</span>
              <Badge className="bg-purple-100 text-purple-700">
                {learningStats.confidenceScore}%
              </Badge>
            </div>
            <Progress value={learningStats.confidenceScore} className="h-2" />
          </div>
        </CardContent>
      </Card>

      {/* Learning Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5 text-gray-600" />
            Learning Controls
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">Adaptive Learning</div>
              <div className="text-sm text-gray-600">
                Allow AI to automatically adapt navigation strategies
              </div>
            </div>
            <Switch checked={gatewaySetup.aiLearningEnabled} />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">Real-time Adaptation</div>
              <div className="text-sm text-gray-600">
                Enable live adaptation during active calls
              </div>
            </div>
            <Switch checked={gatewaySetup.globalSettings.enableRealTimeAdaptation} />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">Pattern Recognition</div>
              <div className="text-sm text-gray-600">
                Learn from successful navigation patterns
              </div>
            </div>
            <Switch checked={true} />
          </div>
        </CardContent>
      </Card>

      {/* Recent Adaptations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-green-600" />
            Recent Learning Adaptations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentAdaptations.map((adaptation) => (
              <div key={adaptation.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Lightbulb className="h-4 w-4 text-yellow-500" />
                    <span className="font-medium">{adaptation.trigger}</span>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {Math.round(adaptation.confidence * 100)}% confidence
                  </Badge>
                </div>
                
                <div className="text-sm text-gray-600 mb-2">
                  <strong>Action:</strong> {adaptation.action}
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <span className="text-green-600 font-medium">{adaptation.impact}</span>
                  <span className="text-gray-500">
                    {adaptation.timestamp.toLocaleDateString()} at {adaptation.timestamp.toLocaleTimeString()}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-4 border-t">
            <Button variant="outline" className="w-full" disabled>
              <Database className="h-4 w-4 mr-2" />
              Export Learning Data
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EliteAILearningPanel;
