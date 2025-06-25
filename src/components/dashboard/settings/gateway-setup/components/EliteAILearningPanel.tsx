
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Brain, TrendingUp, Target, Clock, Zap } from "lucide-react";
import { EliteGatewaySetup } from "../types/eliteGatewayTypes";

interface EliteAILearningPanelProps {
  gatewaySetup: EliteGatewaySetup;
}

const EliteAILearningPanel = ({ gatewaySetup }: EliteAILearningPanelProps) => {
  // Mock learning data for demonstration
  const mockLearningStats = {
    totalCallsProcessed: 1247,
    successRateImprovement: 23.5,
    adaptationsApplied: 47,
    averageResponseTime: 1.8,
    lastLearningUpdate: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
  };

  const mockRecentAdaptations = [
    {
      id: '1',
      pattern: 'Press 1 for English, Para español presione 2',
      adaptation: 'Improved multi-language detection accuracy',
      impact: '+12% success rate',
      timestamp: new Date(Date.now() - 30 * 60 * 1000), // 30 min ago
    },
    {
      id: '2',
      pattern: 'Please hold while we transfer you',
      adaptation: 'Optimized wait duration from 15s to 8s',
      impact: '+5% efficiency',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    },
    {
      id: '3',
      pattern: 'Say your company name clearly',
      adaptation: 'Enhanced voice clarity detection',
      impact: '+18% recognition',
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
    },
  ];

  const mockCallPatterns = [
    { pattern: 'Banking IVR Systems', frequency: 34, successRate: 89 },
    { pattern: 'Customer Support Menus', frequency: 28, successRate: 92 },
    { pattern: 'Healthcare Systems', frequency: 23, successRate: 76 },
    { pattern: 'Telecom Support', frequency: 15, successRate: 94 },
  ];

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMins / 60);
    
    if (diffMins < 60) {
      return `${diffMins} minutes ago`;
    } else {
      return `${diffHours} hours ago`;
    }
  };

  return (
    <div className="space-y-6">
      {/* Learning Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Brain className="h-4 w-4 text-purple-600" />
              <span className="text-sm font-medium">Calls Processed</span>
            </div>
            <div className="text-2xl font-bold">{mockLearningStats.totalCallsProcessed.toLocaleString()}</div>
            <div className="text-xs text-gray-600">Total learning dataset</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="h-4 w-4 text-green-600" />
              <span className="text-sm font-medium">Success Rate</span>
            </div>
            <div className="text-2xl font-bold">+{mockLearningStats.successRateImprovement}%</div>
            <div className="text-xs text-gray-600">Improvement over time</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Target className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-medium">Adaptations</span>
            </div>
            <div className="text-2xl font-bold">{mockLearningStats.adaptationsApplied}</div>
            <div className="text-xs text-gray-600">Applied this month</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="h-4 w-4 text-orange-600" />
              <span className="text-sm font-medium">Response Time</span>
            </div>
            <div className="text-2xl font-bold">{mockLearningStats.averageResponseTime}s</div>
            <div className="text-xs text-gray-600">Average navigation time</div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Adaptations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-yellow-600" />
            Recent AI Adaptations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockRecentAdaptations.map((adaptation) => (
              <div key={adaptation.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    {adaptation.impact}
                  </Badge>
                  <span className="text-xs text-gray-500">
                    {formatTimeAgo(adaptation.timestamp)}
                  </span>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">{adaptation.adaptation}</p>
                  <p className="text-xs text-gray-600 bg-gray-50 p-2 rounded">
                    Pattern: "{adaptation.pattern}"
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Call Pattern Analysis */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-blue-600" />
            Call Pattern Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockCallPatterns.map((pattern, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{pattern.pattern}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-gray-600">
                      {pattern.frequency} calls
                    </span>
                    <Badge variant={pattern.successRate >= 90 ? "default" : "secondary"}>
                      {pattern.successRate}% success
                    </Badge>
                  </div>
                </div>
                <Progress value={pattern.successRate} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Learning Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-purple-600" />
            Learning System Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm font-medium text-green-800">AI Learning Active</span>
              </div>
              <span className="text-xs text-green-600">
                Last update: {formatTimeAgo(mockLearningStats.lastLearningUpdate)}
              </span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="space-y-1">
                <p className="font-medium">Multi-Language Detection</p>
                <p className="text-gray-600">Training on 8 languages</p>
              </div>
              <div className="space-y-1">
                <p className="font-medium">Voice Pattern Recognition</p>
                <p className="text-gray-600">Analyzing voice characteristics</p>
              </div>
              <div className="space-y-1">
                <p className="font-medium">Response Optimization</p>
                <p className="text-gray-600">Timing adjustments active</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EliteAILearningPanel;
