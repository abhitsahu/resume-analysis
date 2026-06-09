import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { resumeService } from '../services/resumeService';
import Card from '../components/common/Card';
import Loader from '../components/common/Loader';
import EmptyState from '../components/common/EmptyState';
import Button from '../components/common/Button';
import ResumeCard from '../components/resume/ResumeCard';
import {
  HiOutlineCloudUpload,
  HiOutlineDocumentText,
  HiOutlineTrendingUp,
  HiOutlineChartBar,
} from 'react-icons/hi';

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const data = await resumeService.getStats();
      setStats(data.stats);
    } catch (err) {
      setError('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader size="lg" text="Loading dashboard..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20">
        <p className="text-red-500">{error}</p>
        <Button variant="secondary" onClick={fetchStats} className="mt-4">Retry</Button>
      </div>
    );
  }

  const statCards = [
    {
      label: 'Total Uploads',
      value: stats?.totalUploads || 0,
      icon: HiOutlineDocumentText,
      color: 'from-primary-500 to-primary-700',
      iconBg: 'bg-primary-50 dark:bg-primary-900/20',
      iconColor: 'text-primary-500',
    },
    {
      label: 'Average Score',
      value: stats?.avgScore || 0,
      suffix: '/100',
      icon: HiOutlineChartBar,
      color: 'from-accent-500 to-accent-700',
      iconBg: 'bg-accent-50 dark:bg-accent-900/20',
      iconColor: 'text-accent-500',
    },
    {
      label: 'Best Score',
      value: stats?.maxScore || 0,
      suffix: '/100',
      icon: HiOutlineTrendingUp,
      color: 'from-amber-500 to-amber-700',
      iconBg: 'bg-amber-50 dark:bg-amber-900/20',
      iconColor: 'text-amber-500',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-surface-900 dark:text-white">Dashboard</h1>
          <p className="text-surface-500 dark:text-surface-400">Overview of your resume analyses</p>
        </div>
        <Link to="/upload">
          <Button icon={HiOutlineCloudUpload}>Upload Resume</Button>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
        {statCards.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-xl ${stat.iconBg} flex items-center justify-center flex-shrink-0`}>
                <stat.icon className={`w-6 h-6 ${stat.iconColor}`} />
              </div>
              <div>
                <p className="text-sm text-surface-500 dark:text-surface-400">{stat.label}</p>
                <p className="text-2xl font-bold text-surface-900 dark:text-white">
                  <AnimatedNumber value={stat.value} />
                  {stat.suffix && <span className="text-sm font-normal text-surface-400">{stat.suffix}</span>}
                </p>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Recent Analyses */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-surface-900 dark:text-white">Recent Analyses</h2>
          {stats?.recentAnalyses?.length > 0 && (
            <Link to="/history" className="text-sm font-medium text-primary-500 hover:text-primary-600 transition-colors">
              View all →
            </Link>
          )}
        </div>

        {stats?.recentAnalyses?.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {stats.recentAnalyses.map((resume, i) => (
              <ResumeCard key={resume._id} resume={resume} index={i} />
            ))}
          </div>
        ) : (
          <EmptyState
            title="No analyses yet"
            description="Upload your first resume to get started with AI-powered analysis."
            action={
              <Link to="/upload">
                <Button icon={HiOutlineCloudUpload}>Upload Your First Resume</Button>
              </Link>
            }
          />
        )}
      </div>
    </div>
  );
}

function AnimatedNumber({ value }) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = Number(value);
    if (start === end) return;
    const duration = 1000;
    const stepTime = Math.abs(Math.floor(duration / end));
    const timer = setInterval(() => {
      start += 1;
      setDisplay(start);
      if (start >= end) clearInterval(timer);
    }, Math.max(stepTime, 20));
    return () => clearInterval(timer);
  }, [value]);

  return <span>{display}</span>;
}
