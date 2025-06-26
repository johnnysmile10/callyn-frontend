
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { DailyUsage } from './types';

interface UsageTimelineChartProps {
  dailyUsage: DailyUsage[];
  height?: number;
}

const UsageTimelineChart = ({ dailyUsage, height = 200 }: UsageTimelineChartProps) => {
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return `${date.getMonth() + 1}/${date.getDate()}`;
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-3 border rounded-lg shadow-lg">
          <p className="font-medium">{formatDate(label)}</p>
          <p className="text-blue-600">Minutes: {data.minutes}</p>
          <p className="text-green-600">Calls: {data.calls}</p>
          <p className="text-purple-600">Cost: ${data.cost}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full" style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={dailyUsage} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
          <XAxis 
            dataKey="date" 
            tickFormatter={formatDate}
            fontSize={12}
            interval="preserveStartEnd"
          />
          <YAxis fontSize={12} />
          <Tooltip content={<CustomTooltip />} />
          <Bar 
            dataKey="minutes" 
            fill="#3b82f6" 
            radius={[2, 2, 0, 0]}
            opacity={0.8}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default UsageTimelineChart;
