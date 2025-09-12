import React, { useState } from 'react';
import { MenuIcon, UsersIcon, CreditCardIcon, BellIcon, KeyIcon } from '../icons/Icons';

interface PlaceholderProps {
  toggleSidebar: () => void;
}

const SettingsPlaceholder: React.FC<PlaceholderProps> = ({ toggleSidebar }) => {
  const [activeTab, setActiveTab] = useState('Profile');
  const [profileName, setProfileName] = useState('Jane Doe');
  const [profileEmail, setProfileEmail] = useState('jane.doe@example.com');
  const [emailNotifications, setEmailNotifications] = useState(true);

  const handleSaveChanges = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Profile saved!\nName: ${profileName}\nEmail: ${profileEmail}`);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Profile':
        return (
          <div>
            <h3 className="text-lg font-medium text-gray-900">Profile Information</h3>
            <p className="mt-1 text-sm text-gray-500">Update your personal details here.</p>
            <form onSubmit={handleSaveChanges} className="mt-6 space-y-6">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
                    <input type="text" name="name" id="name" value={profileName} onChange={(e) => setProfileName(e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                </div>
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                    <input type="email" name="email" id="email" value={profileEmail} onChange={(e) => setProfileEmail(e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                </div>
                <div>
                    <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow-sm text-sm font-medium">Save Changes</button>
                </div>
            </form>
          </div>
        );
      case 'Billing':
        return (
            <div>
                <h3 className="text-lg font-medium text-gray-900">Billing Details</h3>
                <p className="mt-1 text-sm text-gray-500">Manage your subscription and payment methods.</p>
                <div className="mt-6 p-4 border rounded-lg bg-gray-50 flex items-center justify-between">
                    <div>
                        <p className="font-medium text-gray-800">Pro Plan</p>
                        <p className="text-sm text-gray-500">Visa ending in 4242</p>
                    </div>
                    <button onClick={() => alert('Redirecting to plan management...')} className="text-sm font-medium text-blue-600 hover:underline">Change Plan</button>
                </div>
            </div>
        );
      case 'Notifications':
        return (
            <div>
                <h3 className="text-lg font-medium text-gray-900">Notifications</h3>
                <p className="mt-1 text-sm text-gray-500">Choose how you want to be notified.</p>
                <div className="mt-6 space-y-4">
                    <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                        <label htmlFor="toggle1" className="text-sm font-medium text-gray-700 cursor-pointer">Email me for project updates</label>
                        <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
                            <input 
                              type="checkbox" 
                              name="toggle" 
                              id="toggle1" 
                              checked={emailNotifications}
                              onChange={() => setEmailNotifications(!emailNotifications)}
                              className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                            />
                            <label htmlFor="toggle1" className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"></label>
                        </div>
                    </div>
                </div>
            </div>
        );
       case 'API Keys':
        return (
            <div>
                <h3 className="text-lg font-medium text-gray-900">API Keys</h3>
                <p className="mt-1 text-sm text-gray-500">Manage API keys for integrations.</p>
                <div className="mt-6">
                    <div className="flex items-center justify-between p-3 border rounded-lg bg-gray-50">
                        <p className="text-sm font-mono text-gray-600">prod_sk_...a1b2</p>
                        <button onClick={() => alert('API Key revoked!')} className="text-sm font-medium text-red-600 hover:underline">Revoke</button>
                    </div>
                    <button onClick={() => alert('New API Key generated!')} className="mt-4 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition text-sm font-medium">Generate New Key</button>
                </div>
            </div>
        );
      default: return null;
    }
  };

  const tabs = [
    { name: 'Profile', icon: <UsersIcon className="w-5 h-5" /> },
    { name: 'Billing', icon: <CreditCardIcon className="w-5 h-5" /> },
    { name: 'Notifications', icon: <BellIcon className="w-5 h-5" /> },
    { name: 'API Keys', icon: <KeyIcon className="w-5 h-5" /> },
  ];

  return (
    <div className="container mx-auto">
      <header className="mb-8">
        <div className="flex items-center">
            <button onClick={toggleSidebar} className="md:hidden mr-4 p-2 rounded-md hover:bg-gray-200">
                <MenuIcon className="w-6 h-6 text-gray-600" />
            </button>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Settings</h1>
        </div>
      </header>
      
      <div className="bg-white rounded-lg shadow-md lg:grid lg:grid-cols-12">
        <aside className="py-6 px-2 lg:col-span-3 lg:border-r">
          <nav className="space-y-1">
            {tabs.map(tab => (
              <button
                key={tab.name}
                onClick={() => setActiveTab(tab.name)}
                className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                  activeTab === tab.name ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                {tab.icon}
                <span className="ml-3 truncate">{tab.name}</span>
              </button>
            ))}
          </nav>
        </aside>
        <div className="p-6 lg:col-span-9">
            {renderTabContent()}
        </div>
      </div>
      <style>{`
        .toggle-checkbox:checked { right: 0; border-color: #3b82f6; }
        .toggle-checkbox:checked + .toggle-label { background-color: #3b82f6; }
      `}</style>
    </div>
  );
};

export default SettingsPlaceholder;