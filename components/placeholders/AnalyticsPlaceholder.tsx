import React, { useState, useRef, useEffect } from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, Legend } from 'recharts';
import { MenuIcon, UsersIcon, CubeIcon, FilterIcon, ChevronDownIcon } from '../icons/Icons';
import StatCard from '../StatCard';

interface PlaceholderProps {
  toggleSidebar: () => void;
}

const demographicsData = [
    { name: 'USA', value: 400 }, { name: 'Canada', value: 300 },
    { name: 'Mexico', value: 300 }, { name: 'EU', value: 200 },
];
const featureAdoptionData = [
    { name: 'Feature A', adoption: 4000 }, { name: 'Feature B', adoption: 3000 },
    { name: 'Feature C', adoption: 2000 }, { name: 'Feature D', adoption: 2780 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const AnalyticsPlaceholder: React.FC<PlaceholderProps> = ({ toggleSidebar }) => {
  const [isFilterOpen, setFilterOpen] = useState(false);
  const filterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
        setFilterOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="container mx-auto">
      <header className="mb-8">
        <div className="flex items-center justify-between">
            <div className="flex items-center">
                <button onClick={toggleSidebar} className="md:hidden mr-4 p-2 rounded-md hover:bg-gray-200">
                    <MenuIcon className="w-6 h-6 text-gray-600" />
                </button>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Advanced Analytics</h1>
            </div>
            <div className="relative" ref={filterRef}>
                <button 
                    onClick={() => setFilterOpen(!isFilterOpen)}
                    className="flex items-center space-x-2 px-3 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 transition"
                >
                    <FilterIcon className="w-5 h-5 text-gray-600" />
                    <span className="text-sm font-medium text-gray-700">Filters</span>
                    <ChevronDownIcon className={`w-5 h-5 text-gray-400 transition-transform ${isFilterOpen ? 'rotate-180' : ''}`} />
                </button>
                {isFilterOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg py-1 z-10 border">
                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Filter by Country</a>
                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Filter by User Role</a>
                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Filter by Feature</a>
                    </div>
                )}
            </div>
        </div>
      </header>

      <div className="grid grid-cols-1 gap-6 mb-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Avg. Session Duration" value="2m 45s" change="+5.2%" changeType="increase" icon={<UsersIcon className="w-8 h-8 text-blue-500" />} onClick={() => {}} />
        <StatCard title="Conversion Rate" value="4.8%" change="-0.5%" changeType="decrease" icon={<CubeIcon className="w-8 h-8 text-green-500" />} onClick={() => {}} />
        <StatCard title="Bounce Rate" value="23.4%" change="+1.1%" changeType="increase" icon={<UsersIcon className="w-8 h-8 text-indigo-500" />} onClick={() => {}} />
        <StatCard title="Feature Clicks" value="21,942" change="+18.3%" changeType="increase" icon={<CubeIcon className="w-8 h-8 text-yellow-500" />} onClick={() => {}} />
      </div>

      <div className="grid grid-cols-1 gap-6 mb-6 lg:grid-cols-2">
        <div className="bg-white p-6 rounded-lg shadow-md h-96">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">User Demographics</h3>
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie data={demographicsData} cx="50%" cy="50%" labelLine={false} outerRadius={120} fill="#8884d8" dataKey="value" nameKey="name">
                        {demographicsData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                    </Pie>
                    <Tooltip />
                    <Legend />
                </PieChart>
            </ResponsiveContainer>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md h-96">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Feature Adoption</h3>
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={featureAdoptionData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                    <XAxis dataKey="name" stroke="#6b7280" />
                    <YAxis stroke="#6b7280" />
                    <Tooltip />
                    <Bar dataKey="adoption" fill="#82ca9d" />
                </BarChart>
            </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPlaceholder;