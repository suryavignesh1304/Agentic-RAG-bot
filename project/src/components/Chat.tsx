import { useContext, useState, useEffect, useRef, type FormEvent } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { AuthContext } from '../AuthContext';
import { api } from '../api';
import { 
  Send, 
  Search, 
  Bot, 
  User, 
  FileText, 
  Loader,
  MessageSquare,
  Upload as UploadIcon
} from 'lucide-react';

interface Message {
  id: string;
  query: string;
  answer: string;
  sources: string[];
  timestamp: string;
}

function Chat() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('sessionId') || '';
  const [messages, setMessages] = useState<Message[]>([]);
  const [query, setQuery] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingMessages, setIsLoadingMessages] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    if (sessionId) {
      fetchSessionMessages();
    } else {
      navigate('/history');
    }
  }, [user, sessionId, navigate]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const fetchSessionMessages = async () => {
    if (!user) return;
    
    try {
      setIsLoadingMessages(true);
      const response = await api.get(`/api/chat-sessions/${sessionId}`);
      setMessages(response.data.messages || []);
    } catch (error) {
      console.error('Error fetching session messages:', error);
    } finally {
      setIsLoadingMessages(false);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!query.trim() || !sessionId || !user || isLoading) return;

    const userMessage = query;
    setQuery('');
    setIsLoading(true);

    try {
      const response = await api.post('/query', { 
        query: userMessage, 
        session_id: sessionId 
      });

      const newMessage: Message = {
        id: response.data.id || Date.now().toString(),
        query: userMessage,
        answer: response.data.answer,
        sources: response.data.sources || [],
        timestamp: new Date().toISOString(),
      };

      setMessages(prev => [...prev, newMessage]);
    } catch (error: any) {
      console.error('Error sending query:', error);
      // Add error message to chat
      const errorMessage: Message = {
        id: Date.now().toString(),
        query: userMessage,
        answer: 'Sorry, I encountered an error processing your request. Please try again.',
        sources: [],
        timestamp: new Date().toISOString(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredMessages = messages.filter(
    (msg) =>
      msg.query.toLowerCase().includes(searchTerm.toLowerCase()) ||
      msg.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!user) {
    return null;
  }

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-effect p-6 border-b border-gray-200/50 dark:border-gray-700/50"
      >
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
              <MessageSquare className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                AI Chat
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Ask questions about your documents
              </p>
            </div>
          </div>
          
          <button
            onClick={() => navigate('/upload')}
            className="btn-secondary flex items-center space-x-2"
          >
            <UploadIcon className="h-4 w-4" />
            <span>Upload More</span>
          </button>
        </div>
        
        {/* Search Bar */}
        <div className="max-w-4xl mx-auto mt-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search messages..."
              className="input-field pl-10 pr-4"
            />
          </div>
        </div>
      </motion.div>

      {/* Messages Area */}
      <div className="flex-1 overflow-hidden">
        <div className="h-full max-w-4xl mx-auto p-6">
          <div className="h-full flex flex-col">
            <div className="flex-1 overflow-y-auto pr-4 -mr-4">
              {isLoadingMessages ? (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <Loader className="h-8 w-8 animate-spin mx-auto mb-4 text-blue-500" />
                    <p className="text-gray-600 dark:text-gray-300">Loading messages...</p>
                  </div>
                </div>
              ) : filteredMessages.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center justify-center h-full"
                >
                  <div className="text-center">
                    <Bot className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      {searchTerm ? 'No messages found' : 'Start a conversation'}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-6">
                      {searchTerm 
                        ? 'Try adjusting your search terms'
                        : 'Ask me anything about your uploaded documents!'
                      }
                    </p>
                    {!searchTerm && (
                      <div className="flex flex-col space-y-2 max-w-md mx-auto">
                        <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-left">
                          <p className="text-sm text-blue-700 dark:text-blue-300">
                            💡 "What are the main topics in this document?"
                          </p>
                        </div>
                        <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg text-left">
                          <p className="text-sm text-purple-700 dark:text-purple-300">
                            📊 "Can you summarize the key findings?"
                          </p>
                        </div>
                        <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg text-left">
                          <p className="text-sm text-green-700 dark:text-green-300">
                            🔍 "Find information about specific topics"
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              ) : (
                <div className="space-y-6 pb-6">
                  <AnimatePresence>
                    {filteredMessages.map((msg, index) => (
                      <motion.div
                        key={msg.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        className="space-y-4"
                      >
                        {/* User Message */}
                        <div className="flex justify-end">
                          <div className="flex items-start space-x-3 max-w-3xl">
                            <div className="glass-effect bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-2xl rounded-br-md px-6 py-4">
                              <p className="text-sm leading-relaxed">{msg.query}</p>
                            </div>
                            <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                              <User className="h-4 w-4 text-white" />
                            </div>
                          </div>
                        </div>

                        {/* AI Response */}
                        <div className="flex justify-start">
                          <div className="flex items-start space-x-3 max-w-3xl">
                            <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-gray-600 to-gray-700 rounded-full flex items-center justify-center">
                              <Bot className="h-4 w-4 text-white" />
                            </div>
                            <div className="glass-effect bg-white dark:bg-gray-800 rounded-2xl rounded-bl-md px-6 py-4 border border-gray-200 dark:border-gray-700">
                              <p className="text-sm leading-relaxed text-gray-900 dark:text-white mb-3">
                                {msg.answer}
                              </p>
                              
                              {msg.sources.length > 0 && (
                                <div className="border-t border-gray-200 dark:border-gray-600 pt-3">
                                  <div className="flex items-center space-x-2 mb-2">
                                    <FileText className="h-4 w-4 text-gray-500" />
                                    <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                                      Sources:
                                    </span>
                                  </div>
                                  <div className="flex flex-wrap gap-2">
                                    {msg.sources.map((source, idx) => (
                                      <span 
                                        key={idx}
                                        className="px-2 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 text-xs rounded-full"
                                      >
                                        {source}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                  
                  {/* Typing Indicator */}
                  {isLoading && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex justify-start"
                    >
                      <div className="flex items-start space-x-3">
                        <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-gray-600 to-gray-700 rounded-full flex items-center justify-center">
                          <Bot className="h-4 w-4 text-white" />
                        </div>
                        <div className="glass-effect bg-white dark:bg-gray-800 rounded-2xl rounded-bl-md px-6 py-4 border border-gray-200 dark:border-gray-700">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>
        </div>
      </div>

      {/* Input Area */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-effect border-t border-gray-200/50 dark:border-gray-700/50 p-6"
      >
        <div className="max-w-4xl mx-auto">
          <form onSubmit={handleSubmit} className="flex space-x-4">
            <div className="flex-1 relative">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ask a question about your documents..."
                className="input-field pr-12"
                disabled={isLoading}
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                {isLoading ? (
                  <Loader className="h-5 w-5 animate-spin text-gray-400" />
                ) : (
                  <MessageSquare className="h-5 w-5 text-gray-400" />
                )}
              </div>
            </div>
            
            <motion.button
              type="submit"
              disabled={isLoading || !query.trim()}
              className="btn-primary flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              whileHover={{ scale: isLoading ? 1 : 1.02 }}
              whileTap={{ scale: isLoading ? 1 : 0.98 }}
            >
              <Send className="h-4 w-4" />
              <span>{isLoading ? 'Sending...' : 'Send'}</span>
            </motion.button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}

export default Chat;