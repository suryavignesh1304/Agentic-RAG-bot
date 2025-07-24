import { motion } from 'framer-motion';
import { Bot, Zap, Shield, Globe, Users, Heart } from 'lucide-react';

function About() {
  const features = [
    {
      icon: <Bot className="h-8 w-8" />,
      title: "AI-Powered Intelligence",
      description: "Advanced RAG technology powered by Google's Gemini AI for accurate and contextual responses."
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Lightning Fast",
      description: "Optimized retrieval system with FAISS indexing for instant document search and analysis."
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Secure & Private",
      description: "Enterprise-grade security with JWT authentication and encrypted data storage."
    },
    {
      icon: <Globe className="h-8 w-8" />,
      title: "Multi-Format Support",
      description: "Support for PDF, DOCX, PPTX, CSV, TXT, and Markdown documents."
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "User-Friendly",
      description: "Intuitive interface designed for seamless document interaction and management."
    },
    {
      icon: <Heart className="h-8 w-8" />,
      title: "Continuously Improving",
      description: "Regular updates and improvements based on user feedback and latest AI advancements."
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Header Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 dark:from-blue-900/30 dark:to-purple-900/30" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-8"
            >
              <Bot className="h-20 w-20 mx-auto text-blue-600 dark:text-blue-400 mb-6" />
            </motion.div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              About <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">RAG Chatbot</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
              Revolutionizing document interaction through advanced AI technology and intuitive design.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-24 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-8">
              Our Mission
            </h2>
            <div className="max-w-4xl mx-auto">
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                RAG Chatbot is designed to bridge the gap between complex documents and accessible information. 
                We believe that everyone should be able to easily extract insights, ask questions, and interact 
                with their documents in a natural, conversational way.
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                Built with cutting-edge AI technology and a focus on user experience, our platform transforms 
                static documents into dynamic, interactive knowledge bases that respond to your questions with 
                accuracy and context.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Why Choose RAG Chatbot?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Discover the features that make our platform the perfect solution for document interaction.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="glass-effect rounded-xl p-8 card-hover text-center"
              >
                <div className="text-blue-600 dark:text-blue-400 mb-6 flex justify-center">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section className="py-24 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-8">
              Powered by Advanced Technology
            </h2>
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
                <div className="glass-effect rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    Frontend Technologies
                  </h3>
                  <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                    <li>• React 18 with TypeScript</li>
                    <li>• Vite for fast development</li>
                    <li>• Tailwind CSS for styling</li>
                    <li>• Framer Motion for animations</li>
                    <li>• React Router for navigation</li>
                  </ul>
                </div>
                <div className="glass-effect rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    Backend Technologies
                  </h3>
                  <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                    <li>• FastAPI with Python</li>
                    <li>• Google Gemini AI</li>
                    <li>• FAISS vector search</li>
                    <li>• PostgreSQL database</li>
                    <li>• JWT authentication</li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="glass-effect rounded-2xl p-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Ready to Transform Your Documents?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              Experience the future of document interaction with our AI-powered chatbot.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                onClick={() => window.location.href = '/signup'}
                className="btn-primary text-lg px-8 py-4"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get Started Free
              </motion.button>
              <motion.button
                onClick={() => window.location.href = '/login'}
                className="btn-secondary text-lg px-8 py-4"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Sign In
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

export default About;