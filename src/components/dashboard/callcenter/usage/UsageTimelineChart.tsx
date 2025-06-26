
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { DailyUsage } from './types';

interface UsageTimelineChartProps {
  data: DailyUsage[];
  height?: number;
}

const UsageTimelineChart = ({ data, height = 200 }: UsageTimelineChartProps) => {
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <div style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
          <XAxis 
            dataKey="date" 
            tickFormatter={formatDate}
            fontSize={12}
            tick={{ fill: '#6b7280' }}
          />
          <YAxis 
            fontSize={12}
            tick={{ fill: '#6b7280' }}
            label={{ value: 'Minutes', angle: -90, position: 'insideLeft' }}
          />
          <Tooltip 
            labelFormatter={(value) => formatDate(value)}
            formatter={(value, name) => [
              `${value} ${name === 'minutes' ? 'minutes' : 'calls'}`,
              name === 'minutes' ? 'Minutes Used' : 'Calls Made'
            ]}
            contentStyle={{
              backgroundColor: 'white',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              fontSize: '12px'
            }}
          />
          <Line 
            type="monotone" 
            dataKey="minutes" 
            stroke="#3b82f6" 
            strokeWidth={2}
            dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6, stroke: '#3b82f6', strokeWidth: 2 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default UsageTimelineChart;
