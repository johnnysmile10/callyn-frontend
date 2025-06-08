
import { Card, CardContent } from "@/components/ui/card";
import { PhoneCall, TrendingUp, Clock, BarChart3 } from "lucide-react";
import { CallLogStats } from "./types";
import { formatDuration, formatCurrency } from "./callLogUtils";

interface CallLogStatsCardsProps {
  stats: CallLogStats;
}

const CallLogStatsCards = ({ stats }: CallLogStatsCardsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-2">
            <PhoneCall className="h-4 w-4 text-blue-600" />
            <div>
              <p className="text-sm font-medium">Total Calls</p>
              <p className="text-2xl font-bold">{stats.total}</p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-green-600" />
            <div>
              <p className="text-sm font-medium">Booking Rate</p>
              <p className="text-2xl font-bold">{stats.bookingRate.toFixed(1)}%</p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-purple-600" />
            <div>
              <p className="text-sm font-medium">Avg Duration</p>
              <p className="text-2xl font-bold">{formatDuration(Math.round(stats.avgDuration))}</p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4 text-orange-600" />
            <div>
              <p className="text-sm font-medium">Total Cost</p>
              <p className="text-2xl font-bold">{formatCurrency(stats.totalCost)}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CallLogStatsCards;
