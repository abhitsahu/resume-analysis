import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { resumeService } from '../services/resumeService';
import AnalysisCard from '../components/resume/AnalysisCard';
import Loader from '../components/common/Loader';
import Badge from '../components/common/Badge';
import { HiOutlineArrowLeft, HiOutlineDocument, HiOutlineClock } from 'react-icons/hi';

export default function Analysis() {
  const { id } = useParams();
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchResume();
  }, [id]);

  const fetchResume = async () => {
    try {
      const data = await resumeService.getResumeById(id);
      setResume(data.resume);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load analysis');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader size="lg" text="Loading analysis..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20">
        <p className="text-red-500 mb-4">{error}</p>
        <Link to="/history" className="btn-secondary inline-block">← Back to History</Link>
      </div>
    );
  }

  const date = new Date(resume.createdAt).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
      >
        <div className="flex items-center gap-4">
          <Link
            to="/history"
            className="p-2 rounded-xl hover:bg-surface-100 dark:hover:bg-surface-800 transition-colors"
          >
            <HiOutlineArrowLeft className="w-5 h-5 text-surface-500" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-surface-900 dark:text-white flex items-center gap-2">
              {resume.analysis?.name || 'Resume Analysis'}
            </h1>
            <div className="flex items-center gap-3 text-sm text-surface-500 dark:text-surface-400 mt-1">
              <span className="flex items-center gap-1">
                <HiOutlineDocument className="w-4 h-4" />
                {resume.fileName}
              </span>
              <span className="flex items-center gap-1">
                <HiOutlineClock className="w-4 h-4" />
                {date}
              </span>
            </div>
          </div>
        </div>

        <Badge variant={resume.analysis?.atsScore >= 80 ? 'success' : resume.analysis?.atsScore >= 60 ? 'warning' : 'danger'}>
          ATS Score: {resume.analysis?.atsScore || 0}/100
        </Badge>
      </motion.div>

      {/* Analysis Content */}
      <AnalysisCard analysis={resume.analysis} />
    </div>
  );
}
