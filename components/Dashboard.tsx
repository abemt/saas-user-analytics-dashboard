import React, { useState, useMemo } from 'react';
import Header from './Header';
import StatCard from './StatCard';
import ActivityChart from './charts/ActivityChart';
import ProjectsChart from './charts/ProjectsChart';
import ActivityTable from './ActivityTable';
import { useDashboardData } from '../hooks/useDashboardData';
import { UsersIcon, LoginIcon, DocumentAddIcon, CubeIcon } from './icons/Icons';

const daysAgo = (days: number): Date => new Date(Date.now() - days * 24 * 60 * 60 * 1000);

const cardIcons = [
    <LoginIcon className="w-8 h-8 text-blue-500" />, <CubeIcon className="w-8 h-8 text-green-500" />,
    <UsersIcon className="w-8 h-8 text-indigo-500" />, <DocumentAddIcon className="w-8 h-8 text-yellow-500" />,
];

interface DashboardProps {
  toggleSidebar: () => void;
  setActivePage: (page: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ toggleSidebar, setActivePage }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [dateRange, setDateRange] = useState(30); // in days
  const { statCards, timeSeries, logs, projects, source } = useDashboardData(dateRange);

  const filteredData = useMemo(() => {
    const lowercasedQuery = searchQuery.toLowerCase();
    const dateLimit = daysAgo(dateRange);

    const filteredLogs = logs.filter(log => {
      const matchesSearch = log.user.name.toLowerCase().includes(lowercasedQuery) ||
                            log.action.toLowerCase().includes(lowercasedQuery);
      const matchesDate = log.timestamp >= dateLimit;
      return matchesSearch && matchesDate;
    });

    return { logs: filteredLogs, chartData: timeSeries };
  }, [searchQuery, dateRange, logs, timeSeries]);

  const handleCardClick = (title: string) => {
    switch (title) {
        case 'Total Logins':
            setActivePage('Analytics');
            break;
        case 'New Users':
            setActivePage('Users');
            break;
        case 'Reports Generated':
            setActivePage('Reports');
            break;
        default:
            setActivePage('Analytics');
            break;
    }
  };

  return (
    <div className="container mx-auto">
      <Header 
        toggleSidebar={toggleSidebar}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        dateRange={dateRange}
        setDateRange={setDateRange}
      />

      <div className="grid grid-cols-1 gap-6 mb-6 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((card, index) => (
          <StatCard key={card.title} {...card} icon={cardIcons[index]} onClick={() => handleCardClick(card.title)} />
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 mb-6 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <ActivityChart data={filteredData.chartData} />
        </div>
        <div className="lg:col-span-2">
            <ProjectsChart data={projects} />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-gray-800">Recent Activity</h3>
          <span className={`text-xs font-medium px-2 py-1 rounded-full ${source === 'live' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
            {source === 'live' ? 'Live API' : 'Demo data'}
          </span>
        </div>
        <ActivityTable data={filteredData.logs} />
      </div>
    </div>
  );
};

export default Dashboard;