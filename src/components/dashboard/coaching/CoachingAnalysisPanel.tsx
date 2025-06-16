
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  TrendingUp, 
  TrendingDown, 
  Target, 
  MessageSquare, 
  Clock, 
  Award,
  AlertCircle,
  CheckCircle,
  BarChart3
} from "lucide-react";

interface CoachingMetric {
  id: string;
  name: string;
  value: number;
  target: number;
  trend: "up" | "down" | "stable";
  improvement: string;
}

interface CoachingInsight {
  id: string;
  type: "strength" | "improvement" | "warning";
  title: string;
  description: string;
  actionable: string;
}

const COACHING_METRICS: CoachingMetric[] = [
  {
    id: "conversion",
    name: "Conversion Rate",
    value: 23,
    target: 30,
    trend: "up",
    improvement: "+5% from last week"
  },
  {
    id: "talk_time",
    name: "Talk Time Ratio",
    value: 65,
    target: 70,
    trend: "down",
    improvement: "-3% from last week"
  },
  {
    id: "objection_handling",
    name: "Objection Handling",
    value: 78,
    target: 85,
    trend: "up",
    improvement: "+12% from last week"
  },
  {
    id: "call_duration",
    name: "Avg Call Duration",
    value: 4.2,
    target: 5.0,
    trend: "stable",
    improvement: "No change"
  }
];

const COACHING_INSIGHTS: CoachingInsight[] = [
  {
    id: "1",
    type: "strength",
    title: "Excellent Opening Performance",
    description: "Your greeting and introduction have a 95% positive response rate",
    actionable: "Keep using the current opening script - it's working great!"
  },
  {
    id: "2",
    type: "improvement",
    title: "Objection Handling Opportunity",
    description: "31% of calls end after price objections without attempting to overcome them",
    actionable: "Try using value-based responses when price comes up"
  },
  {
    id: "3",
    type: "warning",
    title: "Rushed Closing Attempts",
    description: "Closing attempts are happening too early, before building enough value",
    actionable: "Wait for 2-3 engagement signals before attempting to close"
  },
  {
    id: "4",
    type: "improvement",
    title: "Discovery Questions",
    description: "Only using 3 out of 7 recommended discovery questions on average",
    actionable: "Focus on asking about budget, timeline, and decision-making process"
  }
];

const CoachingAnalysisPanel = () => {
  const [selectedMetric, setSelectedMetric] = useState<string | null>(null);

  const getMetricIcon = (metric: CoachingMetric) => {
    if (metric.trend === "up") return <TrendingUp className="h-4 w-4 text-green-500" />;
    if (metric.trend === "down") return <TrendingDown className="h-4 w-4 text-red-500" />;
    return <BarChart3 className="h-4 w-4 text-gray-500" />;
  };

  const getInsightIcon = (type: CoachingInsight["type"]) => {
    switch (type) {
      case "strength": return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "improvement": return <Target className="h-5 w-5 text-blue-500" />;
      case "warning": return <AlertCircle className="h-5 w-5 text-orange-500" />;
    }
  };

  const getInsightBadgeColor = (type: CoachingInsight["type"]) => {
    switch (type) {
      case "strength": return "bg-green-100 text-green-800";
      case "improvement": return "bg-blue-100 text-blue-800";
      case "warning": return "bg-orange-100 text-orange-800";
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5 text-blue-600" />
            AI Coaching Analysis
          </CardTitle>
          <CardDescription>
            Performance insights and improvement recommendations for your calling agent
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="metrics" className="space-y-4">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="metrics">Performance Metrics</TabsTrigger>
              <TabsTrigger value="insights">Coaching Insights</TabsTrigger>
              <TabsTrigger value="improvements">Action Items</TabsTrigger>
            </TabsList>

            <TabsContent value="metrics" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {COACHING_METRICS.map((metric) => (
                  <Card 
                    key={metric.id}
                    className={`cursor-pointer transition-colors ${
                      selectedMetric === metric.id ? 'border-blue-500 bg-blue-50' : 'hover:shadow-md'
                    }`}
                    onClick={() => setSelectedMetric(selectedMetric === metric.id ? null : metric.id)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-sm">{metric.name}</h4>
                        {getMetricIcon(metric)}
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-end gap-2">
                          <span className="text-2xl font-bold">
                            {metric.id === "call_duration" ? `${metric.value}m` : `${metric.value}%`}
                          </span>
                          <span className="text-sm text-gray-500">
                            Target: {metric.id === "call_duration" ? `${metric.target}m` : `${metric.target}%`}
                          </span>
                        </div>
                        
                        <Progress 
                          value={(metric.value / metric.target) * 100} 
                          className="h-2"
                        />
                        
                        <p className="text-xs text-gray-600">{metric.improvement}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="insights" className="space-y-4">
              <div className="space-y-3">
                {COACHING_INSIGHTS.map((insight) => (
                  <Card key={insight.id}>
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        {getInsightIcon(insight.type)}
                        <div className="flex-1 space-y-2">
                          <div className="flex items-center gap-2">
                            <h4 className="font-medium">{insight.title}</h4>
                            <Badge 
                              variant="outline" 
                              className={getInsightBadgeColor(insight.type)}
                            >
                              {insight.type}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600">{insight.description}</p>
                          <div className="bg-blue-50 p-3 rounded-lg">
                            <p className="text-sm font-medium text-blue-800">💡 Recommended Action:</p>
                            <p className="text-sm text-blue-700">{insight.actionable}</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="improvements" className="space-y-4">
              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Priority Action Items</CardTitle>
                    <CardDescription>Focus on these areas for maximum impact</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 p-3 bg-red-50 rounded-lg">
                        <AlertCircle className="h-5 w-5 text-red-500" />
                        <div>
                          <p className="font-medium text-red-800">High Priority</p>
                          <p className="text-sm text-red-700">Address objection handling script</p>
                        </div>
                        <Button size="sm" variant="outline">
                          Update Script
                        </Button>
                      </div>
                      
                      <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg">
                        <Target className="h-5 w-5 text-orange-500" />
                        <div>
                          <p className="font-medium text-orange-800">Medium Priority</p>
                          <p className="text-sm text-orange-700">Improve discovery question usage</p>
                        </div>
                        <Button size="sm" variant="outline">
                          View Training
                        </Button>
                      </div>
                      
                      <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                        <Clock className="h-5 w-5 text-blue-500" />
                        <div>
                          <p className="font-medium text-blue-800">Low Priority</p>
                          <p className="text-sm text-blue-700">Extend average call duration</p>
                        </div>
                        <Button size="sm" variant="outline">
                          Adjust Pacing
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Weekly Goals</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Increase conversion rate to 28%</span>
                        <Badge variant="outline">5% improvement needed</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Improve objection handling to 82%</span>
                        <Badge variant="outline">4% improvement needed</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Extend average call time to 4.8m</span>
                        <Badge variant="outline">0.6m improvement needed</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default CoachingAnalysisPanel;
