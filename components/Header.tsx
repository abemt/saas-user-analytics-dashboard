import React, { useState, useRef, useEffect } from 'react';
// Fix: Import UsersIcon to resolve 'Cannot find name' error.
import { SearchIcon, BellIcon, CalendarIcon, MenuIcon, ChevronDownIcon, CheckCircleIcon, UsersIcon } from './icons/Icons';

interface HeaderProps {
  toggleSidebar: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  dateRange: number;
  setDateRange: (range: number) => void;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar, searchQuery, setSearchQuery, dateRange, setDateRange }) => {
  const [isDateDropdownOpen, setIsDateDropdownOpen] = useState(false);
  const [isNotificationDropdownOpen, setNotificationDropdownOpen] = useState(false);
  const dateDropdownRef = useRef<HTMLDivElement>(null);
  const notificationDropdownRef = useRef<HTMLDivElement>(null);
  
  const dateRanges = {
    7: 'Last 7 Days',
    30: 'Last 30 Days',
    90: 'Last 90 Days',
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dateDropdownRef.current && !dateDropdownRef.current.contains(event.target as Node)) {
        setIsDateDropdownOpen(false);
      }
      if (notificationDropdownRef.current && !notificationDropdownRef.current.contains(event.target as Node)) {
        setNotificationDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleDateRangeSelect = (range: number) => {
    setDateRange(range);
    setIsDateDropdownOpen(false);
  };

  return (
    <header className="mb-8">
      <div className="flex flex-col md:flex-row items-center justify-between">
        <div className="flex items-center">
          <button onClick={toggleSidebar} className="md:hidden mr-4 p-2 rounded-md hover:bg-gray-200">
             <MenuIcon className="w-6 h-6 text-gray-600" />
          </button>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Welcome Back!</h1>
            <p className="text-gray-500 mt-1 text-sm sm:text-base">Here's a snapshot of your account activity.</p>
          </div>
        </div>
        <div className="flex items-center space-x-2 sm:space-x-4 mt-4 md:mt-0 w-full md:w-auto">
          <div className="relative flex-grow">
            <SearchIcon className="absolute w-5 h-5 text-gray-400 top-1/2 left-3 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search activity..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              aria-label="Search activity"
            />
          </div>

          <div className="relative" ref={notificationDropdownRef}>
            <button 
              onClick={() => setNotificationDropdownOpen(!isNotificationDropdownOpen)}
              className="p-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 transition relative" aria-label="Notifications">
              <BellIcon className="w-6 h-6 text-gray-600" />
              <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white"></span>
            </button>
            {isNotificationDropdownOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg py-1 z-20 border">
                  <div className="px-4 py-2 font-bold text-gray-800 border-b">Notifications</div>
                  <a href="#" className="flex items-start px-4 py-3 text-sm text-gray-700 hover:bg-gray-100">
                      <CheckCircleIcon className="w-5 h-5 text-green-500 mr-3 mt-1 flex-shrink-0"/>
                      <div>
                        <p className="font-medium">New report generated</p>
                        <p className="text-xs text-gray-500">Your Q3 report is ready for download.</p>
                      </div>
                  </a>
                  <a href="#" className="flex items-start px-4 py-3 text-sm text-gray-700 hover:bg-gray-100">
                      <UsersIcon className="w-5 h-5 text-blue-500 mr-3 mt-1 flex-shrink-0"/>
                      <div>
                        <p className="font-medium">New user invited</p>
                        <p className="text-xs text-gray-500">Maria Garcia has joined your team.</p>
                      </div>
                  </a>
                   <a href="#" className="block px-4 py-2 text-center text-sm text-blue-600 hover:underline">View all notifications</a>
              </div>
            )}
          </div>
          
          <div className="relative" ref={dateDropdownRef}>
            <button 
              onClick={() => setIsDateDropdownOpen(!isDateDropdownOpen)}
              className="flex items-center space-x-2 px-3 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 transition w-full justify-between"
            >
              <CalendarIcon className="w-5 h-5 text-gray-600" />
              <span className="text-sm font-medium text-gray-700">{dateRanges[dateRange as keyof typeof dateRanges]}</span>
              <ChevronDownIcon className={`w-5 h-5 text-gray-400 transition-transform ${isDateDropdownOpen ? 'rotate-180' : ''}`} />
            </button>
            {isDateDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 border">
                {Object.entries(dateRanges).map(([range, label]) => (
                  <button
                    key={range}
                    onClick={() => handleDateRangeSelect(Number(range))}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    {label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;