import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import AnalyticsPlaceholder from './components/placeholders/AnalyticsPlaceholder';
import ReportsPlaceholder from './components/placeholders/ReportsPlaceholder';
import UsersPlaceholder from './components/placeholders/UsersPlaceholder';
import SettingsPlaceholder from './components/placeholders/SettingsPlaceholder';

const App: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activePage, setActivePage] = useState('Dashboard');

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const renderContent = () => {
    switch (activePage) {
      case 'Dashboard':
        return <Dashboard toggleSidebar={toggleSidebar} setActivePage={setActivePage} />;
      case 'Analytics':
        return <AnalyticsPlaceholder toggleSidebar={toggleSidebar} />;
      case 'Reports':
        return <ReportsPlaceholder toggleSidebar={toggleSidebar} />;
      case 'Users':
        return <UsersPlaceholder toggleSidebar={toggleSidebar} />;
      case 'Settings':
        return <SettingsPlaceholder toggleSidebar={toggleSidebar} />;
      default:
        return <Dashboard toggleSidebar={toggleSidebar} setActivePage={setActivePage} />;
    }
  };

  return (
    <div className="relative min-h-screen md:flex">
      {/* Backdrop for mobile */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black opacity-50 z-20 md:hidden" 
          onClick={() => setIsSidebarOpen(false)}
          aria-hidden="true"
        ></div>
      )}

      <Sidebar 
        isOpen={isSidebarOpen} 
        setIsOpen={setIsSidebarOpen} 
        activePage={activePage}
        setActivePage={setActivePage}
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-4 md:p-8">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default App;