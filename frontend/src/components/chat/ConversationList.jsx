import React, { useContext } from 'react';
import { format } from 'date-fns';
import { ChatContext } from '../../context/ChatContext';
import ConversationItem from './ConversationItem';

const ConversationList = () => {
  const { conversations, activeConversation, setActiveConversation } = useContext(ChatContext);
  
  if (conversations.length === 0) {
    return (
      <div className="text-center py-8 px-4">
        <p className="text-gray-500 dark:text-gray-400 text-sm">No conversations yet.</p>
        <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Start a new chat to begin!</p>
      </div>
    );
  }
  
  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      {conversations.map((conversation) => (
        <ConversationItem 
          key={conversation.id}
          conversation={conversation}
          isActive={activeConversation === conversation.id}
          onClick={() => setActiveConversation(conversation.id)}
        />
      ))}
    </div>
  );
};

export default ConversationList;
