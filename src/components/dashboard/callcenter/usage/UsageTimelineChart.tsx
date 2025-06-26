
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { DailyUsage, RealtimeUsageUpdate } from './types';
import { format, isToday } from 'date-fns';

interface UsageTimelineChartProps {
  dailyUsage: DailyUsage[];
  realtimeUsage: RealtimeUsageUpdate;
}

const UsageTimelineChart = ({ dailyUsage, realtimeUsage }: UsageTimelineChartProps) => {
  // Combine historical data with real-time data
  const chartData = dailyUsage.map(day => {
    const isCurrentDay = isToday(new Date(day.date));
    return {
      ...day,
      minutes: isCurrentDay && realtimeUsage.isActive 
        ? day.minutes + realtimeUsage.currentCallMinutes 
        : day.minutes,
      formattedDate: format(new Date(day.date), 'MMM dd'),
      isToday: isCurrentDay
    };
  });

  const maxUsage = Math.max(...chartData.map(d => d.minutes));
  const avgUsage = chartData.reduce((sum, d) => sum + d.minutes, 0) / chartData.length;

  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
          <XAxis 
            dataKey="formattedDate" 
            fontSize={12}
            className="text-gray-600"
          />
          <YAxis 
            fontSize={12}
            className="text-gray-600"
            label={{ value: 'Minutes', angle: -90, position: 'insideLeft' }}
          />
          <Tooltip
            content={({ active, payload, label }) => {
              if (active && payload && payload.length) {
                const data = payload[0].payload;
                return (
                  <div className="bg-white p-3 border rounded-lg shadow-lg">
                    <p className="font-medium">{label}</p>
                    <p className="text-blue-600">
                      Minutes: {payload[0].value?.toFixed(1)}
                    </p>
                    <p className="text-gray-600">
                      Calls: {data.calls}
                    </p>
                    {data.isToday && realtimeUsage.isActive && (
                      <p className="text-green-600 text-sm">
                        + {realtimeUsage.currentCallMinutes.toFixed(1)} min (live)
                      </p>
                    )}
                  </div>
                );
              }
              return null;
            }}
          />
          <ReferenceLine 
            y={avgUsage} 
            stroke="#94a3b8" 
            strokeDasharray="5 5" 
            label={{ value: "Avg", position: "topRight" }}
          />
          <Line
            type="monotone"
            dataKey="minutes"
            stroke="#3b82f6"
            strokeWidth={2}
            dot={(props) => {
              const { payload } = props;
              return (
                <circle
                  {...props}
                  fill={payload.isToday && realtimeUsage.isActive ? "#10b981" : "#3b82f6"}
                  stroke={payload.isToday && realtimeUsage.isActive ? "#10b981" : "#3b82f6"}
                  strokeWidth={2}
                  r={payload.isToday && realtimeUsage.isActive ? 6 : 4}
                />
              );
            }}
            activeDot={{ r: 6, fill: "#1d4ed8" }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default UsageTimelineChart;
