import { createContext, useState, useEffect } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [conversations, setConversations] = useLocalStorage('conversations', []);
  const [activeConversation, setActiveConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (activeConversation) {
      const conversation = conversations.find(c => c.id === activeConversation);
      setMessages(conversation?.messages || []);
    } else {
      setMessages([]);
    }
  }, [activeConversation, conversations]);

  const createNewConversation = () => {
    const newConversation = {
      id: Date.now().toString(),
      title: 'New Conversation',
      createdAt: new Date().toISOString(),
      messages: []
    };
    
    setConversations([newConversation, ...conversations]);
    setActiveConversation(newConversation.id);
    return newConversation.id;
  };

  const updateConversationTitle = (id, title) => {
    setConversations(
      conversations.map(conv => 
        conv.id === id ? { ...conv, title } : conv
      )
    );
  };

  const deleteConversation = (id) => {
    setConversations(conversations.filter(conv => conv.id !== id));
    if (activeConversation === id) {
      setActiveConversation(conversations.length > 1 ? conversations[0].id : null);
    }
  };

  const sendMessage = async (content, attachments = []) => {
    // Create or get conversation ID
    const conversationId = activeConversation || createNewConversation();
    
    // User message
    const userMessage = {
      id: Date.now().toString(),
      role: 'user',
      content,
      attachments,
      timestamp: new Date().toISOString()
    };
    
    // Update messages state immediately for UI responsiveness
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    
    // Update conversation in state
    setConversations(
      conversations.map(conv => {
        if (conv.id === conversationId) {
          // Update conversation title if it's a new conversation
          const title = conv.title === 'New Conversation' && content.length > 0
            ? content.slice(0, 30) + (content.length > 30 ? '...' : '')
            : conv.title;
          
          return {
            ...conv,
            title,
            messages: updatedMessages,
            updatedAt: new Date().toISOString()
          };
        }
        return conv;
      })
    );

    // Simulate AI response
    setIsTyping(true);
    
    setTimeout(() => {
      const aiMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "I'm an AI assistant. I'm here to help answer your questions and provide information. How can I assist you today?",
        timestamp: new Date().toISOString()
      };
      
      const updatedWithAiResponse = [...updatedMessages, aiMessage];
      setMessages(updatedWithAiResponse);
      
      setConversations(
        conversations.map(conv => 
          conv.id === conversationId 
            ? { ...conv, messages: updatedWithAiResponse }
            : conv
        )
      );
      
      setIsTyping(false);
    }, 1500);
  };

  const value = {
    conversations,
    activeConversation,
    messages,
    isTyping,
    setActiveConversation,
    createNewConversation,
    updateConversationTitle,
    deleteConversation,
    sendMessage
  };

  return (
    <ChatContext.Provider value={value}>
      {children}
    </ChatContext.Provider>
  );
};
