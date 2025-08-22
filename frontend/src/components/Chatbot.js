//chatbot.js
import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, Send, X, Trash2 } from 'lucide-react';
import { api } from '../services/api';

const Chatbot = () => {
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef(null);

  // Load chat history when component mounts
  useEffect(() => {
    loadChatHistory();
  }, []);

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

  const loadChatHistory = async () => {
    const history = await api.getChatHistory();
    setChatMessages(history);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const sendMessage = async () => {
    if (!currentMessage.trim() || isSending) return;

    const messageToSend = currentMessage.trim();
    setCurrentMessage('');
    setIsSending(true);
    setIsTyping(true);

    try {
      const result = await api.sendMessage(messageToSend);
      
      if (result.success) {
        setChatMessages(prev => [...prev, result.data.userMessage, result.data.botMessage]);
      } else {
        // Add error message to chat
        const errorMessage = {
          id: Date.now(),
          sender: 'bot',
          text: 'Sorry, I encountered an error. Please try again.',
          timestamp: new Date().toISOString()
        };
        setChatMessages(prev => [...prev, errorMessage]);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage = {
        id: Date.now(),
        sender: 'bot',
        text: 'Network error. Please check your connection and try again.',
        timestamp: new Date().toISOString()
      };
      setChatMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsSending(false);
      setIsTyping(false);
    }
  };

  const clearChat = async () => {
    if (window.confirm('Are you sure you want to clear the chat history?')) {
      try {
        const result = await api.clearChatHistory();
        if (result.success) {
          loadChatHistory(); // Reload fresh history
        } else {
          alert('Failed to clear chat history');
        }
      } catch (error) {
        console.error('Error clearing chat:', error);
        alert('Network error. Please try again.');
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const formatMessageTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <>
      {/* AI Chatbot Modal */}
      {chatOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end">
          <div className="bg-white rounded-t-3xl w-full h-96 flex flex-col animate-slide-up">
            {/* Header */}
            <div className="flex justify-between items-center p-4 border-b bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-t-3xl">
              <div>
                <h3 className="font-semibold">Pet Assistant</h3>
                <p className="text-xs text-blue-100">
                  {isTyping ? 'Typing...' : 'Ask me about your pet\'s activities'}
                </p>
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={clearChat}
                  className="p-1 hover:bg-white hover:bg-opacity-20 rounded"
                  title="Clear chat history"
                >
                  <Trash2 size={16} />
                </button>
                <button 
                  onClick={() => setChatOpen(false)}
                  className="p-1 hover:bg-white hover:bg-opacity-20 rounded"
                >
                  <X size={20} />
                </button>
              </div>
            </div>
            
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {chatMessages.map(msg => (
                <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-xs p-3 rounded-2xl relative group ${
                    msg.sender === 'user' 
                      ? 'bg-blue-500 text-white rounded-br-md' 
                      : 'bg-gray-100 text-gray-800 rounded-bl-md'
                  }`}>
                    <p className="text-sm">{msg.text}</p>
                    <p className={`text-xs mt-1 ${
                      msg.sender === 'user' ? 'text-blue-100' : 'text-gray-500'
                    }`}>
                      {formatMessageTime(msg.timestamp)}
                    </p>
                  </div>
                </div>
              ))}
              
              {/* Typing indicator */}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 text-gray-800 rounded-2xl rounded-bl-md p-3 max-w-xs">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
            
            {/* Input */}
            <div className="p-4 border-t flex gap-2">
              <textarea
                value={currentMessage}
                onChange={(e) => setCurrentMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about your pet's activities..."
                className="flex-1 p-2 border rounded-2xl focus:ring-2 focus:ring-blue-500 resize-none"
                rows={1}
                disabled={isSending}
              />
              <button
                onClick={sendMessage}
                disabled={!currentMessage.trim() || isSending}
                className={`p-2 rounded-full transition-colors ${
                  currentMessage.trim() && !isSending
                    ? 'bg-blue-500 text-white hover:bg-blue-600'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                <Send size={16} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Chat Button */}
      <button
        onClick={() => setChatOpen(true)}
        className="fixed bottom-6 right-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-200 z-40"
        title="Open pet assistant"
      >
        <MessageCircle size={24} />
        
        {/* Notification badge */}
        {chatMessages.length > 1 && (
          <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
            {chatMessages.filter(msg => msg.sender === 'bot').length}
          </div>
        )}
      </button>

      <style jsx>{`
        @keyframes slide-up {
          from {
            transform: translateY(100%);
          }
          to {
            transform: translateY(0);
          }
        }
        
        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }
      `}</style>
    </>
  );
};

export default Chatbot;