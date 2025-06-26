
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, Phone, TrendingUp, AlertTriangle } from "lucide-react";

interface UsageStatsCardProps {
  totalMinutes: number;
  usedMinutes: number;
  totalCalls: number;
  averageCallDuration: number;
}

const UsageStatsCard = ({ 
  totalMinutes, 
  usedMinutes, 
  totalCalls, 
  averageCallDuration 
}: UsageStatsCardProps) => {
  const remainingMinutes = totalMinutes - usedMinutes;
  const usagePercentage = (usedMinutes / totalMinutes) * 100;

  const stats = [
    {
      title: "Minutes Used",
      value: usedMinutes.toLocaleString(),
      icon: Clock,
      color: "text-blue-600"
    },
    {
      title: "Total Calls",
      value: totalCalls.toLocaleString(),
      icon: Phone,
      color: "text-green-600"
    },
    {
      title: "Avg Duration",
      value: `${averageCallDuration.toFixed(1)}m`,
      icon: TrendingUp,
      color: "text-purple-600"
    },
    {
      title: "Remaining",
      value: remainingMinutes.toLocaleString(),
      icon: AlertTriangle,
      color: usagePercentage > 75 ? "text-red-600" : "text-gray-600"
    }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{stat.title}</p>
                <p className="text-xl font-bold">{stat.value}</p>
              </div>
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default UsageStatsCard;
