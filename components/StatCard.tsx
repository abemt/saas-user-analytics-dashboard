import React from 'react';
import type { StatCardData } from '../types';
import { ArrowUpIcon, ArrowDownIcon } from './icons/Icons';

interface StatCardProps extends StatCardData {
    icon: React.ReactNode;
    onClick: () => void;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, change, changeType, icon, onClick }) => {
  const isIncrease = changeType === 'increase';
  
  return (
    <button 
        onClick={onClick}
        className="bg-white p-6 rounded-lg shadow-md flex items-center justify-between transition-transform duration-300 hover:scale-105 hover:shadow-lg w-full text-left focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
    >
      <div>
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <p className="text-3xl font-bold text-gray-800 mt-1">{value}</p>
        <div className="flex items-center mt-2">
          {isIncrease ? (
            <ArrowUpIcon className="w-4 h-4 text-green-500" />
          ) : (
            <ArrowDownIcon className="w-4 h-4 text-red-500" />
          )}
          <span className={`ml-1 text-sm font-medium ${isIncrease ? 'text-green-600' : 'text-red-600'}`}>
            {change}
          </span>
          <span className="ml-1 text-xs text-gray-400">vs last month</span>
        </div>
      </div>
      <div className="bg-gray-100 p-3 rounded-full">
        {icon}
      </div>
    </button>
  );
};

export default StatCard;