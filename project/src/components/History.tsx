import { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { AuthContext } from '../AuthContext';
import { api } from '../api';
import { 
  History as HistoryIcon, 
  MessageSquare, 
  FileText, 
  Clock,
  Search,
  Trash2,
  Eye
} from 'lucide-react';

interface ChatSession {
  id: string;
  filename: string;
  created_at: string;
  messages: { 
    id: string; 
    query: string; 
    answer: string; 
    sources: string[]; 
    timestamp: string 
  }[];
}

function History() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    fetchChatSessions();
  }, [user, navigate]);

  const fetchChatSessions = async () => {
    try {
      setLoading(true);
      const response = await api.get('/api/chat-sessions');
      setSessions(response.data);
    } catch (error) {
      console.error('Error fetching chat sessions:', error);
      setError('Failed to load chat history');
    } finally {
      setLoading(false);
    }
  };

  const clearAllHistory = async () => {
    if (!confirm('Are you sure you want to clear all chat history? This action cannot be undone.')) {
      return;
    }

    try {
      await api.delete('/chat-history');
      setSessions([]);
    } catch (error) {
      console.error('Error clearing chat history:', error);
      setError('Failed to clear chat history');
    }
  };

  const filteredSessions = sessions.filter(session =>
    session.filename.toLowerCase().includes(searchTerm.toLowerCase()) ||
    session.messages.some(msg => 
      msg.query.toLowerCase().includes(searchTerm.toLowerCase()) ||
      msg.answer.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  if (loading) {
    return (
      <div className="p-8 max-w-6xl mx-auto">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-300 rounded w-1/4"></div>
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-32 bg-gray-300 rounded-xl"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-6xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg">
              <HistoryIcon className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Chat History
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                View and manage your conversation history
              </p>
            </div>
          </div>
          
          {sessions.length > 0 && (
            <button
              onClick={clearAllHistory}
              className="flex items-center space-x-2 px-4 py-2 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
            >
              <Trash2 className="h-4 w-4" />
              <span>Clear All</span>
            </button>
          )}
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search chat history..."
            className="input-field pl-10 pr-4"
          />
        </div>
      </motion.div>

      {/* Error Message */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg"
        >
          <p className="text-red-600 dark:text-red-400">{error}</p>
        </motion.div>
      )}

      {/* Sessions List */}
      {filteredSessions.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-16"
        >
          <HistoryIcon className="h-16 w-16 mx-auto mb-4 text-gray-400" />
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            {searchTerm ? 'No matching conversations found' : 'No chat history yet'}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            {searchTerm 
              ? 'Try adjusting your search terms' 
              : 'Start a conversation by uploading a document and asking questions!'
            }
          </p>
          {!searchTerm && (
            <button
              onClick={() => navigate('/upload')}
              className="btn-primary"
            >
              Upload Document
            </button>
          )}
        </motion.div>
      ) : (
        <div className="space-y-6">
          <AnimatePresence>
            {filteredSessions.map((session, index) => (
              <motion.div
                key={session.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="glass-effect rounded-xl p-6 card-hover cursor-pointer"
                onClick={() => navigate(`/chat?sessionId=${session.id}`)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start space-x-4">
                    {/* File Icon */}
                    <div className="flex-shrink-0 p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
                      <FileText className="h-6 w-6 text-white" />
                    </div>
                    
                    {/* Session Info */}
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                        {session.filename === 'No file uploaded' ? 'General Chat' : session.filename}
                      </h3>
                      
                      <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4" />
                          <span>{new Date(session.created_at).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MessageSquare className="h-4 w-4" />
                          <span>{session.messages.length} messages</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* View Button */}
                  <motion.button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/chat?sessionId=${session.id}`);
                    }}
                    className="flex items-center space-x-2 px-3 py-2 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Eye className="h-4 w-4" />
                    <span>View</span>
                  </motion.button>
                </div>
                
                {/* Last Few Messages Preview */}
                {session.messages.length > 0 && (
                  <div className="space-y-3">
                    {session.messages.slice(-2).map((message, msgIndex) => (
                      <div key={message.id} className="border-l-4 border-blue-200 dark:border-blue-800 pl-4">
                        <div className="mb-2">
                          <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Q: {message.query.length > 100 ? `${message.query.slice(0, 100)}...` : message.query}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            A: {message.answer.length > 150 ? `${message.answer.slice(0, 150)}...` : message.answer}
                          </p>
                        </div>
                        {message.sources.length > 0 && (
                          <div className="mt-2 flex flex-wrap gap-1">
                            {message.sources.slice(0, 3).map((source, idx) => (
                              <span 
                                key={idx}
                                className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-xs text-gray-600 dark:text-gray-300 rounded"
                              >
                                {source.length > 20 ? `${source.slice(0, 20)}...` : source}
                              </span>
                            ))}
                            {message.sources.length > 3 && (
                              <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-xs text-gray-600 dark:text-gray-300 rounded">
                                +{message.sources.length - 3} more
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                    
                    {session.messages.length > 2 && (
                      <p className="text-xs text-gray-500 dark:text-gray-400 italic">
                        ... and {session.messages.length - 2} more messages
                      </p>
                    )}
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}

export default History;