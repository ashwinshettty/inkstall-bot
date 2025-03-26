const mockAPI = {
    login: async (email, password) => {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock authentication logic
      if (email && password) {
        return {
          id: '1',
          name: email.split('@')[0],
          email
        };
      } else {
        throw new Error('Invalid credentials');
      }
    },
    
    register: async (name, email, password) => {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock registration logic
      if (name && email && password) {
        return {
          id: Date.now().toString(),
          name,
          email
        };
      } else {
        throw new Error('Invalid information');
      }
    },
    
    getConversations: async (userId) => {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Return mock conversations
      return [
        {
          id: '1',
          title: 'General questions',
          createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
          updatedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
          messages: [
            {
              id: '101',
              role: 'user',
              content: 'Hello, how can you help me today?',
              timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
            },
            {
              id: '102',
              role: 'assistant',
              content: 'Hi there! I can help you with a wide range of tasks. I can answer questions, provide information, assist with creative tasks like writing, and much more. What would you like to know or do today?',
              timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000 + 30000).toISOString()
            }
          ]
        },
        {
          id: '2',
          title: 'Programming help',
          createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
          updatedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000 + 2 * 60 * 60 * 1000).toISOString(),
          messages: [
            {
              id: '201',
              role: 'user',
              content: 'Can you help me with some JavaScript code?',
              timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
            }
          ]
        }
      ];
    },
    
    sendMessage: async (conversationId, content, attachments = []) => {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock AI response
      return {
        id: Date.now().toString(),
        role: 'assistant',
        content: "I'm an AI assistant. I'm here to help answer your questions and provide information. How can I assist you today?",
        timestamp: new Date().toISOString()
      };
    }
  };
  
  export default mockAPI;