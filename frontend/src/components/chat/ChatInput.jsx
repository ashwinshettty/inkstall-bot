import React, { useState, useContext, useRef } from 'react';
import { ChatContext } from '../../context/ChatContext';
import Button from '../UI/Button';
import Dropdown from '../UI/Dropdown';
import { HiX, HiPaperClip, HiPlus, HiChevronDown, HiPaperAirplane } from 'react-icons/hi';

const ChatInput = () => {
  const [message, setMessage] = useState('');
  const [attachments, setAttachments] = useState([]);
  const [showOptions, setShowOptions] = useState(false);
  const fileInputRef = useRef(null);
  
  const { sendMessage } = useContext(ChatContext);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (message.trim() || attachments.length) {
      sendMessage(message, attachments);
      setMessage('');
      setAttachments([]);
    }
  };
  
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      handleSubmit(e);
    }
  };
  
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setAttachments([...attachments, ...files]);
    // Reset the file input
    e.target.value = null;
  };
  
  const removeAttachment = (index) => {
    setAttachments(attachments.filter((_, i) => i !== index));
  };
  
  return (
    <div className="border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/95 px-4 py-3">
      {/* Attachments preview */}
      {attachments.length > 0 && (
        <div className="mb-3 flex flex-wrap gap-2">
          {attachments.map((file, index) => (
            <div 
              key={index}
              className="flex items-center space-x-2 bg-gray-100 dark:bg-gray-700/80 rounded-full px-3 py-1 text-sm text-gray-700 dark:text-gray-200"
            >
              <span className="truncate max-w-xs">{file.name}</span>
              <button
                onClick={() => removeAttachment(index)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
              >
                <HiX className="h-5 w-5" />
              </button>
            </div>
          ))}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="flex space-x-2">
        <div className="flex-1 relative flex items-center">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a message..."
            className="w-full border-gray-300 dark:border-gray-600 dark:bg-gray-700/90 dark:text-gray-100 rounded-lg focus:ring-primary dark:focus:ring-primary/60 focus:border-primary dark:focus:border-primary/60 px-4 py-2 pr-10 resize-none overflow-hidden placeholder-gray-400 dark:placeholder-gray-500"
            rows={1}
            style={{ 
              minHeight: '44px', 
              maxHeight: '200px',
              height: 'auto',
              marginTop: 'auto',
              marginBottom: 'auto',
            }}
          />
          
          <div className="absolute right-2 flex items-center space-x-2 h-full">
            <button
              type="button"
              onClick={() => fileInputRef.current.click()}
              className="flex items-center text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition-colors"
            >
              <HiPaperClip className="h-5 w-5" />
            </button>
            
            <Dropdown
            direction="up"
              trigger={
                <button
                  type="button"
                  className="flex items-center text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition-colors"
                >
                  <HiPlus className="h-5 w-5" />
                </button>
              }
              items={[
                {
                  label: 'Upload Image',
                  onClick: () => fileInputRef.current.click()
                },
                {
                  label: 'Code Completion',
                  onClick: () => setMessage(message + "```\n\n```")
                },
                {
                  label: 'Summarize Text',
                  onClick: () => setMessage("Please summarize the following text:\n\n")
                }
              ]}
            />
          </div>
          
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            multiple
            className="hidden"
          />
        </div>
        
        <Button
          type="submit"
          disabled={!message.trim() && !attachments.length}
          variant="primary"
          className="rounded-full h-10 w-10 flex items-center justify-center p-0"
        >
          <HiPaperAirplane className="h-5 w-5 rotate-90" />
        </Button>
      </form>
      
      <div className="mt-2 text-xs text-gray-500 dark:text-gray-400/90 flex justify-between items-center">
        <div>
          <button
            type="button"
            onClick={() => setShowOptions(!showOptions)}
            className="text-primary hover:text-primary-dark flex items-center"
          >
            <HiChevronDown 
              className={`h-4 w-4 mr-1 transform transition-transform ${showOptions ? 'rotate-180' : ''}`} 
            />
            Options
          </button>
        </div>
        
        <div>
          Press Enter to send, Shift+Enter for new line
        </div>
      </div>
      
      {showOptions && (
        <div className="mt-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 grid grid-cols-2 gap-3 text-sm">
          <div>
            <label className="block text-gray-700 dark:text-gray-300 font-medium mb-1">Model</label>
            <select
              className="w-full p-2 border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded-md focus:ring-primary focus:border-primary"
            >
              <option>Default</option>
              <option>Creative</option>
              <option>Precise</option>
            </select>
          </div>
          
          <div>
          <label className="block text-gray-700 dark:text-gray-300 font-medium mb-1">Temperature</label>
            <input
              type="range"
              min="0"
              max="100"
              defaultValue="70"
              className="w-full accent-primary dark:accent-primary-dark"
            />
            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
              <span>Precise</span>
              <span>Creative</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatInput;