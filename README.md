<div class="container">
        <h1 class="text-center">RAG Chatbot</h1>

  <div class="note">
            <h3 class="mt-0">Before You Start: Project Setup & Organization</h3>
            <p>To ensure your project is well-structured and ready for deployment, follow these steps:</p>
            <h4>1. Backend Environment File (.env):</h4>
            <ul>
                <li>Create a <code>.env</code> file in your backend's root directory (where your FastAPI <code>main.py</code> or equivalent is located).</li>
                <li>Move sensitive information like your Google Gemini API key and JWT secret into this file.</li>
                <li><strong>Crucially, add <code>.env</code> to your <code>.gitignore</code> file</strong> to prevent it from being committed to version control.</li>
            </ul>
            <p>Your <code>.env</code> file should look something like this:</p>
            <pre><code>GEMINI_API_KEY="Your_Google_Gemini_API_Key_Here"
JWT_SECRET_KEY="Your_Strong_Random_JWT_Secret_Key_Here"
DATABASE_URL="postgresql://user:password@host:port/database_name"</code></pre>
            <p>Then, in your <code>main.py</code> (or equivalent backend file), modify the relevant lines to read from environment variables:</p>
            <pre><code>import os
from dotenv import load_dotenv

load_dotenv() # Load environment variables from .env file

# Configure Gemini API
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

# JWT configuration
SECRET_KEY = os.getenv("JWT_SECRET_KEY")
ALGORITHM = "HS256" # This can also be an env var if you plan to change it
ACCESS_TOKEN_EXPIRE_MINUTES = 30 # This can also be an env var

# Database configuration
DATABASE_URL = os.getenv("DATABASE_URL")</code></pre>
            <h4>2. Frontend API Configuration:</h4>
            <p>Your frontend <code>api.ts</code> currently hardcodes the backend URL (<code>http://localhost:8000</code>). For a production environment, you'd typically want this to be configurable (e.g., via environment variables). For this submission, <code>localhost</code> is fine, but keep it in mind for future development.</p>
        </div>

  <h2>Table of Contents</h2>
        <ul>
            <li><a href="#about-the-project">About the Project</a></li>
            <li><a href="#features">Features</a></li>
            <li><a href="#technology-stack">Technology Stack</a></li>
            <li><a href="#database-schema">Database Schema</a></li>
            <li><a href="#getting-started">Getting Started</a>
                <ul>
                    <li><a href="#prerequisites">Prerequisites</a></li>
                    <li><a href="#backend-setup">Backend Setup</a></li>
                    <li><a href="#frontend-setup">Frontend Setup</a></li>
                </ul>
            </li>
            <li><a href="#usage">Usage</a></li>
            <li><a href="#api-endpoints">API Endpoints</a></li>
            <li><a href="#project-demos">Project Demos</a></li>
            <li><a href="#contributing">Contributing</a></li>
            <li><a href="#license">License</a></li>
            <li><a href="#contact">Contact</a></li>
        </ul>

  <h2 id="about-the-project">About the Project</h2>
        <p>The RAG Chatbot is an intelligent web application designed to revolutionize how users interact with their documents. Leveraging the power of Retrieval-Augmented Generation (RAG) and Google's Gemini AI, it transforms static documents into dynamic, interactive knowledge bases. Users can upload various document formats, ask natural language questions, and receive accurate, context-aware answers with source attribution.</p>
        <p>This project showcases a full-stack application with a Python FastAPI backend for robust API services and a React TypeScript frontend for a smooth, intuitive user experience, enriched with Framer Motion for appealing animations.</p>

<h2 id="features">Features</h2>
        <ul>
            <li><strong>AI-Powered Chat:</strong> Engage in intelligent conversations with your documents using advanced RAG technology powered by Google's Gemini AI.</li>
            <li><strong>Multi-Format Document Support:</strong> Easily upload and process documents in various formats, including PDF, DOCX, PPTX, CSV, TXT, and Markdown.</li>
            <li><strong>Context-Aware Responses:</strong> Get accurate answers directly from your documents, with cited sources for transparency.</li>
            <li><strong>Fast & Efficient Retrieval:</strong> Utilizes FAISS indexing for lightning-fast document search and analysis.</li>
            <li><strong>User Authentication & Authorization:</strong> Secure user management with JWT authentication for protected routes and data.</li>
            <li><strong>Chat History Management:</strong> View and manage all your past conversations, including the ability to clear history.</li>
            <li><strong>Intuitive User Interface:</strong> A modern and responsive design built with React, TypeScript, and Tailwind CSS, featuring smooth animations with Framer Motion.</li>
            <li><strong>Modular Agentic Architecture:</strong> The backend is structured with a Coordinator Agent orchestrating Ingestion, Retrieval, and LLM Response agents for efficient processing.</li>
            <li><strong>Database Integration:</strong> Persistent storage for user data, chat sessions, and messages using PostgreSQL.</li>
        </ul>

  <h2 id="technology-stack">Technology Stack</h2>
        <p>The RAG Chatbot is built with a powerful and modern tech stack:</p>

  <h3>Frontend Technologies</h3>
        <ul>
            <li><strong>React 18:</strong> A declarative, component-based JavaScript library for building user interfaces. Utilizes functional components and hooks for state management and side effects.</li>
            <li><strong>TypeScript:</strong> A superset of JavaScript that adds static typing, improving code quality, readability, and maintainability by catching errors at compile time.</li>
            <li><strong>Vite:</strong> A next-generation frontend tooling that provides an extremely fast development experience with features like hot module replacement (HMR) and optimized build processes.</li>
            <li><strong>Tailwind CSS:</strong> A utility-first CSS framework that enables rapid UI development by providing low-level utility classes directly in your JSX. This allows for highly customizable and responsive designs.</li>
            <li><strong>Framer Motion:</strong> A production-ready animation library for React. It's used extensively throughout the application to create fluid transitions, interactive elements, and delightful user experiences (e.g., page transitions, button hovers, element entrances).</li>
            <li><strong>React Router:</strong> The standard library for routing in React applications, enabling navigation between different pages (<code>/</code>, <code>/login</code>, <code>/chat</code>, etc.) and managing URL parameters (e.g., <code>sessionId</code>).</li>
            <li><strong>Lucide React:</strong> A collection of beautiful, pixel-perfect icons used across the application for visual cues and enhanced UI.</li>
            <li><strong>Axios:</strong> A promise-based HTTP client for the browser and Node.js, used for making API requests to the backend. Includes interceptors for handling authentication tokens and error responses.</li>
        </ul>
        <h3>Backend Technologies & RAG Architecture Details</h3>
        <p>The backend is built with Python FastAPI and implements a modular agentic architecture for the RAG (Retrieval-Augmented Generation) pipeline. This design ensures clear separation of concerns, scalability, and maintainability.</p>
        <ul>
            <li><strong>FastAPI:</strong> A modern, fast (high-performance) web framework for building APIs with Python 3.8+ based on standard Python type hints. It provides automatic documentation (Swagger UI/ReDoc) and robust error handling.</li>
            <li><strong>Python:</strong> The primary programming language for the backend logic, data processing, and AI integrations.</li>
            <li><strong>Google Gemini AI:</strong> The core Large Language Model (LLM) used for generating conversational responses based on retrieved context. The <code>gemini-2.5-flash</code> model is configured for efficient text generation.</li>
            <li><strong>FAISS (Facebook AI Similarity Search):</strong> A library for efficient similarity search and clustering of dense vectors. It's crucial for the "Retrieval" part of RAG, allowing the system to quickly find the most relevant document chunks based on a user's query.</li>
            <li><strong>Sentence Transformers:</strong> A Python library for state-of-the-art sentence, paragraph, and image embeddings. The <code>all-MiniLM-L6-v2</code> model is used to convert text chunks and user queries into numerical vector representations (embeddings) that FAISS can work with.</li>
            <li><strong>PostgreSQL:</strong> A powerful, open-source object-relational database system used for persistent storage of user accounts, chat sessions, and individual messages.</li>
            <li><strong>Asyncpg:</strong> A fast and high-performance PostgreSQL client library for Python's asyncio, enabling efficient asynchronous database operations.</li>
            <li><strong>Bcrypt:</strong> A robust password hashing function designed for secure password storage. It salts and hashes passwords, protecting against common attacks like rainbow table lookups.</li>
            <li><strong>PyJWT:</strong> A Python library for encoding and decoding JSON Web Tokens (JWTs), used for secure user authentication and authorization.</li>
            <li><strong>PyPDF2, python-docx, python-pptx, pandas:</strong> Libraries for parsing and extracting text content from various document formats (PDF, Word, PowerPoint, CSV). These are used by the Ingestion Agent.</li>
        </ul>

  <h4>Backend RAG Architecture Explained:</h4>
        <p>The backend employs a multi-agent system orchestrated by a <code>CoordinatorAgent</code> to handle the RAG workflow:</p>
        <ol>
            <li>
                <strong>Ingestion Agent (<code>IngestionAgent</code>):</strong>
                <ul>
                    <li><strong>Role:</strong> Responsible for processing raw uploaded documents.</li>
                    <li><strong>Process:</strong>
                        <ol>
                            <li>Receives document content (e.g., PDF, DOCX, PPTX, CSV, TXT, MD).</li>
                            <li>Parses the document based on its file extension using appropriate libraries (PyPDF2, python-docx, etc.).</li>
                            <li>Extracts all readable text from the document.</li>
                            <li>Divides the extracted text into smaller, manageable "chunks" (e.g., 500 characters per chunk).</li>
                            <li>Sends a <code>DOCUMENT_PROCESSED</code> message to the Retrieval Agent containing the filename and the list of chunks.</li>
                        </ol>
                    </li>
                </ul>
            </li>
            <li>
                <strong>Retrieval Agent (<code>RetrievalAgent</code>):</strong>
                <ul>
                    <li><strong>Role:</strong> Manages the vector store (FAISS index) and retrieves relevant document chunks based on user queries.</li>
                    <li><strong>Process (Storing Chunks - triggered by Ingestion Agent):</strong>
                        <ol>
                            <li>Receives <code>DOCUMENT_PROCESSED</code> messages from the Ingestion Agent.</li>
                            <li>For each text chunk, it generates a numerical vector "embedding" using the <code>SentenceTransformer</code> model.</li>
                            <li>These embeddings are then added to the global FAISS index, along with metadata linking them back to the original text chunk, filename, and session ID.</li>
                            <li>Sends a <code>CHUNKS_STORED</code> message to the Coordinator Agent upon successful storage.</li>
                        </ol>
                    </li>
                    <li><strong>Process (Retrieving Context - triggered by Coordinator for user queries):</strong>
                        <ol>
                            <li>Receives a <code>QUERY</code> message from the Coordinator Agent containing the user's question.</li>
                            <li>Generates an embedding for the user's query using the same <code>SentenceTransformer</code> model.</li>
                            <li>Performs a similarity search on the FAISS index using the query embedding to find the top 'k' (e.g., 3) most semantically similar document chunks.</li>
                            <li>Filters these chunks to ensure they belong to the current chat session.</li>
                            <li>Sends a <code>CONTEXT_RESPONSE</code> message to the LLM Response Agent, including the original query, session ID, and the retrieved relevant chunks.</li>
                        </ol>
                    </li>
                </ul>
            </li>
            <li>
                <strong>LLM Response Agent (<code>LLMResponseAgent</code>):</strong>
                <ul>
                    <li><strong>Role:</strong> Interacts with the Google Gemini LLM to generate a natural language answer.</li>
                    <li><strong>Process:</strong>
                        <ol>
                            <li>Receives a <code>CONTEXT_RESPONSE</code> message from the Retrieval Agent.</li>
                            <li>Constructs a detailed prompt for the Gemini model, combining the user's original query with the retrieved document context. The prompt instructs the LLM to answer based on the provided context and include source information.</li>
                            <li>Calls the Google Gemini API (<code>model.generate_content</code>) with the constructed prompt.</li>
                            <li>Extracts the generated answer from the LLM's response.</li>
                            <li>Sends a <code>FINAL_RESPONSE</code> message back to the Coordinator Agent, containing the query, the generated answer, and the filenames of the sources used.</li>
                            <li>Handles cases where no relevant context is found, providing a polite message to the user.</li>
                        </ol>
                    </li>
                </ul>
            </li>
            <li>
                <strong>Coordinator Agent (<code>CoordinatorAgent</code>):</strong>
                <ul>
                    <li><strong>Role:</strong> The central orchestrator that manages the flow of messages between different agents and handles database interactions.</li>
                    <li><strong>Process:</strong>
                        <ol>
                            <li>Receives initial requests from the FastAPI endpoints (e.g., document upload, user query).</li>
                            <li>Delegates tasks to the appropriate specialized agents (Ingestion, Retrieval, LLM Response).</li>
                            <li>Manages the creation and updating of chat sessions and messages in the PostgreSQL database.</li>
                            <li>Ensures that data (like session IDs) is passed correctly between agents.</li>
                            <li>Handles global state management for the FAISS index and document chunks (though in a more complex setup, this might be externalized).</li>
                        </ol>
                    </li>
                </ul>
            </li>
            <li>
                <strong>MCPMessage Class:</strong> A custom message class (<code>MCPMessage</code>) is used for inter-agent communication, ensuring a standardized format for messages exchanged within the agentic system (sender, receiver, type, payload, trace_id).
            </li>
        </ol>

  <h2 id="database-schema">Database Schema</h2>
        <p>The application uses a PostgreSQL database with the following schema:</p>
        <pre><code class="language-sql">CREATE TABLE users (
    id UUID PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password BYTEA NOT NULL
);

CREATE TABLE chat_sessions (
    id UUID PRIMARY KEY,
    user_id UUID REFERENCES users(id),
    filename VARCHAR(255) NOT NULL,
    created_at TIMESTAMP NOT NULL
);

CREATE TABLE messages (
    id UUID PRIMARY KEY,
    session_id UUID REFERENCES chat_sessions(id),
    query TEXT NOT NULL,
    answer TEXT NOT NULL,
    sources TEXT[] NOT NULL,
    timestamp TIMESTAMP NOT NULL
);</code></pre>
        <h2 id="getting-started">Getting Started</h2>
        <p>Follow these instructions to set up and run the RAG Chatbot on your local machine.</p>

  <h3 id="prerequisites">Prerequisites</h3>
        <p>Before you begin, ensure you have the following installed:</p>
        <ul>
            <li><strong>Python 3.9+</strong></li>
            <li><strong>Node.js & npm (or yarn)</strong></li>
            <li><strong>PostgreSQL</strong></li>
            <li><strong>Google Gemini API Key</strong>: <a href="https://aistudio.google.com/app/apikey" target="_blank">Get your API key here</a></li>
            <li><strong>Git</strong> (optional, for cloning the repository)</li>
        </ul>

  <h3 id="backend-setup">Backend Setup</h3>
        <ol>
            <li><strong>Clone the repository (if you haven't already):</strong>
                <pre><code>git clone &lt;your-repository-url&gt;
cd rag-chatbot/backend # Navigate to your backend directory</code></pre>
            </li>
            <li><strong>Create a virtual environment and activate it:</strong>
                <pre><code>python -m venv venv
# On Windows:
.\venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate</code></pre>
            </li>
            <li><strong>Install backend dependencies:</strong>
                <pre><code>pip install fastapi uvicorn pandas PyPDF2 python-docx python-pptx faiss-cpu numpy google-generativeai sentence-transformers asyncpg bcrypt PyJWT python-dotenv</code></pre>
                <p>(Alternatively, if you have a <code>requirements.txt</code>, run <code>pip install -r requirements.txt</code>)</p>
            </li>
            <li><strong>Set up your PostgreSQL database:</strong>
                <ul>
                    <li>Create a new database for the project (e.g., <code>rag_chatbot1</code>).</li>
                    <li>Ensure your database user has appropriate permissions.</li>
                    <li><strong>Run the provided SQL DDL to create the tables</strong> (refer to the <a href="#database-schema">Database Schema</a> section above).</li>
                </ul>
            </li>
            <li><strong>Create a <code>.env</code> file</strong> in your backend root and add your configurations (as described in the "Before You Start" section):
                <pre><code>GEMINI_API_KEY="YOUR_GOOGLE_GEMINI_API_KEY"
JWT_SECRET_KEY="A_VERY_STRONG_RANDOM_SECRET_KEY"
DATABASE_URL="postgresql://postgres:admin@localhost:5432/rag_chatbot1"</code></pre>
            </li>
            <li><strong>Run the FastAPI application:</strong>
                <pre><code>uvicorn main:app --reload --host 0.0.0.0 --port 8000</code></pre>
                <p>(Replace <code>main:app</code> with the actual file name and FastAPI app instance name if different). The provided Python code is in a file that would typically be named `main.py`.)</p>
                <p>The backend API will be accessible at <code>http://localhost:8000</code>.</p>
            </li>
        </ol>

  <h3 id="frontend-setup">Frontend Setup</h3>
        <ol>
            <li><strong>Navigate to the frontend directory:</strong>
                <pre><code>cd ../frontend # Assuming your frontend is in a directory named 'frontend' next to 'backend'</code></pre>
            </li>
            <li><strong>Install frontend dependencies:</strong>
                <pre><code>npm install
# or
yarn install</code></pre>
            </li>
            <li><strong>Start the React development server:</strong>
                <pre><code>npm run dev
# or
yarn dev</code></pre>
                <p>The frontend application will typically open in your browser at <code>http://localhost:5173</code>.</p>
            </li>
        </ol>

 <h2 id="usage">Usage</h2>
        <ol>
            <li><strong>Register an Account:</strong>
                <ul>
                    <li>Open your browser and go to <code>http://localhost:5173</code>.</li>
                    <li>Click on "Sign Up" to create a new account.</li>
                </ul>
            </li>
            <li><strong>Login:</strong>
                <ul>
                    <li>After successful registration, log in with your new credentials.</li>
                </ul>
            </li>
            <li><strong>Upload Documents:</strong>
                <ul>
                    <li>Once logged in, navigate to the "Upload Documents" section (or click "Upload More" from the chat).</li>
                    <li>Upload your PDF, DOCX, PPTX, CSV, TXT, or Markdown files.</li>
                    <li>The system will process and index your documents, making them ready for querying.</li>
                </ul>
            </li>
            <li><strong>Start Chatting:</strong>
                <ul>
                    <li>Go to the "Chat" section. If you uploaded a document, a new session should have been created. Otherwise, you can click "New Chat" in the sidebar.</li>
                    <li>Type your questions related to the uploaded documents in the input field and press Enter or click "Send."</li>
                    <li>The AI will provide answers, citing sources from your documents.</li>
                </ul>
            </li>
            <li><strong>View Chat History:</strong>
                <ul>
                    <li>Access "Chat History" from the sidebar to view all your past conversations. You can search and revisit specific sessions.</li>
                </ul>
            </li>
            <li><strong>Logout:</strong>
                <ul>
                    <li>Click "Logout" in the sidebar when you're done.</li>
                </ul>
            </li>
        </ol>

  <h2 id="api-endpoints">API Endpoints</h2>
        <p>The backend exposes the following API endpoints:</p>
        <h3>Authentication:</h3>
        <ul>
            <li><code>POST /api/auth/signup</code>: Register a new user.
                <ul>
                    <li><strong>Request Body:</strong> <code>{"name": "string", "email": "string", "password": "string"}</code></li>
                    <li><strong>Response:</strong> <code>{"message": "User created successfully"}</code></li>
                </ul>
            </li>
            <li><code>POST /api/auth/login</code>: Authenticate a user and receive a JWT.
                <ul>
                    <li><strong>Request Body:</strong> <code>{"email": "string", "password": "string"}</code></li>
                    <li><strong>Response:</strong> <code>{"token": "string", "user": {"id": "string", "name": "string", "email": "string"}}</code></li>
                </ul>
            </li>
            <li><code>GET /api/auth/verify</code>: Verify the authenticity of a JWT and retrieve user details.
                <ul>
                    <li><strong>Headers:</strong> <code>Authorization: Bearer &lt;token&gt;</code></li>
                    <li><strong>Response:</strong> <code>{"user": {"id": "string", "name": "string", "email": "string"}}</code></li>
                </ul>
            </li>
        </ul>

   <h3>Document Upload:</h3>
        <ul>
            <li><code>POST /upload</code>: Upload a document for processing.
                <ul>
                    <li><strong>Headers:</strong> <code>Authorization: Bearer &lt;token&gt;</code></li>
                    <li><strong>Request Body:</strong> <code>multipart/form-data</code> with <code>file: UploadFile</code></li>
                    <li><strong>Response:</strong> <code>{"message": "string", "filename": "string", "chunks_count": int, "session_id": "string"}</code></li>
                </ul>
            </li>
        </ul>
    <h3>Chat Sessions & Messages:</h3>
        <ul>
            <li><code>POST /api/chat-sessions/new</code>: Create a new empty chat session.
                <ul>
                    <li><strong>Headers:</strong> <code>Authorization: Bearer &lt;token&gt;</code></li>
                    <li><strong>Response:</strong> <code>{"session_id": "string", "message": "New chat session created"}</code></li>
                </ul>
            </li>
            <li><code>GET /api/chat-sessions</code>: Get a list of all chat sessions for the authenticated user.
                <ul>
                    <li><strong>Headers:</strong> <code>Authorization: Bearer &lt;token&gt;</code></li>
                    <li><strong>Response:</strong> <code>List[ChatSession]</code></li>
                </ul>
            </li>
            <li><code>GET /api/chat-sessions/{session_id}</code>: Get details of a specific chat session, including messages.
                <ul>
                    <li><strong>Headers:</strong> <code>Authorization: Bearer &lt;token&gt;</code></li>
                    <li><strong>Response:</strong> <code>ChatSession</code></li>
                </ul>
            </li>
            <li><code>POST /query</code>: Send a query to the chatbot for a specific session.
                <ul>
                    <li><strong>Headers:</strong> <code>Authorization: Bearer &lt;token&gt;</code></li>
                    <li><strong>Request Body:</strong> <code>{"query": "string", "session_id": "string"}</code></li>
                    <li><strong>Response:</strong> <code>{"answer": "string", "sources": List[str], "query": "string", "session_id": "string"}</code></li>
                </ul>
            </li>
            <li><code>DELETE /chat-history</code>: Clear all chat history and sessions for the authenticated user.
                <ul>
                    <li><strong>Headers:</strong> <code>Authorization: Bearer &lt;token&gt;</code></li>
                    <li><strong>Response:</strong> <code>{"message": "Chat history cleared"}</code></li>
                </ul>
            </li>
        </ul>
        <h3>Statistics:</h3>
        <ul>
            <li><code>GET /stats</code>: Get statistics about documents and chat history for the authenticated user.
                <ul>
                    <li><strong>Headers:</strong> <code>Authorization: Bearer &lt;token&gt;</code></li>
                    <li><strong>Response:</strong> <code>{"total_documents": int, "total_chunks": int, "chat_history_count": int}</code></li>
                </ul>
            </li>
        </ul>
      <h2 id="project-demos">Project Demos</h2>
        <p>Here are some screenshots demonstrating the RAG Chatbot in action:</p>

<h3>Home Page</h3>
        <img src="demo/home.png" alt="Screenshot of the RAG Chatbot Home Page">
        <p class="text-center text-gray-600">A welcoming landing page highlighting key features and calls to action.</p>
        <h3>Login Page</h3>
        <img src="demo/login.png" alt="Screenshot of the RAG Chatbot Login Page">
        <p class="text-center text-gray-600">Secure user login interface.</p>
        <h3>Signup Page</h3>
        <img src="demo/signup.png" alt="Screenshot of the RAG Chatbot Signup Page">
        <p class="text-center text-gray-600">User registration form for new accounts.</p>
        <h3>Upload Documents</h3>
        <img src="demo/upload.png" alt="Screenshot of the Document Upload Interface">
        <p class="text-center text-gray-600">Interface for uploading various document types.</p>
       <h3>Chat Interface</h3>
        <img src="demo/chat.png" alt="Screenshot of the AI Chat Interface">
        <p class="text-center text-gray-600">The main chat window where users interact with their documents.</p>
        <h3>Chat History</h3>
        <img src="demo/history.png" alt="Screenshot of the Chat History Page">
        <p class="text-center text-gray-600">Overview of past chat sessions and their details.</p>
        <h3>Statistics Dashboard</h3>
        <img src="demo/stats.png" alt="Screenshot of the Statistics Dashboard">
        <p class="text-center text-gray-600">A dashboard showing usage statistics like total documents and messages.</p>
        <h2 id="contributing">Contributing</h2>
        <p>Contributions are welcome! If you have suggestions for improvements or find a bug, please open an issue or submit a pull request.</p>
        <h2 id="license">License</h2>
        <p>This project is open-source and available under the <a href="LICENSE" target="_blank">MIT License</a>.</p>
        <h2 id="contact">Contact</h2>
        <p>If you have any questions, feel free to reach out:</p>
        <ul>
            <li><strong>Email:</strong> <a href="mailto:suryavigenshkapuganti@gmail.com">support@ragchatbot.com</a> (placeholder)</li>
            <li><strong>GitHub Issues:</strong> <a href="https://github.com/suryavignesh1304/Agentic-RAG-bot/issues">[Link to your GitHub Issues page]</a></li>
        </ul>
    </div>

