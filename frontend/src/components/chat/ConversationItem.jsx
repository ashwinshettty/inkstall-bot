import React, { useContext } from 'react';
import { format } from 'date-fns';
import { ChatContext } from '../../context/ChatContext';
import Dropdown from '../UI/Dropdown';
import { BsChatDots, BsThreeDots } from 'react-icons/bs';

const ConversationItem = ({ conversation, isActive, onClick }) => {
  const { deleteConversation, updateConversationTitle } = useContext(ChatContext);
  
  const handleRename = () => {
    const newTitle = prompt('Enter new name:', conversation.title);
    if (newTitle && newTitle.trim() !== '') {
      updateConversationTitle(conversation.id, newTitle.trim());
    }
  };
  
  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this conversation?')) {
      deleteConversation(conversation.id);
    }
  };
  
  return (
    <div 
      className={`px-4 py-3 flex items-center justify-between cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 ${isActive ? 'bg-gray-50 dark:bg-gray-800' : ''}`}
      onClick={onClick}
    >
      <div className="flex-1 min-w-0">
        <div className="flex items-center">
          <BsChatDots className="h-5 w-5 text-gray-400 dark:text-gray-500 mr-2" />
          <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">{conversation.title}</p>
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          {conversation.updatedAt 
            ? format(new Date(conversation.updatedAt), 'MMM d, yyyy')
            : format(new Date(conversation.createdAt), 'MMM d, yyyy')}
        </p>
      </div>
      
      <Dropdown
        trigger={
          <button 
            className="text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 p-1"
            onClick={(e) => e.stopPropagation()}
          >
            <BsThreeDots className="h-5 w-5" />
          </button>
        }
        items={[
          {
            label: 'Rename',
            onClick: handleRename
          },
          {
            label: 'Delete',
            onClick: handleDelete
          }
        ]}
      />
    </div>
  );
};

export default ConversationItem;
