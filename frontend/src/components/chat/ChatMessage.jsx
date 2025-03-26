import React, { useState } from 'react';
import { format } from 'date-fns';
import Dropdown from '../UI/Dropdown';
import { HiPaperClip, HiDotsHorizontal } from 'react-icons/hi';

const ChatMessage = ({ message }) => {
  const [showActions, setShowActions] = useState(false);
  
  const isUserMessage = message.role === 'user';
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(message.content);
    // You could add a toast notification here
  };
  
  // Function to format message content with proper Markdown
  const formatMessageContent = (content) => {
    // This is a simple implementation. In a real app, you might use a Markdown library
    const formattedContent = content
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>')
      .replace(/`([^`]+)`/g, '<code>$1</code>')
      .split('\n').join('<br />');
    
    return <div dangerouslySetInnerHTML={{ __html: formattedContent }} />;
  };
  
  return (
    <div 
      className={`flex ${isUserMessage ? 'justify-end' : 'justify-start'}`}
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      <div 
        className={`relative max-w-3xl rounded-lg px-4 py-3 ${
          isUserMessage 
            ? 'bg-userMessage dark:bg-indigo-900 text-gray-900 dark:text-gray-100' 
            : 'bg-aiMessage dark:bg-gray-800 text-gray-800 dark:text-gray-100'
        }`}
      >
        <div className="flex items-start">
          {!isUserMessage && (
            <div className="mr-3 flex-shrink-0">
              <div className="h-8 w-8 rounded-full bg-primary text-white flex items-center justify-center text-sm">
                AI
              </div>
            </div>
          )}
          
          <div className="flex-1 min-w-0">
            <div className="text-sm">{formatMessageContent(message.content)}</div>
            
            {message.attachments && message.attachments.length > 0 && (
              <div className="mt-2 space-y-2">
                {message.attachments.map((attachment, index) => (
                  <div 
                    key={index}
                    className="inline-block bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded p-2 text-xs dark:text-gray-300"
                  >
                    <div className="flex items-center space-x-2">
                      <HiPaperClip className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                      <span className="truncate">{attachment.name}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            <div className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              {format(new Date(message.timestamp), 'h:mm a')}
            </div>
          </div>
          
          {showActions && (
            <div className="ml-2">
              <Dropdown
                trigger={
                  <button className="text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-400">
                    <HiDotsHorizontal className="h-4 w-4" />
                  </button>
                }
                items={[
                  {
                    label: 'Copy',
                    onClick: copyToClipboard
                  },
                  {
                    label: isUserMessage ? 'Edit' : 'Regenerate',
                    onClick: () => {}
                  }
                ]}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;