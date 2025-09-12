
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import type { ProjectData } from '../../types';

interface ProjectsChartProps {
  data: ProjectData[];
}

const ProjectsChart: React.FC<ProjectsChartProps> = ({ data }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md h-96">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Tasks per Project</h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 5, right: 20, left: -10, bottom: 5 }}
          layout="vertical"
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
          <XAxis type="number" stroke="#6b7280" />
          <YAxis type="category" dataKey="name" stroke="#6b7280" width={80} />
          <Tooltip 
             contentStyle={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                border: '1px solid #e5e7eb',
                borderRadius: '0.5rem'
             }}
          />
          <Legend />
          <Bar dataKey="tasks" fill="#8884d8" barSize={20} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ProjectsChart;
