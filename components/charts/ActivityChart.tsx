
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import type { TimeSeriesData } from '../../types';

interface ActivityChartProps {
  data: TimeSeriesData[];
}

const ActivityChart: React.FC<ActivityChartProps> = ({ data }) => {
  
  const formatDateTick = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md h-96">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">User Activity</h3>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ top: 5, right: 20, left: -10, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
          <XAxis 
             dataKey="date" 
             stroke="#6b7280" 
             tickFormatter={formatDateTick}
             // Only show a reasonable number of ticks to prevent clutter
             interval={Math.floor(data.length / 7)}
             tick={{ dy: 5 }}
          />
          <YAxis stroke="#6b7280" />
          <Tooltip 
             labelFormatter={formatDateTick}
             contentStyle={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                border: '1px solid #e5e7eb',
                borderRadius: '0.5rem',
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)'
             }}
          />
          <Legend wrapperStyle={{ paddingTop: '20px' }} />
          <Line type="monotone" dataKey="logins" name="Logins" stroke="#3b82f6" strokeWidth={2} activeDot={{ r: 8 }} dot={false} />
          <Line type="monotone" dataKey="signups" name="Signups" stroke="#84cc16" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ActivityChart;