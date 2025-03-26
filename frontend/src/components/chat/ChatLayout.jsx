import React, { useState } from 'react';
import Sidebar from './Sidebar';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import { useContext } from 'react';
import { ChatContext } from '../../context/ChatContext';
import { HiMenu, HiTrash, HiShare, HiChat } from 'react-icons/hi';

const ChatLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { messages, isTyping, activeConversation } = useContext(ChatContext);
  
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  
  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      
      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm z-10">
          <div className="p-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <button
                onClick={toggleSidebar}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 focus:outline-none lg:hidden"
              >
                <HiMenu className="h-6 w-6" />
              </button>
              <h2 className="font-medium dark:text-white">
                {activeConversation ? 'Chat' : 'New Chat'}
              </h2>
            </div>
            
            <div className="flex items-center space-x-2">
              <button
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 focus:outline-none"
                title="Clear chat"
              >
                <HiTrash className="h-5 w-5" />
              </button>
              <button
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 focus:outline-none"
                title="Share"
              >
                <HiShare className="h-5 w-5" />
              </button>
            </div>
          </div>
        </header>
        
        {/* Messages */}
        <div className="flex-1 overflow-y-auto bg-white dark:bg-gray-800/95 p-4">
          {messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center px-4">
              <div className="max-w-md">
                <HiChat className="mx-auto h-12 w-12 text-primary/80 dark:text-primary/60" />
                <h3 className="mt-2 text-lg font-medium text-gray-900 dark:text-gray-100">Welcome to AI Chat</h3>
                <p className="mt-1 text-gray-500 dark:text-gray-300">
                  Start a conversation with the AI. Ask questions, get information, or just chat!
                </p>
                {/* <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3 hover:bg-gray-100 dark:hover:bg-gray-700">
                    <h4 className="font-medium dark:text-white">Examples</h4>
                    <ul className="mt-2 text-sm text-gray-500 dark:text-gray-400 space-y-2">
                      <li>"Explain quantum computing"</li>
                      <li>"Create a workout plan for beginners"</li>
                      <li>"Write a poem about spring"</li>
                    </ul>
                  </div> */}
                  {/* <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3 hover:bg-gray-100 dark:hover:bg-gray-700">
                    <h4 className="font-medium dark:text-white">Capabilities</h4>
                    <ul className="mt-2 text-sm text-gray-500 dark:text-gray-400 space-y-2">
                      <li>Remembers previous messages</li>
                      <li>Provides detailed explanations</li>
                      <li>Supports file attachments</li>
                    </ul>
                  </div> */}
                {/* </div> */}
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((message) => (
                <ChatMessage key={message.id} message={message} />
              ))}
              {isTyping && (
                <div className="flex items-center space-x-2 text-gray-500 dark:text-gray-400">
                  <span className="h-2 w-2 bg-gray-400 dark:bg-gray-600 rounded-full animate-pulse"></span>
                  <span className="h-2 w-2 bg-gray-400 dark:bg-gray-600 rounded-full animate-pulse delay-75"></span>
                  <span className="h-2 w-2 bg-gray-400 dark:bg-gray-600 rounded-full animate-pulse delay-150"></span>
                  <span className="text-sm">AI is thinking...</span>
                </div>
              )}
            </div>
          )}
        </div>
        
        {/* Input */}
        <ChatInput />
      </div>
    </div>
  );
};

export default ChatLayout;
