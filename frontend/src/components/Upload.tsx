import { useContext, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { AuthContext } from '../AuthContext';
import { api } from '../api';
import { useDropzone } from 'react-dropzone';
import { 
  Upload as UploadIcon, 
  FileText, 
  CheckCircle, 
  X, 
  AlertCircle,
  File,
  Image,
  FileSpreadsheet
} from 'lucide-react';

interface UploadedFile {
  file: File;
  progress: number;
  status: 'uploading' | 'success' | 'error';
  error?: string;
  sessionId?: string;
}

function Upload() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  const getFileIcon = (fileName: string) => {
    const extension = fileName.split('.').pop()?.toLowerCase();
    switch (extension) {
      case 'pdf':
        return <FileText className="h-6 w-6 text-red-500" />;
      case 'docx':
        return <FileText className="h-6 w-6 text-blue-500" />;
      case 'pptx':
        return <Image className="h-6 w-6 text-orange-500" />;
      case 'csv':
        return <FileSpreadsheet className="h-6 w-6 text-green-500" />;
      case 'txt':
      case 'md':
        return <File className="h-6 w-6 text-gray-500" />;
      default:
        return <File className="h-6 w-6 text-gray-500" />;
    }
  };

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (!user) return;

    const newFiles: UploadedFile[] = acceptedFiles.map(file => ({
      file,
      progress: 0,
      status: 'uploading' as const
    }));

    setUploadedFiles(prev => [...prev, ...newFiles]);

    for (let i = 0; i < newFiles.length; i++) {
      const fileUpload = newFiles[i];
      const formData = new FormData();
      formData.append('file', fileUpload.file);

      try {
        // Simulate progress
        const progressInterval = setInterval(() => {
          setUploadedFiles(prev => 
            prev.map(f => 
              f.file === fileUpload.file && f.progress < 90
                ? { ...f, progress: Math.min(f.progress + 10, 90) }
                : f
            )
          );
        }, 100);

        const response = await api.post('/upload', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });

        clearInterval(progressInterval);

        setUploadedFiles(prev => 
          prev.map(f => 
            f.file === fileUpload.file
              ? { ...f, progress: 100, status: 'success', sessionId: response.data.session_id }
              : f
          )
        );

        // Auto-navigate to chat after successful upload
        setTimeout(() => {
          navigate(`/chat?sessionId=${response.data.session_id}`);
        }, 1500);

      } catch (error: any) {
        setUploadedFiles(prev => 
          prev.map(f => 
            f.file === fileUpload.file
              ? { 
                  ...f, 
                  progress: 0, 
                  status: 'error', 
                  error: error.response?.data?.detail || 'Upload failed' 
                }
              : f
          )
        );
      }
    }
  }, [user, navigate]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    onDragEnter: () => setIsDragging(true),
    onDragLeave: () => setIsDragging(false),
    accept: {
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'application/vnd.openxmlformats-officedocument.presentationml.presentation': ['.pptx'],
      'text/csv': ['.csv'],
      'text/plain': ['.txt'],
      'text/markdown': ['.md'],
    },
    maxSize: 10 * 1024 * 1024, // 10MB
  });

  const removeFile = (fileToRemove: File) => {
    setUploadedFiles(prev => prev.filter(f => f.file !== fileToRemove));
  };

  if (!user) {
    navigate('/login');
    return null;
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Upload Documents
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Upload your documents to start chatting with AI about their content
        </p>
      </motion.div>

      {/* Upload Area */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-8"
      >
        <div
          {...getRootProps()}
          className={`
            glass-effect rounded-xl p-12 text-center cursor-pointer transition-all duration-300
            ${isDragActive || isDragging 
              ? 'border-2 border-dashed border-blue-500 bg-blue-50/50 dark:bg-blue-900/20' 
              : 'border-2 border-dashed border-gray-300 dark:border-gray-600 hover:border-blue-400 hover:bg-gray-50/50 dark:hover:bg-gray-800/50'
            }
          `}
        >
          <input {...getInputProps()} />
          
          <motion.div
            animate={{ 
              scale: isDragActive ? 1.1 : 1,
              rotate: isDragActive ? 5 : 0
            }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <UploadIcon className="h-16 w-16 mx-auto mb-4 text-gray-400" />
          </motion.div>
          
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            {isDragActive ? 'Drop files here!' : 'Drag & drop files here'}
          </h3>
          
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            or click to browse files
          </p>
          
          <div className="flex flex-wrap justify-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded">PDF</span>
            <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded">DOCX</span>
            <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded">PPTX</span>
            <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded">CSV</span>
            <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded">TXT</span>
            <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded">MD</span>
          </div>
          
          <p className="text-xs text-gray-400 mt-2">
            Maximum file size: 10MB
          </p>
        </div>
      </motion.div>

      {/* Uploaded Files */}
      <AnimatePresence>
        {uploadedFiles.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="glass-effect rounded-xl p-6"
          >
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Upload Progress
            </h2>
            
            <div className="space-y-4">
              {uploadedFiles.map((uploadFile, index) => (
                <motion.div
                  key={`${uploadFile.file.name}-${index}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
                >
                  {/* File Icon */}
                  <div className="flex-shrink-0 mr-3">
                    {getFileIcon(uploadFile.file.name)}
                  </div>
                  
                  {/* File Info */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                      {uploadFile.file.name}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {(uploadFile.file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                    
                    {/* Progress Bar */}
                    {uploadFile.status === 'uploading' && (
                      <div className="mt-2">
                        <div className="bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <motion.div
                            className="bg-blue-500 h-2 rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: `${uploadFile.progress}%` }}
                            transition={{ duration: 0.3 }}
                          />
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                          {uploadFile.progress}% uploaded
                        </p>
                      </div>
                    )}
                    
                    {/* Error Message */}
                    {uploadFile.status === 'error' && uploadFile.error && (
                      <p className="text-xs text-red-500 mt-1">
                        {uploadFile.error}
                      </p>
                    )}
                  </div>
                  
                  {/* Status Icon */}
                  <div className="flex-shrink-0 ml-3">
                    {uploadFile.status === 'uploading' && (
                      <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                    )}
                    {uploadFile.status === 'success' && (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    )}
                    {uploadFile.status === 'error' && (
                      <AlertCircle className="h-5 w-5 text-red-500" />
                    )}
                  </div>
                  
                  {/* Remove Button */}
                  <button
                    onClick={() => removeFile(uploadFile.file)}
                    className="flex-shrink-0 ml-2 p-1 text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Upload;