import React, { useState } from 'react';
import { ChartBarIcon, DashboardIcon, UsersIcon, SettingsIcon, DocumentReportIcon, ChevronLeftIcon, MenuIcon, XIcon } from './icons/Icons';

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  activePage: string;
  setActivePage: (page: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, setIsOpen, activePage, setActivePage }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const navItems = ['Dashboard', 'Analytics', 'Reports', 'Users', 'Settings'];
  const navIcons: { [key: string]: React.ReactNode } = {
    Dashboard: <DashboardIcon className="w-6 h-6" />,
    Analytics: <ChartBarIcon className="w-6 h-6" />,
    Reports: <DocumentReportIcon className="w-6 h-6" />,
    Users: <UsersIcon className="w-6 h-6" />,
    Settings: <SettingsIcon className="w-6 h-6" />,
  };

  const NavLink = ({ pageName }: { pageName: string; }) => {
    const isActive = activePage === pageName;
    return (
      <button
        onClick={() => {
          setActivePage(pageName);
          if (isOpen) setIsOpen(false); // Close mobile sidebar on selection
        }}
        className={`flex items-center w-full px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-200 text-left ${
          isActive
            ? 'bg-blue-600 text-white shadow-md'
            : 'text-gray-600 hover:bg-gray-200 hover:text-gray-800'
        }`}
      >
        {navIcons[pageName]}
        {(!isCollapsed || isOpen) && <span className="ml-3 truncate">{pageName}</span>}
      </button>
    );
  };

  return (
    <div
      className={`fixed inset-y-0 left-0 z-30 flex flex-col bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } ${isCollapsed ? 'md:w-20' : 'md:w-64'}`}
    >
      <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200 flex-shrink-0">
        {!isCollapsed && <span className="text-xl font-bold text-gray-800">SaaS Analytics</span>}
        
        {/* Mobile close button */}
        <button
          onClick={() => setIsOpen(false)}
          className="p-2 rounded-full hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 md:hidden"
          aria-label="Close sidebar"
        >
          <XIcon className="w-6 h-6 text-gray-600" />
        </button>

        {/* Desktop collapse button */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="hidden md:block p-2 rounded-full hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {isCollapsed ? <MenuIcon className="w-6 h-6 text-gray-600" /> : <ChevronLeftIcon className="w-6 h-6 text-gray-600" />}
        </button>
      </div>
      <nav className="flex-1 px-4 py-4 space-y-2 overflow-y-auto">
        {navItems.map(item => <NavLink key={item} pageName={item} />)}
      </nav>
      <div className="px-4 py-4 mt-auto border-t border-gray-200">
        <div className="flex items-center">
          <img
            className="h-10 w-10 rounded-full object-cover"
            src="https://picsum.photos/100"
            alt="User avatar"
          />
          {!isCollapsed && (
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-700 truncate">Jane Doe</p>
              <button
                onClick={() => setActivePage('Settings')}
                className="text-xs text-gray-500 cursor-pointer hover:underline focus:outline-none"
              >
                View profile
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;