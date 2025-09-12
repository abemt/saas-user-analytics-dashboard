import React, { useState } from 'react';
import { MenuIcon, PencilIcon, TrashIcon, SearchIcon, PlusCircleIcon, XIcon } from '../icons/Icons';

interface PlaceholderProps {
  toggleSidebar: () => void;
}

const mockUsers = [
    { id: 1, name: 'Alex Johnson', email: 'alex.j@example.com', avatar: 'https://picsum.photos/id/1011/100', role: 'Admin', status: 'Active', lastSeen: '2 hours ago' },
    { id: 2, name: 'Maria Garcia', email: 'maria.g@example.com', avatar: 'https://picsum.photos/id/1012/100', role: 'Editor', status: 'Active', lastSeen: '1 day ago' },
    { id: 3, name: 'James Smith', email: 'james.s@example.com', avatar: 'https://picsum.photos/id/1013/100', role: 'Viewer', status: 'Invited', lastSeen: 'N/A' },
    { id: 4, name: 'Patricia Brown', email: 'pat.b@example.com', avatar: 'https://picsum.photos/id/1014/100', role: 'Editor', status: 'Active', lastSeen: '5 days ago' },
    { id: 5, name: 'Michael Miller', email: 'michael.m@example.com', avatar: 'https://picsum.photos/id/1015/100', role: 'Viewer', status: 'Deactivated', lastSeen: '1 month ago' },
];

const RoleBadge: React.FC<{ role: string }> = ({ role }) => {
    const roleColors: { [key: string]: string } = {
        Admin: "bg-blue-100 text-blue-800",
        Editor: "bg-yellow-100 text-yellow-800",
        Viewer: "bg-gray-100 text-gray-800",
    };
    return <span className={`px-2.5 py-0.5 text-xs font-medium rounded-full ${roleColors[role]}`}>{role}</span>;
};

const UsersPlaceholder: React.FC<PlaceholderProps> = ({ toggleSidebar }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleActionClick = (action: string, userName: string) => {
    alert(`${action} user: "${userName}"`);
  };

  const handleInviteUser = (event: React.FormEvent) => {
    event.preventDefault();
    const target = event.target as typeof event.target & { email: { value: string } };
    alert(`Invitation sent to ${target.email.value}`);
    setModalOpen(false);
  };

  const filteredUsers = mockUsers.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto">
      <header className="mb-8">
        <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center">
                <button onClick={toggleSidebar} className="md:hidden mr-4 p-2 rounded-md hover:bg-gray-200">
                    <MenuIcon className="w-6 h-6 text-gray-600" />
                </button>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">User Management</h1>
            </div>
            <div className="flex items-center space-x-4 mt-4 md:mt-0 w-full md:w-auto">
                <div className="relative flex-grow">
                    <SearchIcon className="absolute w-5 h-5 text-gray-400 top-1/2 left-3 -translate-y-1/2" />
                    <input 
                      type="text" 
                      placeholder="Search users..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)} 
                      className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
                    />
                </div>
                <button 
                  onClick={() => setModalOpen(true)}
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow-sm whitespace-nowrap"
                >
                    <PlusCircleIcon className="w-5 h-5" />
                    <span className="text-sm font-medium">Invite User</span>
                </button>
            </div>
        </div>
      </header>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Seen</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                        <img className="h-10 w-10 rounded-full" src={user.avatar} alt="" />
                        <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{user.name}</div>
                            <div className="text-sm text-gray-500">{user.email}</div>
                        </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        user.status === 'Active' ? 'bg-green-100 text-green-800' : 
                        user.status === 'Invited' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
                    }`}>{user.status}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm"><RoleBadge role={user.role} /></td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.lastSeen}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-3">
                        <button onClick={() => handleActionClick('Editing', user.name)} className="text-indigo-600 hover:text-indigo-900"><PencilIcon className="w-5 h-5"/></button>
                        <button onClick={() => handleActionClick('Deleting', user.name)} className="text-red-600 hover:text-red-900"><TrashIcon className="w-5 h-5"/></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex items-center justify-center" aria-modal="true" role="dialog">
            <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md m-4">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold text-gray-800">Invite New User</h2>
                    <button onClick={() => setModalOpen(false)}><XIcon className="w-6 h-6 text-gray-500 hover:text-gray-800" /></button>
                </div>
                <form onSubmit={handleInviteUser}>
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                            <input type="email" id="email" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500" required />
                        </div>
                        <div>
                            <label htmlFor="role" className="block text-sm font-medium text-gray-700">Role</label>
                            <select id="role" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500">
                                <option>Viewer</option>
                                <option>Editor</option>
                                <option>Admin</option>
                            </select>
                        </div>
                        <div className="flex justify-end space-x-3 pt-4">
                            <button type="button" onClick={() => setModalOpen(false)} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300">Cancel</button>
                            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Send Invitation</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
      )}
    </div>
  );
};

export default UsersPlaceholder;