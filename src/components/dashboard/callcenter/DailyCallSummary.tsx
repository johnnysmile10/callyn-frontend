
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  BarChart, 
  TrendingUp, 
  TrendingDown,
  Clock,
  Phone,
  CheckCircle,
  XCircle,
  Target
} from "lucide-react";

interface CallSummary {
  totalCalls: number;
  successfulCalls: number;
  failedCalls: number;
  averageCallDuration: string;
  connectionRate: number;
  conversionRate: number;
  totalCallTime: string;
  peakHour: string;
  callsByHour: { hour: string; calls: number }[];
  topFailureReasons: { reason: string; count: number }[];
}

interface DailyCallSummaryProps {
  summary: CallSummary;
}

const DailyCallSummary = ({ summary }: DailyCallSummaryProps) => {
  const getPerformanceColor = (rate: number) => {
    if (rate >= 80) return "text-green-600";
    if (rate >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const getPerformanceBadge = (rate: number) => {
    if (rate >= 80) return "bg-green-100 text-green-800";
    if (rate >= 60) return "bg-yellow-100 text-yellow-800";
    return "bg-red-100 text-red-800";
  };

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold">{summary.totalCalls}</div>
                <div className="text-sm text-gray-600">Total Calls</div>
              </div>
              <Phone className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-green-600">{summary.successfulCalls}</div>
                <div className="text-sm text-gray-600">Successful</div>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-red-600">{summary.failedCalls}</div>
                <div className="text-sm text-gray-600">Failed</div>
              </div>
              <XCircle className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold">{summary.averageCallDuration}</div>
                <div className="text-sm text-gray-600">Avg Duration</div>
              </div>
              <Clock className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Performance Rates
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Connection Rate</span>
                <Badge className={getPerformanceBadge(summary.connectionRate)}>
                  {summary.connectionRate}%
                </Badge>
              </div>
              <Progress value={summary.connectionRate} className="h-2" />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Conversion Rate</span>
                <Badge className={getPerformanceBadge(summary.conversionRate)}>
                  {summary.conversionRate}%
                </Badge>
              </div>
              <Progress value={summary.conversionRate} className="h-2" />
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="font-semibold">{summary.totalCallTime}</div>
                  <div className="text-sm text-gray-600">Total Talk Time</div>
                </div>
                <div>
                  <div className="font-semibold">{summary.peakHour}</div>
                  <div className="text-sm text-gray-600">Peak Hour</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Calls by Hour</CardTitle>
            <CardDescription>Distribution of calls throughout the day</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {summary.callsByHour.map(({ hour, calls }) => (
                <div key={hour} className="flex items-center gap-3">
                  <div className="w-12 text-sm font-medium">{hour}</div>
                  <div className="flex-1">
                    <Progress 
                      value={(calls / Math.max(...summary.callsByHour.map(h => h.calls))) * 100} 
                      className="h-2"
                    />
                  </div>
                  <div className="w-8 text-sm text-gray-600">{calls}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Failure Analysis */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingDown className="h-5 w-5 text-red-500" />
            Top Failure Reasons
          </CardTitle>
          <CardDescription>
            Analyze why calls aren't connecting to improve performance
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {summary.topFailureReasons.map(({ reason, count }, index) => (
              <div key={reason} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-red-100 text-red-600 text-xs font-medium flex items-center justify-center">
                    {index + 1}
                  </div>
                  <span className="font-medium">{reason}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">{count} calls</span>
                  <Badge variant="outline">{((count / summary.totalCalls) * 100).toFixed(1)}%</Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DailyCallSummary;
