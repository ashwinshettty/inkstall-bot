import React, { useState, useContext } from 'react';
import { format } from 'date-fns';
import { AuthContext } from '../../context/AuthContext';
import { ChatContext } from '../../context/ChatContext';
import { ThemeContext } from '../../context/ThemeContext';
import ConversationList from './ConversationList';
import Button from '../UI/Button';
import Dropdown from '../UI/Dropdown';
import Modal from '../UI/Modal';
import { BsQuestionCircleFill, BsX, BsPlus, BsThreeDotsVertical } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const { currentUser, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const { createNewConversation } = useContext(ChatContext);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  
  return (
    <>
      <div 
        className={`fixed inset-y-0 left-0 z-20 w-72 bg-white dark:bg-gray-900/95 shadow-lg transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 lg:static lg:z-0`}
      >
        <div className="flex flex-col h-full ">
          {/* Header */}
          <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <BsQuestionCircleFill className="h-8 w-8 text-primary dark:text-primary/80" />
              <h1 className="font-bold text-lg text-gray-900 dark:text-gray-100">Inkstall Bot</h1>
            </div>
            <button
              onClick={toggleSidebar}
              className="lg:hidden text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 focus:outline-none"
            >
              <BsX className="h-6 w-6" />
            </button>
          </div>
          
          {/* New Chat Button */}
          <div className="p-4">
            <Button
              onClick={createNewConversation}
              variant="primary"
              fullWidth
              icon={<BsPlus className="h-5 w-5" />}
            >
              New Chat
            </Button>
          </div>
          
          {/* Conversations List */}
          <div className="flex-1 overflow-y-auto dark:bg-gray-900">
            <ConversationList />
          </div>
          
          {/* User Profile */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 rounded-full bg-primary text-white flex items-center justify-center">
                  {currentUser?.name?.charAt(0).toUpperCase() || 'U'}
                </div>
                <div className="flex flex-col">
                  <span className="font-medium text-sm dark:text-white">{currentUser?.name || 'User'}</span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">{currentUser?.email || 'user@example.com'}</span>
                </div>
              </div>
              
              <Dropdown
                direction="up"
                trigger={
                  <button className="text-gray-500 hover:text-gray-700">
                    <BsThreeDotsVertical className="h-5 w-5" />
                  </button>
                }
                items={[
                  {
                    label: 'Settings',
                    onClick: () => setIsSettingsModalOpen(true)
                  },
                  {
                    label: 'Manage Users',
                    onClick: () => navigate('/manage-users')
                  },
                  {
                    label: 'Logout',
                    onClick: logout
                  }
                ]}
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Settings Modal */}
      <Modal
        isOpen={isSettingsModalOpen}
        onClose={() => setIsSettingsModalOpen(false)}
        title="Settings"
        footer={
          <div className="flex justify-end">
            <Button
              variant="outline"
              onClick={() => setIsSettingsModalOpen(false)}
              className="mr-2"
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={() => setIsSettingsModalOpen(false)}
            >
              Save
            </Button>
          </div>
        }
      >
        <div className="space-y-4 ">
          <div>
            <h3 className="font-medium text-gray-900 dark:text-white">User Settings</h3>
            <div className="mt-2 space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Theme
                </label>
                <select
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-primary focus:border-primary rounded-md"
                  value={theme}
                  onChange={(e) => toggleTheme(e.target.value)}
                >
                  <option value="light">Light</option>
                  <option value="dark">Dark</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Font Size
                </label>
                <select
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-primary focus:border-primary rounded-md"
                >
                  <option>Small</option>
                  <option>Medium</option>
                  <option>Large</option>
                </select>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="font-medium text-gray-900 dark:text-white">AI Settings</h3>
            <div className="mt-2 space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Model
                </label>
                <select
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-primary focus:border-primary rounded-md"
                >
                  <option>Default</option>
                  <option>Creative</option>
                  <option>Precise</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Temperature
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  defaultValue="70"
                  className="mt-1 w-full accent-primary dark:accent-primary-dark"
                />
                <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                  <span>Precise</span>
                  <span>Balanced</span>
                  <span>Creative</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Sidebar;
