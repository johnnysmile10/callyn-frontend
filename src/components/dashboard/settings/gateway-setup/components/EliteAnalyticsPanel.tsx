
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, Phone, Clock, Target, Brain, Zap } from "lucide-react";
import { EliteGatewaySetup } from "../types/eliteGatewayTypes";

interface EliteAnalyticsPanelProps {
  gatewaySetup: EliteGatewaySetup;
}

const EliteAnalyticsPanel = ({ gatewaySetup }: EliteAnalyticsPanelProps) => {
  // Mock analytics data
  const analytics = {
    totalCalls: 1247,
    successRate: 89.2,
    avgNavigationTime: 24.5,
    aiConfidenceScore: 94.1,
    learningAdaptations: 156,
    languageDetectionRate: 97.8
  };

  const recentMetrics = [
    { label: "Navigation Success Rate", value: analytics.successRate, target: 90, color: "bg-green-500" },
    { label: "AI Confidence Score", value: analytics.aiConfidenceScore, target: 85, color: "bg-blue-500" },
    { label: "Language Detection", value: analytics.languageDetectionRate, target: 95, color: "bg-purple-500" }
  ];

  return (
    <div className="space-y-6">
      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6 text-center">
            <Phone className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">{analytics.totalCalls.toLocaleString()}</div>
            <div className="text-sm text-gray-600">Total Calls Processed</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <Target className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">{analytics.successRate}%</div>
            <div className="text-sm text-gray-600">Success Rate</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <Clock className="w-8 h-8 text-orange-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">{analytics.avgNavigationTime}s</div>
            <div className="text-sm text-gray-600">Avg Navigation Time</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <Brain className="w-8 h-8 text-purple-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">{analytics.learningAdaptations}</div>
            <div className="text-sm text-gray-600">Learning Adaptations</div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Metrics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-green-600" />
            Performance Metrics
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {recentMetrics.map((metric, index) => (
            <div key={index} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">{metric.label}</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">Target: {metric.target}%</span>
                  <Badge variant={metric.value >= metric.target ? "default" : "secondary"}>
                    {metric.value}%
                  </Badge>
                </div>
              </div>
              <Progress value={metric.value} className="h-2" />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* AI Learning Insights */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-yellow-600" />
            AI Learning Insights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-medium text-blue-900 mb-2">Recent Optimization</h4>
              <p className="text-sm text-blue-700">
                AI detected a 15% improvement in navigation speed for Spanish-language menus after 
                adapting voice recognition patterns.
              </p>
            </div>
            
            <div className="bg-green-50 p-4 rounded-lg">
              <h4 className="font-medium text-green-900 mb-2">Success Pattern</h4>
              <p className="text-sm text-green-700">
                Most successful navigation path identified: Press 1 → Wait 2.3s → Voice response. 
                Applied to {analytics.learningAdaptations} similar scenarios.
              </p>
            </div>

            <div className="bg-purple-50 p-4 rounded-lg">
              <h4 className="font-medium text-purple-900 mb-2">Language Detection</h4>
              <p className="text-sm text-purple-700">
                Multi-language support showing {analytics.languageDetectionRate}% accuracy. 
                Top detected languages: English (67%), Spanish (23%), French (10%).
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EliteAnalyticsPanel;
