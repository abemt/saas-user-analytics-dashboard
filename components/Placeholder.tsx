import React from 'react';
import { MenuIcon } from './icons/Icons';

interface PlaceholderProps {
  pageTitle: string;
  toggleSidebar: () => void;
}

const Placeholder: React.FC<PlaceholderProps> = ({ pageTitle, toggleSidebar }) => {
  return (
    <div className="container mx-auto">
      <header className="mb-8">
        <div className="flex items-center">
            <button onClick={toggleSidebar} className="md:hidden mr-4 p-2 rounded-md hover:bg-gray-200">
                <MenuIcon className="w-6 h-6 text-gray-600" />
            </button>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">{pageTitle}</h1>
        </div>
      </header>
      <div className="flex items-center justify-center h-96 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-700">Coming Soon!</h2>
          <p className="mt-2 text-gray-500">
            The content for the <span className="font-medium text-gray-600">{pageTitle}</span> page is currently under construction.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Placeholder;
