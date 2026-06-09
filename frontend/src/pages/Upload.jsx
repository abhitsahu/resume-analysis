import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { resumeService } from '../services/resumeService';
import UploadZone from '../components/resume/UploadZone';
import AnalysisCard from '../components/resume/AnalysisCard';
import Card from '../components/common/Card';
import Loader from '../components/common/Loader';
import toast from 'react-hot-toast';

export default function Upload() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const navigate = useNavigate();

  const handleUpload = async (file) => {
    setLoading(true);
    setResult(null);
    try {
      const data = await resumeService.uploadResume(file);
      setResult(data.resume);
      toast.success('Resume analyzed successfully!');
    } catch (err) {
      const message = err.response?.data?.message || 'Upload failed. Please try again.';
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-surface-900 dark:text-white">Upload Resume</h1>
        <p className="text-surface-500 dark:text-surface-400 mt-1">
          Upload your resume to get an instant AI-powered analysis
        </p>
      </div>

      {/* Upload Zone */}
      {!result && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Card className="p-8">
            <UploadZone onUpload={handleUpload} loading={loading} />
          </Card>
        </motion.div>
      )}

      {/* Loading State */}
      {loading && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <Card className="p-12 text-center">
            <Loader size="xl" />
            <h3 className="text-lg font-semibold text-surface-900 dark:text-white mt-6">Analyzing your resume...</h3>
            <p className="text-surface-500 dark:text-surface-400 mt-2 max-w-sm mx-auto">
              Our AI is reviewing your resume for skills, experience, and ATS compatibility. This may take a moment.
            </p>

            {/* Skeleton preview */}
            <div className="mt-8 space-y-4 max-w-md mx-auto">
              <div className="skeleton h-4 w-3/4 mx-auto" />
              <div className="skeleton h-4 w-1/2 mx-auto" />
              <div className="skeleton h-20 w-full" />
              <div className="grid grid-cols-2 gap-3">
                <div className="skeleton h-12" />
                <div className="skeleton h-12" />
              </div>
            </div>
          </Card>
        </motion.div>
      )}

      {/* Result */}
      {result && !loading && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-surface-900 dark:text-white">Analysis Complete!</h2>
              <p className="text-surface-500 dark:text-surface-400 text-sm">
                {result.fileName}
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => { setResult(null); }}
                className="btn-secondary text-sm"
              >
                Upload Another
              </button>
              <button
                onClick={() => navigate(`/analysis/${result._id}`)}
                className="btn-primary text-sm"
              >
                View Full Analysis
              </button>
            </div>
          </div>

          <AnalysisCard analysis={result.analysis} />
        </motion.div>
      )}
    </div>
  );
}
