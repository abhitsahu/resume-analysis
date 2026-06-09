import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Card from '../common/Card';

function CircularProgress({ score, size = 160 }) {
  const [animatedScore, setAnimatedScore] = useState(0);
  const radius = (size - 16) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (animatedScore / 100) * circumference;

  useEffect(() => {
    const timer = setTimeout(() => setAnimatedScore(score), 200);
    return () => clearTimeout(timer);
  }, [score]);

  const getColor = (s) => {
    if (s >= 80) return { stroke: '#10b981', text: 'text-accent-500' };
    if (s >= 60) return { stroke: '#f59e0b', text: 'text-amber-500' };
    return { stroke: '#ef4444', text: 'text-red-500' };
  };

  const { stroke, text } = getColor(score);

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth="8"
          fill="none"
          className="text-surface-200 dark:text-surface-800"
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={stroke}
          strokeWidth="8"
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <motion.span
          className={`text-3xl font-bold ${text}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {score}
        </motion.span>
        <span className="text-xs text-surface-500">ATS Score</span>
      </div>
    </div>
  );
}

export default function ScoreChart({ score = 0, categoryScores = {} }) {
  const categories = [
    { key: 'skills', label: 'Skills', color: 'bg-primary-500' },
    { key: 'experience', label: 'Experience', color: 'bg-accent-500' },
    { key: 'education', label: 'Education', color: 'bg-amber-500' },
    { key: 'formatting', label: 'Formatting', color: 'bg-blue-500' },
    { key: 'impact', label: 'Impact', color: 'bg-purple-500' },
  ];

  return (
    <Card className="flex flex-col items-center">
      <h3 className="font-semibold text-surface-900 dark:text-surface-100 mb-6 self-start">Overall Score</h3>

      <CircularProgress score={score} />

      <div className="w-full mt-6 space-y-3">
        {categories.map((cat, i) => {
          const value = categoryScores[cat.key] || 0;
          return (
            <div key={cat.key} className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-surface-600 dark:text-surface-400">{cat.label}</span>
                <span className="font-medium text-surface-900 dark:text-surface-100">{value}%</span>
              </div>
              <div className="h-1.5 rounded-full bg-surface-100 dark:bg-surface-800 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${value}%` }}
                  transition={{ duration: 1, delay: i * 0.15 + 0.5 }}
                  className={`h-full rounded-full ${cat.color}`}
                />
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
