import React, { useState, useMemo } from 'react';
import type { ActivityLog } from '../types';
import { SortAscendingIcon, SortDescendingIcon, ChevronLeftIcon, ChevronRightIcon } from './icons/Icons';

interface ActivityTableProps {
  data: ActivityLog[];
}

type SortKey = 'user.name' | 'action' | 'timestamp' | 'status';

const ActivityTable: React.FC<ActivityTableProps> = ({ data }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState<{ key: SortKey; direction: 'ascending' | 'descending' } | null>({ key: 'timestamp', direction: 'descending' });
  const itemsPerPage = 5;

  const sortedData = useMemo(() => {
    let sortableItems = [...data];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        let aValue: any;
        let bValue: any;

        if (sortConfig.key === 'user.name') {
          aValue = a.user.name;
          bValue = b.user.name;
        } else {
          aValue = a[sortConfig.key as keyof ActivityLog];
          bValue = b[sortConfig.key as keyof ActivityLog];
        }

        if (aValue < bValue) return sortConfig.direction === 'ascending' ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === 'ascending' ? 1 : -1;
        return 0;
      });
    }
    return sortableItems;
  }, [data, sortConfig]);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return sortedData.slice(startIndex, startIndex + itemsPerPage);
  }, [currentPage, sortedData]);

  const totalPages = Math.ceil(sortedData.length / itemsPerPage);

  const requestSort = (key: SortKey) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
    setCurrentPage(1);
  };

  const getSortIcon = (key: SortKey) => {
    if (!sortConfig || sortConfig.key !== key) return null;
    if (sortConfig.direction === 'ascending') return <SortAscendingIcon className="w-4 h-4 ml-1" />;
    return <SortDescendingIcon className="w-4 h-4 ml-1" />;
  };
  
  const StatusBadge: React.FC<{ status: 'Completed' | 'Pending' | 'Failed' }> = ({ status }) => {
    const baseClasses = "px-2.5 py-0.5 text-xs font-medium rounded-full inline-block";
    const statusClasses = {
        Completed: "bg-green-100 text-green-800",
        Pending: "bg-yellow-100 text-yellow-800",
        Failed: "bg-red-100 text-red-800",
    };
    return <span className={`${baseClasses} ${statusClasses[status]}`}>{status}</span>;
  };
  
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  }

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {['user.name', 'action', 'timestamp', 'status'].map((key) => (
                <th key={key} scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => requestSort(key as SortKey)}>
                  <div className="flex items-center">{key.replace('user.name', 'User')} {getSortIcon(key as SortKey)}</div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {paginatedData.length > 0 ? paginatedData.map((log) => (
              <tr key={log.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      <img className="h-10 w-10 rounded-full" src={log.user.avatar} alt={`${log.user.name}'s avatar`} />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{log.user.name}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 max-w-xs truncate">{log.action}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatDate(log.timestamp)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <StatusBadge status={log.status} />
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan={4} className="text-center py-10 text-gray-500">
                  No activity found matching your criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {paginatedData.length > 0 &&
        <div className="flex flex-col sm:flex-row items-center justify-between mt-4">
          <p className="text-sm text-gray-700 mb-2 sm:mb-0">
            Showing <span className="font-medium">{(currentPage - 1) * itemsPerPage + 1}</span> to <span className="font-medium">{Math.min(currentPage * itemsPerPage, sortedData.length)}</span> of <span className="font-medium">{sortedData.length}</span> results
          </p>
          <div className="flex items-center">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
              aria-label="Previous page"
            >
              <ChevronLeftIcon className="w-5 h-5" />
            </button>
            <span className="mx-4 text-sm text-gray-700">Page {currentPage} of {totalPages}</span>
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="p-2 rounded-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
              aria-label="Next page"
            >
              <ChevronRightIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
      }
    </div>
  );
};

export default ActivityTable;
