import { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AuthContext } from '../AuthContext';
import { api } from '../api';
import { BarChart2, FileText, MessageSquare, Upload, TrendingUp } from 'lucide-react';

interface Stats {
  total_documents: number;
  total_chunks: number;
  chat_history_count: number;
}

function Stats() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    fetchStats();
  }, [user, navigate]);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const response = await api.get('/stats');
      setStats(response.data);
    } catch (error) {
      console.error('Error fetching stats:', error);
      setError('Failed to load statistics');
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      icon: FileText,
      label: 'Total Documents',
      value: stats?.total_documents || 0,
      gradient: 'from-blue-500 to-blue-600',
      description: 'Documents uploaded and processed'
    },
    {
      icon: BarChart2,
      label: 'Total Chunks',
      value: stats?.total_chunks || 0,
      gradient: 'from-purple-500 to-purple-600',
      description: 'Document chunks for better search'
    },
    {
      icon: MessageSquare,
      label: 'Chat Messages',
      value: stats?.chat_history_count || 0,
      gradient: 'from-green-500 to-green-600',
      description: 'Total conversations with AI'
    }
  ];

  if (loading) {
    return (
      <div className="p-8 max-w-7xl mx-auto">
        <div className="animate-pulse space-y-8">
          <div className="h-8 bg-gray-300 rounded w-1/4"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-32 bg-gray-300 rounded-xl"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 max-w-7xl mx-auto">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <button onClick={fetchStats} className="btn-primary">
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Dashboard Statistics
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Overview of your RAG chatbot usage and activity
        </p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {statCards.map((card, index) => (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="glass-effect rounded-xl p-6 card-hover"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-lg bg-gradient-to-r ${card.gradient}`}>
                <card.icon className="h-6 w-6 text-white" />
              </div>
              <TrendingUp className="h-5 w-5 text-green-500" />
            </div>
            
            <div className="mb-2">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="text-3xl font-bold text-gray-900 dark:text-white"
              >
                {card.value.toLocaleString()}
              </motion.div>
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                {card.label}
              </h3>
            </div>
            
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {card.description}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="glass-effect rounded-xl p-6"
      >
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          Quick Actions
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <motion.button
            onClick={() => navigate('/upload')}
            className="flex items-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors group"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Upload className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-3" />
            <span className="text-blue-600 dark:text-blue-400 font-medium">
              Upload Document
            </span>
          </motion.button>
          
          <motion.button
            onClick={() => navigate('/chat')}
            className="flex items-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors group"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <MessageSquare className="h-5 w-5 text-purple-600 dark:text-purple-400 mr-3" />
            <span className="text-purple-600 dark:text-purple-400 font-medium">
              Start Chat
            </span>
          </motion.button>
          
          <motion.button
            onClick={() => navigate('/history')}
            className="flex items-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors group"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <BarChart2 className="h-5 w-5 text-green-600 dark:text-green-400 mr-3" />
            <span className="text-green-600 dark:text-green-400 font-medium">
              View History
            </span>
          </motion.button>
          
          <motion.button
            onClick={fetchStats}
            className="flex items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors group"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <TrendingUp className="h-5 w-5 text-gray-600 dark:text-gray-400 mr-3" />
            <span className="text-gray-600 dark:text-gray-400 font-medium">
              Refresh Stats
            </span>
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}

export default Stats;