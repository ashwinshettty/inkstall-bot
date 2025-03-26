import React, { useState, useEffect, useMemo } from 'react';
import { HiPlus, HiUserGroup, HiChat, HiDocument, HiClock } from 'react-icons/hi';
import Modal from '../components/UI/Modal';
import Register from './Register';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [userStats, setUserStats] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  // Mock data for demonstration
  const mockUsers = useMemo(() => [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
    { id: 3, name: 'Mike Johnson', email: 'mike@example.com' },
  ], []);

  const mockStats = useMemo(() => ({
    1: { activeChats: 3, generatedPdfs: 12, lastActive: Date.now() },
    2: { activeChats: 1, generatedPdfs: 5, lastActive: Date.now() - 3600000 },
    3: { activeChats: 0, generatedPdfs: 8, lastActive: Date.now() - 86400000 },
  }), []);

  useEffect(() => {
    // Simulate API loading delay
    const timer = setTimeout(() => {
      setUsers(mockUsers);
      setUserStats(mockStats);
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [mockUsers, mockStats]);

  const handleUserAdded = () => {
    setShowAddUserModal(false);
    fetchUsers();
    fetchUserStats();
  };

  return (
    <div className=" mx-auto px-4 sm:px-6 lg:px-8 py-8 min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0 mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Manage Users</h1>
        <button
          onClick={() => setShowAddUserModal(true)}
          className="bg-primary text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-primary-dark transition-colors w-full sm:w-auto justify-center sm:justify-start"
        >
          <HiPlus className="h-5 w-5" />
          <span>Add User</span>
        </button>
      </div>

      {/* Analytics Overview */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow animate-pulse">
              <div className="flex items-center space-x-2 mb-2">
                <div className="h-6 w-6 bg-gray-200 dark:bg-gray-700 rounded" />
                <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded" />
              </div>
              <div className="h-8 w-16 bg-gray-200 dark:bg-gray-700 rounded" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
          <div className="flex items-center space-x-2 text-primary mb-2">
            <HiUserGroup className="h-6 w-6" />
            <h3 className="font-semibold dark:text-white">Total Users</h3>
          </div>
          <p className="text-2xl font-bold dark:text-white">{users.length}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
          <div className="flex items-center space-x-2 text-primary mb-2">
            <HiChat className="h-6 w-6" />
            <h3 className="font-semibold dark:text-white">Active Chats</h3>
          </div>
          <p className="text-2xl font-bold dark:text-white">{Object.values(userStats).reduce((acc, stat) => acc + (stat.activeChats || 0), 0)}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
          <div className="flex items-center space-x-2 text-primary mb-2">
            <HiDocument className="h-6 w-6" />
            <h3 className="font-semibold dark:text-white">Generated PDFs</h3>
          </div>
          <p className="text-2xl font-bold dark:text-white">{Object.values(userStats).reduce((acc, stat) => acc + (stat.generatedPdfs || 0), 0)}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
          <div className="flex items-center space-x-2 text-primary mb-2">
            <HiClock className="h-6 w-6" />
            <h3 className="font-semibold dark:text-white">Active Now</h3>
          </div>
          <p className="text-2xl font-bold dark:text-white">
            {users.filter(user => userStats[user.id]?.lastActive >= Date.now() - 5 * 60 * 1000).length}
          </p>
        </div>
      </div>
      )}

      {/* Users Table */}
      {isLoading ? (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
          <div className="animate-pulse">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="px-4 py-4 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center space-x-4">
                  <div className="h-10 w-10 bg-gray-200 dark:bg-gray-700 rounded-full" />
                  <div className="flex-1">
                    <div className="h-4 w-48 bg-gray-200 dark:bg-gray-700 rounded mb-2" />
                    <div className="h-3 w-32 bg-gray-200 dark:bg-gray-700 rounded" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 table-fixed sm:table-auto">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider w-full sm:w-auto">User</th>
              <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider whitespace-nowrap">Active Chats</th>
              <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider whitespace-nowrap">Generated PDFs</th>
              <th className="hidden sm:table-cell px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider whitespace-nowrap">Last Active</th>
              <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider whitespace-nowrap">Status</th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {users.map(user => (
              <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center space-x-2 sm:space-x-4">
                    <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-primary text-white flex items-center justify-center flex-shrink-0">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="min-w-0">
                      <div className="text-sm font-medium text-gray-900 dark:text-white truncate">{user.name}</div>
                      <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 truncate">{user.email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                  <span className="text-sm text-gray-900 dark:text-gray-100">{userStats[user.id]?.activeChats || 0}</span>
                </td>
                <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                  <span className="text-sm text-gray-900 dark:text-gray-100">{userStats[user.id]?.generatedPdfs || 0}</span>
                </td>
                <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                  <span className="text-sm text-gray-900 dark:text-gray-100">
                    {userStats[user.id]?.lastActive ? new Date(userStats[user.id].lastActive).toLocaleString() : 'Never'}
                  </span>
                </td>
                <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    userStats[user.id]?.lastActive >= Date.now() - 5 * 60 * 1000
                      ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300'
                  }`}>
                    {userStats[user.id]?.lastActive >= Date.now() - 5 * 60 * 1000 ? 'Active' : 'Inactive'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      )}

      {/* Add User Modal */}
      <Modal
        isOpen={showAddUserModal}
        onClose={() => setShowAddUserModal(false)}
        title="Add New User"
      >
        <Register onSuccess={handleUserAdded} isModal={true} />
      </Modal>
    </div>
  );
};

export default ManageUsers;
