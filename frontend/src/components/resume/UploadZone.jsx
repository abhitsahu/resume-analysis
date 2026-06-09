import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion, AnimatePresence } from 'framer-motion';
import { HiOutlineCloudUpload, HiOutlineDocument, HiOutlineX } from 'react-icons/hi';
import Button from '../common/Button';

export default function UploadZone({ onUpload, loading = false }) {
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');

  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    if (rejectedFiles.length > 0) {
      const rejection = rejectedFiles[0];
      if (rejection.errors[0]?.code === 'file-too-large') {
        setError('File is too large. Maximum size is 5MB.');
      } else if (rejection.errors[0]?.code === 'file-invalid-type') {
        setError('Only PDF files are accepted.');
      } else {
        setError('Invalid file. Please upload a PDF.');
      }
      return;
    }
    setError('');
    setFile(acceptedFiles[0]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'application/pdf': ['.pdf'] },
    maxSize: 5 * 1024 * 1024, // 5MB
    multiple: false,
  });

  const handleUpload = () => {
    if (file) {
      onUpload(file);
    }
  };

  const removeFile = (e) => {
    e.stopPropagation();
    setFile(null);
    setError('');
  };

  const formatSize = (bytes) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className={`relative border-2 border-dashed rounded-2xl p-8 sm:p-12 text-center cursor-pointer transition-all duration-300
          ${isDragActive
            ? 'border-primary-400 bg-primary-50/50 dark:bg-primary-900/20 scale-[1.02]'
            : file
            ? 'border-accent-300 dark:border-accent-700 bg-accent-50/30 dark:bg-accent-900/10'
            : 'border-surface-300 dark:border-surface-700 hover:border-primary-300 dark:hover:border-primary-700 hover:bg-primary-50/30 dark:hover:bg-primary-900/10'
          }
        `}
      >
        <input {...getInputProps()} id="resume-upload" />

        <AnimatePresence mode="wait">
          {file ? (
            <motion.div
              key="file"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex flex-col items-center gap-3"
            >
              <div className="w-16 h-16 rounded-2xl bg-accent-100 dark:bg-accent-900/30 flex items-center justify-center">
                <HiOutlineDocument className="w-8 h-8 text-accent-600 dark:text-accent-400" />
              </div>
              <div>
                <p className="font-semibold text-surface-900 dark:text-surface-100">{file.name}</p>
                <p className="text-sm text-surface-500">{formatSize(file.size)}</p>
              </div>
              <button
                onClick={removeFile}
                className="absolute top-4 right-4 p-1.5 rounded-lg bg-surface-100 dark:bg-surface-800 hover:bg-red-100 dark:hover:bg-red-900/30 text-surface-500 hover:text-red-500 transition-colors"
              >
                <HiOutlineX className="w-4 h-4" />
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex flex-col items-center gap-4"
            >
              <motion.div
                animate={isDragActive ? { scale: 1.1, y: -5 } : { scale: 1, y: 0 }}
                className="w-16 h-16 rounded-2xl bg-primary-50 dark:bg-primary-900/20 flex items-center justify-center"
              >
                <HiOutlineCloudUpload className="w-8 h-8 text-primary-500" />
              </motion.div>
              <div>
                <p className="text-lg font-semibold text-surface-900 dark:text-surface-100">
                  {isDragActive ? 'Drop your resume here' : 'Drag & drop your resume'}
                </p>
                <p className="text-sm text-surface-500 dark:text-surface-400 mt-1">
                  or <span className="text-primary-500 font-medium">browse files</span> — PDF only, max 5MB
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {error && (
        <motion.p
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-sm text-red-500 dark:text-red-400 text-center"
        >
          {error}
        </motion.p>
      )}

      {file && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <Button onClick={handleUpload} loading={loading} className="w-full" size="lg" icon={HiOutlineCloudUpload}>
            {loading ? 'Analyzing with AI...' : 'Upload & Analyze'}
          </Button>
        </motion.div>
      )}
    </div>
  );
}
